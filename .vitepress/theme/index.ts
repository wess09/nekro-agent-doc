import { h, onMounted } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './css/base/colors.css'
import './css/layout/hero.css'
import './css/components/animation.css'
import './css/components/button.css'
import './css/components/feature.css'
import './css/components/search.css'
import './css/layout/blur.css'
import './css/base/overrides.css'
import { inBrowser } from "vitepress"
import Confetti from "./components/vue/Confetti.vue"
import MyLayout from './components/vue/switch.vue'
import LayoutComponent from './components/vue/layout.vue'
import { init3DTiltEffect } from './components/js/feature.js'
import { showCookieNotice } from './components/js/notice.js'
import { setupIEDetection } from './components/js/ie-detector.js'

export default {
  extends: DefaultTheme,

  Layout: () => {
    return h(MyLayout)
  },

  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component("Confetti", Confetti)
    app.component("MyLayout", MyLayout)

    // 仅在浏览器环境下执行
    if (inBrowser) {
      // 初始化函数
      const initEffects = () => {
        // 初始化3D倾斜效果（延迟执行以确保DOM已渲染）
        setTimeout(() => {
          init3DTiltEffect();
        }, 100);
      };

      // 首次加载时初始化
      router.onAfterRouteChanged = () => {
        initEffects();
        showCookieNotice(); // 路由切换时更新 Cookie 提示语言
      };
    }
  },

  setup() {
    onMounted(() => {
      if (inBrowser) {
        // 在页面挂载后调用Cookie提醒函数
        showCookieNotice();

        // 初始化3D倾斜效果
        setTimeout(() => {
          init3DTiltEffect();
        }, 100);
      }
    });
  }
} as Theme