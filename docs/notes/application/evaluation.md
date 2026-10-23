---
title: "LLM Evaluation"
slug: /notes/application/evaluation
---

GaaS: Agent as a Service
场景：
- 内容 
- 消费 
- 编程 
- 研究

## Prompt 如何评判

>对提示词工程建设、调优有一定的经验与心得 

prompt 是一个非常适合展示思考过程的点。 亮点准备不要只展示最终结果。建议准备一个迭代故事。第一版prompt有哪些缺点，第二版改了什么有什么好处？

Prompt 工程：包括指令设计、上下文构造、few-shot 示例、思维链等技巧。

### 一、评判维度

**1. 任务完成度（Task Completion）**

- Prompt 是否能让模型准确完成目标任务？
- 通常用 **accuracy / success rate** 来衡量，针对有明确答案的任务可以用 exact match、F1 等指标。

**2. 输出质量（Output Quality）**

- **相关性**：回答是否切题
- **完整性**：是否覆盖了所有要求的内容
- **一致性**：多次调用输出是否稳定（低 variance）
- **格式遵从度**：是否按要求输出 JSON、Markdown、function call 等结构化格式

**3. 鲁棒性（Robustness）**

- 面对 edge case、adversarial input、模糊指令时，Prompt 是否仍能产出合理结果
- 是否容易被 prompt injection 绕过（在 Agent 场景中尤其关键）

**4. 效率（Efficiency）**

- Token 消耗：同样效果下，更短的 prompt 更优（降低延迟和成本）
- 是否有冗余指令或重复约束
### 二、评判方法

**1. 基于标注数据的自动评估（Benchmark-driven）**

- 准备 test set（input → expected output），跑 batch evaluation
- 指标：accuracy、BLEU、ROUGE、exact match，取决于任务类型
- 适合有明确 ground truth 的场景

**2. LLM-as-Judge（模型评模型）**

- 用一个更强的模型（如 GPT-4 / Claude Opus）对输出打分
- 通常设计一个评分 rubric（如 1-5 分，按相关性、完整性、准确性等维度）
- 优点：可扩展性强，适合开放式任务；缺点：存在 bias（如偏好更长的回答）

**3. A/B Testing / 人工评估**

- 让标注员对两个 prompt 版本的输出做 side-by-side comparison
- 金标准，但成本高、速度慢

**4. 对比实验（Ablation）**

- 系统性地增删 prompt 中的组件（few-shot examples、chain-of-thought、角色设定等），观察指标变化
- 帮助定位哪些部分真正起作用

### 三、在 Agent 系统中的特殊考量

- **Tool calling 准确率**：Agent 是否选对了工具、参数是否正确
- **Planning 质量**：多步任务中，分解的步骤是否合理、顺序是否正确
- **Hallucination rate**：是否编造了不存在的工具或 API
- **Safety / Guardrails**：是否遵守了系统层面的约束（如不执行危险操作）

实际项目中，通常会建立一个 **Prompt Evaluation Pipeline**：

1. 维护一个 **eval dataset**（覆盖正常 case + edge case）
2. 每次修改 prompt 后跑 **regression test**
3. 用 LLM-as-Judge + 关键指标自动打分
4. CI/CD 集成，prompt 变更像代码一样走 review + test

常用工具包括：Anthropic 的 Eval 框架、LangSmith、Braintrust、Promptfoo 等。

## LLM Evaluation Benchmarks 梳理

#### 一、NLU 基础能力评估（早期）

##### GLUE（General Language Understanding Evaluation, 2018）

- **目的**：评估模型对自然语言的**基础理解能力**
- **内容**：9 个子任务，涵盖情感分析（SST-2）、自然语言推理（MNLI、RTE）、语义相似度（STS-B、QQP）、语法判断（CoLA）等
- **形式**：都是分类或回归任务，有明确 ground truth
- **指标**：各子任务分别算分，取平均得到 GLUE Score
- **现状**：BERT 时代就已被刷到接近人类水平（~89 分），现在**已不再具有区分度**，主要有历史意义

##### SuperGLUE（2019）

- **目的**：GLUE 被刷爆后的**升级版**，提高难度
- **改进**：
    - 任务更难：加入了多句推理（MultiRC）、因果推理（COPA）、指代消解（WSC）、阅读理解（ReCoRD）等
    - 更注重**推理能力**而非简单模式匹配
- **现状**：同样在 T5/GPT-3 时代被超越，对当前 LLM 区分度也不足了

> **面试要点**：GLUE/SuperGLUE 代表了 **pre-LLM 时代**的评估思路——把 NLU 拆成独立子任务分别评估。LLM 时代转向了更综合、更开放的评估方式。

---

