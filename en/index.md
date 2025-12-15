---
layout: home

hero:
  name: "Nekro Agent"
  text: "Next-Gen Intelligent Hub Framework"
  tagline: Safe, Efficient, and Elegant Intelligent Interaction Experience
  actions:
    - theme: brand
      text: Quick Start
      link: /en/docs/01_intro/overview
    - theme: alt
      text: Get Started
      link: /en/docs/02_quick_start/quickstart
    - theme: alt
      text: Plugin Dev
      link: /en/docs/04_plugin_dev/00_introduction
    - theme: alt
      text: GitHub
      link: https://github.com/KroMiose/nekro-agent
      icon: github
  image:
    src: "/nekro_agent_logo_new.webp"
    alt: NekroAgent Logo
features:
  - title: Multi-User Interaction
    details: Native support for multi-person group chat interactions, accurately understanding complex group chat scenario requirements.
    icon: 
      light: /feature-icons/chat.webp
      dark: /feature-icons/chat_black.webp
      alt: Multi-User Interaction
  - title: Plugin Architecture
    details: Plugin-based architecture design, highly flexible custom plugin integration. Easily extend drawing, search, various external APIs, and more.
    icon: 
      light: /feature-icons/puzzle.webp
      dark: /feature-icons/puzzle_black.webp
      alt: Plugin Architecture
  - title: Sandbox System
    details: Docker-based sandbox code execution environment, achieving powerful and secure environment interaction capabilities.
    icon: 
      light: /feature-icons/box.webp
      dark: /feature-icons/box_black.webp
      alt: Sandbox System
  - title: Out of the Box
    details: Provides one-click deployment scripts, WebUI panels, intelligent plugin editors... Quickly build and extend high-performance AI bots.
    icon: 
      light: /feature-icons/rocket.webp
      dark: /feature-icons/rocket_black.webp
      alt: Out of the Box
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
