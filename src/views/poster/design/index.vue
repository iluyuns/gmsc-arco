<template>
  <div id="pixi_app"></div>
</template>

<script lang="ts" setup>
  import * as PIXI from 'pixi.js';
  // 获取id为pixi_app的dom元素
  const pixiApp = document.getElementById('pixi_app');
  // 创建pixi应用
  const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
  });
  // 创建一个纹理
  const view = app.view as HTMLCanvasElement;
  pixiApp?.appendChild(view);
</script>