#### 二、大规模知识与推理评估（LLM 时代）

##### MMLU（Massive Multitask Language Understanding, 2021）

- **目的**：评估模型的**广度知识和专业推理能力**
- **内容**：57 个学科，覆盖 STEM、人文、社科、职业考试等，共约 15,000+ 道选择题
- **形式**：4 选 1 的多选题，zero-shot 或 few-shot 回答
- **难度分级**：从高中水平到专业级（如医学执照、法律考试）
- **指标**：accuracy，按学科分组报告
- **价值**：目前**最广泛引用**的 LLM 综合能力 benchmark 之一，几乎所有新模型发布都会报 MMLU 分数
- **局限**：纯选择题格式，无法衡量生成能力；存在数据污染风险（训练数据可能已包含这些题目）

> **延伸**：MMLU-Pro 是近期的增强版，增加了选项数量（10 选 1）和更多推理题，提高区分度。

##### BIG-Bench（Beyond the Imitation Game Benchmark, 2022, Google）

- **目的**：探测 LLM 的**能力边界**，尤其是 emergent abilities
- **内容**：200+ 个任务，由社区贡献，非常多样化——逻辑推理、常识、多语言、数学、代码、创造力、甚至社会偏见检测
- **特色**：
    - 很多任务故意设计得**非常规**，比如"判断一个笑话是否好笑"、"从棋盘状态推断下一步"
    - 用来发现模型在 scale up 时突然涌现的能力（emergent behavior）
- **BIG-Bench Hard (BBH)**：从中筛选出模型表现最差的 23 个困难任务，聚焦于 CoT 推理场景
- **指标**：因任务类型多样，各任务独立评分

> **面试要点**：BIG-Bench 的核心价值是**探索性评估**——不是为了排名，而是为了发现"模型到底会什么、不会什么"。

---

#### 三、综合全面评估框架

##### HELM（Holistic Evaluation of Language Models, Stanford, 2022）

- **目的**：提供一个**标准化、多维度、可复现**的 LLM 评估框架
    
- **核心理念**：不只看"准不准"，要全面评估。定义了 7 个评估维度：
    
    1. **Accuracy**（准确性）
    2. **Calibration**（置信度校准——模型说"80% 确定"时是否真有 80% 对）
    3. **Robustness**（对输入扰动的鲁棒性）
    4. **Fairness**（不同人群上的表现差异）
    5. **Bias**（输出中的偏见）
    6. **Toxicity**（有害内容生成率）
    7. **Efficiency**（推理速度和资源消耗）
- **覆盖范围**：42 个场景（scenario）× 多个模型，统一跑分，结果公开在 leaderboard 上
    
- **价值**：**评估方法论层面的贡献**大于具体分数——它定义了"全面评估一个 LLM 应该看什么"
    

> **面试要点**：HELM 体现了从"单一指标"到"多维评估"的范式转变。在生产系统中设计 eval 时，可以参考 HELM 的维度框架。

---

#### 四、推理性能评估

##### LLMPerf（2023）

- **目的**：评估 LLM **推理服务的工程性能**，不关心回答质量，只关心速度和吞吐
- **核心指标**：
    - **TTFT（Time To First Token）**：首 token 延迟，直接影响用户体感
    - **ITL（Inter-Token Latency）**：token 间延迟，影响流式输出的流畅度
    - **Throughput（output tokens/sec）**：吞吐量
    - **请求成功率**：高并发下是否丢请求
- **测试方式**：向各 LLM API 提供商（OpenAI、Anthropic、Together、Anyscale 等）发送标准化请求，统计性能
- **价值**：帮助工程师在选型时做**性能基准对比**，尤其在选择 serving 方案时非常实用

> LLMPerf 关注的是 **infra 层面**，和前面几个关注模型能力的 benchmark 形成互补。在 Agent 系统中，推理延迟直接影响用户体验和多步任务的总耗时。


## 常见 LLM Evaluation Metrics

按**评估目标**分类，从文本质量到安全性逐层展开：

---

### 一、文本重叠类指标（基于 n-gram 匹配）

这类指标通过比较生成文本与参考文本的**词级重叠度**来评分，简单高效但有明显局限。

#### BLEU（Bilingual Evaluation Understudy）

- **原始场景**：机器翻译
- **原理**：计算生成文本中的 n-gram 在参考文本中出现的比例，取 1-gram 到 4-gram 的加权几何平均，再乘以一个 brevity penalty（防止生成过短的文本偷高分）
- **偏向**：**Precision 导向**——"生成的内容有多少是对的"
- **范围**：0-1，越高越好
- **局限**：同义表达得不到分（"happy" vs "joyful" 得 0 分）、不考虑语序语义、和人类判断相关性一般

