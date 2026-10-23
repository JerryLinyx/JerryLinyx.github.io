export const profile = {
  name: "Yuxuan Lin",
  chineseName: "林煜轩",
  handle: "JerryLinyx",
  twitterHandle: "JerryLinyx",
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

export const moreProjects = [
  {
    slug: "cuda-lenet",
    number: "04",
    title: "CUDA–LeNet5",
    category: "GPU ENGINEERING",
    year: "2024",
    subtitle: "从算子细节里，找到性能的空间。",
    description:
      "针对 LeNet-5 卷积核进行 GPU 并行优化，探索访存、执行与精度之间的取舍。",
    tags: ["CUDA", "Tensor Cores", "Profiling"],
    repo: "https://github.com/JerryLinyx/LeNet-CUDA-ECE408",
    context:
      "卷积性能不仅取决于并行线程数。访存方式、数据复用与硬件特性共同决定实际吞吐量。",
    decisions: [
      [
        "Memory & execution",
        "使用共享与常量内存分块、Streams、循环展开，减少访存与调度开销。",
      ],
      ["Hardware-aware kernels", "结合 Tensor Cores 与量化探索 GPU 计算能力。"],
    ],
    outcome:
      "根据项目记录，相较未优化的并行基线提升 36%。结果对应项目内的指定硬件、数据与测试设置。",
    related: "/docs/notes/hpc/cuda",
  },
  {
    slug: "linux-kernel",
    number: "05",
    title: "LOS / Linux-like OS",
    category: "SYSTEMS ENGINEERING",
    year: "2024",
    subtitle: "从中断到进程，理解系统如何运转。",
    description: "四人协作，使用 C 与 x86 汇编构建类 Linux 操作系统内核。",
    tags: ["C", "x86 Assembly", "Virtual Memory"],
    repo: "https://github.com/JerryLinyx/Linux-OS-Kernel-ECE391/tree/main/mp3",
    context:
      "从底层构建一个操作系统，能把教科书中的进程、内存与设备抽象变成相互配合的真实模块。",
    decisions: [
      ["Kernel fundamentals", "实现虚拟内存、文件系统、终端、中断与系统调用。"],
      [
        "Scheduling & devices",
        "实现键盘、RTC、PIT 等设备驱动，支持多进程切换与多终端调度。",
      ],
    ],
    outcome:
      "完成内核与用户态隔离下的多进程、多终端机制。项目由四人团队共同完成。",
    related: "/blog/2024/04/23/391os/",
  },
  {
    slug: "aid3",
    number: "06",
    title: "AID3 / Blender",
    category: "CREATIVE TOOLS",
    year: "2024 — 2025",
    subtitle: "让生成式模型进入设计工作流。",
    description:
      "面向 Blender 的生成式 AI 插件，连接文本到 3D 生成、原型管理与几何处理。",
    tags: ["Blender", "Diffusion", "Flask"],
    repo: "https://github.com/JerryLinyx/AID3-Blender-Plugin",
    context:
      "生成一个 3D 结果只是起点。设计者还需要管理原型、调整几何，并把生成能力融入熟悉的工具。",
    decisions: [
      ["Tool integration", "在 Blender 中集成原型管理、分割与高斯—网格转换。"],
      [
        "Model & service",
        "结合 Transformer、Diffusion 与 Flask 服务，探索文本到 3D 的交互流程。",
      ],
    ],
    outcome:
      "在浙江大学 ICI Lab 科研助理阶段参与开发，将生成能力与设计工具连接。",
    related: "/docs/notes/algo/text2image",
  },
];
