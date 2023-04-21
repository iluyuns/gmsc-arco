<template>
  <div>
    <a-layout>
      <a-layout-content>
        <div ref="pixiApp"></div>
      </a-layout-content>
      <a-layout-sider :width="400">
        <a-tabs default-active-key="1">
          <a-tab-pane
            key="1"
            :title="$t('poster.design.title')"
            class="a-tab-pane"
          >
            <Seting
              @submit="submit"
              @bg-scale="bgScale"
              @change="SetingChange"
            />
          </a-tab-pane>
        </a-tabs>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
  import * as PIXI from 'pixi.js';
  import { ref, onMounted } from 'vue';
  import { Message } from '@arco-design/web-vue';

  import { getMiniProgramQrCodeByDefault } from '@/api/user';
  import { PosterData } from '@/api/poster';

  import Seting from './components/seting.vue';

  let baseURL = 'http://127.0.0.1';

  if (import.meta.env.VITE_API_BASE_URL) {
    baseURL = import.meta.env.VITE_API_BASE_URL;
  }

  const posterData = ref({
    user_id: {
      prefix: 'THGB:',
      font_color: { R: 255, G: 255, B: 255, A: 255 },
      font_size: 16,
    },
  } as PosterData);

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
  app.stage.addChild(stage);

  // 创建一个拖拽和移动函数
  let dragTarget = null as PIXI.Sprite | null;
  const startPoint = { x: 0, y: 0 } as PIXI.Point;
  function onDragMove(event: PIXI.FederatedPointerEvent) {
    if (dragTarget) {
      dragTarget.x = event.global.x - startPoint.x;
      dragTarget.y = event.global.y - startPoint.y;
    }
  }

  function onDragStart(event: PIXI.FederatedPointerEvent) {
    const target = event.target as PIXI.Sprite;
    target.alpha = 0.5;
    dragTarget = target;
    startPoint.x = event.global.x - target.x;
    startPoint.y = event.global.y - target.y;
    app.stage.on('pointermove', onDragMove);
  }

  function onDragEnd() {
    if (dragTarget) {
      app.stage.off('pointermove', onDragMove);
      dragTarget.alpha = 1;
      dragTarget = null;
    }
  }

  app.stage.interactive = true;
  app.stage.hitArea = app.screen;
  app.stage.on('pointerup', onDragEnd);
  app.stage.on('pointerupoutside', onDragEnd);

  stage.interactive = true;
  stage.cursor = 'pointer';
  stage.on('pointerdown', onDragStart, stage);

  const BG = new PIXI.Graphics();

  stage.addChild(BG);
  let qrCode = new PIXI.Sprite();

  const createQRCode = (url: string) => {
    qrCode = PIXI.Sprite.from(url);
    qrCode.interactive = true;
    qrCode.cursor = 'pointer';
    qrCode.on('pointerdown', onDragStart, qrCode);
    qrCode.on('pointerup', onDragEnd);
    qrCode.on('pointerupoutside', onDragEnd);
    qrCode.x = 0;
    qrCode.y = 0;
    qrCode.width = 100;
    qrCode.height = 100;
    stage.addChild(qrCode);
  };

  // 获取小程序二维码默认
  getMiniProgramQrCodeByDefault().then((res) => {
    createQRCode(res.data);
  });

  // 加载字体
  const fontTtf = `${baseURL}/v1/poster/font/FZLTXHK.TTF`;
  PIXI.Assets.addBundle('fonts', {
    FZLTXHK: fontTtf,
  });

  let userIdText = new PIXI.Text('00000002');
  // 插入轻创码 Text 文本 默认 2
  const qccode = '00000002';
  PIXI.Assets.loadBundle('fonts')
    .then(() => {
      userIdText = new PIXI.Text(
        (posterData.value.user_id ? posterData.value.user_id.prefix : '') +
          qccode,
        new PIXI.TextStyle({
          fontFamily: 'FZLTXHK',
          fontSize: 16,
          fill: 0xffffff,
          align: 'left',
        })
      );
      userIdText.x = posterData.value.user_id?.x || 0;
      userIdText.y = posterData.value.user_id?.y || 0;
      userIdText.interactive = true;
      userIdText.cursor = 'pointer';
      userIdText.on('pointerdown', onDragStart, stage);
      stage.addChild(userIdText);
    })
    .catch((err) => {
      Message.error(err);
    });

  const setStageWH = (w: number, h: number) => {
    stage.width = w / 2;
    stage.height = h / 2;

    // 设置中心点
    stage.pivot.set(stage.width / 2, stage.height / 2);

    BG.beginFill(0xe6e6e6);
    BG.drawRect(0, 0, w / 2, h / 2);
    BG.endFill();
    stage.x = app.renderer.width / 2 - stage.width / 2;
    stage.y = app.renderer.height / 2 - stage.height / 2;
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

  // 背景缩放
  const bgScale = (scale: number) => {
    stage.scale.set(scale / 100, scale / 100);
  };

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    resize();
  });

  const SetingChange = (data: PosterData) => {
    window.console.log(data);
  };
  const submit = (data: PosterData) => {
    window.console.log(data);
  };

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
    app.renderer.resize((width || 800) - 400, height || 600);
    pixiApp.value?.appendChild(view);
    setStageWH(stageWH.value.width, stageWH.value.height);
  });
</script>

<style scoped>
  .a-tab-pane {
    padding: 0;
  }
</style>
