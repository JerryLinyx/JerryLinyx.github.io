export const profile = {
  name: "Yuxuan Lin",
  chineseName: "林煜轩",
  handle: "JerryLinyx",
  email: "yl6061@columbia.edu",
  github: "https://github.com/JerryLinyx",
  linkedin: "https://www.linkedin.com/in/yuxuan0/",
};

export const projects = [
  {
    slug: "fingoat",
    number: "01",
    title: "FinGOAT",
    category: "AGENTIC SYSTEMS",
    year: "2025 — 2026",
    subtitle: "把复杂决策，变成可追溯的推理。",
    description:
      "面向美股研究的图编排多智能体应用。从数据到观点，让并行推理、依赖控制和决策过程清晰可见。",
    tags: ["LangGraph", "Go / Gin", "FastAPI", "PostgreSQL"],
    metric: "≈70%",
    metricLabel: "相较串行流程的端到端延迟降低",
    image: "index/infra.png",
    imageAlt: "FinGOAT 系统的网关、推理服务与存储架构",
    repo: "https://github.com/JerryLinyx/FinGOAT",
    context:
      "多智能体系统容易陷入串行等待：每一轮分析都依赖前一轮完成，用户也很难理解最终结论从何而来。FinGOAT 将依赖关系显式建模，让独立分析并行运行，并保留完整推理链路。",
    decisions: [
      [
        "Graph orchestration",
        "基于 LangGraph 定义多 Agent 的执行图与依赖控制，让可独立执行的分析并行运行。",
      ],
      [
        "Service boundaries",
        "使用 Gin 网关与 FastAPI 推理服务划分职责，PostgreSQL / GORM 持久化推理链路与决策结果，Docker 支持服务部署。",
      ],
      [
        "Inference flexibility",
        "支持多 API、本地 Ollama 与 OpenClaw 推理选择，在不同模型和运行环境之间保留切换空间。",
      ],
    ],
    outcome:
      "根据个人项目记录，多 Agent 场景下端到端决策延迟相较串行流程降低约 70%。该数字是项目内对比结果，具体表现取决于模型、依赖图和运行环境。",
    related: "/docs/notes/application/rag",
  },
  {
    slug: "pacc",
    number: "02",
    title: "PACC",
    category: "DISTRIBUTED COMPUTING",
    year: "2025 — 2026",
    subtitle: "看见分布式训练背后的成本。",
    description:
      "能耗感知的分布式训练通信模拟框架。以真实执行轨迹，连接 GPU 内核、集体通信与系统性能分析。",
    tags: ["PyTorch", "FSDP + LoRA", "CUDA", "Profiling"],
    metric: "Trace → insight",
    metricLabel: "从真实执行轨迹到能耗与性能分析",
    image: "index/pacc.png",
    imageAlt: "PACC 分布式系统仿真与分析流程",
    repo: "https://github.com/JerryLinyx/PACC",
    context:
      "训练性能无法只通过模型大小判断。通信、内核执行和并行策略共同决定系统的效率。PACC 使用真实工作负载轨迹构建可复用的分析工作流，帮助理解这些成本之间的关系。",
    decisions: [
      [
        "Real execution traces",
        "在多 GPU 分布式微调场景中采集执行轨迹，覆盖 FSDP 与 LoRA 工作负载。",
      ],
      [
        "Two levels of visibility",
        "同时收集集体通信与内核级执行事件，并完成格式转化，连接模型执行与仿真工具。",
      ],
      [
        "Reusable workflow",
        "在四人团队中共同设计端到端仿真流程，支持多个主流模型的能耗与性能分析。",
      ],
    ],
    outcome:
      "建立了由真实训练与推理轨迹驱动的工作流。我的主要工作是多 GPU 事件采集与格式转换；整体框架为团队协作成果。",
    related: "/docs/notes/training/distributed-training",
  },
  {
    slug: "probabilistic-imaging",
    number: "03",
    title: "Probabilistic imaging",
    category: "GENERATIVE RESEARCH",
    year: "ISBI 2026",
    subtitle: "重建图像，也理解不确定性。",
    description:
      "用生成式流模型研究 PET 图像重建，将先验与后验建模带入医学成像。相关成果发表于 IEEE ISBI 2026。",
    tags: ["Normalizing Flows", "Bayesian inference", "Multi-GPU"],
    metric: "ISBI 2026",
    metricLabel: "IEEE 国际生物医学成像会议 · 第二作者",
    image: "index/PET.png",
    imageAlt: "基于生成式流模型的 PET 成像研究示意与重建结果",
    repo: "https://github.com/JerryLinyx/DeepMed-Imaging-Reconstruction",
    paper: "https://ieeexplore.ieee.org/abstract/document/11515791",
    context:
      "医学图像重建不仅关心一张清晰图像，也关心估计是否可靠。将 PET 重建表述为贝叶斯推理问题，可以在重建结果之外进一步研究后验分布与不确定性。",
    decisions: [
      [
        "Probabilistic formulation",
        "围绕示踪剂活度的先验与后验分布建立深度概率成像流程。",
      ],
      [
        "Learned flow priors",
        "研究 RealNVP、Glow 等归一化流模型在医学图像重建中的使用。",
      ],
      [
        "Scalable experiments",
        "在 Slurm 集群中进行多 GPU 并行训练，支持重建质量与不确定性量化实验。",
      ],
    ],
    outcome:
      "论文 Bayesian PET Reconstruction with Learned Normalizing Flow Priors 发表于 IEEE ISBI 2026（2026 年 4 月 8–11 日）。作者：Hengjia Ran、Yuxuan Lin、Huafeng Liu、Bo Zhao；本人为第二作者。",
    related: "/docs/notes/algo/flow-based-model",
  },
];

export const experience = [
  {
    date: "MAY — AUG 2026",
    company: "Alibaba International",
    role: "AI 应用开发工程师 · B 端营销",
    text: "从欧洲运营的业务场景出发，开发商家智能营销助手与端到端 Agent Loop，连接技术方案与实际产品交付。",
  },
  {
    date: "2024 — 2025",
    company: "Zhejiang University",
    role: "生成式模型与医学成像研究",
    text: "研究生成式 3D 设计工具与基于流模型的 PET 图像重建，把模型能力落实到具体工作流。",
  },
  {
    date: "JUL — SEP 2024",
    company: "Hikvision / EZVIZ",
    role: "嵌入式软件开发 · 机器人系统",
    text: "在 Linux 与 FreeRTOS 上开发商用清洁机器人控制模块、传感器控制与数据采集逻辑。",
  },
];
