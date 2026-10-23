---
title: Notebook · 阅读地图
sidebar_position: 0
---

# Learning, in public.

这里是我的技术手记：从生成式模型到 GPU 内核，从分布式训练到 Agent 应用。笔记以中文为主，保留英文术语、公式与代码。

[搜索全部笔记与按主题浏览](/notes/)

## 从一个问题开始

- **GPU 为什么快？** 从 [CUDA](./notes/hpc/cuda.md) 的线程组织、内存层次和并行执行开始。
- **模型如何跨卡训练？** 阅读 [分布式训练](./notes/training/distributed-training.md)，理解并行策略与通信成本。
- **生成模型如何转换分布？** 阅读 [Flow-based Model](./notes/algo/flow-based-model.md) 与 [Flow Matching](./notes/algo/flow-matching.md)。
- **如何构建 AI 应用？** 从 [RAG](./notes/application/rag.md) 与 [评估](./notes/application/evaluation.md) 进入。

## 两个内容来源

**AI & Systems** 收录公开 Obsidian 笔记，按主题组织；**Engineering archive** 保留原站工程学习记录。日期更早的文章保留在 [Journal](/blog/)，生活影像在 [Photo log](/plog/)。

这些是个人学习笔记，并非课程教材。对于实验结果、实现细节与引用，请以对应论文、源码和官方文档为准。
