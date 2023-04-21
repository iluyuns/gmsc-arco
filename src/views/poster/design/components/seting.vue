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
              v-model="background.width"
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
              v-model="background.height"
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
        <a-divider orientation="center">
          {{ t('poster.design.qrcode') }}
        </a-divider>
        <!-- 推广码二维码设置 -->
        <a-form-item :label="t('poster.design.size')">
          <a-col :span="11">
            <a-input-number
              v-model="qrcode.width"
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
              v-model="qrcode.height"
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
            <a-input-number v-model="userId.x" size="mini" hide-button>
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
            <a-input-number v-model="userId.y" size="mini" hide-button>
              <template #prepend>
                <div class="prepend">{{ t('model.y') }}</div>
              </template>
              <!-- <template #append>px</template> -->
            </a-input-number>
          </a-col>
          <a-col :span="24">
            <a-input v-model="userId.prefix" size="mini">
              <template #prepend>
                <div class="prepend">{{ t('poster.design.prefix') }}</div>
              </template>
            </a-input>
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
                :value="props.userIdFontSize"
                size="mini"
                hide-button
                @input="emit('update:userIdFontSize', $event.target.value)"
                @change="eventuserId.fontSize"
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
          <a-form-item :label="t('model.position')">
            <a-col :span="11">
              <a-input-number
                v-model="userId.x"
                size="mini"
                hide-button
                @change="eventuserId.x"
              >
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
              <a-input-number
                v-model="userId.y"
                size="mini"
                hide-button
                @change="eventuserId.y"
              >
                <template #prepend>
                  <div class="prepend">{{ t('model.y') }}</div>
                </template>
                <!-- <template #append>px</template> -->
              </a-input-number>
            </a-col>
          </a-form-item>
          <a-form-item :label="t('poster.design.prefix')">
            <a-col :span="24">
              <a-input
                v-model="userId.prefix"
                size="mini"
                @change="eventuserId.prefix"
              />
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
    PosterImage,
    PosterText,
    PosterTextColor,
  } from '@/api/poster';
  import { ref, defineEmits, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  const scale = ref(100);

  const fileList = ref([
    {
      uid: '-2',
      name: '20200717-103937.png',
      url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    },
  ]);

  const userId = ref({
    prefix: 'THGB:',
    font_size: 16,
    x: 300,
    y: 1230,
  } as PosterText);

  // 废弃
  const eventuserId = {
    prefix: (v: string) => {
      userId.value.prefix = v;
    },
    fontSize: (v: number) => {
      userId.value.font_size = v;
    },
    x: (v: number) => {
      userId.value.x = v;
    },
    y: (v: number) => {
      userId.value.y = v;
    },
  };

  const background = ref({
    width: 750,
    height: 1333,
    image_path:
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
  } as PosterImage);

  const qrcode = ref({
    image_path: '',
    x: 300,
    y: 1000,
    width: 120,
    height: 120,
  } as PosterImage);

  const { t } = useI18n();

  const form = ref({} as PosterData);

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

  const props = defineProps({
    userIdFontSize: {
      type: Number,
      default: 16,
    },
  });

  const emit = defineEmits<{
    (event: 'change', value: PosterData): void;
    (event: 'bgScale', value: number): void;
    (event: 'submit', value: PosterData): void;
    (event: 'update:userIdFontSize'): void;
  }>();

  // 监听 userId 的变化
  watch(
    userId,
    (newVal) => {
      emit('change', { ...form.value, user_id: newVal });
    },
    { deep: true }
  );
  // 监听 background 的变化
  watch(
    background,
    (newVal) => {
      emit('change', { ...form.value, background: newVal });
    },
    { deep: true }
  );
  // 监听 qrcode 的变化
  watch(
    qrcode,
    (newVal) => {
      emit('change', { ...form.value, mini_program_qr_code: newVal });
    },
    { deep: true }
  );

  const bgScale = (value: any) => {
    emit('bgScale', value);
  };

  const submit = () => {
    emit('submit', { user_id: userId.value });
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
