<template>
  <div class="container">
    <ABreadcrumb :items="['menu.poster', 'poster.list']" />
    <ACard class="general-card" :title="$t('poster.list')">
      <!-- <FormCreate /> -->
      <ARow>
        <ACol :flex="1">
          <AForm
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <ARow :gutter="16">
              <ACol :span="8">
                <AFormItem field="name" :label="$t('model.name')">
                  <AInput
                    v-model="formModel.name"
                    :placeholder="
                      $t('model.placeholder.input') + $t('model.name')
                    "
                  />
                </AFormItem>
              </ACol>
              <ACol :span="8">
                <AFormItem field="grade" :label="$t('model.grade_name')">
                  <ASelect
                    v-model="formModel.grade_value"
                    style="width: 100%"
                    :placeholder="
                      $t('model.placeholder.select') + $t('model.grade_name')
                    "
                  >
                    <template v-for="item in grades" :key="item.level">
                      <AOption :value="item.level" style="width: 100%">
                        {{ item.name }}
                      </AOption>
                    </template>
                  </ASelect>
                </AFormItem>
              </ACol>
              <ACol :span="8">
                <AFormItem
                  field="createdTime"
                  :placeholder="
                    $t('model.placeholder.select') + $t('model.created_at')
                  "
                >
                  <ARangePicker
                    v-model="formModel.created_at"
                    style="width: 100%"
                  />
                </AFormItem>
              </ACol>
            </ARow>
          </AForm>
        </ACol>
        <ADivider style="height: 84px" direction="vertical" />
        <ACol :flex="'86px'" style="text-align: right">
          <ASpace direction="vertical" :size="18">
            <AButton type="primary" @click="search">
              <template #icon>
                <IconSearch />
              </template>
              {{ $t('searchTable.form.search') }}
            </AButton>
            <AButton @click="reset">
              <template #icon>
                <IconRefresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </AButton>
          </ASpace>
        </ACol>
      </ARow>
      <ADivider style="margin-top: 0" />
      <ARow style="margin-bottom: 16px">
        <ACol :span="12">
          <ASpace>
            <AButton type="primary" @click="createPoster">
              <template #icon>
                <IconPlus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </AButton>
          </ASpace>
        </ACol>
        <ACol
          :span="24"
          style="display: flex; align-items: center; justify-content: end"
        >
          <AButton>
            <template #icon>
              <IconDownload />
            </template>
            {{ $t('searchTable.operation.download') }}
          </AButton>
          <ATooltip :content="$t('searchTable.actions.refresh')">
            <div class="action-icon" @click="search"
              ><IconRefresh size="18"
            /></div>
          </ATooltip>
          <ADropdown @select="handleSelectDensity">
            <ATooltip :content="$t('searchTable.actions.density')">
              <div class="action-icon"><IconLineHeight size="18" /></div>
            </ATooltip>
            <template #content>
              <ADoption
                v-for="item in densityList"
                :key="item.value"
                :value="item.value"
                :class="{ active: item.value === size }"
              >
                <span>{{ item.name }}</span>
              </ADoption>
            </template>
          </ADropdown>
          <ATooltip :content="$t('searchTable.actions.columnSetting')">
            <APopover
              trigger="click"
              position="bl"
              @popup-visible-change="popupVisibleChange"
            >
              <div class="action-icon"><IconSettings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div
                    v-for="(item, index) in showColumns"
                    :key="item.dataIndex"
                    class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <IconDragArrow />
                    </div>
                    <div>
                      <ACheckbox
                        v-model="item.checked"
                        @change="
                          handleChange($event, item as TableColumnData, index)
                        "
                      >
                      </ACheckbox>
                    </div>
                    <div class="title">
                      {{ item.title === '#' ? '序列号' : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </APopover>
          </ATooltip>
        </ACol>
      </ARow>
      <ATable
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :bordered="false"
        :size="size"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #BackgroundImagePath="{ record }">
          <AImage
            :src="record.background.image_path"
            width="32"
            height="32"
            fit="cover"
          />
        </template>
        <template #operations="{ record }">
          <AButton
            v-permission="['超级管理员']"
            type="primary"
            size="small"
            @click="toPosterDesign(record.id)"
          >
            {{ $t('model.edit') }}
          </AButton>
          <ADivider direction="vertical" />
          <a-popconfirm
            :content="$t('model.confirm.delete')"
            :ok-text="$t('model.confirm')"
            :cancel-text="$t('model.confirm.cancel')"
            type="warning"
            @ok="delPoster(record.id)"
          >
            <a-button
              v-permission="['超级管理员']"
              size="small"
              type="primary"
              status="danger"
            >
              {{ $t('model.delete') }}
            </a-button>
          </a-popconfirm>
        </template>
      </ATable>
    </ACard>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import {
    getPosterList,
    PosterData,
    PosterListParams,
    deletePoster,
  } from '@/api/poster';
  import { Pagination } from '@/types/global';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';

  // router 路由
  import { useRouter } from 'vue-router';

  // getGradeAll
  import { getGradeAll, Grade } from '@/api/grade';
  // import FormCreate from './components/create.vue';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';

  type Column = TableColumnData & { checked?: true };
  const grades = ref<Grade[]>([]);

  const router = useRouter();

  // 删除海报
  const delPoster = (id: number) => {
    deletePoster(id).finally(() => {
      search();
    });
  };

  // 调整海报设计页面
  const toPosterDesign = (id: number) => {
    router.push({ name: 'PosterDesign', params: { id } });
  };

  const createPoster = () => {
    toPosterDesign(0);
  };

  const getGradeAllList = async () => {
    getGradeAll().then((res) => {
      window.console.log(res);
      const data = res.list as Grade[];
      grades.value = [];
      grades.value.push({ level: 0, name: '全部' } as Grade);
      grades.value.push(...data);
    });
  };
  getGradeAllList();

  const generateFormModel = () => {
    return {
      grade_value: 0,
      id: 0,
      name: '',
      postername: '',
      nick_name: '',
      phone: '',
      parent_id: 0,
      created_at: [],
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<PosterData[]>([]);
  const formModel = ref(generateFormModel());

  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);

  const size = ref<SizeProps>('medium');

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };

  const pagination = reactive({
    ...basePagination,
  });

  const densityList = computed(() => [
    {
      name: t('searchTable.size.mini'),
      value: 'mini',
    },
    {
      name: t('searchTable.size.small'),
      value: 'small',
    },
    {
      name: t('searchTable.size.medium'),
      value: 'medium',
    },
    {
      name: t('searchTable.size.large'),
      value: 'large',
    },
  ]);

  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('model.id'),
      dataIndex: 'id',
      slotName: 'id',
      ellipsis: true,
      tooltip: true,
      width: 80,
    },
    {
      title: t('model.name'),
      dataIndex: 'name',
      ellipsis: true,
      tooltip: true,
      width: 200,
    },
    {
      title: t('model.dpi'),
      dataIndex: 'dpi',
      ellipsis: true,
      tooltip: true,
      width: 50,
    },
    {
      title: t('poster.background.image_path'),
      dataIndex: 'background.image_path',
      slotName: 'BackgroundImagePath',
      ellipsis: true,
      tooltip: true,
      width: 150,
    },
    {
      title: t('model.created_at'),
      dataIndex: 'created_at',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('model.updated_at'),
      dataIndex: 'updated_at',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('model.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
      fixed: 'right',
      width: 200,
    },
  ]);

  const fetchData = async (
    params: PosterListParams = { page: 1, limit: 20 }
  ) => {
    setLoading(true);
    try {
      params.id = formModel.value.id;
      params.name = formModel.value.name;
      const data = await getPosterList(params);
      renderData.value = data.list;
      pagination.current = params.page || 1;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    window.console.log(formModel.value);
    fetchData({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };
  const onPageChange = (current: number) => {
    fetchData({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
  };

  const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined,
    e: Event
  ) => {
    size.value = val as SizeProps;
  };

  const handleChange = (
    checked: boolean | (string | boolean | number)[],
    column: Column,
    index: number
  ) => {
    if (!checked) {
      cloneColumns.value = showColumns.value.filter(
        (item) => item.dataIndex !== column.dataIndex
      );
    } else {
      cloneColumns.value.splice(index, 0, column);
    }
  };

  const exchangeArray = <T extends Array<any>>(
    array: T,
    beforeIdx: number,
    newIdx: number,
    isDeep = false
  ): T => {
    const newArray = isDeep ? cloneDeep(array) : array;
    if (beforeIdx > -1 && newIdx > -1) {
      // 先替换后面的，然后拿到替换的结果替换前面的
      newArray.splice(
        beforeIdx,
        1,
        newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
      );
    }
    return newArray;
  };

  const popupVisibleChange = (val: boolean) => {
    if (val) {
      nextTick(() => {
        const el = document.getElementById('tableSetting') as HTMLElement;
        const sortable = new Sortable(el, {
          onEnd(e: any) {
            const { oldIndex, newIndex } = e;
            exchangeArray(cloneColumns.value, oldIndex, newIndex);
            exchangeArray(showColumns.value, oldIndex, newIndex);
          },
        });
      });
    }
  };

  watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );
</script>

<script lang="ts">
  export default {
    name: 'PosterList',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px;
  }

  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }

  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }

  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }

  .setting {
    display: flex;
    align-items: center;
    width: 200px;

    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
