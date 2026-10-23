---
title: AI辅助3D建模
date: '2024-06-21T17:28:19'
authors:
- jerry
tags:
- AI
- MLE
category: MLE
draft: true
---

<!-- # 训练过程
## Decomposition Network
We formulate the Decomposition Network $$ f_d $$ as a decoder
given a shape embedding $$ z $$ 
We formulate the Decomposition Network $$ f_d $$ as a decoder, trained to map input shape code $$ z $$ into a GMM representation. Given a shape embedding $$ z $$, we first split it into $$ p $$ distinct vectors $$ f_d(z) = Z^d $$, where $$ Z^d \in \mathbb{R}^{p \times d_{\text{model}}} $$ is a set of high dimensional parts embeddings $$ \{ z_j^d \}_{j=1}^p $$. The encoding of each part $$ z_j^d \in d_{\text{model}} $$ is further

projected to two sets of parameters: intrinsic surface geometry information $$ s_j \in d_{\text{surf}} $$, and extrinsic parameters represented by the Gaussian $$ g_j \in \mathbb{R}^{16} $$ :
$$
s_j = W_s z_j^d + b_s
$$

$$
g_j = W_d z_j^d + b_d
$$

Intuitively, $$ g_j $$ marks the area of influence of each part $$ j $$, whose detailed structural information is captured by $$ s_j $$. One of the advantages of this representation is that across the entire dataset, similar intra-category parts are represented using the same Gaussians in a consistent way.  -->
