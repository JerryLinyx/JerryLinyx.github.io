---
title: Artificial Intelligence UIUC CS 440
date: '2024-05-02T01:45:56'
authors:
- jerry
tags:
- AI
- RL
- DL
- ML
- CV
- NLP
- LLM
- MLE
category: MLE
draft: false
---
<!--
## Formula Sheet

### Probability:
$P(X = x) = \text{Pr}(X = x)$ or $P(X = x) = \frac{d}{dx} \text{Pr}(X \leq x)$
$$P(X, Y) = P(X|Y)P(Y)$$
$$E[f(X,Y)] = \sum_{x,y} f(x,y)P(X = x, Y = y)$$
### MAP Decision:
$$f(x) = \arg \max_{y} P(Y = y|X = x)$$

### Bayes Error Rate:
$$E = \sum_{x} P(X = x) \min_{y} P(Y = y|X = x)$$

### Precision:
$$\text{Precision} = \frac{P(Y = 1|f(X) = 1)}{TP} = \frac{TP}{TP + FP}$$

### Recall-Sensitivity:
$$\text{Recall} = P(f(X) = 1|Y = 1) = \frac{TP}{TP + FN}$$

### Specificity:
$$\text{Specificity} = P(f(X) = 0|Y = 0) = \frac{TN}{TN + FP}$$

### Naive Bayes:
$$f(x) = \arg \max_{y} \left[ \ln P(Y = y) + \sum_{i=1}^{n} \ln P(W = w_i|Y = y) \right]$$

### Laplace Smoothing:
$$P(W = w_i|Y = y) = \frac{k + \text{Count}(w_i,y)}{k + \sum_{v} \text{Count}(v,y)}$$

### HMM:
$$v_1(j) = \pi(j)b_j(x_1)$$
$$v_t(j) = \max_{v-1} (i)a_{ij}b_j(x_t)$$
$$\psi_t(j) = \arg \max_{v-1} (i)a_{ij}b_j(x_t)$$
$$y^*(T) = \arg \max_{v}(T)(i)$$
$$y^*(t) = \psi_{t+1}(y^*(t+1))$$

### Demographic Parity:
$$P(f(X)|A = 1) = P(f(X)|A = 0)$$

### Equal Odds:
$$P(f(X)|Y, A = 1) = P(f(X)|Y, A = 0)$$

### Predictive Parity:
$$P(Y|f(X), A = 1) = P(Y|f(X), A = 0)$$

### Learning:
$$\mathcal{L} = E[\ell(Y, f(X))], \ell_{\text{emp}} = \frac{1}{n} \sum_{i=1}^{n} \ell(y_i, f(x_i))$$

### Linear Regression:
$$f(x) = w^T x + b$$
$$\mathcal{L} = \frac{1}{n} \sum_{i=1}^{n} \mathcal{L}_i, \mathcal{L}_i = \frac{1}{2} (e_i^2), e_i = f(x_i) - y_i$$

### Linear Classifier:
$$f(x) = \arg \max (Wx + b)$$

### Perceptron:
$$w_c = \begin{cases} 
w_c - \eta x & c = \arg \max (Wx + b) \\
w_c + \eta x & c = y \\
w_c & \text{otherwise}
\end{cases}$$

### Softmax:
$$f_c(x) = \frac{\exp(w_c^T x + b_c)}{\sum_{k=1}^{K} \exp(w_k^T x + b_k)} \quad \text{as } P(Y = c|x)$$

### Sigmoid:
$$\sigma(w^T x + b) = \frac{1}{1 + e^{-(w^T x + b)}} \quad \text{as } P(Y = 1|x)$$

### Cross Entropy:
$$\mathcal{L} = -\ln f_y(x), \quad \frac{\partial \mathcal{L}}{\partial f_c(x)} = \begin{cases} 
\frac{-1}{f_y(x)} & c = y \\
0 & \text{otherwise}
\end{cases}$$

### SGD (Stochastic Gradient Descent):
$$w_c = w_c - \eta \frac{\partial \mathcal{L}}{\partial w_c} = \begin{cases} 
w_c - \eta (f_c(x) - 1)x & c = y \\
w_c - \eta f_c(x)x & \text{otherwise}
\end{cases}$$

### Pinhole Camera:
$$x' = \frac{x}{z}, \quad y' = \frac{y}{z}, \quad f' = \frac{f}{z}$$

### Image Gradient:
$$h_x(x', y') = \frac{h(x' + 1, y') - h(x' - 1, y')}{2}$$
$$h_y(x', y') = \frac{h(x', y' + 1) - h(x', y' - 1)}{2}$$

### Convolution:
$$y[k,l] = \sum_{i,j} x[k-i,l-j] \cdot h[i,j], \quad \frac{\partial h[i,j]}{\partial x[k-i,l-j]}$$

