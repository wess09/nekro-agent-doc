import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nekro Agent 文档站",
  description: "更智能、更优雅的代理执行 AI",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://img.picui.cn/free/2025/03/10/67ce9955d9600.png",
      },
    ],
    [
      "meta",
      {
        name: "keywords",
        content:
          "NekroAgent AI,NekroAgent,nekroagent,nekro agent,Neko,neko,agent,Agent,Nekro,nekro-agent,AI 代理系统,智能自动化工具,AI 助手,自主智能代理,AI任务执行,机器学习代理,AI 任务管理,自动化AI解决方案,AI 智能决策,文档站搭建,文档管理系统,静态文档站,VitePress 文档,文档网站优化,Markdown 文档站,API文档管理,技术文档站,开发者文档",
      },
    ],
    [
      "meta",
      {
        name: "description",
        content: "Nekro Cloud 文档站 | Nekro Agent 更智能、更优雅的代理执行",
      },
    ],
    ["meta", { name: "robots", content: "all" }],
    ["meta", { name: "revisit-after", content: "1 days" }],
    [
      "meta",
      { name: "msvalidate.01", content: "D97C6AD736A2167C559A3848690C857E" },
    ],
    [
      "meta",
      {
        name: "google-site-verification",
        content: "4UhKgVLa3cPvgaPx-lyNnzdg6XVEAGIC4gueoQ81gF4",
      },
    ],
  ],

  sitemap: {
    hostname: "https://doc.nekro.ai",
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      {
        text: "贡献文档",
        link: "https://github.com/KroMiose/nekro-agent-doc/issues/new/choose",
      },
      { text: "加入社群", link: "https://qm.qq.com/q/eT30LxDcSA" },
    ],

    sidebar: {
      "/docs/": [
        {
          text: "快速了解",
          collapsed: true,
          items: [{ text: "概览", link: "/docs/intro/overview" }],
        },
        {
          text: "快速开始",
          collapsed: true,
          items: [
            { text: "快速开始", link: "/docs/guide/quickstart" },
            {
              text: "快速部署",
              collapsed: true,
              items: [
                { text: "Linux 部署教程", link: "/docs/guide/deploy/linux" },
                {
                  text: "Windows 部署教程",
                  link: "/docs/guide/deploy/windows",
                },
                { text: "MacOS 部署教程", link: "/docs/guide/deploy/macos" },
              ],
            },
            {
              text: "基本配置",
              collapsed: true,
              items: [
                { text: "协议端配置", link: "/docs/guide/config/protocol" },
                { text: "系统配置", link: "/docs/guide/config/system" },
                { text: "应用更新", link: "/docs/guide/config/update" },
              ],
            },
          ],
        },
        {
          text: "进阶指南",
          collapsed: true,
          items: [
            { text: "模型组配置", link: "/docs/advanced/model-config" },
            { text: "人设技巧", link: "/docs/advanced/persona-tips" },
            { text: "会话独立人设", link: "/docs/advanced/session-persona" },
            { text: "用户管理", link: "/docs/advanced/user-management" },
            { text: "插件用例", link: "/docs/advanced/plugin-usage" },
            { text: "插件生成器", link: "/docs/advanced/plugin-generator" },
          ],
        },
        {
          text: "插件开发",
          collapsed: true,
          items: [
            {
              text: "基本概念",
              collapsed: true,
              items: [
                {
                  text: "通信架构",
                  link: "/docs/plugin-dev/concepts/architecture",
                },
                {
                  text: "响应周期",
                  link: "/docs/plugin-dev/concepts/lifecycle",
                },
                {
                  text: "沙盒方法",
                  link: "/docs/plugin-dev/concepts/sandbox-methods",
                },
                {
                  text: "插件类型",
                  link: "/docs/plugin-dev/concepts/plugin-types",
                },
              ],
            },
            {
              text: "事件回调",
              collapsed: true,
              items: [
                { text: "初始化", link: "/docs/plugin-dev/events/init" },
                {
                  text: "提示词注入",
                  link: "/docs/plugin-dev/events/prompt-injection",
                },
                {
                  text: "沙盒方法",
                  link: "/docs/plugin-dev/events/sandbox-methods",
                },
                { text: "清理环境", link: "/docs/plugin-dev/events/cleanup" },
              ],
            },
            {
              text: "最佳实践",
              collapsed: true,
              items: [
                {
                  text: "插件共享市场",
                  link: "/docs/plugin-dev/best-practices/marketplace",
                },
                {
                  text: "文件交互",
                  link: "/docs/plugin-dev/best-practices/file-interaction",
                },
                {
                  text: "提示词工程",
                  link: "/docs/plugin-dev/best-practices/prompt-engineering",
                },
              ],
            },
            { text: "系统 API", link: "/docs/plugin-dev/system-api" },
          ],
        },
        {
          text: "故障排除",
          collapsed: true,
          items: [
            {
              text: "常见错误与处理",
              link: "/docs/troubleshooting/common-errors",
            },
            { text: "常见问题解答", link: "/docs/troubleshooting/faq" },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/KroMiose/nekro-agent" },
    ],
  },
});
