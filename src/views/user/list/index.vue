<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.list']" />
    <a-card class="general-card" :title="$t('menu.user.list')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="6">
                <a-form-item
                  field="id"
                  :label="$t('menu.user.list.table.is_easy_business')"
                >
                  <a-switch v-model="formModel.is_easy_business">
                    <template #checked>
                      {{ $t('menu.user.list.table.is_easy_business.true') }}
                    </template>
                    <template #unchecked>
                      {{ $t('menu.user.list.table.is_easy_business.false') }}
                    </template>
                  </a-switch>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="id" :label="$t('menu.user.list.table.id')">
                  <a-input-number
                    v-model="formModel.id"
                    :placeholder="$t('menu.user.list.table.id.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  field="parent_id"
                  :label="$t('menu.user.list.table.parent.id')"
                >
                  <a-input-number
                    v-model="formModel.parent_id"
                    :placeholder="
                      $t('menu.user.list.table.parent.id.placeholder')
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  field="name"
                  :label="$t('menu.user.list.table.name')"
                >
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('menu.user.list.table.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  field="username"
                  :label="$t('menu.user.list.table.username')"
                >
                  <a-input
                    v-model="formModel.username"
                    :placeholder="
                      $t('menu.user.list.table.username.placeholder')
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  field="nick_name"
                  :label="$t('menu.user.list.table.nick_name')"
                >
                  <a-input
                    v-model="formModel.nick_name"
                    :placeholder="
                      $t('menu.user.list.table.nick_name.placeholder')
                    "
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  field="phone"
                  :label="$t('menu.user.list.table.phone')"
                >
                  <a-input
                    v-model="formModel.phone"
                    :placeholder="$t('menu.user.list.table.phone.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  field="createdTime"
                  :label="$t('menu.user.list.table.created_at')"
                >
                  <a-range-picker
                    v-model="formModel.created_at"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col
          :span="24"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('searchTable.operation.download') }}
          </a-button>
          <a-tooltip :content="$t('searchTable.actions.refresh')">
            <div class="action-icon" @click="search"
              ><icon-refresh size="18"
            /></div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('searchTable.actions.density')">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption
                v-for="item in densityList"
                :key="item.value"
                :value="item.value"
                :class="{ active: item.value === size }"
              >
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="$t('searchTable.actions.columnSetting')">
            <a-popover
              trigger="click"
              position="bl"
              @popup-visible-change="popupVisibleChange"
            >
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div
                    v-for="(item, index) in showColumns"
                    :key="item.dataIndex"
                    class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox
                        v-model="item.checked"
                        @change="
                          handleChange($event, item as TableColumnData, index)
                        "
                      >
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === '#' ? '序列号' : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
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
        <template #avatar_url="{ record }">
          <a-space>
            <a-avatar :size="36" shape="square">
              <a-image
                :src="
                  record.avatar_url ||
                  `${apiBaseUrl}/v1/user/generate/avatar/${record.uuid}`
                "
              />
            </a-avatar>
          </a-space>
        </template>
        <!-- parent.avatar_url -->
        <template #parent_avatar_url="{ record }">
          <a-space>
            <a-avatar v-if="record?.parent?.uuid" :size="36" shape="square">
              <a-image
                alt="avatar"
                :src="
                  record?.parent?.avatar_url ||
                  `${apiBaseUrl}/v1/user/generate/avatar/${record?.parent?.uuid}`
                "
              />
            </a-avatar>
          </a-space>
        </template>
        <template #user_roles="{ record }">
          <a-space
            v-for="item in record.user_roles"
            :key="item.value"
            :value="item.name"
          >
            <div style="padding: 0 8px">
              <a-tag color="arcoblue" bordered style="" size="small">
                {{ item.name }}
              </a-tag>
            </div>
          </a-space>
        </template>
        <template #is_easy_business="{ record }">
          <a-tag :color="record.is_easy_business ? 'green' : 'gray'">
            <template #icon>
              <icon-check-circle-fill v-if="record.is_easy_business" />
              <icon-close-circle-fill v-else />
            </template>
            {{
              record.is_easy_business
                ? $t('menu.user.list.table.is_easy_business.true')
                : $t('menu.user.list.table.is_easy_business.false')
            }}
          </a-tag>
        </template>
        <template #operations>
          <a-button v-permission="['admin']" type="text" size="small">
            {{ $t('menu.user.list.table.operations.edit') }}
          </a-button>
          <a-button type="text" size="small">
            {{ $t('menu.user.list.table.operations.edit') }}
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { getUserList, UserListData, UserListParams } from '@/api/user';
  import { Pagination } from '@/types/global';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;
  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const generateFormModel = () => {
    return {
      id: 0,
      name: '',
      username: '',
      nick_name: '',
      phone: '',
      parent_id: 0,
      is_easy_business: false,
      created_at: [],
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<UserListData[]>([]);
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
      title: t('menu.user.list.table.id'),
      dataIndex: 'id',
      slotName: 'id',
      ellipsis: true,
      tooltip: true,
      width: 120,
    },
    {
      title: t('menu.user.list.table.avatar_url'),
      dataIndex: 'avatar_url',
      slotName: 'avatar_url',
      width: 80,
    },
    {
      title: t('menu.user.list.table.nick_name'),
      dataIndex: 'nick_name',
      ellipsis: true,
      tooltip: true,
      width: 120,
    },
    {
      title: t('menu.user.list.table.name'),
      dataIndex: 'name',
      ellipsis: true,
      tooltip: true,
      width: 80,
    },
    {
      title: t('menu.user.list.table.phone'),
      dataIndex: 'phone',
      ellipsis: true,
      tooltip: true,
      width: 150,
    },
    {
      title: t('menu.user.list.table.username'),
      dataIndex: 'username',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('menu.user.list.table.email'),
      dataIndex: 'email',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('menu.user.list.table.is_easy_business'),
      dataIndex: 'is_easy_business',
      slotName: 'is_easy_business',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('menu.user.list.table.parent.id'),
      dataIndex: 'parent.id',
      ellipsis: true,
      tooltip: true,
      width: 120,
    },
    {
      title: t('menu.user.list.table.parent.nick_name'),
      dataIndex: 'parent.nick_name',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('menu.user.list.table.parent.avatar_url'),
      dataIndex: 'parent.avatar_url',
      slotName: 'parent_avatar_url',
      width: 120,
    },
    {
      title: t('menu.user.list.table.point'),
      dataIndex: 'point',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('menu.user.list.table.income_cash'),
      dataIndex: 'income_cash',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('menu.user.list.table.available_balance'),
      dataIndex: 'available_balance',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('menu.user.list.table.grade.name'),
      dataIndex: 'grade.name',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('menu.user.list.table.user_roles'),
      dataIndex: 'user_roles',
      slotName: 'user_roles',
      ellipsis: true,
      tooltip: true,
      width: 260,
    },
    // birthday
    {
      title: t('menu.user.list.table.birthday'),
      dataIndex: 'birthday',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('menu.user.list.table.union_id'),
      dataIndex: 'union_id',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('menu.user.list.table.open_id'),
      dataIndex: 'open_id',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('menu.user.list.table.uuid'),
      dataIndex: 'uuid',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('menu.user.list.table.source'),
      dataIndex: 'source',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('menu.user.list.table.source_desc'),
      dataIndex: 'source_desc',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('menu.user.list.table.created_at'),
      dataIndex: 'created_at',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('menu.user.list.table.updated_at'),
      dataIndex: 'updated_at',
      ellipsis: true,
      tooltip: true,
      width: 160,
    },
    {
      title: t('menu.user.list.table.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
      fixed: 'right',
      width: 200,
    },
  ]);
  const fetchData = async (params: UserListParams = { page: 1, limit: 20 }) => {
    setLoading(true);
    try {
      params.created_at = formModel.value.created_at;
      params.id = formModel.value.id;
      params.is_easy_business = formModel.value.is_easy_business;
      params.name = formModel.value.name;
      params.username = formModel.value.username;
      params.nick_name = formModel.value.nick_name;
      params.phone = formModel.value.phone;
      params.parent_id = formModel.value.parent_id;
      const data = await getUserList(params);
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
    name: 'UserList',
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
