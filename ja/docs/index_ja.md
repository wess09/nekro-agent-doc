---
layout: home

hero:
  name: "Nekro Agent"
  text: "次世代インテリジェントハブフレームワーク"
  tagline: 安全、効率的、かつエレガントなインテリジェントインタラクション体験
  actions:
    - theme: brand
      text: クイックスタート
      link: /ja/docs/01_intro/overview
    - theme: alt
      text: ブート
      link: /ja/docs/02_quick_start/quickstart
    - theme: alt
      text: プラグイン開発
      link: /ja/docs/04_plugin_dev/00_introduction
    - theme: alt
      text: GitHub
      link: https://github.com/KroMiose/nekro-agent
      icon: github
  image:
    src: "/nekro_agent_logo_new.webp"
    alt: NekroAgent ロゴ
features:
  - title: 多人数インタラクション
    details: 多人数のグループチャットインタラクションをネイティブサポートし、複雑なグループチャットシナリオの要件を正確に理解します。
    icon: 
      light: /feature-icons/chat.webp
      dark: /feature-icons/chat_black.webp
      alt: 多人数インタラクション
  - title: プラグインアーキテクチャ
    details: プラグインベースのアーキテクチャ設計により、高度に柔軟なカスタムプラグイン統合が可能。描画、検索、各種外部APIなどを簡単に拡張できます。
    icon: 
      light: /feature-icons/puzzle.webp
      dark: /feature-icons/puzzle_black.webp
      alt: プラグインアーキテクチャ
  - title: サンドボックスシステム
    details: Dockerベースのサンドボックスコード実行環境により、強力で安全な環境相互作用機能を実現します。
    icon: 
      light: /feature-icons/box.webp
      dark: /feature-icons/box_black.webp
      alt: サンドボックスシステム
  - title: すぐに使える
    details: ワンクリックデプロイスクリプト、WebUIパネル、インテリジェントプラグインエディタを提供... 高性能なAIボットを迅速に構築・拡張できます。
    icon: 
      light: /feature-icons/rocket.webp
      dark: /feature-icons/rocket_black.webp
      alt: すぐに使える
---

<script setup>
import { onMounted, onUnmounted } from 'vue'

const lockScroll = () => {
  if (window.innerWidth >= 960) {
    const style = 'overflow: hidden !important; height: 100vh !important;'
    document.documentElement.style.cssText = style
    document.body.style.cssText = style
  } else {
    unlockScroll()
  }
}

const unlockScroll = () => {
  document.documentElement.style.cssText = ''
  document.body.style.cssText = ''
}

onMounted(() => {
  lockScroll()
  window.addEventListener('resize', lockScroll)
})

onUnmounted(() => {
  unlockScroll()
  window.removeEventListener('resize', lockScroll)
})
</script>
<Confetti />