#### ROUGE（Recall-Oriented Understudy for Gisting Evaluation）

- **原始场景**：文本摘要
- **偏向**：**Recall 导向**——"参考文本中的内容被覆盖了多少"
- **常见变体**：
    - **ROUGE-N**：n-gram 级别的 recall（ROUGE-1 看 unigram，ROUGE-2 看 bigram）
    - **ROUGE-L**：基于最长公共子序列（LCS），能部分捕捉语序信息
- **局限**：和 BLEU 类似，无法理解语义

#### METEOR

- **改进点**：在 n-gram 匹配基础上加入了**同义词匹配**（基于 WordNet）和**词干还原**
- **比 BLEU 更好**的一点是和人类判断的相关性更高
- **但仍然是浅层匹配**，不理解深层语义

> **面试一句话总结**：BLEU 看 precision、ROUGE 看 recall、METEOR 加了同义词。它们都是 **surface-level** 指标，在 LLM 时代主要用于**粗筛**或特定任务（翻译、摘要），不适合评估开放式生成。

---

### 二、语义相似度指标（基于 Embedding）

#### BERTScore

- **原理**：用预训练模型（如 BERT）把生成文本和参考文本都编码成 token-level embeddings，然后算每个 token 与对方最相似 token 的 cosine similarity，汇总为 Precision / Recall / F1
- **优势**：能识别同义改写（"The cat sat on the mat" ≈ "A feline rested on the rug"）
- **适用**：摘要、翻译、paraphrase 等需要语义等价判断的场景

#### MoverScore

- **原理**：基于 Word Mover's Distance，计算把生成文本"搬运"成参考文本的最小语义距离
- **优势**：考虑了全局语义对齐，而非 BERTScore 的贪心匹配

> **面试要点**：这类指标解决了 n-gram 方法"同义不得分"的问题，但仍然依赖参考文本，对于真正开放式的生成任务（如创意写作）仍有局限。

---

### 三、生成质量专项指标

#### Perplexity（困惑度）

- **定义**：模型对测试文本的平均不确定度，数学上是交叉熵的指数：$PPL = e^{H(p, q)}$
- **直觉**：模型在预测下一个 token 时平均"犹豫"了多少个选项。PPL=10 意味着模型平均在 10 个 token 中犹豫
- **越低越好**：说明模型对语言的建模越准确
- **注意**：只衡量语言模型本身的质量，**不衡量任务完成度**。一个 PPL 很低的模型可能产生流畅但完全错误的内容

#### Hallucination Rate（幻觉率）

- **定义**：生成内容中无法被来源/事实支撑的 claim 的比例
- **衡量方式**：
    - **自动**：用 NLI 模型判断生成的每个 claim 是否被 source 文档 entail
    - **人工**：标注员逐句标记 faithful / hallucinated
- **在 RAG 系统中尤其关键**：模型是否忠实于检索到的文档

#### Factual Consistency / Faithfulness

- **与 hallucination 互补**：hallucination 看"编了多少"，faithfulness 看"忠实了多少"
- **常用工具**：TRUE benchmark、FActScore（把长文本拆成 atomic facts 逐个验证）

---

### 四、任务特定指标

#### Exact Match (EM)

- 输出与 ground truth **完全一致**才算对
- 适合：分类、短答案 QA、tool name 选择

#### Pass@k（代码生成）

- 生成 k 次代码，只要有 1 次通过全部测试用例就算成功
- HumanEval benchmark 的标准指标
- 实际计算用无偏估计：$\text{pass@k} = 1 - \frac{\binom{n-c}{k}}{\binom{n}{k}}$，其中 n 是总生成次数，c 是通过次数

#### Tool Call Accuracy（Agent 场景）

- **Tool Selection Accuracy**：选对了哪个 tool
- **Argument Accuracy**：参数是否正确
- **Sequence Accuracy**：多步调用的顺序是否合理

---

### 五、人类偏好与对齐指标

#### Win Rate / ELO Rating

- **场景**：两个模型对同一问题生成回答，人类评委选择更好的那个
- **Chatbot Arena** 就是用 ELO 做排名，目前被认为是**最接近真实用户偏好**的评估方式
- 缺点：成本高、速度慢、不可大规模自动化

#### LLM-as-Judge Score

- 用强模型（如 Claude Opus / GPT-4）按 rubric 打分
- **常见维度**：helpfulness、correctness、coherence、harmlessness
- **评分模式**：
    - **Pointwise**：对单个输出打 1-5 分
    - **Pairwise**：对比两个输出，判断 A 更好 / B 更好 / 平手
- **已知偏差**：
    - Position bias：倾向选第一个
    - Verbosity bias：倾向选更长的回答
    - Self-preference：GPT-4 倾向给 GPT-4 的输出更高分
