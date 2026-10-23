---
sidebar_position: 1
---

## Scaling & Model Trends
- **Compute Trends across Three Eras of Machine Learning** — Sevilla et al., 2022. [arXiv](https://arxiv.org/abs/2202.05924)
- **Scaling Laws for Neural Language Models** — Kaplan et al., 2020. [arXiv](https://arxiv.org/abs/2001.08361)
- **Pathways Language Model (PaLM): Scaling to 540 Billion Parameters for Breakthrough Performance** — Chowdhery et al., 2022. [Blog](https://research.google/blog/pathways-language-model-palm-scaling-to-540-billion-parameters-for-breakthrough-performance/)
- **LLaMA: Open and Efficient Foundation Language Models** — Touvron et al., 2023. [arXiv](https://arxiv.org/abs/2302.13971)
- **The Power of Scale for Parameter-Efficient Prompt Tuning** — Lester, Al-Rfou & Constant, 2021. [arXiv](https://arxiv.org/abs/2104.08691)
- **Best Practices and Lessons Learned on Synthetic Data for Language Models** — Liu et al., 2024. [arXiv](https://arxiv.org/abs/2404.07503)

## Distributed Training & Parallelism
- **Performance Modeling and Workload Analysis of Distributed Large Language Model Training and Inference** — Kundu et al., 2024. [arXiv](https://arxiv.org/abs/2407.14645)
- **Efficient Training of Large Language Models on Distributed Infrastructures: A Survey** — Zhang et al., 2024. [arXiv](https://arxiv.org/abs/2407.20018)
- **nnScaler: Constraint-Guided Parallelization Plan Generation for Deep Learning Training** — Lin et al., OSDI 2024. [USENIX](https://www.usenix.org/conference/osdi24/presentation/lin-zhiqi)
- **MAST: Global Scheduling of ML Training across Geo-Distributed Datacenters at Hyperscale** — Choudhury et al., OSDI 2024. [USENIX](https://www.usenix.org/conference/osdi24/presentation/choudhury)
- **Metis: Fast Automatic Distributed Training on Heterogeneous GPUs** — Um et al., USENIX ATC 2024. [USENIX](https://www.usenix.org/conference/atc24/presentation/um)
- **Accelerating the Training of Large Language Models using Efficient Activation Rematerialization and Optimal Hybrid Parallelism** — Yuan et al., USENIX ATC 2024. [USENIX](https://www.usenix.org/conference/atc24/presentation/yuan)
- **AMSP: Reducing Communication Overhead of ZeRO for Efficient LLM Training** — Zheng et al., 2023. [arXiv](https://arxiv.org/abs/2311.00257)
- **FwdLLM: Efficient Federated Finetuning of Large Language Models with Perturbed Inferences** — Xu et al., USENIX ATC 2024. [USENIX](https://www.usenix.org/conference/atc24/presentation/xu)
- **Ray: A Distributed Framework for Emerging AI Applications** — Moritz et al., OSDI 2018. [USENIX](https://www.usenix.org/conference/osdi18/presentation/moritz)

## Serving, Inference & Memory Efficiency
- **PagedAttention: Efficient Memory Management for Large Language Model Serving** — Kwon et al., SOSP 2023. [ACM DL](https://dl.acm.org/doi/10.1145/3600006.3613165)
- **FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness** — Dao et al., NeurIPS 2022. [arXiv](https://arxiv.org/abs/2205.14135)
- **Sarathi-Serve: Taming Throughput-Latency Tradeoff in LLM Inference** — Agrawal et al., 2024. [arXiv](https://arxiv.org/abs/2403.02310)
- **DistServe: Disaggregating Prefill and Decoding for Goodput-Optimized Large Language Model Serving** — Zhong et al., OSDI 2024. [USENIX](https://www.usenix.org/conference/osdi24/presentation/zhong)
- **Llumnix: Dynamic Scheduling for Large Language Model Serving** — Sun et al., 2024. [arXiv](https://arxiv.org/abs/2406.03243)
- **InfiniGen: Efficient Generative Inference of Large Language Models with Dynamic KV Cache Management** — Lee et al., OSDI 2024. [USENIX](https://www.usenix.org/conference/osdi24/presentation/lee)
- **ServerlessLLM: Low-Latency Serverless Inference for Large Language Models** — Fu et al., OSDI 2024. [USENIX](https://www.usenix.org/conference/osdi24/presentation/fu)
- **Compress then Serve: Serving Thousands of LoRA Adapters with Little Overhead** — Brüel-Gabrielsson et al., 2024. [arXiv](https://arxiv.org/abs/2407.00066)
- **Cost-Efficient Large Language Model Serving for Multi-Turn Conversations with CachedAttention** — Gao et al., USENIX ATC 2024. [USENIX](https://www.usenix.org/conference/atc24/presentation/gao)
- **Quant-LLM: Accelerating the Serving of Large Language Models via FP6-Centric Algorithm-System Co-Design on Modern GPUs** — Xia et al., USENIX ATC 2024. [USENIX](https://www.usenix.org/conference/atc24/presentation/xia)
- **StreamBox: A Lightweight GPU Sandbox for Serverless Inference Workflow** — Wu et al., USENIX ATC 2024. [USENIX](https://www.usenix.org/conference/atc24/presentation/wu-hao)
- **Compute-Optimal Inference for Problem-Solving with Language Models** — Wu et al., 2024. [arXiv](https://arxiv.org/abs/2408.00724)

## Scheduling & Resource Management
- **Centimani: Enabling Fast AI Accelerator Selection for DNN Training with a Novel Performance Predictor** — Xie et al., USENIX ATC 2024. [USENIX](https://www.usenix.org/conference/atc24/presentation/xie)
- **Pecan: Cost-Efficient ML Data Preprocessing with Automatic Transformation Ordering and Hybrid Placement** — Graur et al., USENIX ATC 2024. [USENIX](https://www.usenix.org/conference/atc24/presentation/graur)
- **MuxFlow: Efficient and Safe GPU Sharing in Large-Scale Production Deep Learning Clusters** — Zhao et al., 2023. [arXiv](https://arxiv.org/abs/2303.13803)
- **Caravan: Practical Online Learning of In-Network ML Models with Labeling Agents** — Zhang et al., OSDI 2024. [USENIX](https://www.usenix.org/conference/osdi24/presentation/zhang-qizheng)
- **The Infrastructure Powering IBM's Gen AI Model Development** — Gershon et al., 2024. [arXiv](https://arxiv.org/abs/2407.05467)
- **ChameleonAPI: Automatic and Efficient Customization of Neural Networks for ML Applications** — Liu et al., OSDI 2024. [USENIX](https://www.usenix.org/conference/osdi24/presentation/liu)
- **PUZZLE: Efficiently Aligning Large Language Models through Lightweight Context Switch** — Lei et al., USENIX ATC 2024. [USENIX](https://www.usenix.org/conference/atc24/presentation/lei)

## Additional References
- **PAL: Program-Aided Language Models** — Gao et al., ICML 2023. [PMLR](https://proceedings.mlr.press/v202/gao23d.html)
- **When Will My ML Job Finish? Toward Providing Completion Time Estimates through Predictability-Centric Scheduling** — Faisal et al., OSDI 2024. [USENIX](https://www.usenix.org/conference/osdi24/presentation/faisal)
- _See Serving, Inference & Memory Efficiency for complementary deployment patterns such as Compress then Serve, ServerlessLLM, CachedAttention, and Quant-LLM._
