import { defineConfig } from "vitepress";
import markdownItVideo from "@vrcd-community/markdown-it-video";

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(markdownItVideo, {
        youtube: { width: '100%', height: '387px' },
        bilibili: { width: '100%', height: '387px' }
      });
    }
  },
  title: "Nekro Agent 文档站",
  description: "更智能、更优雅的代理执行 AI",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "nekro_agent_logo.webp",
      },
    ],
    [
      "meta",
      {
        name: "keywords",
        content:
          "NekroAgent AI,NekroAgent,nekroagent,nekro agent,Neko,neko,agent,Agent,Nekro,nekro-agent,AI 代理系统,智能自动化工具,AI 助手,自主智能代理,AI任务执行,机器学习代理,AI 任务管理,自动化AI解决方案,AI 智能决策,大语言模型,LLM,GPT,ChatGPT,自然语言处理,NLP,人工智能,AI,深度学习,神经网络,智能对话,智能客服,智能问答,AI编程,AI开发,智能代理系统,多模态AI,AIGC,生成式AI,智能内容生成,智能写作,AI绘画,AI创作,智能分析,数据挖掘,智能推荐,个性化AI,企业AI解决方案,AI应用开发,AI平台,智能自动化,智能工作流,AI集成,智能API,智能服务,机器学习,ML,深度神经网络,DNN,卷积神经网络,CNN,循环神经网络,RNN,Transformer,BERT,预训练模型,微调,Fine-tuning,提示工程,Prompt Engineering,上下文学习,In-context Learning,强化学习,RL,监督学习,无监督学习,半监督学习,迁移学习,联邦学习,知识图谱,知识表示,推理引擎,认知计算,计算机视觉,CV,图像识别,目标检测,语音识别,ASR,语音合成,TTS,情感分析,意图识别,实体识别,关系抽取,文本分类,文本生成,文本摘要,机器翻译,问答系统,对话系统,智能助手,虚拟助手,数字人,虚拟偶像,智能机器人,聊天机器人,Chatbot,智能客服系统,智能营销,智能销售,智能客服,智能咨询,智能教育,智能医疗,智能金融,智能法律,智能政务,智能制造,智能交通,智能城市,智能家居,智能物联网,IIoT,边缘计算,云计算,量子计算,AI芯片,神经网络处理器,NPU,GPU加速,分布式计算,并行计算,模型压缩,模型量化,模型蒸馏,知识蒸馏,多任务学习,元学习,小样本学习,零样本学习,自监督学习,对比学习,生成对抗网络,GAN,变分自编码器,VAE,扩散模型,Diffusion Model,多模态融合,跨模态学习,视觉语言模型,VLM,图文生成,文生图,图生文,视频生成,音频生成,3D内容生成,数字孪生,元宇宙,Web3,区块链AI,去中心化AI,隐私计算,联邦学习,安全AI,可解释AI,XAI,可信AI,AI伦理,AI治理,AI安全,AI监管,智能合约,智能审计,智能风控,智能投顾,智能理赔,智能核保,智能信贷,智能反欺诈,智能推荐系统,协同过滤,内容推荐,商品推荐,服务推荐,个性化推荐,智能搜索,语义搜索,向量搜索,向量数据库,Embedding,向量索引,近似最近邻,ANN,智能内容审核,智能内容过滤,智能内容分类,智能内容标记,智能内容分发,智能内容管理,智能内容创作,智能内容优化,智能内容运营,智能数据分析,智能数据可视化,智能数据清洗,智能数据标注,智能数据增强,智能数据集成,智能数据治理,智能数据安全,智能数据隐私,智能数据合规,智能数据挖掘,智能数据建模,智能数据预测,智能数据决策,智能数据洞察,智能数据报告,智能数据仪表盘,智能数据监控,智能数据预警,智能数据运维,智能数据平台,智能数据仓库,智能数据湖,智能数据管道,智能数据流,智能数据网格,智能数据架构,智能数据策略,智能数据管理,智能数据服务,智能数据应用,智能数据解决方案,智能数据转型,智能数据创新,智能数据价值,智能数据驱动,智能数据赋能,智能数据生态,智能数据未来,智能数据时代,文档站搭建,文档管理系统,静态文档站,VitePress 文档,文档网站优化,Markdown 文档站,API文档管理,技术文档站,开发者文档,文档自动化,文档生成,文档编排,文档发布,文档版本控制,文档协作,文档评论,文档反馈,文档搜索,文档导航,文档分类,文档标签,文档归档,文档备份,文档恢复,文档安全,文档权限,文档审计,文档分析,文档统计,文档报告,文档仪表盘,文档监控,文档预警,文档运维,文档平台,文档仓库,文档湖,文档管道,文档流,文档网格,文档架构,文档策略,文档管理,文档服务,文档应用,文档解决方案,文档转型,文档创新,文档价值,文档驱动,文档赋能,文档生态,文档未来,文档时代,大型语言模型,语言模型,预训练语言模型,自回归模型,自编码模型,编码器-解码器模型,注意力机制,自注意力,交叉注意力,多头注意力,位置编码,层归一化,残差连接,前馈神经网络,激活函数,ReLU,Sigmoid,Tanh,Softmax,Dropout,批量归一化,权重初始化,优化器,SGD,Adam,RMSprop,学习率,学习率调度,动量,权重衰减,正则化,L1正则化,L2正则化,早停,交叉验证,超参数调优,网格搜索,随机搜索,贝叶斯优化,遗传算法,粒子群优化,模拟退火,集成学习,Bagging,Boosting,Stacking,随机森林,梯度提升树,XGBoost,LightGBM,CatBoost,支持向量机,SVM,决策树,朴素贝叶斯,K近邻,KNN,线性回归,逻辑回归,聚类算法,K-means,DBSCAN,层次聚类,降维算法,PCA,t-SNE,UMAP,异常检测,孤立森林,局部异常因子,One-Class SVM,时间序列分析,ARIMA,Prophet,LSTM,GRU,图神经网络,GNN,图卷积网络,GCN,图注意力网络,GAT,图自编码器,图生成网络,知识蒸馏,模型压缩,量化,剪枝,蒸馏,知识迁移,多任务学习,元学习,小样本学习,零样本学习,自监督学习,对比学习,孪生网络,三元组损失,对比损失,自编码器,变分自编码器,生成对抗网络,WGAN,WGAN-GP,StyleGAN,CycleGAN,PixelGAN,扩散模型,DDPM,IDDPM,Latent Diffusion,Stable Diffusion,DALL-E,Midjourney,Imagen,Flux,NeRF,3D重建,点云处理,网格生成,纹理映射,光线追踪,渲染,计算机图形学,图像处理,图像分割,语义分割,实例分割,全景分割,目标检测,目标跟踪,人脸识别,人脸检测,人脸对齐,人脸验证,姿态估计,手势识别,动作识别,视频理解,视频分析,视频摘要,视频生成,视频增强,超分辨率,图像去噪,图像去模糊,图像修复,图像风格迁移,图像编辑,图像合成,图像生成,文本到图像,图像到文本,文本到视频,视频到文本,多模态融合,跨模态检索,跨模态生成,跨模态理解,视觉问答,视觉推理,视觉对话,视觉导航,视觉定位,视觉 grounding,语音处理,语音识别,语音合成,语音增强,语音分离,语音转换,语音情感识别,语音翻译,语音命令识别,语音唤醒词检测,语音活动检测,语音编码,语音解码,语音压缩,语音质量评估,自然语言理解,NLU,自然语言生成,NLG,文本分类,文本聚类,文本匹配,文本相似度,文本检索,文本摘要,抽取式摘要,生成式摘要,文本生成,对话生成,故事生成,诗歌生成,代码生成,文本到SQL,文本到代码,机器翻译,神经机器翻译,统计机器翻译,多语言翻译,低资源翻译,领域适应翻译,命名实体识别,NER,关系抽取,事件抽取,情感分析,方面情感分析,观点挖掘,意图识别,槽位填充,语义角色标注,词性标注,句法分析,依存句法分析,成分句法分析,语义分析,语义解析,指代消解,共指消解,文本蕴含,自然语言推理,问答系统,阅读理解,知识库问答,社区问答,对话系统,任务型对话,开放域对话,多轮对话,对话状态跟踪,对话策略学习,对话管理,对话评估,对话生成,对话个性化,对话情感,对话一致性,对话连贯性,对话多样性,对话可控性,对话安全,对话伦理,对话隐私,对话公平性,对话偏见,对话可解释性,对话可信度,对话鲁棒性,对话泛化性,对话适应性,对话上下文,对话历史,对话记忆,对话知识,对话推理,对话规划,决策系统,强化学习,深度强化学习,策略梯度,值函数,Actor-Critic,Q-learning,SARSA,DQN,DDPG,PPO,A2C,A3C,TRPO,SAC,TD3,模型预测控制,MPC,模仿学习,逆强化学习,层次强化学习,多智能体强化学习,协作强化学习,竞争强化学习,元强化学习,离线强化学习,安全强化学习,可解释强化学习,联邦学习,安全联邦学习,隐私保护联邦学习,高效联邦学习,异构联邦学习,垂直联邦学习,水平联邦学习,联邦迁移学习,联邦优化,联邦聚合,联邦通信,联邦模型,联邦数据,联邦安全,联邦隐私,联邦合规,联邦评估,联邦部署,联邦监控,联邦维护,联邦更新,联邦同步,联邦异步,联邦半同步,联邦分层,联邦分层聚合,联邦分层通信,联邦分层安全,联邦分层隐私,联邦分层合规,联邦分层评估,联邦分层部署,联邦分层监控,联邦分层维护,联邦分层更新,联邦分层同步,联邦分层异步,联邦分层半同步,联邦图神经网络,联邦图卷积网络,联邦图注意力网络,联邦图自编码器,联邦图生成网络,联邦知识蒸馏,联邦模型压缩,联邦量化,联邦剪枝,联邦蒸馏,联邦知识迁移,联邦多任务学习,联邦元学习,联邦小样本学习,联邦零样本学习,联邦自监督学习,联邦对比学习,联邦孪生网络,联邦三元组损失,联邦对比损失,联邦自编码器,联邦变分自编码器,联邦生成对抗网络,联邦WGAN,联邦WGAN-GP,联邦StyleGAN,联邦CycleGAN,联邦PixelGAN,联邦扩散模型,联邦DDPM,联邦IDDPM,联邦Latent Diffusion,联邦Stable Diffusion,联邦DALL-E,联邦Midjourney,联邦Imagen,联邦Flux,联邦NeRF,联邦3D重建,联邦点云处理,联邦网格生成,联邦纹理映射,联邦光线追踪,联邦渲染,联邦计算机图形学,联邦图像处理,联邦图像分割,联邦语义分割,联邦实例分割,联邦全景分割,联邦目标检测,联邦目标跟踪,联邦人脸识别,联邦人脸检测,联邦人脸对齐,联邦人脸验证,联邦姿态估计,联邦手势识别,联邦动作识别,联邦视频理解,联邦视频分析,联邦视频摘要,联邦视频生成,联邦视频增强,联邦超分辨率,联邦图像去噪,联邦图像去模糊,联邦图像修复,联邦图像风格迁移,联邦图像编辑,联邦图像合成,联邦图像生成,联邦文本到图像,联邦图像到文本,联邦文本到视频,联邦视频到文本,联邦多模态融合,联邦跨模态检索,联邦跨模态生成,联邦跨模态理解,联邦视觉问答,联邦视觉推理,联邦视觉对话,联邦视觉导航,联邦视觉定位,联邦视觉 grounding,联邦语音处理,联邦语音识别,联邦语音合成,联邦语音增强,联邦语音分离,联邦语音转换,联邦语音情感识别,联邦语音翻译,联邦语音命令识别,联邦语音唤醒词检测,联邦语音活动检测,联邦语音编码,联邦语音解码,联邦语音压缩,联邦语音质量评估,联邦自然语言理解,联邦自然语言生成,联邦文本分类,联邦文本聚类,联邦文本匹配,联邦文本相似度,联邦文本检索,联邦文本摘要,联邦抽取式摘要,联邦生成式摘要,联邦文本生成,联邦对话生成,联邦故事生成,联邦诗歌生成,联邦代码生成,联邦文本到SQL,联邦文本到代码,联邦机器翻译,联邦神经机器翻译,联邦统计机器翻译,联邦多语言翻译,联邦低资源翻译,联邦领域适应翻译,联邦命名实体识别,联邦关系抽取,联邦事件抽取,联邦情感分析,联邦方面情感分析,联邦观点挖掘,联邦意图识别,联邦槽位填充,联邦语义角色标注,联邦词性标注,联邦句法分析,联邦依存句法分析,联邦成分句法分析,联邦语义分析,联邦语义解析,联邦指代消解,联邦共指消解,联邦文本蕴含,联邦自然语言推理,联邦问答系统,联邦阅读理解,联邦知识库问答,联邦社区问答,联邦对话系统,联邦任务型对话,联邦开放域对话,联邦多轮对话,联邦对话状态跟踪,联邦对话策略学习,联邦对话管理,联邦对话评估,联邦对话生成,联邦对话个性化,联邦对话情感,联邦对话一致性,联邦对话连贯性,联邦对话多样性,联邦对话可控性,联邦对话安全,联邦对话伦理,联邦对话隐私,联邦对话公平性,联邦对话偏见,联邦对话可解释性,联邦对话可信度,联邦对话鲁棒性,联邦对话泛化性,联邦对话适应性,联邦对话上下文,联邦对话历史,联邦对话记忆,联邦对话知识,联邦对话推理,联邦对话规划,联邦决策系统,联邦强化学习,联邦深度强化学习,联邦策略梯度,联邦值函数,联邦Actor-Critic,联邦Q-learning,联邦SARSA,联邦DQN,联邦DDPG,联邦PPO,联邦A2C,联邦A3C,联邦TRPO,联邦SAC,联邦TD3,联邦模型预测控制,联邦模仿学习,联邦逆强化学习,联邦层次强化学习,联邦多智能体强化学习,联邦协作强化学习,联邦竞争强化学习,联邦元强化学习,联邦离线强化学习,联邦安全强化学习,联邦可解释强化学习,文档智能,文档理解,文档分析,文档处理,文档转换,文档提取,文档识别,文档分类,文档聚类,文档检索,文档摘要,文档生成,文档问答,文档翻译,文档校对,文档审核,文档编辑,文档格式化,文档标准化,文档版本化,文档协作,文档共享,文档发布,文档存档,文档备份,文档恢复,文档安全,文档加密,文档解密,文档签名,文档验证,文档追踪,文档监控,文档审计,文档评估,文档优化,文档改进,文档升级,文档迁移,文档集成,文档同步,文档异步,文档实时,文档离线,文档在线,文档本地,文档远程,文档云端,文档边缘,文档分布式,文档集中式,文档混合式,文档自动化,文档半自动化,文档手动,文档智能化,文档数字化,文档电子化,文档纸质化,文档可视化,文档交互式,文档响应式,文档自适应,文档个性化,文档定制化,文档标准化,文档规范化,文档统一化,文档多样化,文档多语言,文档多格式,文档多平台,文档多设备,文档多场景,文档多用户,文档多角色,文档多权限,文档多级别,文档多维度,文档多层次,文档多角度,文档多视角,文档多模态,文档多媒体,文档富媒体,文档超媒体,文档超文本,文档超链接,文档超内容,文档超结构,文档超语义,文档超知识,文档超智能,文档超自动化,文档超集成,文档超协同,文档超创新,文档超价值,文档超体验,文档超效率,文档超质量,文档超安全,文档超隐私,文档超合规,文档超可信,文档超可靠,文档超稳定,文档超扩展,文档超灵活,文档超兼容,文档超互通,文档超互联,文档超智能,文档超未来,文档超时代",
      },
    ],
    [
      "meta",
      {
        name: "description",
        content: "Nekro AI文档站 | Nekro Agent 更智能、更优雅的代理执行",
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
    search: {
      provider: 'local'
    },
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
          items: [
            { text: "概览", link: "/docs/01_intro/overview" },
            { text: "应用场景", link: "/docs/01_intro/application_scenarios" },
            { text: "社区宣发激励计划", link: "/docs/01_intro/event" },
          ],
        },
        {
          text: "快速开始",
          collapsed: true,
          items: [
            { text: "快速开始", link: "/docs/02_quick_start/quickstart" },
            {
              text: "快速部署",
              collapsed: true,
              items: [
                {
                  text: "Linux 部署教程",
                  link: "/docs/02_quick_start/deploy/linux",
                },
                {
                  text: "Windows 部署教程",
                  link: "/docs/02_quick_start/deploy/windows",
                },
                {
                  text: "MacOS 部署教程",
                  link: "/docs/02_quick_start/deploy/macos",
                },
                {
                  text: "社区 部署教程",
                  link: "/docs/02_quick_start/deploy/third_party"
                },
              ],
            },
            {
              text: "基本配置",
              collapsed: true,
              items: [
                {
                  text: "协议端配置",
                  link: "/docs/02_quick_start/config/protocol",
                },
                {
                  text: "系统配置",
                  link: "/docs/02_quick_start/config/system",
                },
                {
                  text: "应用更新",
                  link: "/docs/02_quick_start/config/update",
                },
              ],
            },
          ],
        },
        {
          text: "进阶指南",
          collapsed: true,
          items: [
            { text: "模型组配置", link: "/docs/03_advanced/model_config" },
            { text: "模型选择", link: "/docs/03_advanced/model_usage" },
            { text: "人设技巧", link: "/docs/03_advanced/persona_tips" },
            { text: "会话独立人设", link: "/docs/03_advanced/session_persona" },
            { text: "用户管理", link: "/docs/03_advanced/user_management" },
            { text: "插件用例", link: "/docs/03_advanced/plugin_usage" },
            { text: "插件生成器", link: "/docs/03_advanced/plugin_generator" },
            { text: "基础命令指南", link: "/docs/03_advanced/commands_basic" },
            { text: "调试命令指南", link: "/docs/03_advanced/commands_debug" },
          ],
        },
        {
          text: "插件开发",
          collapsed: true,
          items: [
            { text: "引言", link: "/docs/04_plugin_dev/00_introduction" },
            { text: "快速上手", link: "/docs/04_plugin_dev/01_quick_start" },
            {
              text: "插件核心概念",
              link: "/docs/04_plugin_dev/02_plugin_basics",
              collapsed: true,
              items: [
                { text: "插件实例与生命周期", link: "/docs/04_plugin_dev/02_plugin_basics/2.1_plugin_instance" },
                { text: "沙盒方法详解", link: "/docs/04_plugin_dev/02_plugin_basics/2.2_sandbox_methods" },
                { text: "插件配置", link: "/docs/04_plugin_dev/02_plugin_basics/2.3_configuration" },
                { text: "数据存储", link: "/docs/04_plugin_dev/02_plugin_basics/2.4_storage" },
                { text: "提示词注入", link: "/docs/04_plugin_dev/02_plugin_basics/2.5_prompt_injection" },
                { text: "上下文对象", link: "/docs/04_plugin_dev/02_plugin_basics/2.6_agent_context" },
              ],
            },
            {
              text: "高级功能",
              link: "/docs/04_plugin_dev/03_advanced_features",
              collapsed: true,
              items: [
                { text: "Webhook 接入点（弃用）", link: "/docs/04_plugin_dev/03_advanced_features/3.1_webhooks" },
                { text: "文件交互", link: "/docs/04_plugin_dev/03_advanced_features/3.2_file_interaction" },
                { text: "使用向量数据库", link: "/docs/04_plugin_dev/03_advanced_features/3.3_vector_database" },
                { text: "动态路由", link: "/docs/04_plugin_dev/03_advanced_features/3.4_dynamic_router" },
              ],
            },
            { text: "系统 API 参考", link: "/docs/04_plugin_dev/04_system_api_reference" },
          ],
        },
        {
          text: "应用开发",
          collapsed: true,
          items: [
            {
              text: "Linux 开发环境准备",
              link: "/docs/05_app_dev/dev_linux",
            },
            {
              text: "Windows 开发环境准备",
              link: "/docs/05_app_dev/dev_win",
            },
            {
              text: "MacOS 开发环境准备",
              link: "/docs/05_app_dev/dev_macos",
            },
          ],
        },
        {
          text: "故障排除",
          collapsed: true,
          items: [
            { text: "常见问题解答", link: "/docs/06_troubleshooting/faq" },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/KroMiose/nekro-agent" },
    ],
  },
});