- **缓解方法**：交换顺序跑两次取平均、多 judge 投票

---

### 六、安全与对齐指标

#### Toxicity Score

- 用分类器（如 Perspective API）检测输出中的有害内容比例
- 衡量模型在被诱导时是否仍能保持安全

#### Bias / Fairness Metrics

- 测试模型对不同人群（性别、种族等）的输出是否存在系统性差异
- 比如给模型同一个问题，只改名字或人口统计信息，看回答是否一致

#### Attack Success Rate (ASR)

- 在 red-teaming / adversarial 测试中，恶意 prompt 成功绕过安全机制的比例
- **越低越好**

---
### 七、 ROSCOE（Reference-free Observable Scoring of Chain-of-thought Evaluation）

ROSCOE 专门用于评估模型的**推理过程质量**，而不仅仅是最终答案。这在 CoT（Chain-of-Thought）和 Agent 多步推理场景中非常关键——一个模型可能碰巧答对了，但推理链是错的；也可能最终答错了，但推理过程大部分是合理的。

**关键特性：Reference-free**——不需要 ground truth 推理链作为参考，这是它和 BLEU/ROUGE 等指标的本质区别。因为推理路径可以有很多种，强制对比一条"标准推理链"本身就不合理。

---

#### 评估维度

ROSCOE 定义了**四大维度**，覆盖推理链的不同质量层面：

**1. Semantic Alignment（语义对齐）**

- 推理步骤是否和原始问题/上下文语义相关
- 检测"跑题"——模型推着推着偏离了问题本身

**2. Semantic Similarity（语义相似度）**

- 相邻推理步骤之间的语义连贯性
- 检测"跳跃"——步骤之间缺乏逻辑过渡，突然出现不相关的内容

**3. Logical Inference（逻辑推断）**

- 每一步是否能从前面的步骤合理推出
- 这是最核心的维度——检测**逻辑谬误**，比如前提不支持结论、因果关系错误

**4. Informativeness（信息增量）**

- 每一步是否引入了新的有效信息推动推理前进
- 检测"空转"——模型在重复已知信息或生成无意义的 filler 步骤

---

#### 技术实现

ROSCOE 的打分不依赖人工标注，而是利用预训练语言模型来计算：

- 用 sentence embedding（如 SimCSE）衡量步骤间的语义关系
- 用 NLI 模型判断步骤间的蕴含关系（entailment / contradiction / neutral）
- 综合多个子指标，每个维度下有若干具体的 scoring function

整体是一个**可自动化、可规模化**的评估 pipeline。

---

#### 在 Agent 系统中的价值

- **Agent Planning 评估**：Agent 分解任务的过程本质上就是一条推理链，ROSCOE 可以评估这个 plan 是否逻辑自洽、步骤是否连贯
- **调试利器**：当 Agent 执行失败时，可以用 ROSCOE 的各维度定位到底是哪个环节出了问题——是跑题了？逻辑跳跃了？还是在空转？
- **区分"侥幸答对"和"真正会推理"**：仅看最终结果的 EM/accuracy 无法做到这一点



### 总结速查表

| 类别       | 指标                             | 核心特点                          | 适用场景                        |
| -------- | ------------------------------ | ----------------------------- | --------------------------- |
| 词级匹配     | BLEU / ROUGE / METEOR          | 简单快速，浅层                       | 翻译、摘要粗筛                     |
| 语义匹配     | BERTScore / MoverScore         | 理解同义，需参考文本                    | 改写、摘要                       |
| 生成质量     | Perplexity                     | 语言模型内在质量                      | 模型选型                        |
| 事实性      | Hallucination Rate / FActScore | 忠实度检测                         | RAG、知识问答                    |
| 任务完成     | EM / Pass@k / Tool Accuracy    | 硬指标，有明确对错                     | QA、代码、Agent                 |
| 人类偏好     | ELO / LLM-as-Judge             | 最接近真实体验                       | 开放式生成                       |
| 安全性      | Toxicity / ASR                 | 安全底线                          | 所有上线系统                      |
| **推理质量** | **ROSCOE**                     | **Reference-free，评估 CoT 推理链** | **CoT、Agent planning、多步推理** |

延展

- **指标组合**：生产中通常不用单一指标，而是组合多个。比如一个 RAG 系统可能同时看 faithfulness + answer relevancy + latency。
- **RAGAS 框架**：专门为 RAG pipeline 设计的评估框架，包含 faithfulness、answer relevancy、context precision、context recall 四个核心指标。
- **评估成本权衡**：自动指标便宜但粗糙，人类评估精准但昂贵，LLM-as-Judge 是目前最佳的性价比折中。

---