### Max Pooling:
$$z[m] = \max \{ y[k] | (m-1)p+1 \leq k \leq mp \}, \quad \frac{\partial z[m]}{\partial y[j]} = \begin{cases} 
1 & j = \arg \max \{ y[k] \} \\
0 & \text{otherwise}
\end{cases}$$

### Admissible:
$$h(n) \leq h(n)$$

### Consistent:
$$h(n) - h(m) \leq h(n,m)$$

### Value Iteration:
$$u_i(s) = r(s) + \gamma \max_a \sum_{s'} P(s'|s, a)u_{i-1}(s')$$

### Policy Evaluation:
$$u_t(s) = r(s) + \gamma \sum_{s'} P(s'|s, t)u_t(s')$$

### Policy Improvement:
$$\pi_{t+1}(s) = \arg \max_a \sum_{s'} P(s'|s, a)u_t(s')$$

### Alpha-Beta Max Node:
$$v = \max_{\text{child}}(v, \text{child}); \quad \alpha = \max(\alpha, \text{child})$$

### Alpha-Beta Min Node:
$$v = \min_{\text{child}}(v, \text{child}); \quad \beta = \min(\beta, \text{child})$$

### Expectiminimax:
$$u(s) = \begin{cases} 
\max_a \sum_{s'} P(s'|a, u(s')) & s \in \text{max states} \\
\min_a \sum_{s'} P(s'|a, u(s')) & s \in \text{min states}
\end{cases}$$

### Mixed Nash Equilibrium:
$$P(A = 0) = \frac{0.8}{0.0}, P(A = 1) = \frac{1.0}{1.0}, P(B = 0) = \frac{1.0}{1.0}, P(B = 1) = \frac{1.0}{1.0}$$

### Unification:
$$\mathcal{S}: \{T_p, V_p\} \rightarrow \{T_v, V_v\} \text{ such that } S(P) = S(Q) = U$$

### CBOW Generative:
$$\mathcal{L} = -\frac{1}{T} \sum_{t=1}^T \sum_{c \neq 0} \ln \frac{\exp(v'_{T_v})}{\sum \exp(v'_{T_v+j})}$$

### Skip-gram Contrastive:
$$\mathcal{L} = -\frac{1}{T} \sum_{t=1}^T \left( \sum_{v \in V_{s_t}(w)} \ln \frac{1}{1+e^{-v'}} + \sum_{v \in V_{s_t}(w)} \ln \frac{1}{1+e^{v'}} \right)$$

### Transformer:
$$c_t = \sum_{s} \alpha(t, s)V_s$$

### Attention:
$$\alpha(t, s) = \frac{\exp(q_t' k_s)}{\sum_s \exp(q_t' k_s)}$$

### Model-based Learning:
$$P(S_{t+1}|s_t, a) = \frac{\text{Count}(s_t, a, S_{t+1}) + k}{\sum_s \text{Count}(s_t, a, s') + k}$$

### On-policy learning:
$$W_a \leftarrow W_a + \eta \nabla_W \ln P(S_{t+1}|s_t, a)$$

### Off-policy learning:
$$W \leftarrow W + \eta \nabla_W \ln P(S_{t+1}|s_t, a)$$

### Epsilon-first:
$$N_{\text{first}} = \frac{1}{\epsilon}$$

### Epsilon-greedy:

$$ \text{If } z \leq \epsilon \text{ then explore,} z \in (0, 1)$$

### TD-learning:
$$q_{\text{local}}(s_t, a) = r_t + \gamma \max_{a'} q(s_{t+1}, a')$$

### SARSA:
$$q_{\text{local}}(s_t, a) = r_t + \gamma q(s_{t+1}, a+1)$$

### Q-learning:
$$q_{t+1}(s_t, a) = q(s_t, a) + \eta \left[ \gamma q(s_{t+1}, a) - q(s_t, a) \right]$$

### Deep Q:
$$\theta_{t+1} = \theta_t - \eta \frac{1}{2} \delta^2 (q(s_t, a) - q_{\text{local}}(s_t, a))^2$$

### Policy Gradient:
$$\frac{\partial U(s)}{\partial \theta} = \mathbb{E} \left[ \frac{\partial P(\tau)}{\partial \theta} \frac{\partial \ln P(\tau)}{\partial \theta} v(\tau) \right] = \mathbb{E} \left[ \frac{\partial \ln P(\tau)}{\partial \theta} v(\tau) \right]$$

### Standard Error:
$$M = \frac{1}{n} \sum_{i=1}^n Y_i, \quad \text{stdev}(M) = \frac{\sigma}{\sqrt{n}}$$ --> 
