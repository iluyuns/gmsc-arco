<template>
  <div>
    <a-layout>
      <a-layout-content> <div ref="pixiApp"></div> </a-layout-content>
      <a-layout-sider :width="360">
        <a-tabs default-active-key="1">
          <a-tab-pane
            key="1"
            :title="$t('poster.design.title')"
            class="a-tab-pane"
          >
            <Seting />
          </a-tab-pane>
        </a-tabs>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import * as PIXI from 'pixi.js';
  import { ref, onMounted } from 'vue';
  import Seting from './components/seting.vue';

  // 导入组件

  // 获取id为pixi_app的dom元素
  const pixiApp = ref(null as HTMLElement | null);
  // 创建pixi应用
  const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x2c2c2c,
  });
  const stageWH = ref({ width: 750, height: 1300 });
  // 获取canvas元素
  const view = app.view as HTMLCanvasElement;
  // 创建一个海报容器和背景
  const stage = new PIXI.Container();
  const BG = new PIXI.Graphics();
  stage.addChild(BG);
  app.stage.addChild(stage);

  const setStageWH = (w: number, h: number) => {
    stage.width = w / 2;
    stage.height = h / 2;
    BG.beginFill(0xe6e6e6);
    BG.drawRect(0, 0, w / 2, h / 2);
    BG.endFill();
    // 自动剧中 stage
    stage.x = (app.renderer.width - stage.width) / 2;
    stage.y = (app.renderer.height - stage.height) / 2;
  };
  // 设置海报默认的宽高
  const footerHeight = () => {
    const footer = document.querySelector('.footer');
    if (footer) {
      return footer.clientHeight;
    }
    return 0;
  };
  const headerHeight = () => {
    const header = document.querySelector('.layout-navbar');
    if (header) {
      return header.clientHeight;
    }
    return 0;
  };

  const resize = () => {
    const width = pixiApp.value?.clientWidth;
    const height = window.innerHeight - headerHeight() - footerHeight();
    app.renderer.resize(width || 1200, height || 900);
    setStageWH(stageWH.value.width, stageWH.value.height);
  };

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    resize();
  });

  onMounted(() => {
    interface windowSelf extends Window {
      pixi: any;
      pixiApp: any;
    }
    const self = window as unknown as windowSelf;
    self.pixi = pixiApp.value as any;
    self.pixiApp = app as any;
    const width = pixiApp.value?.clientWidth;
    const height = window.innerHeight - 60 - 40;
    app.renderer.resize((width || 800) - 300, height || 600);
    setStageWH(stageWH.value.width, stageWH.value.height);
    pixiApp.value?.appendChild(view);
  });
</script>

<style scoped>
  .a-tab-pane {
    padding: 0;
  }
</style>
