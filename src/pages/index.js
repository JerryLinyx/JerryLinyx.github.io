import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';
import { useColorMode } from '@docusaurus/theme-common';
import { timePanelSharedProps } from 'element-plus/es/components/time-picker/src/props/shared.mjs';

const contactLinks = [
  { label: 'Github', href: 'https://github.com/JerryLinyx' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yuxuan0/' },
  { label: 'Email', href: 'mailto:yl6061@columbia.edu' },
];

const TechBadges = {
  // ===== Languages =====
  c: {
    alt: 'C',
    lightSrc: 'https://img.shields.io/badge/C-A8B9CC?logo=c&logoColor=black&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/C-232F3E?logo=c&logoColor=A8B9CC&style=flat-square',
  },
  cpp: {
    alt: 'C++',
    lightSrc: 'https://img.shields.io/badge/C++-00599C?logo=c%2B%2B&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/C++-232F3E?logo=c%2B%2B&logoColor=00599C&style=flat-square',
  },
  python: {
    alt: 'Python',
    lightSrc: 'https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Python-232F3E?logo=python&logoColor=FFD343&style=flat-square',
  },
  go: {
    alt: 'Go',
    lightSrc: 'https://img.shields.io/badge/Go-00ADD8?logo=go&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Go-232F3E?logo=go&logoColor=00ADD8&style=flat-square',
  },
  typescript: {
    alt: 'TypeScript',
    lightSrc: 'https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/TypeScript-232F3E?logo=typescript&logoColor=3178C6&style=flat-square',
  },
  js: {
    alt: 'JavaScript',
    lightSrc: 'https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/JavaScript-232F3E?logo=javascript&logoColor=F7DF1E&style=flat-square',
  },
  verilog: {
    alt: 'SystemVerilog',
    lightSrc: 'https://img.shields.io/badge/SystemVerilog-007ACC?logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/SystemVerilog-232F3E?logoColor=white&style=flat-square',
  },
  assembly: {
    alt: 'x86 Assembly',
    lightSrc: 'https://img.shields.io/badge/x86_Assembly-0071C5?logo=intel&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/x86_Assembly-232F3E?logo=intel&logoColor=0071C5&style=flat-square',
  },
  matlab: {
    alt: 'MATLAB',
    lightSrc: 'https://img.shields.io/badge/MATLAB-0076A8?logo=matlab&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/MATLAB-232F3E?logo=matlab&logoColor=0076A8&style=flat-square',
  },




  // ===== Frameworks & Libraries =====
  react: {
    alt: 'React',
    lightSrc: 'https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/React-232F3E?logo=react&logoColor=61DAFB&style=flat-square',
  },
  vue: {
    alt: 'Vue',
    lightSrc: 'https://img.shields.io/badge/Vue.js-4FC08D?logo=vue.js&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Vue.js-232F3E?logo=vue.js&logoColor=4FC08D&style=flat-square',
  },
  vite: {
    alt: 'Vite',
    lightSrc: 'https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Vite-232F3E?logo=vite&logoColor=646CFF&style=flat-square',
  },
  flask: {
    alt: 'Flask',
    lightSrc: 'https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Flask-232F3E?logo=flask&logoColor=white&style=flat-square',
  },
  gin: {
    alt: 'Gin',
    lightSrc: 'https://img.shields.io/badge/Gin-00ADD8?logo=go&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Gin-232F3E?logo=go&logoColor=00ADD8&style=flat-square',
  },
  gorm: {
    alt: 'GORM',
    lightSrc: 'https://img.shields.io/badge/GORM-3E7AAB?logo=go&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/GORM-232F3E?logo=go&logoColor=3E7AAB&style=flat-square',
  },
  pytorch: {
    alt: 'PyTorch',
    lightSrc: 'https://img.shields.io/badge/PyTorch-EE4C2C?logo=pytorch&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/PyTorch-232F3E?logo=pytorch&logoColor=EE4C2C&style=flat-square',
  },
  mediapipe: {
    alt: 'MediaPipe',
    lightSrc: 'https://img.shields.io/badge/MediaPipe-4285F4?logo=google&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/MediaPipe-232F3E?logo=google&logoColor=4285F4&style=flat-square',
  },
  yolo: {
    alt: 'YOLO (Ultralytics)',
    lightSrc: 'https://img.shields.io/badge/YOLO-3B8AFF?logo=ultralytics&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/YOLO-232F3E?logo=ultralytics&logoColor=3B8AFF&style=flat-square',
  },
  cuda: {
    alt: 'CUDA',
    lightSrc: 'https://img.shields.io/badge/CUDA-76B900?logo=nvidia&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/CUDA-232F3E?logo=nvidia&logoColor=76B900&style=flat-square',
  },
  unreal: {
    alt: 'Unreal Engine',
    lightSrc: 'https://img.shields.io/badge/Unreal_Engine-0E1128?logo=unrealengine&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Unreal_Engine-232F3E?logo=unrealengine&logoColor=white&style=flat-square',
  },
  blender: {
    alt: 'Blender',
    lightSrc: 'https://img.shields.io/badge/Blender-F5792A?logo=blender&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Blender-232F3E?logo=blender&logoColor=F5792A&style=flat-square',
  },
  overleaf: {
    alt: 'Overleaf',
    lightSrc: 'https://img.shields.io/badge/Overleaf-3A9B5F?logo=overleaf&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Overleaf-232F3E?logo=overleaf&logoColor=3A9B5F&style=flat-square',
  },
  keil: {
    alt: 'Keil (Arm)',
    lightSrc: 'https://img.shields.io/badge/Keil-0078D7?logo=arm&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Keil-232F3E?logo=arm&logoColor=0078D7&style=flat-square',
  },
  quartus: {
    alt: 'Intel Quartus',
    lightSrc: 'https://img.shields.io/badge/Quartus-0071C5?logo=intel&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Quartus-232F3E?logo=intel&logoColor=0071C5&style=flat-square',
  },
  eclipse: {
    alt: 'Eclipse IDE',
    lightSrc: 'https://img.shields.io/badge/Eclipse_IDE-2C2255?logo=eclipseide&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Eclipse_IDE-232F3E?logo=eclipseide&logoColor=2C2255&style=flat-square',
  },
  git: {
    alt: 'Git',
    lightSrc: 'https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Git-232F3E?logo=git&logoColor=F05032&style=flat-square',
  },
  svn: {
    alt: 'Subversion (SVN)',
    lightSrc: 'https://img.shields.io/badge/SVN-EB8C00?logo=subversion&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/SVN-232F3E?logo=subversion&logoColor=EB8C00&style=flat-square',
  },
  arduino: {
    alt: 'Arduino',
    lightSrc: 'https://img.shields.io/badge/Arduino-00979D?logo=arduino&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Arduino-232F3E?logo=arduino&logoColor=00979D&style=flat-square',
  },
  deepseek: {
    alt: 'DeepSeek',
    lightSrc: 'https://img.shields.io/badge/DeepSeek-3B8AFF?style=flat-square',
    darkSrc: 'https://img.shields.io/badge/DeepSeek-232F3E?style=flat-square',
  },


  // ===== Databases / Infra =====
  postgres: {
    alt: 'PostgreSQL',
    lightSrc: 'https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/PostgreSQL-232F3E?logo=postgresql&logoColor=336791&style=flat-square',
  },
  redis: {
    alt: 'Redis',
    lightSrc: 'https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Redis-232F3E?logo=redis&logoColor=DC382D&style=flat-square',
  },
  sqlite: {
    alt: 'SQLite',
    lightSrc: 'https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/SQLite-232F3E?logo=sqlite&logoColor=003B57&style=flat-square',
  },
  docker: {
    alt: 'Docker',
    lightSrc: 'https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Docker-232F3E?logo=docker&logoColor=2496ED&style=flat-square',
  },

  // ===== Embedded / Hardware =====
  esp32: {
    alt: 'ESP32',
    lightSrc: 'https://img.shields.io/badge/ESP32-000000?logo=espressif&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/ESP32-232F3E?logo=espressif&logoColor=white&style=flat-square',
  },
  gd32: {
    alt: 'GD32 (GigaDevice)',
    lightSrc: 'https://img.shields.io/badge/GD32-0093DD?logo=gigadevice&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/GD32-232F3E?logo=gigadevice&logoColor=0093DD&style=flat-square',
  },
  freertos: {
    alt: 'FreeRTOS (Amazon)',
    lightSrc: 'https://img.shields.io/badge/FreeRTOS-FF9900?logo=amazonaws&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/FreeRTOS-232F3E?logo=amazonaws&logoColor=FF9900&style=flat-square',
  },
  linux: {
    alt: 'Linux',
    lightSrc: 'https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/Linux-232F3E?logo=linux&logoColor=FCC624&style=flat-square',
  },
  fpga: {
    alt: 'FPGA (Texas Instruments)',
    lightSrc: 'https://img.shields.io/badge/FPGA-CC0000?logo=texasinstruments&logoColor=white&style=flat-square',
    darkSrc: 'https://img.shields.io/badge/FPGA-232F3E?logo=texasinstruments&logoColor=CC0000&style=flat-square',
  },

};


const publications = [
  {
    image: 'index/isbi2026.png',
    title: 'Bayesian PET Reconstruction with Learned Normalizing Flow Priors',
    link: '',
    metaLeft: (
      <>
        <a href="">Hengjia Ran</a>,&nbsp;
        <a href="">Yuxuan Lin</a>,&nbsp;
        <a href="https://scholar.google.com/citations?user=JbkbGvEAAAAJ">Huafeng Liu</a>,&nbsp;
        <a href="https://scholar.google.com/citations?user=EA4ZKygAAAAJ">Bo Zhao</a>
        <br />
        IEEE International Symposium on Biomedical Imaging (ISBI) 2026
      </>
    ),
    date: '',
    bullets: [

    ],
  },
];


const researchExperiences = [
  {
    image: 'index/winnetLogo.png',
    title: 'Edge Device Inference',
    link: '',
    metaLeft: (
      <>
        Spring Research | Advisers: <a href="https://wimnet.ee.columbia.edu/people/gil-zussman/">Gil Zussman</a>, <a href="https://jhonatantavori.github.io/">Jhonatan Tavory</a> (Columbia<a href="https://wimnet.ee.columbia.edu/"> WiMNeT Lab</a>)
      </>
    ),
    date: 'Feb. 2026 - Present',
    badges: [
      TechBadges.pytorch,
      TechBadges.cuda,
      TechBadges.python,
    ],

    bullets: [

    ],
  },
  {
    image: 'index/PET.png',
    title: 'Flow-based Deep Generative Model for PET Image Reconstruction',
    link: '',
    metaLeft: (
      <>
        Senior Thesis | Adviser: <a href="https://zjui.intl.zju.edu.cn/en/team/teacherinfo/2736">Bo Zhao</a> (ZJU CIIP Group)
      </>
    ),
    date: 'Dec. 2024 - Jun. 2025',
    badges: [
      TechBadges.pytorch,
      TechBadges.cuda,
      TechBadges.python,
      TechBadges.matlab,
    ],

    bullets: [
      <>Formulated PET (Positron Emission Tomography) reconstruction as a Bayesian inference problem.
      </>,
      <>Applied Normalizing Flows (<strong>RealNVP</strong>, <strong>Glow</strong>) to model the posterior distribution of tracer activity.</>,
      <>
        Implemented a Deep Probabilistic Imaging pipeline, enhancing reconstruction accuracy and providing crucial uncertainty estimates for clinical diagnosis.
      </>,
      <>
        Scaled training with multi-GPU parallelization (3.7x speedup) while maintaining image quality.
      </>,
    ],
  },
  {
    image: 'index/officechair.png',
    title: 'Generative AI Based 3D Models Generation',
    link: '',
    metaLeft: (
      <>
        Summer Research | Adviser: <a href="https://person.zju.edu.cn/chenlq">Liuqing Chen</a>
        <a href="https://icilab.cn/"> (ZJU ICI Lab)</a>
      </>
    ),
    date: 'Jun. 2024 - Nov. 2024',
    badges: [
      TechBadges.blender,
      TechBadges.flask,
      TechBadges.pytorch,
      TechBadges.python,
    ],
    bullets: [
      <>Created a Generative AI-powered Blender plugin in Python to automate the 3D design workflow, supporting 3D prototype management, segmentation, and Gaussian ↔ Mesh conversion.</>,
      <>Engineered text-to-3D model generation using Transformer/Diffusion-based Gaussian Splatting and mesh rendering pipelines, cutting average modeling time for artists by 50%.</>,
      <>Deployed a Flask-based backend to track user interactions and deliver 3D generation services.</>,
    ],
  },
];

const professionalExperiences = [
  {
    image: 'index/hikvision.jpeg',
    title: 'Software Development Intern',
    link: '',
    metaLeft: 'IoT Product Group 5, Ezviz, Hikvision',
    date: 'Jul. 2024 - Sep. 2024',
    badges: [
      TechBadges.linux,
      TechBadges.freertos,
      TechBadges.c,
      TechBadges.gd32,
      TechBadges.keil,
      TechBadges.svn,
    ],

    bullets: [
      <>Developed and integrated core control modules for a commercial autonomous cleaning robot on Linux OS, covering device state management, inter-module communication, version control, logging, and testing; the product has been successfully deployed to market</>,
      <>Implemented sensor control and data acquisition logic on FreeRTOS, ensuring precise microcontroller control and real-time performance</>,
    ],
  },
  {
    image: 'index/zjui.png',
    title: 'Teaching Assistant - Math213 Discrete Mathematics',
    link: 'https://cs.illinois.edu/academics/courses/math213',
    metaLeft: (
      <>
        Supervisor: <a href="https://zjui.intl.zju.edu.cn/en/node/1651">Meng Zhang</a>
      </>
    ),
    date: 'Sep. 2024 - Jan. 2025',
    badges: [
      TechBadges.overleaf,
    ],
    bullets: [
      <>Hold weekly office hours and discussion sessions to strengthen students&apos; grasp of core discrete mathematics concepts.</>,
      <>Designed and graded assignments and exams, ensuring alignment with learning objectives.</>,
    ],
  },
];

const projects = [
  {
    image: 'index/infra.png',
    title: 'FinGOAT: Financial Graph-Orchestrated Agentic Trading',
    link: 'https://github.com/JerryLinyx/FinGOAT',
    date: 'Nov. 2025 - Present',
    metaLeft: (
      <>
        Supervisor: <a href="https://www.linkedin.com/in/parijatdube/">Parijat Dube</a>,&nbsp;
        <a href='https://www.linkedin.com/in/chenw615/'>Chen Wang</a>
      </>
    ),
    badges: [
      TechBadges.go,
      TechBadges.gin,
      TechBadges.gorm,
      TechBadges.react,
      TechBadges.typescript,
      TechBadges.postgres,
      TechBadges.redis,
      TechBadges.docker,
    ],
    bullets: [
      <>Built an intelligent web-based decision system for U.S. stock trading, addressing latency bottlenecks of serial multi-agent workflows while improving decision transparency and usability</>,
      <>Designed a Gin gateway + FastAPI inference service architecture; persisted reasoning chains and decisions using PostgreSQL (GORM); containerized core microservices with Docker for full-stack rapid deployment</>,
      <>Implemented parallel multi-agent execution and dependency control using LangGraph, reducing end-to-end latency by ~70% compared to serial pipelines; supported both API-based and local LLM inference</>,
    ],
  },
  {
    image: 'index/pacc.png',
    title: 'PACC: Power-Aware Communication Simulation Framework for Distributed Training',
    link: 'https://github.com/JerryLinyx/PACC',
    metaLeft: (
      <>
        Supervisor: <a href="https://takhandipu.github.io/"> Tanvir Ahmed Khan</a>
      </>
    ),
    date: 'Sep. 2025 - Present',
    badges: [
      TechBadges.cuda,
      TechBadges.pytorch,
      TechBadges.python,
      TechBadges.cpp,
    ],
    bullets: [
      <>Collaborated in a team of 4 to establish an end-to-end simulation pipeline driven by real execution traces from deep learning training and inference workloads, enabling reusable power- and performance-aware analysis for large-scale systems</>,
      <>Implemented a multi-GPU distributed fine-tuning (FSDP + LoRA) event collection and conversion at collective communication and kernel-level execution, covering 10+ mainstream models including LLaMA, Qwen, BERT, and ResNet</>
    ],
  },
  {
    image: 'index/pvz.png',
    title: 'FPGA-based Plants vs. Zombies: An SoC Game Design',
    link: '',
    metaLeft: (
      <>
        Supervisor: <a href="https://zjui.intl.zju.edu.cn/en/node/768">Chushan Li</a>
      </>
    ),
    date: 'Apr. 2025 - May. 2025',
    badges: [
      TechBadges.verilog,
      TechBadges.fpga,
      TechBadges.quartus,
      TechBadges.c,
      TechBadges.eclipse,
    ],
    bullets: [
      <>In a team of 2, developed an <strong>FPGA</strong>-based Plants vs. Zombies game as a System-on-Chip (SoC), integrating <strong>SystemVerilog</strong> hardware modules with a Nios II soft-core processor.</>,
      <>Implemented VGA display, sprite rendering, collision detection, and USB keyboard input modules based on FSM control and ROM buffering, achieving responsive real-time interaction and smooth 60 FPS gameplay on a 640x480 monitor.</>,
      <>Integrated hardware-software co-design in Platform Designer, connecting VGA, USB, SDRAM, and logic modules via the Avalon bus and verifying timing through ModelSim simulation.</>,
    ],
  },
  {
    image: 'index/sfc.jpeg',
    title: 'Smart Fitness Coach: Full-stack CV-powered AIoT App',
    link: '',
    metaLeft: (
      <>
        Supervisor: <a href="https://zjui.intl.zju.edu.cn/en/node/1652">Timothy Haw-Yu Lee</a>
      </>
    ),
    date: 'Jan. 2025 - May. 2025',
    badges: [
      TechBadges.flask,
      TechBadges.pytorch,
      TechBadges.sqlite,
      TechBadges.vue,
      TechBadges.js,
      TechBadges.yolo,
      TechBadges.mediapipe,
      TechBadges.deepseek,
      TechBadges.python,
      TechBadges.esp32,
      TechBadges.arduino,
    ],
    bullets: [
      <>Led a team of 4 to engineer an ESP32-based hardware-software co-designed IoT system, enabling real-time video streaming and asynchronous control of lighting and motor modules.</>,
      <>Implemented a Flask backend with SQLite for local data storage, and deployed YOLO/MediaPipe inference service for real-time pose estimation and repetition counting.</>,
      <>Built a Vue3 (UniApp) frontend to visualize workout sessions and user history, and integrated DeepSeek API to provide personalized fitness insights.</>,
    ],
  },
  {
    image: 'index/lenet.png',
    title: 'CUDA-LeNet: GPU-Accelerated Convolution Kernel Optimization',
    link: 'https://github.com/JerryLinyx/LeNet-CUDA-ECE408/tree/main/Project',
    metaLeft: (
      <>
        Supervisor: <a href="https://ece.illinois.edu/about/directory/faculty/kindrtnk">Volodymyr Kindratenko</a>
      </>
    ),
    date: 'Sep. 2024 - Dec. 2024',
    badges: [
      TechBadges.cuda,
      TechBadges.cpp,
      TechBadges.pytorch,
      TechBadges.python,
    ],
    bullets: [
      <>Optimized the forward-pass of a LeNet-5 convolutional layer using <strong>CUDA</strong> with an advanced GEMM kernel.</>,
      <>Applied techniques including streams, Tensor Cores, memory tiling, FP16 arithmetic, and loop unrolling to maximize throughput.</>,
      <>Achieved 27,909x speedup over the CPU implementation and 36% over the parallel baseline.</>,
    ],
  },
  {
    image: 'index/os.png',
    title: 'LOS - A Light Linux-Like Operating System',
    link: 'https://github.com/JerryLinyx/Linux-OS-Kernel-ECE391/tree/main/mp3',
    metaLeft: (
      <>
        Supervisor: <a href="https://cs.illinois.edu/about/people/affiliate-faculty/klevchen">Kirill Levchenko</a>,{' '}
        <a href="https://ece.illinois.edu/about/directory/faculty/dwang47">Dong Kai Wang</a>
      </>
    ),
    date: 'Mar. 2024 - May 2024',
    badges: [
      TechBadges.linux,
      TechBadges.c,
      TechBadges.assembly,
      TechBadges.git,
    ],
    bullets: [
      <>Led a team of 4 to construct a Linux-like operating system kernel from scratch using <strong>C</strong> and <strong>x86 assembly</strong>.</>,
      <>Developed OS modules and services including virtual memory, file system, terminal display, interrupt / system calls / exception handling, and device drivers for keyboards, RTC, and PIT.</>,
      <>Completed kernel and user modes switching, multi-terminal switching, and multi-process scheduling.</>,
    ],
  },
  {
    image: 'index/fourlevels.png',
    title: 'Infinity Revelation: Demo of an Adventure Puzzle-Solving Game',
    link: 'https://github.com/JerryLinyx/CS415',
    metaLeft: (
      <>
        Supervisor: <a href="https://cs.illinois.edu/about/people/faculty/shaffer1">Eric Shaffer</a>
      </>
    ),
    date: 'Mar. 2024 - Apr. 2024',
    badges: [
      TechBadges.unreal,
      TechBadges.cpp,
    ],
    bullets: [
      <>In a team of 5, developed an adventure puzzle-solving game demo inspired by Infinity Blade, using <strong>Unreal Engine 5</strong> and Blueprints.</>,
      <>Implemented core gameplay mechanics including health and attack systems, collectible items, and AI enemies for 4 integrated levels (Lava Parkour, Laser Puzzle, Riddle Maze, and Traffic Jam), delivering varied gameplay.</>,
    ],
  },
];

const courseColumns = [
  [
    { label: 'ECE408/CS483 - Applied Parallel Programming', href: 'https://ece.illinois.edu/academics/courses/ece408' },
    { label: 'ECE449/CS446 - Machine Learning', href: 'https://cs.illinois.edu/academics/courses/cs446' },
    { label: 'ECE448/CS440 - Artificial Intelligence', href: 'https://cs.illinois.edu/academics/courses/cs440' },
    { label: 'ECE448/CS438 - Communication Networks', href: 'https://cs.illinois.edu/academics/courses/cs438' },
    { label: 'ECE391 - Computer Systems Engineering', href: 'https://ece.illinois.edu/academics/courses/ece391' },
  ],
  [
    { label: 'ECE470 - Introduction to Robotics', href: 'https://ece.illinois.edu/academics/courses/ece470' },
    { label: 'CS412 - Introduction to Data Mining', href: 'https://cs.illinois.edu/academics/courses/cs412' },
    { label: 'CS411 - Database Systems', href: 'https://cs.illinois.edu/academics/courses/cs411' },
    { label: 'CS415 - Game Development', href: 'https://cs.illinois.edu/academics/courses/cs415' },
    { label: 'CS225 - Data Structure', href: 'https://cs.illinois.edu/academics/courses/cs225' },
  ],
];

function ExperienceCard({ item }) {
  const imageUrl = useBaseUrl(item.image);

  return (
    <article className={styles.card}>
      <div className={styles.cardImage}>
        <img src={imageUrl} alt={item.title} loading="lazy" />
      </div>
      <div className={styles.cardBody}>
        {item.link ? (
          <a href={item.link} className={styles.cardTitle} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
        ) : (
          <span className={styles.cardTitle}>{item.title}</span>
        )}
        {item.badges && (
          <div className={styles.badgeRow}>
            {item.badges.map((badge, idx) => {
              const { colorMode } = useColorMode();
              const src = colorMode === 'dark'
                ? badge.darkSrc || badge.src
                : badge.lightSrc || badge.src;

              return (
                <img
                  key={idx}
                  src={src}
                  alt={badge.alt}
                  className={styles.badgeIcon}
                  loading="lazy"
                />
              );
            })}
          </div>
        )}
        <div className={styles.metaRow}>
          <span className={styles.metaLeft}>{item.metaLeft}</span>
          <span className={styles.metaRight}>{item.date}</span>
        </div>
        <ul className={styles.bulletList}>
          {item.bullets.map((bullet, bulletIndex) => (
            <li key={`${item.title}-bullet-${bulletIndex}`}>{bullet}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ExperienceSection({ title, description, items }) {
  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {description && <p className={styles.sectionDescription}>{description}</p>}
      </header>
      <div className={styles.cardList}>
        {items.map(item => (
          <ExperienceCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}


function VisitorMap() {
  const { colorMode } = useColorMode(); // "light" | "dark"

  const src = colorMode === "dark"
    ? "https://mapmyvisitors.com/map.png?cl=0e1633&w=800&t=n&d=HgG0G9MPsyNUyxeSL4SQwMmobQkkAosnFPTAs8IgEyI&co=0b4975&ct=cdd4d9"
    : "https://mapmyvisitors.com/map.png?cl=ffffff&w=800&t=n&d=HgG0G9MPsyNUyxeSL4SQwMmobQkkAosnFPTAs8IgEyI&co=2d78ad&ct=ffffff";

  return (
    <a href="https://mapmyvisitors.com/web/1c0m6" target="_blank" rel="noopener noreferrer">
      <img
        src={src}
        alt="Visitor Map"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "12px"
        }}
      />
    </a>
  );
}

export default function Home() {
  const avatarImage = useBaseUrl('index/yuxuanlin.jpeg');

  return (
    <Layout title="Yuxuan Lin" description="Personal site for Yuxuan Lin">
      <main className={styles.resumePage}>
        <div className={styles.pageContainer}>
          <section className={styles.introSection}>
            <div className={styles.introText}>
              <p className={styles.heroName}>林煜轩 Yuxuan Lin</p>
              <p className={styles.heroContact}>
                <a href="mailto:yl6061@columbia.edu">yl6061@columbia.edu</a>
                <span className={styles.divider}>|</span>
                <span>+1 (646) 705-7015</span>
                <span className={styles.divider}>|</span>
                <span>+86 19533230071</span>
              </p>
              <p className={styles.heroSummary}>
                Hi! I am currently pursuing a M.S. in Computer Engineering
                at <b>Columbia University</b>, expecting to graduate in <b>February 2027</b>.
                <br />
                Prior to this, I earned a B.S. in Computer Engineering from <b>University of Illinois Urbana-Champaign</b> and a B.Eng. in Electronic & Computer Engineering from <b>Zhejiang University</b> through ZJU-UIUC dual-degree program.
              </p>
              <p className={styles.heroLinks}>
                {contactLinks.map((link, index) => (
                  <React.Fragment key={link.label}>
                    {index > 0 && <span className={styles.divider}>/</span>}
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </React.Fragment>
                ))}
              </p>
            </div>
            <div className={styles.introAvatar}>
              {/* <a href={avatarImage} target="_blank" rel="noopener noreferrer">
                <img src={avatarImage} alt="Yuxuan Lin" className={styles.avatarImage} />
              </a> */}
              <img src={avatarImage} alt="Yuxuan Lin" className={styles.avatarImage} />
            </div>
          </section>

          <ExperienceSection
            title="Publication"
            description=""
            items={publications}
          />

          <ExperienceSection
            title="Research Experiences"
            description="My research explores scalable and efficient training/inference systems, as well as generative models."
            items={researchExperiences}
          />

          <ExperienceSection
            title="Professional Experiences"
            description="I had fun doing internships in software development."
            items={professionalExperiences}
          />

          <ExperienceSection
            title="Selected Projects"
            description={(
              <>
                I am familiar with C/C++ and Linux. Also, I have experience in CUDA, Golang (Gin, GORM), Python (PyTorch, Flask), SQL/NoSQL, x86 Assembly, Quartus, and UE5.
              </>
            )}
            items={projects}
          />
          <section className={styles.section}>
            <header className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Relevant courses:</h2>
            </header>
            <div className={styles.coursesGrid}>
              {courseColumns.map((column, columnIndex) => (
                <ul key={`course-column-${columnIndex}`} className={styles.courseList}>
                  {column.map(course => (
                    <li key={course.label}>
                      <a href={course.href} target="_blank" rel="noopener noreferrer">
                        {course.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </section>


          <div className={styles.mapContainer}>
            <VisitorMap />
          </div>





          <p className={clsx(styles.sourceNote, 'text--center')}>
            Adapted design and styles from{' '}
            <a href="https://github.com/jonbarron/jonbarron_website" target="_blank" rel="noopener noreferrer">
              Jon Barron.
            </a>

          </p>
        </div>
      </main>
    </Layout>
  );
}
