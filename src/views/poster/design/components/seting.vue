<template>
  <div style="padding: 16px">
    <a-form :model="form" size="mini" :style="{ width: '100%' }">
      <a-row :gutter="24" style="padding: 0">
        <!-- name -->
        <a-form-item field="name" :label="t('model.name')">
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
        <a-form-item field="dpi" :label="t('poster.design.dpi')">
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
        <a-form-item :label="t('poster.design.background')">
          <a-col :span="12">
            <a-input-number
              v-model="formBackground.width"
              size="mini"
              :placeholder="t('poster.design.background.width.placeholder')"
            >
              <template #prepend>
                <div class="prepend">{{ t('model.width') }}</div>
              </template>
            </a-input-number>
          </a-col>
          <a-col :span="12">
            <a-input-number
              v-model="formBackground.height"
              size="mini"
              :placeholder="t('poster.design.background.height.placeholder')"
            >
              <template #prepend>
                <div class="prepend">{{ t('model.height') }}</div>
              </template>
            </a-input-number>
          </a-col>
        </a-form-item>
        <!-- 背景图片 -->
        <a-form-item :label="t('poster.design.background.image')">
          <a-col :span="24">
            <a-upload
              list-type="picture"
              action="/"
              :limit="1"
              image-preview
              :default-file-list="fileList"
              style="display: unset; width: 100%"
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

        <a-form-item field="switch" :label="t('poster.is_user_id')">
          <a-col :span="24"><a-switch v-model="form.is_user_id" /></a-col>
        </a-form-item>
        <template v-if="form.is_user_id">
          <a-form-item field="switch" :label="t('poster.text.font')">
            <a-col :span="12">
              <a-input-number v-model="formBackground.width" size="mini">
                <template #prepend>
                  <div class="prepend">{{ t('poster.text.font.size') }}</div>
                </template>
              </a-input-number>
            </a-col>
            <a-col :span="12">
              <span
                class="arco-input-outer arco-input-outer-size-mini arco-input-outer-has-suffix arco-input-number arco-input-number-mode-embed arco-input-number-size-mini"
              >
                <span class="arco-input-prepend">
                  <div class="prepend">{{ t('poster.text.font.color') }}</div>
                </span>
                <span class="arco-input-wrapper">
                  <input
                    v-model="userId.color"
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
          <a-form-item field="switch" :label="t('model.position')">
            <a-col :span="12">
              <a-input-number v-model="formBackground.width" size="mini">
                <template #prepend>
                  <div class="prepend">{{ t('model.x') }}</div>
                </template>
              </a-input-number>
            </a-col>
            <a-col :span="12">
              <a-input-number v-model="formBackground.width" size="mini">
                <template #prepend>
                  <div class="prepend">{{ t('model.y') }}</div>
                </template>
              </a-input-number>
            </a-col>
          </a-form-item>
        </template>
        <a-button type="primary" style="width: 100%">
          {{ t('poster.design.submit') }}
        </a-button>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import {
    PosterData,
    PosterImage,
    PosterText,
    PosterTextColor,
  } from '@/api/poster';
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  const fileList = ref([
    {
      uid: '-2',
      name: '20200717-103937.png',
      url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    },
  ]);

  const { t } = useI18n();

  const form = ref({
    background: {
      width: 750,
      height: 1300,
    },
  } as PosterData);
  const userId = ref({} as PosterText);
  const formBackground = ref({
    width: 750,
    height: 1300,
    image_path:
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
  } as PosterImage);
  const rgba = ref({} as PosterTextColor);

  const onColorChange = (e: any) => {
    let color = e.target.value as string;
    if (color.length === 7) {
      color += 'ff';
    } else {
      color = '#000000ff';
    }
    userId.value.color = color;
    rgba.value.R = parseInt(color.slice(1, 3), 16);
    rgba.value.G = parseInt(color.slice(3, 5), 16);
    rgba.value.B = parseInt(color.slice(5, 7), 16);
    rgba.value.A = parseInt(color.slice(7, 9), 16);
    userId.value.font_color = rgba.value;
    window.console.log(userId.value.font_color);
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
