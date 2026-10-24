// English text for portfolio.js. Links, slugs and images come from the Chinese
// source so the two languages cannot drift apart; only wording is overridden.
import * as zh from "./portfolio.js";

export const profile = {
  ...zh.profile,
  focus: "AI applications · Systems engineering · Generative models",
  intro:
    "I care about bringing AI models into real systems that are usable, understandable and scalable. My engineering work spans multi-agent applications, distributed training, CUDA optimisation and embedded robotics.",
  description:
    "Yuxuan Lin (林煜轩), M.S. in Computer Engineering at Columbia. Exploring AI applications, distributed systems and generative models: projects, research and technical notes.",
};

export const education = zh.education;

export const publication = {
  ...zh.publication,
  role: "Second author",
  date: "8–11 April 2026",
  text: "Studies PET reconstruction with generative flow models, posterior modelling and uncertainty quantification, trained in parallel on multiple GPUs on a Slurm cluster.",
};

export const otherProjects = [
  "Interactive FPGA game system — hardware–software co-design for display, input and game control, using Nios II, SystemVerilog and ModelSim.",
];

const text = {
  "probabilistic-imaging": {
    category: "Generative research",
    subtitle: "Reconstructing images, and understanding their uncertainty.",
    description:
      "PET image reconstruction with generative flow models, bringing prior and posterior modelling to medical imaging. Published at IEEE ISBI 2026.",
    imageAlt:
      "PET reconstructions compared: OSEM, FBP, ground truth and the posterior mean of 64 samples",
    context:
      "Medical image reconstruction is not only about a sharp image; it is also about whether the estimate can be trusted. Framing PET reconstruction as Bayesian inference makes it possible to study the posterior distribution and its uncertainty, not just the reconstruction.",
    decisions: [
      [
        "Probabilistic formulation",
        "Built a deep probabilistic imaging pipeline around the prior and posterior distributions of tracer activity.",
      ],
      [
        "Learned flow priors",
        "Studied normalizing flows such as RealNVP and Glow for medical image reconstruction.",
      ],
      [
        "Scalable experiments",
        "Trained in parallel on multiple GPUs on a Slurm cluster to support experiments on reconstruction quality and uncertainty quantification.",
      ],
    ],
    outcome:
      "The paper Bayesian PET Reconstruction with Learned Normalizing Flow Priors was published at IEEE ISBI 2026 (8–11 April 2026). Authors: Hengjia Ran, Yuxuan Lin, Huafeng Liu, Bo Zhao; I am the second author.",
  },
  fingoat: {
    category: "Multi-agent systems",
    subtitle: "Turning complex decisions into traceable reasoning.",
    description:
      "A graph-orchestrated multi-agent application for US equity research. From data to view, it makes parallel reasoning, dependency control and the decision process visible.",
    metricLabel: "lower end-to-end latency than a serial pipeline",
    imageAlt:
      "FinGOAT architecture: data sources, multi-agent reasoning, gateway and storage",
    context:
      "Multi-agent systems easily fall into serial waiting: each round of analysis waits for the previous one, and users struggle to see where the final conclusion came from. FinGOAT models dependencies explicitly, runs independent analyses in parallel and keeps the full reasoning trail.",
    decisions: [
      [
        "Graph orchestration",
        "Defined the agents' execution graph and dependency control with LangGraph, so independent analyses run in parallel.",
      ],
      [
        "Service boundaries",
        "Split responsibilities between a Gin gateway and a FastAPI inference service; PostgreSQL / GORM persists the reasoning trail and decisions, and Docker supports deployment.",
      ],
      [
        "Inference flexibility",
        "Supports multiple APIs, local Ollama and OpenClaw for inference, leaving room to switch between models and environments.",
      ],
    ],
    outcome:
      "According to my project records, end-to-end decision latency in multi-agent scenarios dropped by about 70% compared with a serial pipeline. The figure is an in-project comparison; actual results depend on the model, the dependency graph and the environment.",
  },
  pacc: {
    category: "Distributed computing",
    subtitle: "Seeing the cost behind distributed training.",
    description:
      "An energy-aware communication simulation framework for distributed training. Real execution traces connect GPU kernels, collective communication and system performance analysis.",
    imageAlt:
      "Power curves of collective communication operations at different GPU frequencies",
    context:
      "Training performance cannot be judged by model size alone. Communication, kernel execution and parallel strategy together decide how efficient a system is. PACC builds a reusable analysis workflow from real workload traces to understand how these costs relate.",
    decisions: [
      [
        "Real execution traces",
        "Collected execution traces from multi-GPU distributed fine-tuning, covering FSDP and LoRA workloads.",
      ],
      [
        "Two levels of visibility",
        "Captured both collective-communication and kernel-level execution events and converted their formats, linking model execution to the simulation tools.",
      ],
      [
        "Reusable workflow",
        "Designed an end-to-end simulation workflow with a team of four, supporting energy and performance analysis across several mainstream models.",
      ],
    ],
    outcome:
      "We built a workflow driven by real training and inference traces. My main part was multi-GPU event capture and format conversion; the framework as a whole is a team effort.",
  },
  "cuda-lenet": {
    category: "GPU engineering",
    subtitle: "Finding performance in the details of a kernel.",
    description:
      "Optimised the convolution kernels with streams, Tensor Cores, shared memory and quantisation; 36% faster than an unoptimised parallel baseline (in-project tests).",
    imageAlt: "LeNet convolutional network architecture",
    context:
      "Convolution performance does not depend on the number of parallel threads alone. Memory access patterns, data reuse and hardware features together decide real throughput.",
    decisions: [
      [
        "Memory & execution",
        "Used shared- and constant-memory tiling, streams and loop unrolling to cut memory traffic and scheduling overhead.",
      ],
      [
        "Hardware-aware kernels",
        "Explored the GPU's compute capability with Tensor Cores and quantisation.",
      ],
    ],
    outcome:
      "According to the project records, 36% faster than the unoptimised parallel baseline. The result holds for the project's specified hardware, data and test setup.",
  },
  "linux-kernel": {
    category: "Systems engineering",
    subtitle: "From interrupts to processes: how a system runs.",
    description:
      "A Linux-like kernel in C and x86 assembly covering virtual memory, a file system, system calls, drivers and scheduling; built by a team of four.",
    imageAlt: "How LOS maps physical memory to virtual memory",
    context:
      "Building an operating system from the ground up turns the textbook abstractions of processes, memory and devices into real modules that have to work together.",
    decisions: [
      [
        "Kernel fundamentals",
        "Implemented virtual memory, a file system, terminals, interrupts and system calls.",
      ],
      [
        "Scheduling & devices",
        "Wrote keyboard, RTC and PIT drivers, supporting multi-process switching and scheduling across multiple terminals.",
      ],
    ],
    outcome:
      "Delivered multi-process and multi-terminal support with kernel and user space isolated. The project was built by a team of four.",
  },
  aid3: {
    category: "Creative tools",
    subtitle: "Bringing generative models into the design workflow.",
    description:
      "A generative-AI 3D design plugin for Blender with prototype management, segmentation and Gaussian / mesh conversion, exploring a text-to-3D workflow with Transformer and Diffusion models and a Flask backend.",
    context:
      "Generating a 3D result is only the start. Designers still need to manage prototypes, adjust geometry and fold generation into the tools they already know.",
    decisions: [
      [
        "Tool integration",
        "Integrated prototype management, segmentation and Gaussian–mesh conversion into Blender.",
      ],
      [
        "Model & service",
        "Combined Transformer and Diffusion models with a Flask service to explore an interactive text-to-3D flow.",
      ],
    ],
    outcome:
      "Developed as a research assistant at Zhejiang University's ICI Lab, connecting generative capabilities with a design tool.",
  },
};

export const projects = zh.projects.map((p) => ({ ...p, ...text[p.slug] }));
