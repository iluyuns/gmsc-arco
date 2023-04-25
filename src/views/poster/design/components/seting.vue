<template>
  <div style="padding: 16px">
    <a-form :model="form" size="mini" :style="{ width: '100%' }">
      <a-row :gutter="24" style="padding: 0">
        <a-form-item :label="t('model.page') + t('model.scale')">
          <a-col :span="24">
            <a-slider v-model="scale" :min="10" :max="300" @change="bgScale" />
          </a-col>
        </a-form-item>
        <a-divider />
        <a-form-item :label="t('model.name')">
          <a-col :span="24">
            <a-input
              v-model="form.name"
              size="mini"
              :placeholder="t('poster.design.name.placeholder')"
            >
            </a-input>
          </a-col>
        </a-form-item>
        <!-- dpi -->
        <a-form-item :label="t('poster.design.dpi')">
          <a-col :span="24">
            <a-input-number
              v-model="form.dpi"
              size="mini"
              :placeholder="t('poster.design.dpi.placeholder')"
            >
            </a-input-number>
          </a-col>
        </a-form-item>
        <!-- 背景 -->
        <a-form-item :label="t('poster.design.background.size')">
          <a-col :span="11">
            <a-input-number
              v-model="form.background.width"
              size="mini"
              :placeholder="t('poster.design.background.width.placeholder')"
              hide-button
            >
              <template #prepend>
                <div class="prepend">{{ t('model.width') }}</div>
              </template>
              <!-- <template #append>px</template> -->
            </a-input-number>
          </a-col>
          <a-col :span="2">
            <a-divider direction="vertical" />
          </a-col>
          <a-col :span="11">
            <a-input-number
              v-model="form.background.height"
              size="mini"
              :placeholder="t('poster.design.background.height.placeholder')"
              hide-button
            >
              <template #prepend>
                <div class="prepend">{{ t('model.height') }}</div>
              </template>
              <!-- <template #append>px</template> -->
            </a-input-number>
          </a-col>
        </a-form-item>
        <!-- 背景图片 -->
        <a-form-item :label="t('poster.design.background.image')">
          <a-col :span="24">
            <a-upload
              list-type="picture"
              action="/v1/file/upload/one"
              :limit="1"
              image-preview
              :data="{ use: '海报模板', name: form.name || '海报模板' }"
              :file-list="fileList"
              style="display: unset; width: 100%"
              :custom-request="customRequest"
            >
              <template #upload-button>
                <a-button
                  type="dashed"
                  size="mini"
                  style="justify-content: unset; width: 100%"
                >
                  {{ t('poster.design.background.upload') }}
                </a-button>
              </template>
            </a-upload>
          </a-col>
        </a-form-item>
        <a-divider orientation="center">
          {{ t('poster.design.qrcode') }}
        </a-divider>
        <!-- 推广码二维码设置 -->
        <a-form-item :label="t('poster.design.size')">
          <a-col :span="11">
            <a-input-number
              v-model="form.mini_program_qr_code.width"
              size="mini"
              :placeholder="t('poster.design.background.width.placeholder')"
              hide-button
            >
              <template #prepend>
                <div class="prepend">{{ t('model.width') }}</div>
              </template>
            </a-input-number>
          </a-col>
          <a-col :span="2">
            <a-divider direction="vertical" />
          </a-col>
          <a-col :span="11">
            <a-input-number
              v-model="form.mini_program_qr_code.height"
              size="mini"
              :placeholder="t('poster.design.background.height.placeholder')"
              hide-button
            >
              <template #prepend>
                <div class="prepend">{{ t('model.height') }}</div>
              </template>
            </a-input-number>
          </a-col>
        </a-form-item>
        <a-form-item :label="t('model.position')">
          <a-col :span="11">
            <a-input-number
              v-model="form.mini_program_qr_code.x"
              size="mini"
              hide-button
            >
              <template #prepend>
                <div class="prepend">{{ t('model.x') }}</div>
              </template>
            </a-input-number>
          </a-col>
          <a-col :span="2">
            <a-divider direction="vertical" />
          </a-col>
          <a-col :span="11">
            <a-input-number
              v-model="form.mini_program_qr_code.y"
              size="mini"
              hide-button
            >
              <template #prepend>
                <div class="prepend">{{ t('model.y') }}</div>
              </template>
              <!-- <template #append>px</template> -->
            </a-input-number>
          </a-col>
        </a-form-item>
        <a-divider orientation="center">
          {{ t('poster.design.user_id') }}
        </a-divider>
        <!-- 是否展示轻创码 -->
        <a-form-item :label="t('poster.design.is_user_id')">
          <a-col :span="24"><a-switch v-model="form.is_user_id" /></a-col>
        </a-form-item>
        <template v-if="form.is_user_id">
          <a-form-item :label="t('poster.text.font')">
            <a-col :span="11">
              <a-input-number
                v-model="form.user_id.font_size"
                size="mini"
                hide-button
              >
                <template #prepend>
                  <div class="prepend">{{ t('poster.text.font.size') }}</div>
                </template>
                <template #append>px</template>
              </a-input-number>
            </a-col>
            <a-col :span="2">
              <a-divider direction="vertical" />
            </a-col>
            <a-col :span="11">
              <span
                class="arco-input-outer arco-input-outer-size-mini arco-input-outer-has-suffix arco-input-number arco-input-number-mode-embed arco-input-number-size-mini"
              >
                <span class="arco-input-prepend">
                  <div class="prepend">{{ t('poster.text.font.color') }}</div>
                </span>
                <span class="arco-input-wrapper">
                  <input
                    v-model="form.user_id.color"
                    size="mini"
                    type="color"
                    class="arco-input arco-input-size-mini"
                    style="height: 22px"
                    @change="onColorChange"
                  />
                </span>
              </span>
            </a-col>
          </a-form-item>
          <a-form-item :label="t('model.position')">
            <a-col :span="11">
              <a-input-number v-model="form.user_id.x" size="mini" hide-button>
                <template #prepend>
                  <div class="prepend">{{ t('model.x') }}</div>
                </template>
                <!-- <template #append>px</template> -->
              </a-input-number>
            </a-col>
            <a-col :span="2">
              <a-divider direction="vertical" />
            </a-col>
            <a-col :span="11">
              <a-input-number v-model="form.user_id.y" ize="mini" hide-button>
                <template #prepend>
                  <div class="prepend">{{ t('model.y') }}</div>
                </template>
                <!-- <template #append>px</template> -->
              </a-input-number>
            </a-col>
          </a-form-item>
          <a-form-item :label="t('poster.design.prefix')">
            <a-col :span="24">
              <a-input v-model="form.user_id.prefix" size="mini" />
            </a-col>
          </a-form-item>
        </template>
        <a-button type="primary" style="width: 100%" @click="submit">
          {{ t('poster.design.submit') }}
        </a-button>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  // 𠮷𠮶
  import {
    PosterData,
    // PosterImage,
    // PosterText,
    PosterTextColor,
  } from '@/api/poster';
  import { FileResponse, UploadOneFile } from '@/api/file';
  import { ref, defineEmits, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { FileItem, FileStatus } from '@arco-design/web-vue/es/upload';
  // import { getToken } from '@/utils/auth';

  // const authToken = `Bearer ${getToken()}`;

  // const headers = ref({
  //   Authorization: authToken,
  // } as Record<string, string>);

  const scale = ref(100);

  const fileList = ref([] as FileItem[]);

  const { t } = useI18n();

  const props = defineProps<{
    value: PosterData;
  }>();

  const done = 'done' as FileStatus;
  // const init = 'init' as FileStatus;
  const uploading = 'uploading' as FileStatus;
  const error = 'error' as FileStatus;

  const form = ref(props.value as PosterData);

  // 监听 props.value 的变化
  watch(
    () => props.value,
    (val) => {
      form.value = val;
    },
    {
      deep: true,
    }
  );

  const customRequest = (option: any) => {
    const { fileItem } = option;
    const uid = new Date().getTime();
    fileList.value.push({
      uid: uid as any,
      status: uploading,
      file: fileItem.file,
    });
    UploadOneFile(fileItem.file, {
      use: 'poster',
    })
      .then((r) => {
        // 成功
        const { data } = r as FileResponse;
        fileList.value = [];
        fileList.value.push({
          uid: uid as any,
          name: data.name,
          url: data.cdn_url,
          status: done,
          file: fileItem.file,
          response: r,
        });
        form.value.background.image_path = data.cdn_url;
      })
      .catch((r) => {
        // 失败
        fileList.value = [];
        fileList.value.push({
          uid: uid as any,
          status: error,
          file: fileItem.file,
          response: r,
        });
      });
    return {
      abort() {
        window.console.log('upload progress is aborted.');
      },
    };
  };

  window.console.log(`props.value:`, props.value);

  const rgba = ref({} as PosterTextColor);

  // 色彩变更
  const onColorChange = (e: any) => {
    let color = e.target.value as string;
    if (color.length === 7) {
      color += 'ff';
    } else {
      color = '#000000ff';
    }
    color += 'ff';
    rgba.value.R = parseInt(color.slice(1, 3), 16);
    rgba.value.G = parseInt(color.slice(3, 5), 16);
    rgba.value.B = parseInt(color.slice(5, 7), 16);
    rgba.value.A = parseInt(color.slice(7, 9), 16);
    form.value.user_id.font_color = rgba.value;
  };

  const emit = defineEmits<{
    (event: 'bgScale', value: number): void;
    (event: 'submit', value: PosterData): void;
    (event: 'input', value: PosterData): void;
  }>();

  // 监听 userId 的变化
  watch(
    form,
    (newVal) => {
      form.value = newVal;
      emit('input', form.value);
    },
    { deep: true }
  );

  const bgScale = (value: any) => {
    emit('bgScale', value);
  };

  const submit = () => {
    emit('submit', form.value);
  };
</script>

<style>
  .a-form-item {
    font-size: 8px;
  }

  .prepend {
    width: 24px;
  }
</style>
