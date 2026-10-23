---
title: "Python 语法"
slug: /notes/leetcode/python-syntax
---

[Python 3 菜鸟教程](https://www.runoob.com/python3/python3-tutorial.html)

## 字符串

| **方法**    | **含义** | **允许内容**                     |
| --------- | ------ | ---------------------------- |
| isalnum() | 字母或数字  | 字母(中文也算) + 数字，空则return False |
| isalpha() | 纯字母    | 只有字母                         |
| isdigit() | 纯数字    | 只有数字                         |
| isspace() | 空白     | 空格/Tab                       |

### 分词
split
去掉标点再分词 ```words = re.findall(r"\b\w+\b", s)```



## List

Python 中 List（列表）是最常用的数据结构之一，用于存储有序的元素集合。下面介绍主要用法：

### 创建列表

```python
# 空列表
lst = []
lst = list()

# 带初始值的列表
lst = [1, 2, 3, 4, 5]
lst = ['apple', 'banana', 'cherry']
lst = [1, 'hello', 3.14, True]  # 可以混合类型

# 使用 list() 函数
lst = list(range(5))  # [0, 1, 2, 3, 4]
```

### 访问元素

```python
lst = [10, 20, 30, 40, 50]

# 索引访问（从0开始）
print(lst[0])   # 10
print(lst[-1])  # 50（负索引从末尾开始）

# 切片
print(lst[1:4])   # [20, 30, 40]
print(lst[:3])    # [10, 20, 30]
print(lst[2:])    # [30, 40, 50]
print(lst[::2])   # [10, 30, 50]（步长为2）
```

### 修改列表

```python
lst = [1, 2, 3]

# 添加元素
lst.append(4)        # [1, 2, 3, 4]
lst.insert(1, 1.5)   # [1, 1.5, 2, 3, 4]
lst.extend([5, 6])   # [1, 1.5, 2, 3, 4, 5, 6]

# 删除元素
lst.remove(1.5)      # 删除第一个匹配的值
del lst[0]           # 删除指定索引
item = lst.pop()     # 删除并返回最后一个元素
item = lst.pop(0)    # 删除并返回指定索引的元素
lst.clear()          # 清空列表

# 修改元素
lst[0] = 100
lst[1:3] = [200, 300]
```

### 常用方法

```python
lst = [3, 1, 4, 1, 5, 9, 2]

# 查询
lst.index(4)      # 返回第一个匹配值的索引：2
lst.count(1)      # 统计某值出现次数：2
len(lst)          # 列表长度：7

# 排序
lst.sort()              # 原地排序（升序）
lst.sort(reverse=True)  # 降序
sorted_lst = sorted(lst)  # 返回新的排序列表

# 反转
lst.reverse()           # 原地反转
reversed_lst = lst[::-1]  # 返回新的反转列表

# 复制
new_lst = lst.copy()
new_lst = lst[:]
```

### 列表推导式

```python
# 基本用法
squares = [x**2 for x in range(10)]

# 带条件
evens = [x for x in range(20) if x % 2 == 0]

# 嵌套
matrix = [[i*j for j in range(3)] for i in range(3)]
```

### 遍历列表

```python
lst = ['a', 'b', 'c']

# 遍历元素
for item in lst:
    print(item)

# 遍历索引和元素
for index, item in enumerate(lst):
    print(f"{index}: {item}")
```

### 其他操作

```python
# 合并
lst1 = [1, 2]
lst2 = [3, 4]
combined = lst1 + lst2  # [1, 2, 3, 4]

# 重复
repeated = lst1 * 3  # [1, 2, 1, 2, 1, 2]

# 成员检查
if 2 in lst1:
    print("找到了")

# 最大值、最小值、求和
numbers = [1, 5, 3, 9, 2]
print(max(numbers))  # 9
print(min(numbers))  # 1
print(sum(numbers))  # 20
```

列表是可变的（mutable），这意味着创建后可以修改其内容。如果需要不可变的序列，可以使用元组（tuple）。

### 列表比较

列表比较需要引入 operator 模块的 eq 方法（详见：[Python operator 模块](https://www.runoob.com/python3/python-operator.html)）：

导入 operator 模块  
```python
import operator  

a = [1, 2]  
b = [2, 3]  
c = [2, 3]  
print("operator.eq(a,b): ", operator.eq(a,b))  
print("operator.eq(c,b): ", operator.eq(c,b))  
```

以上代码输出结果为：
```bash
operator.eq(a,b):  False
operator.eq(c,b):  True
```


## 字典(Dictionary)

字典是 Python 中最重要的数据结构之一,用于存储键值对(key-value pairs)。

### 1. 创建字典

```python
# 空字典
dict1 = {}
dict2 = dict()

# 直接创建
person = {
    'name': 'Alice',
    'age': 25,
    'city': 'New York'
}

# 使用 dict() 构造函数
dict3 = dict(name='Bob', age=30)
print(dict3)  # {'name': 'Bob', 'age': 30}

# 从键值对列表创建
pairs = [('a', 1), ('b', 2), ('c', 3)]
dict4 = dict(pairs)
print(dict4)  # {'a': 1, 'b': 2, 'c': 3}

# 使用 dict.fromkeys() 创建
keys = ['x', 'y', 'z']
dict5 = dict.fromkeys(keys, 0)
print(dict5)  # {'x': 0, 'y': 0, 'z': 0}

# 字典推导式
dict6 = {x: x**2 for x in range(5)}
print(dict6)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

### 2. 访问元素

```python
person = {'name': 'Alice', 'age': 25, 'city': 'New York'}

# 使用方括号访问
print(person['name'])  # Alice

# 访问不存在的键会报错
# print(person['country'])  # KeyError

# 使用 get() 方法(推荐)
print(person.get('name'))     # Alice
print(person.get('country'))  # None (不会报错)
print(person.get('country', 'USA'))  # USA (指定默认值)

# 获取所有键
print(person.keys())    # dict_keys(['name', 'age', 'city'])
print(list(person.keys()))  # ['name', 'age', 'city']

# 获取所有值
print(person.values())  # dict_values(['Alice', 25, 'New York'])

# 获取所有键值对
print(person.items())   # dict_items([('name', 'Alice'), ('age', 25), ('city', 'New York')])
```

### 3. 添加和修改元素

```python
person = {'name': 'Alice', 'age': 25}

# 添加新键值对
person['city'] = 'New York'
print(person)  # {'name': 'Alice', 'age': 25, 'city': 'New York'}

# 修改已存在的值
person['age'] = 26
print(person)  # {'name': 'Alice', 'age': 26, 'city': 'New York'}

# update() 方法 - 批量更新
person.update({'age': 27, 'country': 'USA'})
print(person)  # {'name': 'Alice', 'age': 27, 'city': 'New York', 'country': 'USA'}

# update() 也可以接受关键字参数
person.update(job='Engineer', salary=80000)
print(person)

# setdefault() - 如果键不存在则设置,存在则返回现有值
person.setdefault('email', 'alice@email.com')
print(person.get('email'))  # alice@email.com

person.setdefault('name', 'Bob')  # name已存在,不会修改
print(person.get('name'))  # Alice (未被修改)
```

### 4. 删除元素

```python
person = {'name': 'Alice', 'age': 25, 'city': 'New York', 'country': 'USA'}

# 使用 del 删除指定键
del person['country']
print(person)  # {'name': 'Alice', 'age': 25, 'city': 'New York'}

# pop() - 删除并返回值
age = person.pop('age')
print(age)     # 25
print(person)  # {'name': 'Alice', 'city': 'New York'}

# pop() 指定默认值(键不存在时不会报错)
salary = person.pop('salary', 0)
print(salary)  # 0

# popitem() - 删除并返回最后一个键值对(Python 3.7+保证顺序)
item = person.popitem()
print(item)    # ('city', 'New York')
print(person)  # {'name': 'Alice'}

# clear() - 清空字典
person.clear()
print(person)  # {}
```

### 5. 检查键是否存在

```python
person = {'name': 'Alice', 'age': 25, 'city': 'New York'}

# 使用 in 运算符(推荐)
print('name' in person)     # True
print('country' in person)  # False

# 使用 not in
print('country' not in person)  # True

# 检查值是否存在
print('Alice' in person.values())  # True

# 检查键值对是否存在
print(('name', 'Alice') in person.items())  # True
```

### 6. 遍历字典

```python
person = {'name': 'Alice', 'age': 25, 'city': 'New York'}

# 遍历键
for key in person:
    print(key)
# name
# age
# city

# 遍历键(显式)
for key in person.keys():
    print(key)

# 遍历值
for value in person.values():
    print(value)
# Alice
# 25
# New York

# 遍历键值对(推荐)
for key, value in person.items():
    print(f"{key}: {value}")
# name: Alice
# age: 25
# city: New York

# 带索引遍历
for index, (key, value) in enumerate(person.items()):
    print(f"{index}. {key}: {value}")
# 0. name: Alice
# 1. age: 25
# 2. city: New York
```

### 7. 字典推导式

```python
# 基本字典推导式
squares = {x: x**2 for x in range(6)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# 带条件的字典推导式
even_squares = {x: x**2 for x in range(10) if x % 2 == 0}
print(even_squares)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

# 从两个列表创建字典
keys = ['a', 'b', 'c']
values = [1, 2, 3]
dict_from_lists = {k: v for k, v in zip(keys, values)}
print(dict_from_lists)  # {'a': 1, 'b': 2, 'c': 3}

# 交换键值
original = {'a': 1, 'b': 2, 'c': 3}
swapped = {v: k for k, v in original.items()}
print(swapped)  # {1: 'a', 2: 'b', 3: 'c'}

# 字符串转换
names = ['Alice', 'Bob', 'Charlie']
name_lengths = {name: len(name) for name in names}
print(name_lengths)  # {'Alice': 5, 'Bob': 3, 'Charlie': 7}
```

### 8. 嵌套字典

```python
# 创建嵌套字典
students = {
    'student1': {
        'name': 'Alice',
        'age': 20,
        'grades': {'math': 95, 'english': 88}
    },
    'student2': {
        'name': 'Bob',
        'age': 21,
        'grades': {'math': 87, 'english': 92}
    }
}

# 访问嵌套字典
print(students['student1']['name'])  # Alice
print(students['student1']['grades']['math'])  # 95

# 修改嵌套字典
students['student1']['age'] = 21
students['student1']['grades']['science'] = 90

# 遍历嵌套字典
for student_id, info in students.items():
    print(f"\n{student_id}:")
    for key, value in info.items():
        print(f"  {key}: {value}")
```

### 9. 字典的合并

```python
dict1 = {'a': 1, 'b': 2}
dict2 = {'c': 3, 'd': 4}
dict3 = {'a': 10, 'e': 5}

# 方法1: update() (修改原字典)
dict1_copy = dict1.copy()
dict1_copy.update(dict2)
print(dict1_copy)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# 方法2: ** 解包操作符(Python 3.5+)
merged = {**dict1, **dict2, **dict3}
print(merged)  # {'a': 10, 'b': 2, 'c': 3, 'd': 4, 'e': 5}

# 方法3: | 操作符(Python 3.9+)
merged2 = dict1 | dict2 | dict3
print(merged2)  # {'a': 10, 'b': 2, 'c': 3, 'd': 4, 'e': 5}

# 方法4: |= 操作符(Python 3.9+,修改原字典)
dict1_copy = dict1.copy()
dict1_copy |= dict2
print(dict1_copy)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}
```

### 10. 字典的复制

```python
original = {'a': 1, 'b': 2, 'c': [3, 4]}

# 浅拷贝 - 方法1
shallow1 = original.copy()

# 浅拷贝 - 方法2
shallow2 = dict(original)

# 浅拷贝 - 方法3
shallow3 = {**original}

# 注意:浅拷贝对嵌套对象只复制引用
shallow1['c'].append(5)
print(original['c'])  # [3, 4, 5] - 原字典也被修改了!

# 深拷贝(完全独立的副本)
import copy
original2 = {'a': 1, 'b': 2, 'c': [3, 4]}
deep = copy.deepcopy(original2)

deep['c'].append(5)
print(original2['c'])  # [3, 4] - 原字典未被修改
print(deep['c'])       # [3, 4, 5]
```

### 11. 常用字典操作和技巧

#### 11.1 计数器

```python
from collections import Counter

# 统计字符出现次数
text = "hello world"
char_count = Counter(text)
print(char_count)  # Counter({'l': 3, 'o': 2, 'h': 1, 'e': 1, ' ': 1, 'w': 1, 'r': 1, 'd': 1})

# 统计列表元素出现次数
fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple']
fruit_count = Counter(fruits)
print(fruit_count)  # Counter({'apple': 3, 'banana': 2, 'orange': 1})

# 获取最常见的元素
print(fruit_count.most_common(2))  # [('apple', 3), ('banana', 2)]

# 手动实现计数
words = ['apple', 'banana', 'apple', 'orange']
word_count = {}
for word in words:
    word_count[word] = word_count.get(word, 0) + 1
print(word_count)  # {'apple': 2, 'banana': 1, 'orange': 1}
```

#### 11.2 默认字典

```python
from collections import defaultdict

# 创建默认值为列表的字典
students_by_grade = defaultdict(list)
students_by_grade['A'].append('Alice')
students_by_grade['B'].append('Bob')
students_by_grade['A'].append('Andy')
print(dict(students_by_grade))  # {'A': ['Alice', 'Andy'], 'B': ['Bob']}

# 创建默认值为整数的字典
word_count = defaultdict(int)
for word in ['apple', 'banana', 'apple']:
    word_count[word] += 1
print(dict(word_count))  # {'apple': 2, 'banana': 1}

# 创建默认值为集合的字典
groups = defaultdict(set)
groups['fruits'].add('apple')
groups['fruits'].add('banana')
groups['vegetables'].add('carrot')
print(dict(groups))  # {'fruits': {'apple', 'banana'}, 'vegetables': {'carrot'}}
```

#### 11.3 有序字典

```python
from collections import OrderedDict

# Python 3.7+ 普通字典已经保持插入顺序
# OrderedDict 主要用于需要明确顺序的场景

# 创建有序字典
od = OrderedDict()
od['c'] = 3
od['a'] = 1
od['b'] = 2
print(od)  # OrderedDict([('c', 3), ('a', 1), ('b', 2)])

# move_to_end() - 移动键到末尾或开头
od.move_to_end('a')  # 移到末尾
print(od)  # OrderedDict([('c', 3), ('b', 2), ('a', 1)])

od.move_to_end('b', last=False)  # 移到开头
print(od)  # OrderedDict([('b', 2), ('c', 3), ('a', 1)])
```

### 12. 实际应用场景

#### 场景1: 分组数据

```python
# 按首字母分组名字
names = ['Alice', 'Bob', 'Andy', 'Charlie', 'Anna', 'David']

grouped = {}
for name in names:
    first_letter = name[0]
    if first_letter not in grouped:
        grouped[first_letter] = []
    grouped[first_letter].append(name)

print(grouped)
# {'A': ['Alice', 'Andy', 'Anna'], 'B': ['Bob'], 'C': ['Charlie'], 'D': ['David']}

# 使用 defaultdict 更简洁
from collections import defaultdict

grouped2 = defaultdict(list)
for name in names:
    grouped2[name[0]].append(name)

print(dict(grouped2))
```

#### 场景2: 缓存/记忆化

```python
# 斐波那契数列 - 使用字典缓存
def fibonacci(n, cache={}):
    if n in cache:
        return cache[n]
    
    if n <= 1:
        return n
    
    result = fibonacci(n-1, cache) + fibonacci(n-2, cache)
    cache[n] = result
    return result

print(fibonacci(100))  # 很快计算出结果
```

#### 场景3: 配置管理

```python
# 应用配置
config = {
    'database': {
        'host': 'localhost',
        'port': 5432,
        'user': 'admin'
    },
    'app': {
        'debug': True,
        'max_connections': 100
    }
}

# 获取配置值
db_host = config['database']['host']
debug_mode = config.get('app', {}).get('debug', False)
```

#### 场景4: JSON 数据处理

```python
import json

# Python 字典转 JSON
person = {'name': 'Alice', 'age': 25, 'city': 'New York'}
json_str = json.dumps(person, indent=2)
print(json_str)

# JSON 转 Python 字典
json_data = '{"name": "Bob", "age": 30}'
person_dict = json.loads(json_data)
print(person_dict)  # {'name': 'Bob', 'age': 30}
```

#### 场景5: 反转映射

```python
# ID 到名字的映射
id_to_name = {1: 'Alice', 2: 'Bob', 3: 'Charlie'}

# 创建名字到 ID 的反向映射
name_to_id = {name: id for id, name in id_to_name.items()}
print(name_to_id)  # {'Alice': 1, 'Bob': 2, 'Charlie': 3}
```

### 13. 字典性能特点

- **查找速度**: O(1) - 非常快
- **插入/删除**: O(1) - 非常快
- **内存占用**: 比列表大(需要存储哈希表)
- **键的要求**: 必须是不可变类型(字符串、数字、元组等)

```python
# 可以作为键的类型
valid_keys = {
    'string': 1,
    42: 2,
    (1, 2): 3,
    True: 4
}

# 不能作为键的类型(会报错)
# invalid_keys = {
#     [1, 2]: 'list',      # TypeError: unhashable type: 'list'
#     {'a': 1}: 'dict',    # TypeError: unhashable type: 'dict'
# }
```

### 14. 常见错误和注意事项

```python
# 错误1: 访问不存在的键
person = {'name': 'Alice'}
# age = person['age']  # KeyError
age = person.get('age', 0)  # 正确做法

# 错误2: 在遍历时修改字典
d = {'a': 1, 'b': 2, 'c': 3}
# for key in d:
#     if key == 'b':
#         del d[key]  # RuntimeError: dictionary changed size during iteration

# 正确做法:先复制键
for key in list(d.keys()):
    if key == 'b':
        del d[key]

# 错误3: 使用可变对象作为默认值
def add_item(item, my_dict={}):  # 危险!
    my_dict[item] = True
    return my_dict

# 正确做法
def add_item_correct(item, my_dict=None):
    if my_dict is None:
        my_dict = {}
    my_dict[item] = True
    return my_dict
```



## Set 集合

set 本质是哈希表（hash table），要求元素必须是可哈希的（immutable）
list 不能放进 set，tuple 可以
### 创建
```python
s = {1, 2, 3}
```
空集
```python
s = set()
```
### 操作
```python
s.add(4)
s.remove(3)   # 不存在会报错
s.discard(3)  # 不报错（推荐）
s.clear()
if 3 in s:
    print("exist")
    
# 遍历 set (顺序随机（不能依赖顺序）)
for x in s:
    print(x)
```
### 集合运算
```python
a = {1,2,3}
b = {3,4,5}

交集
# a & b
# {3}
a.intersection(b)

并集
# a | b
# {1,2,3,4,5}
a.union(b)

差集
# a - b
# {1,2}
a.difference(b)

对称差集
# a ^ b
# {1,2,4,5}
a.symmetric_difference(b)
```

### 应用

去重
```python
lst = [1,2,2,3,3]
unique = list(set(lst))

# 保序
unique = list(dict.fromkeys(lst))
```

找公共元素 
```python
common = set(a) & set(b)
```

### 注意

无法修改时遍历
```python
for x in s:
    s.remove(x)   # ❌
```
会报错

## 链表

Python 没有内置的链表数据结构,但我们可以自己实现。下面介绍几种常见的链表类型和使用方法。

### 1. 单向链表 (Singly Linked List)

### 基本实现

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    # 在末尾添加节点
    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
    
    # 在开头添加节点
    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
    
    # 删除指定值的节点
    def delete(self, data):
        if not self.head:
            return
        
        if self.head.data == data:
            self.head = self.head.next
            return
        
        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                return
            current = current.next
    
    # 打印链表
    def print_list(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")
    
    # 查找节点
    def search(self, data):
        current = self.head
        while current:
            if current.data == data:
                return True
            current = current.next
        return False
    
    # 获取长度
    def length(self):
        count = 0
        current = self.head
        while current:
            count += 1
            current = current.next
        return count

# 使用示例
ll = LinkedList()
ll.append(1)
ll.append(2)
ll.append(3)
ll.prepend(0)
ll.print_list()  # 0 -> 1 -> 2 -> 3 -> None
ll.delete(2)
ll.print_list()  # 0 -> 1 -> 3 -> None
print(ll.search(3))  # True
print(ll.length())  # 3
```

### 2. 双向链表 (Doubly Linked List)

```python
class DNode:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
    
    def append(self, data):
        new_node = DNode(data)
        if not self.head:
            self.head = self.tail = new_node
            return
        
        self.tail.next = new_node
        new_node.prev = self.tail
        self.tail = new_node
    
    def prepend(self, data):
        new_node = DNode(data)
        if not self.head:
            self.head = self.tail = new_node
            return
        
        new_node.next = self.head
        self.head.prev = new_node
        self.head = new_node
    
    def delete(self, data):
        current = self.head
        
        while current:
            if current.data == data:
                if current.prev:
                    current.prev.next = current.next
                else:
                    self.head = current.next
                
                if current.next:
                    current.next.prev = current.prev
                else:
                    self.tail = current.prev
                return
            current = current.next
    
    def print_forward(self):
        current = self.head
        while current:
            print(current.data, end=" <-> ")
            current = current.next
        print("None")
    
    def print_backward(self):
        current = self.tail
        while current:
            print(current.data, end=" <-> ")
            current = current.prev
        print("None")

# 使用示例
dll = DoublyLinkedList()
dll.append(1)
dll.append(2)
dll.append(3)
dll.print_forward()   # 1 <-> 2 <-> 3 <-> None
dll.print_backward()  # 3 <-> 2 <-> 1 <-> None
```

### 3. 使用 Python 的 collections.deque

如果你需要链表的性能特性(两端快速插入/删除),可以使用 Python 内置的 `deque`:

```python
from collections import deque

# 创建双端队列(本质上是双向链表)
dq = deque([1, 2, 3])

# 右端添加
dq.append(4)           # deque([1, 2, 3, 4])

# 左端添加
dq.appendleft(0)       # deque([0, 1, 2, 3, 4])

# 右端删除
dq.pop()               # 返回 4, deque([0, 1, 2, 3])

# 左端删除
dq.popleft()           # 返回 0, deque([1, 2, 3])

# 扩展
dq.extend([4, 5])      # deque([1, 2, 3, 4, 5])
dq.extendleft([0, -1]) # deque([-1, 0, 1, 2, 3, 4, 5])

# 旋转
dq.rotate(2)           # 向右旋转 2 位
dq.rotate(-1)          # 向左旋转 1 位

print(list(dq))
```

### 4. 常见链表算法题

#### 反转链表

```python
def reverse_linked_list(head):
    prev = None
    current = head
    
    while current:
        next_node = current.next  # 保存下一个节点
        current.next = prev        # 反转指针
        prev = current             # 移动 prev
        current = next_node        # 移动 current
    
    return prev  # 新的头节点
```

#### 检测环

```python
def has_cycle(head):
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            return True
    
    return False
```

#### 找到中间节点

```python
def find_middle(head):
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow  # slow 就是中间节点
```

#### 合并两个有序链表

```python
def merge_two_lists(l1, l2):
    dummy = Node(0)
    current = dummy
    
    while l1 and l2:
        if l1.data < l2.data:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    # 添加剩余节点
    current.next = l1 if l1 else l2
    
    return dummy.next
```

### 5. 链表 vs 数组

|特性|链表|数组|
|---|---|---|
|访问元素|O(n)|O(1)|
|插入/删除(开头)|O(1)|O(n)|
|插入/删除(末尾)|O(n)/O(1)*|O(1)|
|内存|需要额外空间存指针|连续内存|

*双向链表维护 tail 指针时为 O(1)

### 总结

- **自定义场景**: 使用自己实现的 `LinkedList` 类
- **实际项目**: 优先使用 `collections.deque`
- **算法题**: 通常需要自己实现 `Node` 类

大多数情况下,Python 的列表(动态数组)已经足够高效。只有在需要频繁在两端进行插入/删除操作时,才考虑使用链表或 `deque`。





## deque

`deque` (double-ended queue,双端队列) 是 Python `collections` 模块中的一个强大数据结构,支持从两端快速添加和删除元素。

### 1. 基本导入和创建

```python
from collections import deque

# 创建空 deque
dq = deque()

# 从列表创建
dq = deque([1, 2, 3, 4, 5])

# 指定最大长度(创建循环队列)
dq = deque([1, 2, 3], maxlen=5)

# 从其他可迭代对象创建
dq = deque('abc')  # deque(['a', 'b', 'c'])
dq = deque(range(5))  # deque([0, 1, 2, 3, 4])
```

### 2. 添加元素

```python
dq = deque([1, 2, 3])

# 右端添加单个元素 - O(1)
dq.append(4)
print(dq)  # deque([1, 2, 3, 4])

# 左端添加单个元素 - O(1)
dq.appendleft(0)
print(dq)  # deque([0, 1, 2, 3, 4])

# 右端扩展多个元素 - O(k), k是元素个数
dq.extend([5, 6, 7])
print(dq)  # deque([0, 1, 2, 3, 4, 5, 6, 7])

# 左端扩展多个元素(注意顺序!) - O(k)
dq.extendleft([-1, -2, -3])
print(dq)  # deque([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7])
```

### 3. 删除元素

```python
dq = deque([1, 2, 3, 4, 5])

# 右端删除 - O(1)
dq.pop()
print(dq)  # deque([1, 2, 3, 4])

# 左端删除 - O(1)
dq.popleft()
print(dq)  # deque([2, 3, 4])

# 删除指定值的第一个匹配项 - O(n)
dq.remove(3)
print(dq)  # deque([2, 4])

# 清空所有元素
dq.clear()
print(dq)  # deque([])
```

### 4. 访问元素

```python
dq = deque([10, 20, 30, 40, 50])

# 通过索引访问 - O(n)
print(dq[0])   # 10 (第一个元素)
print(dq[-1])  # 50 (最后一个元素)
print(dq[2])   # 30

# 修改元素
dq[1] = 25
print(dq)  # deque([10, 25, 30, 40, 50])

# 获取长度
print(len(dq))  # 5

# 检查元素是否存在 - O(n)
print(30 in dq)  # True
```

### 5. 旋转操作

```python
dq = deque([1, 2, 3, 4, 5])

# 向右旋转 2 位 - O(k), k是旋转步数
dq.rotate(2)
print(dq)  # deque([4, 5, 1, 2, 3])

# 向左旋转 1 位
dq.rotate(-1)
print(dq)  # deque([5, 1, 2, 3, 4])

# 旋转等价于:
# rotate(1): 把最右边的元素移到最左边
# rotate(-1): 把最左边的元素移到最右边
```

### 6. 其他常用方法

```python
dq = deque([1, 2, 3, 2, 4])

# 计数 - O(n)
print(dq.count(2))  # 2

# 查找索引 - O(n)
print(dq.index(3))  # 2
# print(dq.index(3, 0, 2))  # 指定范围查找

# 反转
dq.reverse()
print(dq)  # deque([4, 2, 3, 2, 1])

# 复制
dq2 = dq.copy()
print(dq2)  # deque([4, 2, 3, 2, 1])

# 插入(不推荐,O(n)复杂度)
dq.insert(2, 99)
print(dq)  # deque([4, 2, 99, 3, 2, 1])
```

### 7. 限制长度的 deque (循环队列)

```python
# 创建最大长度为 3 的 deque
dq = deque(maxlen=3)

dq.append(1)
dq.append(2)
dq.append(3)
print(dq)  # deque([1, 2, 3], maxlen=3)

# 添加第4个元素时,最左边的元素会被自动删除
dq.append(4)
print(dq)  # deque([2, 3, 4], maxlen=3)

dq.appendleft(0)
print(dq)  # deque([0, 2, 3], maxlen=3)

# 获取最大长度
print(dq.maxlen)  # 3
```

### 8. 迭代和转换

```python
dq = deque([1, 2, 3, 4, 5])

# 正向迭代
for item in dq:
    print(item, end=' ')  # 1 2 3 4 5
print()

# 反向迭代
for item in reversed(dq):
    print(item, end=' ')  # 5 4 3 2 1
print()

# 转换为列表
lst = list(dq)
print(lst)  # [1, 2, 3, 4, 5]

# 转换为元组
tup = tuple(dq)
print(tup)  # (1, 2, 3, 4, 5)
```

### 9. 实际应用场景

#### 场景 1: 滑动窗口

```python
def max_sliding_window(nums, k):
    """找出滑动窗口中的最大值"""
    if not nums:
        return []
    
    dq = deque()  # 存储索引
    result = []
    
    for i in range(len(nums)):
        # 移除超出窗口的元素
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # 移除比当前元素小的元素(它们不可能是最大值)
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()
        
        dq.append(i)
        
        # 窗口形成后开始记录结果
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result

print(max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3))
# 输出: [3, 3, 5, 5, 6, 7]
```

#### 场景 2: 保留最近 N 条记录

```python
class RecentCounter:
    def __init__(self):
        self.requests = deque()
    
    def ping(self, t):
        """记录请求,返回过去3000ms内的请求数"""
        self.requests.append(t)
        
        # 移除3000ms之前的请求
        while self.requests[0] < t - 3000:
            self.requests.popleft()
        
        return len(self.requests)

counter = RecentCounter()
print(counter.ping(1))     # 1
print(counter.ping(100))   # 2
print(counter.ping(3001))  # 3
print(counter.ping(3002))  # 3 (请求1被移除)
```

#### 场景 3: 回文检查

```python
def is_palindrome(s):
    """检查字符串是否是回文"""
    dq = deque(s.lower())
    
    while len(dq) > 1:
        if dq.popleft() != dq.pop():
            return False
    return True

print(is_palindrome("racecar"))  # True
print(is_palindrome("hello"))    # False
```

#### 场景 4: 任务调度

```python
class TaskScheduler:
    def __init__(self):
        self.tasks = deque()
    
    def add_task(self, task, priority='normal'):
        if priority == 'high':
            self.tasks.appendleft(task)  # 高优先级放前面
        else:
            self.tasks.append(task)       # 普通优先级放后面
    
    def process_next(self):
        if self.tasks:
            return self.tasks.popleft()
        return None

scheduler = TaskScheduler()
scheduler.add_task("Task 1")
scheduler.add_task("Urgent Task", priority='high')
scheduler.add_task("Task 2")

print(scheduler.process_next())  # Urgent Task
print(scheduler.process_next())  # Task 1
print(scheduler.process_next())  # Task 2
```

#### 场景 5: BFS 广度优先搜索

```python
def bfs(graph, start):
    """图的广度优先遍历"""
    visited = set()
    queue = deque([start])
    result = []
    
    while queue:
        node = queue.popleft()
        if node not in visited:
            visited.add(node)
            result.append(node)
            queue.extend(graph.get(node, []))
    
    return result

graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
}

print(bfs(graph, 'A'))  # ['A', 'B', 'C', 'D', 'E', 'F']
```

### 10. deque vs list 性能对比

|操作|deque|list|
|---|---|---|
|append (右端添加)|O(1)|O(1)|
|appendleft (左端添加)|O(1)|O(n)|
|pop (右端删除)|O(1)|O(1)|
|popleft (左端删除)|O(1)|O(n)|
|索引访问|O(n)|O(1)|
|插入/删除(中间)|O(n)|O(n)|

### 11. 使用建议

**使用 deque 的场景:**

- 需要频繁在两端添加/删除元素
- 实现队列(FIFO)或栈(LIFO)
- 滑动窗口算法
- BFS 搜索
- 保持最近 N 个元素

**使用 list 的场景:**

- 需要频繁随机访问元素
- 主要在末尾操作
- 需要切片操作





## 技巧

### 四舍五入

Python 的 round() 用的是：

> **银行家舍入（Banker’s Rounding）** → “向最近偶数靠”

```int(x + 0.5)``` (适合正数)

或
```python
import math

def round_half_up(x):
    return math.floor(x + 0.5) if x >= 0 else math.ceil(x - 0.5)
```

## 函数
在 Python 中,可以直接在函数内部定义 helper function(辅助函数/嵌套函数),用于封装只在外部函数中使用的逻辑。

### 基本语法

```python
def outer_function(x):
    # 定义 helper function
    def helper_function(y):
        return y * 2
    
    # 使用 helper function
    result = helper_function(x)
    return result + 10

print(outer_function(5))  # 输出: 20
```

### 实际应用示例

#### 1. 递归辅助函数

```python
def fibonacci(n):
    def fib_helper(n, memo={}):
        if n in memo:
            return memo[n]
        if n <= 1:
            return n
        memo[n] = fib_helper(n-1, memo) + fib_helper(n-2, memo)
        return memo[n]
    
    return fib_helper(n)
```

#### 2. 访问外部函数变量(闭包)

```python
def make_multiplier(factor):
    def multiply(number):
        # helper function 可以访问外部函数的变量
        return number * factor
    
    return multiply

times_3 = make_multiplier(3)
print(times_3(10))  # 输出: 30
```

#### 3. 多个 helper functions

```python
def process_data(data):
    def validate(item):
        return item is not None and item > 0
    
    def transform(item):
        return item ** 2
    
    def format_output(item):
        return f"Result: {item}"
    
    # 使用多个 helper functions
    filtered = [x for x in data if validate(x)]
    transformed = [transform(x) for x in filtered]
    formatted = [format_output(x) for x in transformed]
    
    return formatted

print(process_data([1, -2, 3, None, 4]))
# 输出: ['Result: 1', 'Result: 9', 'Result: 16']
```

### 优点

1. **封装性**: helper function 只在外部函数内可见,不会污染全局命名空间
2. **访问外部变量**: 可以直接访问外部函数的参数和局部变量
3. **代码组织**: 使代码逻辑更清晰,易于维护

### 注意事项

- Helper function 不能在外部函数之外被调用
- 如果需要修改外部函数的变量,可能需要使用 `nonlocal` 关键字

```python
def counter():
    count = 0
    
    def increment():
        nonlocal count  # 声明要修改外部变量
        count += 1
        return count
    
    return increment

c = counter()
print(c())  # 1
print(c())  # 2
```
