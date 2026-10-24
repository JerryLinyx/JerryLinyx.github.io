---
title: LLM进阶之路
date: '2024-04-21T18:10:45'
authors:
- jerry
tags:
- AI
- LLM
- MLE
category: MLE
draft: false
---
<!-- 
## 概念
- 光学字符识别 ([OCR](https://aws.amazon.com/cn/what-is/ocr/)) 是指将文本图像转换为机器可读文本格式的流程。

## 自然语言处理 NLP
### 入门：

#### 分词
#### Word2Vec
#### Transformer
[细讲 | Attention Is All You Need](https://mp.weixin.qq.com/s/RLxWevVWHXgX-UcoxDS70w)
[从Word Embedding到Bert模型—自然语言处理中的预训练技术发展史](https://zhuanlan.zhihu.com/p/49271699)
[【NLP】Transformer模型原理详解](https://zhuanlan.zhihu.com/p/44121378)
[图解Transformer（完整版）](https://blog.csdn.net/longxinchen_ml/article/details/86533005)
#### GPT
#### Lora

### 进阶：

#### CLIP
#### Diffusion
#### GAN
#### RL

### 实践：
>代码要跑一个MNIST，一个判别的小模型，BERT做情感分类，GPT结构的LLM推理和微调。基本上一周一篇论文一份代码作业，多用GPT，多抄别人的代码，只要能找到代码放进去正常跑起来就算理解了。

#### 学习率
机器学习的梯度下降法，学习率是控制不断迭代过程中的一个关键参数，用于权衡目标函数的梯度下降方向。公式表示为：

$$
\theta_{\text{new}} = \theta_{\text{old}} - \alpha \times \nabla J(\theta)
$$

其中，$\theta$ 是模型参数，$\alpha$ 是学习率，$\nabla J(\theta)$ 是目标函数 $J$ 相对于 $\theta$ 的梯度。这里，学习率 $\alpha$ 决定了梯度更新的步幅：较小的 $\alpha$ 可能导致梯度更新慢，而较大的 $\alpha$ 可能会导致梯度在最优解附近过冲甚至发散。

**学习率与梯度下降**
学习率在不同类型的梯度下降算法中有不同的应用和解释。最常见的三种梯度下降算法是：

批量梯度下降（Batch Gradient Descent）
随机梯度下降（Stochastic Gradient Descent, SGD）
小批量梯度下降（Mini-batch Gradient Descent）

在批量梯度下降中，学习率应用于整个数据集，用于计算损失函数的平均梯度。而在随机梯度下降和小批量梯度下降中，学习率应用于单个或一小批样本，用于更新模型参数。

随机梯度下降和小批量梯度下降由于其高度随机的性质，常常需要一个逐渐衰减的学习率，以帮助模型收敛。

**学习率对模型性能的影响**
选择合适的学习率是非常重要的，因为它会直接影响模型的训练速度和最终性能。具体来说：

过大的学习率：可能导致模型在最优解附近震荡，或者在极端情况下导致模型发散。
过小的学习率：虽然能够保证模型最终收敛，但是会大大降低模型训练的速度。有时，它甚至可能导致模型陷入局部最优解。
实验表明，不同的模型结构和不同的数据集通常需要不同的学习率设置。因此，实践中常常需要多次尝试和调整，或者使用自适应学习率算法。

综上，学习率是机器学习中一个基础但复杂的概念。它不仅影响模型训练的速度，还会影响模型的最终性能。因此，理解学习率的基础知识和它在不同情境下的应用，对于机器学习的实践和研究都是非常重要的。

##### 学习率调整策略
学习率的调整策略是优化算法中一个重要的研究领域。合适的调整策略不仅能够加速模型的收敛速度，还能提高模型的泛化性能。在深度学习中，由于模型通常包含大量的参数和复杂的结构，选择和调整学习率变得尤为关键。本章将详细介绍几种常用的学习率调整策略，从传统方法到现代自适应方法。

**常量学习率**
最简单的学习率调整策略就是使用一个固定的学习率。这是最早期梯度下降算法中常用的方法。虽然实现简单，但常量学习率往往不能适应训练动态，可能导致模型过早地陷入局部最优或者在全局最优点附近震荡。

**时间衰减**
时间衰减策略是一种非常直观的调整方法。在这种策略中，学习率随着训练迭代次数的增加而逐渐减小。公式表示为：

$$
\alpha_t = \alpha_0 \times (1 + \gamma \times t)^{-p}
$$

其中，$\alpha_t$ 是随 t 变化的学习率，$\alpha_0$ 是初始学习率，$\gamma$ 是衰减率，$p$ 是一个正实数，用于控制衰减的速度。

**自适应学习率**
自适应学习率算法试图根据模型的训练状态动态调整学习率。以下是一些广泛应用的自适应学习率算法：

**AdaGrad**
AdaGrad（Adaptive Gradient Algorithm）是一种自适应学习率调整方法，它根据过去的梯度累积来调整学习率大小。

$$
g_t = \nabla J(\theta_t)
$$
$$
r_t = r_{t-1} + g_t \odot g_t
$$
$$
\theta_{t+1} = \theta_t - \frac{\alpha}{\sqrt{r_t + \epsilon}} \odot g_t
$$

其中，$g_t$ 是参数在时间点 t 的梯度，$r_t$ 是累积的梯度平方和，$\epsilon$ 是一个很小的数以防止除以零错误。
>符号 $\odot$ 表示哈达玛积（Hadamard product），也称为元素间乘积。这种运算是指在两个矩阵之间进行的，其中矩阵的对应元素相乘。换言之，两个矩阵的每个相对应的元素分别相乘，生成一个新的矩阵，新矩阵的每个元素都是原来两个矩阵对应位置元素的乘积。
例如，如果有两个矩阵 A 和 B，它们的哈达玛积 C 计算如下:
>- A =
>  $$
>  \begin{bmatrix}
>  a_{11} & a_{12} \\
>  a_{21} & a_{22}
>  \end{bmatrix}
>  $$
>- B =
>  $$
>  \begin{bmatrix}
>  b_{11} & b_{12} \\
>  b_{21} & b_{22}
>  \end{bmatrix}
>  $$
>- C =
>  $$
>  \begin{bmatrix}
>  a_{11} \times b_{11} & a_{12} \times b_{12} \\
>  a_{21} \times b_{21} & a_{22} \times b_{22}
>  \end{bmatrix}
>  $$
>
>这种运算在各种矩阵操作中非常常见，特别是在深度学习和图像处理中，用于实现各种元素级的操作。


**RMSprop**
RMSprop（Root Mean Square Propagation）是对 AdaGrad 算法的一种改进，它使用了一个移动平均来代替累积平方梯度的和，以解决 AdaGrad 算法学习率逐渐减小的问题。

$$
r_t = \beta \times r_{t-1} + (1 - \beta) \times g_t \odot g_t
$$
$$
\theta_{t+1} = \theta_t - \frac{\alpha}{\sqrt{r_t + \epsilon}} \odot g_t
$$

其中，$\beta$ 是一个介于 0 和 1 之间的参数，用于控制移动平均的衰减率。

**Adam**
Adam (Adaptive Moment Estimation) 结合了 Momentum 和 RMSprop 的优点，同时使用一阶矩（均值）和二阶矩（未中心化的方差）来调整学习率。

$$
m_t = \beta_1 \times m_{t-1} + (1 - \beta_1) \times g_t
$$
$$
v_t = \beta_2 \times v_{t-1} + (1 - \beta_2) \times g_t \odot g_t
$$
$$
\theta_{t+1} = \theta_t - \frac{\alpha}{\sqrt{v_t + \epsilon}} \odot m_t
$$

其中，$m_t$ 和 $v_t$ 分别是一阶矩和二阶矩的估计值，$\beta_1$ 和 $\beta_2$ 是估计这两个矩的衰减率。

综上，学习率调整策略不仅影响模型训练的速度，还决定了模型的收敛性和泛化能力。选择合适的学习率调整策略是优化算法成功应用的关键之一。







原文：https://www.cnblogs.com/xfuture/p/17876583.html

## 资源

[李沐《动手学深度学习》](https://zh.d2l.ai/index.html)
[PyTorch代码解读](https://nn.labml.ai)
[AI算法工程师手册](https://www.huaxiaozhuan.com)
[AiBard123 AI导航](https://aibard123.com)
- [大模型推理能力增强方法总结](https://aibard123.com/digest/2023/1207/大模型推理能力增强方法总结/)
### Repositories

[Awesome-Multimodal-Large-Language-Models](https://github.com/BradyFU/Awesome-Multimodal-Large-Language-Models)
- Latest Papers and Datasets on Multimodal Large Language Models, and Their Evaluation.

[NLP-Beginner：自然语言处理入门练习](https://github.com/FudanNLP/nlp-beginner?tab=readme-ov-file)
[《神经网络与深度学习》](https://nndl.github.io)
[lucidrains (Phil Wang)](https://github.com/lucidrains)
[Algorithm_Interview_Notes-Chinese](https://github.com/DarLiner/Algorithm_Interview_Notes-Chinese)
[ML-NLP](https://github.com/NLP-LOVE/ML-NLP)
- 此项目是机器学习(Machine Learning)、深度学习(Deep Learning)、NLP面试中常考到的知识点和代码实现，也是作为一个算法工程师必会的理论基础知识。

[中医大语言模型-仲景](https://github.com/pariskang/CMLM-ZhongJing)

### Blogs
[多模态学习 知乎](https://www.zhihu.com/column/c_1506060216781697025)：整理、跟踪多模态学习领域知识~
[学姐带你读论文 知乎 鱼子酱](https://www.zhihu.com/column/c_1624072389892947968)：AI领域高分必读论文解读
[自然语言处理/搜索 知乎 张俊林](https://www.zhihu.com/people/zhang-jun-lin-76)
[图神经网络 知乎](https://www.zhihu.com/column/c_1391463088357449728)
[AI算法工程师Future B站](https://space.bilibili.com/1190294984)
[霹雳吧啦Wz B站](https://space.bilibili.com/18161609?spm_id_from=333.337.0.0)
[PyTorch深度学习快速入门教程【土堆】B站](https://www.bilibili.com/video/BV1hE411t7RN/?spm_id_from=333.337.search-card.all.click&vd_source=45123d730a843dbbdd5bee7558ca14e9)
[李宏毅2023春机器学习课程 B站](https://www.bilibili.com/video/BV1TD4y137mP/?p=1&vd_source=45123d730a843dbbdd5bee7558ca14e9)
[Transformer、GPT、BERT，预训练语言模型的前世今生](https://www.cnblogs.com/nickchen121/p/15105048.html)
[我是大尾巴狼呀- B站](https://www.yuque.com/floatingisland/bq7amh)
[Poll的笔记](https://www.cnblogs.com/maybe2030)
[Hugging Face](https://huggingface.co)
[Kaggle](https://www.kaggle.com)
[我爱自然语言处理](https://www.52nlp.cn)
[飞桨 基于深度学习的自然语言处理](https://aistudio.baidu.com/education/group/info/24177)
[16篇AI变现实战案例](https://ki6j1b0d92h.feishu.cn/wiki/wikcnBXS5BaZNe1CYkjNIry4dTc)
### Tools
- [ChatGPT](https://chat.openai.com)
- [Create blogs from YouTube videos](https://www.videotoblog.ai)
- [通义千问](https://tongyi.aliyun.com/qianwen/)
- [Coze](https://www.coze.com/store/bot)
- [讯飞智文(一键生成Word、PPT文档)](https://zhiwen.xfyun.cn)
- [Kimi](https://kimi.moonshot.cn)
- [Papers with Code](https://paperswithcode.com)
## 工业
### 岗位描述
#### ＜算法实习生 - LLM>
职责描述：
- 文本生成相关：负责文本数据的收集、整理、过滤、清洗等工作，需要掌握数据分析和NLP工具的灵活应用，包括Python、GPT、BERT、Transformer等。同时需要对大模型针对垂类 领域进行优化、训练、部署等。
- 图像生成相关：负责文本生成图像，图像生成图像，文本生成视频，文本生成语音等工作，需要掌握多模态大模型的使用和调优能力。需要掌握计算机视觉和图像处理基本算法、常用深度学习算法，并在如下等方面有深入研究：GAN、扩散模型、图像生成、多模态生成等。
- 数字人相关：利用SOTA数字人技术，构建直播类数字人，实现更智能、更优质的客户服务体验，包括人物外观，语音合成，情感识别，动作合成等方面的技术研究与应用。

我们需要您具备：
- 具备计算机科学、数学、统计学或相关学科的高等学历；
- 具备数据科学和文本处理的相关能力，包括Pandas、Numpy、sklearn、Matplotlib等工具的使用经验；
- 精通深度学习框架TensorFlow或PyTorch，并具有使用其进行模型开发的经验；
- 具备文本预训练模型在垂直领域的应用和调优经验。熟悉LLM微调方法，如LORA，P-Tuning等；
- 具备 NLP 大模型的算法知识，熟悉常见的 NLP 算法（GPT、BERT等）和工具（Huggingface、LangChain等）。了解LLM基本原理和相关公开算法，如InstructGPT，LLama, ChatGLM等；
- 具备NLP中大型项目的算法和开发经验，包括但不限于人机对话、知识图谱、机器翻译等；

具有以下条件优先：
- 具备数字人生成相关的经验；
- 发表过AIGC等相关优秀论文优先；
- 具备文本生成、音频生成、视频生成等相关的经验；
- 具备机器视觉相关算法的开发和应用经验，包括但不限于图片分类、图片生成、风格迁移等；
- 具有微服务开发以及数据库查询经验，如Kubernetes、Docker、Redis、MongoDB等；
- 具备计算机科学、数学、统计学或相关学科的博士学历优先 --> -->
