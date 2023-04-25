<template>
  <a-image
    width="100%"
    :src="src"
    :preview-props="previewPropsPopupContainer"
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { previewPoster } from '@/api/poster';

  const route = useRoute();

  const previewPropsPopupContainer = ref({
    popupContainer: '#image-demo-preview-popup-container',
    closable: false,
  }) as any;

  const src = ref(''); // 图片地址

  const id = ref(0); // 海报id
  if (route.params.id) {
    id.value = parseInt(route.params.id as string, 10);
  }
  previewPoster(id.value).then((res) => {
    src.value = res.data.cdn_url;
  });
</script>

<script lang="ts">
  export default {
    name: 'PosterPreview',
  };
</script>
