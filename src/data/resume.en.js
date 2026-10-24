// English translation of resume.js. Course names, links and the honours note are
// already in English and are reused from the Chinese source.
import * as zh from "./resume.js";

export const resumePdf = zh.resumePdf;

export const selfReview = [
  "Electronic and computer engineering graduate with strong AI skills and several development roles, able to read product and application needs from both the hardware and the software side.",
  "Studied abroad, with experience communicating and collaborating across cultures.",
  "During my internship I worked with local operations teams in Europe to develop and ship B2B marketing solutions; as a teaching assistant and in product demos I gained experience explaining technology, answering questions and presenting. I want to combine engineering analysis with an understanding of the business.",
];

const [columbia, zju] = zh.education;
export const education = [
  {
    ...columbia,
    school: "Columbia University",
    college: "School of Engineering and Applied Science",
    degree: "M.S. in Computer Engineering",
    period: "Aug 2025 — Feb 2027",
  },
  {
    ...zju,
    school: "Zhejiang University",
    college:
      "Zhejiang University–University of Illinois Urbana-Champaign Institute",
    degree:
      "B.Eng. in Electronic and Computer Engineering | ZJU–UIUC dual-degree program",
    period: "Sep 2021 — Jul 2025",
    thesis: "Image reconstruction with generative models",
    teaching:
      "Teaching assistant for Discrete Mathematics: organised teaching activities, prepared course materials, and followed up on, collected and answered student questions",
  },
];

export const experience = [
  {
    company: "Alibaba International Digital Commerce Group",
    role: "AI Application Development Engineer",
    team: "Merchant acquisition (B2B marketing)",
    period: "May 2026 — Aug 2026",
    points: [
      [
        "Cross-region collaboration",
        "Worked with local operations in Europe, dug into e-commerce merchants' business scenarios, surfaced pain points and produced technical solutions",
      ],
      [
        "Merchant efficiency and traffic",
        "Owned end-to-end development of a smart marketing assistant for merchants, designing and shipping automated product selection, pricing and submission that supports automation for tens of millions of SKUs a day; built an activity-page routing strategy from merchant profiles to recommend suitable campaigns, reaching a 51.5% click-through conversion among target merchants and meeting the business goal",
      ],
      [
        "Solution playbook (Agent Loop showcase)",
        "Built a one-stop AI coding showcase on the internal platform; led development of the integration-test, campaign-creation and registration Skills, connecting an end-to-end automated testing flow and closing the development loop, with an overall efficiency gain of about 30%",
      ],
      [
        "Alibaba International hackathon",
        "Built a conversational agent in 48 hours for an emotion-driven e-commerce entry point; the project reached the second round (100/1388), and I designed materials, presented on site and gave the product pitch, winning a Top 25 popularity award",
      ],
    ],
  },
  {
    company: "Hikvision Digital Technology",
    role: "Embedded Software Engineer",
    team: "Robotics systems",
    unit: "EZVIZ · IoT Product Division 5 · Software Technology",
    period: "Jul 2024 — Sep 2024",
    points: [
      [
        "On-site delivery and quality control",
        "Collected product data on the factory floor and identified needs for technical improvements",
      ],
      [
        "Embedded development",
        "Developed and integrated core modules of a commercial cleaning robot's main control system on Linux, and sensor control and data acquisition logic on FreeRTOS, keeping the microcontroller's control precise and real-time",
      ],
    ],
  },
];

export const research = {
  ...zh.research,
  role: "Second author",
  date: "8–11 April 2026",
  text: "For medical image reconstruction, modelled the prior and posterior distributions of tracer activity with Flow Matching / Normalizing Flows, accelerated training across multiple GPUs on a Slurm cluster, and achieved reliable uncertainty quantification and high-quality reconstruction",
};

const projectText = [
  {
    title:
      "PACC: energy-aware communication simulation for distributed training",
    role: "Distributed training and profiling framework",
    period: "Fall 2025",
    points: [
      "In a team of four, designed and built an end-to-end simulation workflow driven by real inference and training traces, enabling reusable energy-aware performance analysis of large deep-learning systems.",
      "Implemented collective-communication and kernel-level event capture and format conversion for multi-GPU distributed fine-tuning (FSDP + LoRA), covering several mainstream models.",
    ],
  },
  {
    title: "FinGOAT: a graph-orchestrated trading assistant for finance",
    role: "AI application development",
    points: [
      "Built a web application for US equity decisions that addresses serial latency in multi-agent systems, decision transparency and ease of use.",
      "Used a Gin gateway with a FastAPI inference service, persisting reasoning trails and decisions in PostgreSQL (GORM); containerised the core microservices with Docker for fast full-stack deployment.",
      "Implemented parallel multi-agent execution and dependency control with LangGraph, cutting end-to-end decision latency in multi-agent scenarios by about 70% compared with a serial pipeline, with a choice of multiple APIs, local Ollama or OpenClaw for inference.",
    ],
  },
  {
    title: "Interactive FPGA game system",
    period: "Spring 2025",
    points: [
      "Developed a Plants vs. Zombies game on an FPGA, integrating hardware modules, a Nios II soft-core processor and peripherals; ran ModelSim simulation and system verification for hardware–software co-design of display, input and control logic",
    ],
  },
  {
    title: "CUDA-LeNet5: GPU-accelerated convolution kernels",
    role: "CUDA kernel development",
    period: "Fall 2024",
    points: [
      "Optimised LeNet-5's convolution layers in CUDA with streams, Tensor Cores, shared/constant-memory tiling, quantisation and loop unrolling to raise throughput: 27,909× faster than a naive CPU implementation and 36% faster than an unoptimised parallel baseline.",
    ],
  },
  {
    title: "LOS: a lightweight Linux-like operating system",
    role: "Operating system kernel development",
    period: "Spring 2024",
    points: [
      "In a team of four, built a Linux-like OS kernel in C and x86 assembly.",
      "Developed virtual memory, a file system, terminal display, interrupts, system calls, exception handling and device drivers (keyboard, RTC, PIT), delivering multi-process switching, multi-terminal management and scheduling with kernel and user space isolated.",
    ],
  },
  {
    title: "Medical image reconstruction with generative flow models",
    points: [
      "Framed PET (positron emission tomography) reconstruction as a Bayesian inference problem and implemented a deep probabilistic imaging pipeline, improving reconstruction accuracy and providing the uncertainty estimates that clinical diagnosis relies on.",
      "Applied normalizing flows (RealNVP, Glow) to model the posterior distribution of tracer activity and scaled training with multi-GPU parallelism.",
    ],
  },
  {
    title: "Generative-AI 3D design plugin",
    role: "Zhejiang University ICI Lab · Research assistant",
    points: [
      "Developed a generative-AI plugin for Blender that automates the 3D design workflow: prototype management, segmentation and Gaussian–mesh conversion.",
      "Built a text-to-3D generation system on Transformer/Diffusion models combined with Gaussian splatting and mesh rendering to simplify modelling; deployed a Flask backend that records user interactions and serves real-time 3D generation.",
    ],
  },
];
export const projects = zh.projects.map((p, i) => ({
  ...p,
  ...projectText[i],
}));

export const activities = [
  {
    title: "CICC Wealth Management 2022 Summer Financial Literacy Camp",
    text: "Learned the basics of financial markets and asset allocation through finance courses; took part in an asset-allocation project, designing and analysing an allocation plan and presenting it, strengthening my applied financial knowledge, teamwork and ability to present a plan.",
  },
];
