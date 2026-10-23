---
title: MDP <马尔科夫决策过程>
date: '2024-04-23T19:51:05'
authors:
- jerry
tags:
- AI
- RL
- MLE
category: MLE
draft: false
---
<!-- 
## Markov Decision Process
A Markov Decision Process (MDP) is defined by: 
- A set of states, 𝑠 ∈ 𝒮
- A set of actions, 𝑎 ∈ 𝒜
- A transition model, 𝑃(𝑆<sub>t+1</sub> = 𝑠<sub>t+1</sub>|𝑆<sub>t</sub> = 𝑠<sub>t</sub>, 𝑎<sub>t</sub>)
    - 𝑆<sub>t</sub> is the **state** at time t
    - 𝑎<sub>t</sub> is the **action** taken at time t (not random)

- A **reward** function, 𝑟(𝑠)

## Solving an MDP: The Policy
- Since 𝑃(𝑆<sub>t+1</sub> = 𝑠<sub>t+1</sub>|𝑆<sub>t</sub> = 𝑠<sub>t</sub>, 𝑎<sub>t</sub>) and 𝑟(𝑠) depend only on the state (the model is Markov), a complete solution can be expressed as follows:
- What is the best action to take in any given state?
- A **policy**, 𝑎 = 𝜋(𝑠), is a function telling you, for any state 𝑠, what is the best action to take in that state.

## Utility
The **utility** of a state, 𝑢(𝑠), is defined to be:
- the sum of all current and future rewards that can be achieved if we start in state 𝑠, if we choose the best possible sequence of actions, and if we average over all possible results of those actions.

- The utility of a state, u(s), is the maximum, over all possible sequences of actions, of the expected value, over all possible results of those actions, of the total of all future rewards.  -->
