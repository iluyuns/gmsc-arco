<template>
  <div>
    <a-layout>
      <a-layout-content>
        <div ref="pixiApp"></div>
      </a-layout-content>
      <a-layout-sider :width="400">
        <a-tabs>
          <a-tab-pane
            key="1"
            :title="$t('poster.design.title')"
            class="a-tab-pane"
          >
            <Seting
              :value="posterData"
              @submit="submit"
              @bg-scale="bgScale"
              @input="changePosterData"
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

  // 灰色背景图地址
  const grayBackground =
    'https://w.s3.iuu.pub/static/upload/2023/4/1682233168-3675-7394.png';

  const posterData = ref({
    name: '',
    dpi: 96,
    grade_value: 0,
    is_user_id: false,
    user_id: {
      prefix: 'THGB:',
      font_size: 16,
      color: '#ffffff',
      x: 300,
      y: 200,
    },
    is_nick_name: false,
    nick_name: {},
    is_avatar: false,
    avatar: {},
    background: {
      width: 750,
      height: 1333,
      image_path: grayBackground,
    },
    mini_program_qr_code: {
      image_path: '',
      x: 300,
      y: 1000,
      width: 120,
      height: 120,
    },
  } as PosterData);

  // 获取id为pixi_app的dom元素
  const pixiApp = ref(null as HTMLElement | null);
  // 创建pixi应用
  const app = ref(
    new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x2c2c2c,
    })
  );

  // 获取canvas元素
  const view = app.value.view as HTMLCanvasElement;
  // 创建一个海报容器和背景
  const stage = ref(new PIXI.Container());

  // 创建一个拖拽和移动函数
  app.value.stage.addChild(stage.value as PIXI.Container);
  // 背景缩放比例
  const scale = ref(50);
  // 创建一个拖拽和移动函数
  let dragTarget = null as any;
  const startPoint = { x: 0, y: 0 } as PIXI.Point;
  function onDragMove(event: PIXI.FederatedPointerEvent) {
    if (dragTarget) {
      const sv = scale.value / 100;
      if (dragTarget.s_key === 'stage') {
        dragTarget.x = event.global.x - startPoint.x;
        dragTarget.y = event.global.y - startPoint.y;
        posterData.value.background.width = dragTarget.width / sv;
        posterData.value.background.height = dragTarget.height / sv;
      } else {
        dragTarget.x = (event.global.x - startPoint.x) / sv;
        dragTarget.y = (event.global.y - startPoint.y) / sv;
        if (dragTarget.s_key === 'miniProgramQrCode') {
          posterData.value.mini_program_qr_code.x = dragTarget.x;
          posterData.value.mini_program_qr_code.y = dragTarget.y;
          posterData.value.mini_program_qr_code.width = dragTarget.width;
          posterData.value.mini_program_qr_code.height = dragTarget.height;
        } else if (dragTarget.s_key === 'avatar') {
          posterData.value.avatar.x = dragTarget.x;
          posterData.value.avatar.y = dragTarget.y;
          posterData.value.avatar.width = dragTarget.width;
          posterData.value.avatar.height = dragTarget.height;
        } else if (dragTarget.s_key === 'nickName') {
          posterData.value.nick_name.x = dragTarget.x;
          posterData.value.nick_name.y = dragTarget.y;
        } else if (dragTarget.s_key === 'userId') {
          posterData.value.user_id.x = dragTarget.x;
          posterData.value.user_id.y = dragTarget.y;
        }
      }
    }
  }

  function onDragStart(event: PIXI.FederatedPointerEvent) {
    window.console.log(event.target);
    const target = event.target as PIXI.Sprite | PIXI.Text;
    target.alpha = 0.5;
    dragTarget = target;
    if ((target as any).s_key === 'stage') {
      startPoint.x = event.global.x - target.x;
      startPoint.y = event.global.y - target.y;
    } else {
      startPoint.x = event.global.x - target.x * (scale.value / 100);
      startPoint.y = event.global.y - target.y * (scale.value / 100);
    }
    app.value.stage.on('pointermove', onDragMove);
  }

  function onDragEnd() {
    if (dragTarget) {
      app.value.stage.off('pointermove', onDragMove);
      dragTarget.alpha = 1;
      dragTarget = null;
    }
  }

  app.value.stage.interactive = true;
  app.value.stage.hitArea = app.value.screen;
  app.value.stage.on('pointerup', onDragEnd);
  app.value.stage.on('pointerupoutside', onDragEnd);

  stage.value.interactive = true;
  stage.value.cursor = 'pointer';
  (stage.value as any).s_key = 'stage';
  stage.value.on('pointerdown', onDragStart);

  const background = ref(
    PIXI.Sprite.from(posterData.value.background.image_path || grayBackground)
  );
  stage.value.addChild(background.value as PIXI.Sprite);

  const miniProgramQrCode = ref(new PIXI.Sprite());

  const createQRCode = () => {
    miniProgramQrCode.value = PIXI.Sprite.from(
      posterData.value.mini_program_qr_code.image_path as string
    );
    miniProgramQrCode.value.interactive = true;
    miniProgramQrCode.value.cursor = 'pointer';
    (miniProgramQrCode.value as any).s_key = 'miniProgramQrCode';
    miniProgramQrCode.value.on('pointerdown', onDragStart);
    miniProgramQrCode.value.on('pointerup', onDragEnd);
    miniProgramQrCode.value.on('pointerupoutside', onDragEnd);
    miniProgramQrCode.value.x = 0;
    miniProgramQrCode.value.y = 0;
    miniProgramQrCode.value.width = 100;
    miniProgramQrCode.value.height = 100;
    stage.value.addChild(miniProgramQrCode.value as PIXI.Sprite);
  };

  // 获取小程序二维码默认
  getMiniProgramQrCodeByDefault().then((res) => {
    posterData.value.mini_program_qr_code.image_path = res.data as string;
    createQRCode();
  });

  // 加载字体
  const fontTtf = `${baseURL}/v1/poster/font/FZLTXHK.TTF`;
  PIXI.Assets.addBundle('fonts', {
    FZLTXHK: fontTtf,
  });

  // 用户id
  const userId = ref(new PIXI.Text('00000002'));
  // 插入轻创码 Text 文本 默认 2
  const qccode = '00000002';
  PIXI.Assets.loadBundle('fonts')
    .then(() => {
      userId.value = new PIXI.Text(
        (posterData.value.user_id ? posterData.value.user_id.prefix : '') +
          qccode,
        new PIXI.TextStyle({
          fontFamily: 'FZLTXHK',
          fontSize: 16,
          fill: 0xffffff,
          align: 'left',
        })
      );
      userId.value.x = posterData.value.user_id?.x || 0;
      userId.value.y = posterData.value.user_id?.y || 0;
      userId.value.interactive = true;
      if (posterData.value.is_user_id) {
        userId.value.visible = true;
      } else {
        userId.value.visible = false;
      }
      userId.value.cursor = 'pointer';
      (userId.value as any).s_key = 'userId';
      userId.value.on('pointerdown', onDragStart);
      stage.value.addChild(userId.value as PIXI.Text);
    })
    .catch((err) => {
      Message.error(err);
    });
  // 背景缩放
  const bgScale = (value: number) => {
    scale.value = value || 50;
    stage.value.scale.set(scale.value / 100, scale.value / 100);
  };

  const setStageWH = (w: number, h: number) => {
    stage.value.width = w;
    stage.value.height = h;
    // 设置中心点
    stage.value.pivot.set(stage.value.width / 2, stage.value.height / 2);
    // 设置缩放比例
    bgScale(scale.value);
    stage.value.x = app.value.renderer.width / 2;
    stage.value.y = app.value.renderer.height / 2;
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
    app.value.renderer.resize(width || 1200, height || 900);
    setStageWH(
      posterData.value.background.width || 750,
      posterData.value.background.height || 1334
    );
  };

  const changePosterData = (data: any) => {
    posterData.value = data;

    // 背景部分
    if (posterData.value.background.image_path) {
      background.value.texture = PIXI.Texture.from(
        posterData.value.background.image_path
      );
    }
    if (
      background.value.width !== posterData.value.background.width ||
      background.value.height !== posterData.value.background.height
    ) {
      background.value.width = posterData.value.background.width || 750;
      background.value.height = posterData.value.background.height || 1334;
      setStageWH(
        posterData.value.background.width || 750,
        posterData.value.background.height || 1334
      );
    }

    // 用户id
    if (posterData.value.is_user_id) {
      userId.value.visible = true;
    } else {
      userId.value.visible = false;
    }
    userId.value.x = posterData.value.user_id?.x || 0;
    userId.value.y = posterData.value.user_id?.y || 0;
    // 字体颜色
    userId.value.style.fill = posterData.value.user_id?.color || 0xffffff;
    // 字体大小
    userId.value.style.fontSize = posterData.value.user_id?.font_size || 16;
    // 文字改变
    userId.value.text =
      (posterData.value.user_id ? posterData.value.user_id.prefix : '') +
      qccode;

    // 小程序二维码
    miniProgramQrCode.value.x = posterData.value.mini_program_qr_code.x || 0;
    miniProgramQrCode.value.y = posterData.value.mini_program_qr_code.y || 0;
    miniProgramQrCode.value.width =
      posterData.value.mini_program_qr_code.width || 100;
    miniProgramQrCode.value.height =
      posterData.value.mini_program_qr_code.height || 100;
  };

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    resize();
  });

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
    app.value.renderer.resize((width || 800) - 400, height || 600);
    pixiApp.value?.appendChild(view);
    setStageWH(
      posterData.value.background.width || 750,
      posterData.value.background.height || 1334
    );
  });
</script>

<style scoped>
  .a-tab-pane {
    padding: 0;
  }
</style>
