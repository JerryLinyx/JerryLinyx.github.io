---
title: "ACM 模式"
slug: /notes/leetcode/ACM模式
---

[Python ACM 模式下的输入输出 - CSDN](https://blog.csdn.net/single_dog/article/details/125702956)
[ACM模式笔试编程题Python3的输入和输出格式详解](https://www.bilibili.com/read/cv15996133)  
[ACM模式下链表、二叉树的输入Python实现](https://blog.csdn.net/weixin_42327752/article/details/124381258)
## 1. 输入函数模板

### 1.1 获取输入数据

Python输入数据主要通过`input()`函数实现，`input()`会读取控制台一行的输入，如果输入有多行的话，需要多次使用`input()`。
```python
# 输入为: 1 2 3 4 5
a = input()
# a = '1 2 3 4 5'

a = input().split() # 1. 读取一行，按空格分割成字符串列表 
map(int, ...) # 2. 将每个字符串转换为整数 
list(...) # 3. 转换成列表
```

Python3中的`input()`会将接受的数据返回为一个`string`类型，如果一行中有多个数据的话，则需要使用`split()`进行切割。`split()`切割后返回一个列表。
```python
# 输入为： 1 2 3 4 5
a = input().split() # split()默认以空字符为分隔符，包括空格、换行(\n)、制表符(\t)等
# a = ['1', '2', '3', '4', '5']

# 输入为：1,2,3,4,5
b = input().split(',') # 以逗号为分隔符
# b = ['1', '2', '3', '4', '5']
```

因为`input()`返回的是`string`，分割后也是一个字符列表，如果输入数据是数字则需要进行类型转换。可以单个转换或是用列表批量转换，或者是使用`map()`并行转换。`map()`函数返回的是一个迭代器，不能改变值，如果需要改变值的话还需要转换成列表
```python
# 输入为： 1 
a = int(input()) # 单个转换
  
# 输入为：1 2 3 4 5
b = input().split() # b = ['1', '2', '3', '4', '5']
c = [int(i) for i in b] # 使用列表进行批量转换 c = [1, 2, 3, 4, 5]
d = [int(i) for i in input().split()] # 当然可以一步倒位
  
# 使用map进行并行转换
e = map(int, input().split()) # 此时e是一个map迭代器，不能赋值，也不能索引
f = list(e) # 转换为列表，e = [1, 2, 3, 4, 5]
g = list(map(int, input().split())) # 一步到位  
```

## 2. 输出函数模板

Python3的输出主要靠`print()`函数，就是把结果打印至终端。需要对`print()`函数的`sep`和`end`两个参数有一定的了解，可以查看[菜鸟教程](https://www.runoob.com/python3/python-func-print.html)  
```python
# 输出 a=1, b=2, c=3
print(a, b, c) # print默认以空格为分隔符
# output：1 2 3
print(a, b, c, sep=',') # 以逗号为分隔符
# output：1,2,3


# 最终结果 res = [1, 2, 3]
# 1. 直接输出列表
print(res)
# 2. 输出列表, 每个元素单独输出
for i in range(len(res)):
    print(res[i])
#output: 1
#        2
#        3

# 3. 输出列表，每个元素单独输出，同时还需要在同一行输出, 以空格分隔
for i in range(len(res)):
    print(res[i], end=' ')  # end的默认值是'\n'，即换行
    # output: 1 2 3 
    
# res = ['a', 'b', 'c']
# 输出是一个字符串
print("".join(res))
# output: abc

# 输出是一个字符串，且用 * 号分隔
print("*".join(res))
# output: a*b*c
# 如果用 print(res[i], end = '*') 的话，输出就是 a*b*c*了，在末尾还多了一个*
```

### 3. 链表的输入输出

acm模式中的链表也是通过输入一个数组来模拟的，所以获取输入数据和前面没有什么不同。  
主要在于定义链表结构、将输入数据转化为链表以及输出链表。  
[华为机试：从单向链表中删除指定值的节点](https://www.nowcoder.com/practice/f96cd47e812842269058d483a11ced4f?tpId=37&tqId=21271&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D37&difficulty=undefined&judgeStatus=undefined&tags=&title=)  
[华为机试：输出单向链表中倒数第k个节点](https://www.nowcoder.com/practice/54404a78aec1435a81150f15f899417d?tpId=37&tqId=21274&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D37&difficulty=undefined&judgeStatus=undefined&tags=&title=)
```python
# 定义链表结构
class ListNode:
    def __init__(self,val,next=None):
        self.val = val
        self.next = next

# 数组转链表
def nums2ListNode(nums):
    dummy = ListNode(None)
    root = ListNode(nums[0])
    dummy.next = root
    i = 1
    while i < len(nums):
        node = ListNode(nums[i])
        root.next = node
        root = root.next
        i += 1
        root.next = None
    return dummy.next

# 打印链表
nums = [1,2,3,4,5]
root = nums2ListNode(nums)
while root:
    print(root.val)
    root = root.next
```

## 4. 二叉树的输入输出
### 4.1 完全二叉树格式输入
acm模式中一般用输入一行数字代表一个二叉树，一般会以完全二叉树格式输入。这行数字的按照层序遍历的顺序排列，且其中空节点一般会用特定的符号表示，如0或是null
可以直接用数组表示二叉树，例如列表Tree, 将Tree[i]的左子树和右子树分别为Tree[2*i+1]和Tree[2*i+2]，不过会比较占用空间。

```python
# 中序遍历
def inorder_traversal(nums, index):
    if index >= len(nums) or nums[index] == -1:
        return
    left, right = 2 * index + 1, 2 * index + 2
    inorder_traversal(nums, left)
    print(nums[index], end = ' ')
    inorder_traversal(nums, right)
	  
	  
# 输入为 1 2 3 null 4 null 5
#      1
#    /   \
#   2     3
#    \     \
#     4     5
if __name__ == "__main__":
    nums = input().split()
    nums = [int(num) if num != 'null' else -1 for num in nums]
    inorder_traversal(nums, 0)

    # output: 2 4 1 3 5 

```

## 注意事项
Python执行效率很低，尝试用PyPy提交
递归深度默认只有1000，DFS前先加sys.setrecursionlimit(200000)
