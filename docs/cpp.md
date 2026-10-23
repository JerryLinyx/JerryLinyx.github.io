# CPP容器

思考：
1. 相同点
2. 不同点
3. 性能：内存，时间


## Map
参考：[C++基础-map与unordered_map](https://zhuanlan.zhihu.com/p/48066839)
map：
	基于红黑树实现。红黑树作为一种自平衡二叉树，保障了良好的最坏情况运行时间，即它可以做到在O(log n)时间内完成查找，插入和删除，在对单次时间敏感的场景下比较建议使用map做为容器。比如实时应用，可以保证最坏情况的运行时间也在预期之内。
	有序--另红黑树是一种二叉查找树，二叉查找树一个重要的性质是有序，且中序遍历时取出的元素是有序的。对于一些需要用到有序性的应用场景，应使用map。
unordered_map：
	基于hash_table实现，一般是由一个大vector，vector元素节点可挂接链表来解决冲突来实现。hash_table最大的优点，就是把数据的存储和查找消耗的时间大大降低，几乎可以看成是常数时间；而代价仅仅是消耗比较多的内存。然而在当前可利用内存越来越多的情况下，用空间换时间的做法是值得的。

map在增删查三项上均弱于unordered_map，内存使用map略少，但不明显
为什么unordered_map占用内存更多？
哈希表要开辟一块比数据量更大的空间，要控制填充因子不能太大，否则性能会退化。

## Vector

在 C++ 中，`vector` 是一种非常灵活的容器，可以存储几乎任何类型的数据。以下是 `vector` 可以存放的一些常见数据类型和对象类型的例子：

1. **基本数据类型**：
    
    - 整型（如 `int`, `short`, `long` 等）
    - 浮点型（如 `float`, `double`）
    - 字符类型（如 `char`, `unsigned char`）
    - 布尔类型（`bool`）
2. **复合数据类型**：
    
    - 字符串（`std::string`）
    - 数组（固定大小的数组，如 `std::array<int, 5>`）
    - 指针（如 `int*`, `double*` 等）
3. **用户定义的数据类型**：
    
    - 结构体（`struct`）
    - 类（`class`），包括可以有构造函数、析构函数、复制控制等
4. **其他 STL 容器**：
    
    - 另一个 `vector`（如 `vector<vector<int>>` 二维动态数组）
    - 列表（`std::list`）
    - 双端队列（`std::deque`）
    - 集合（`std::set`）
    - 映射表（`std::map`）
5. **智能指针**：
    
    - 如 `std::shared_ptr`, `std::unique_ptr`
6. **函数指针和 lambda 表达式**：
    
    - 可以存储指向函数的指针或者可调用对象（如 `std::function`）

`vector` 的灵活性来自于 C++ 的模板特性，使其能够通过参数化类型来适应不同的数据类型。此外，`vector` 保持元素的顺序，并且能够动态地调整大小，提供了随机访问迭代器，使得访问任何元素都像数组一样快速。

使用 `vector` 存储数据时，需要注意的是，由于 `vector` 在动态扩展容量时可能进行内存重新分配和元素复制，所以对于大型对象或者资源管理敏感的对象，推荐使用指针或智能指针来避免不必要的复制开销。此外，对于非默认构造的类型，确保提供合适的构造函数和赋值操作符以支持 `vector` 的这些操作。

在 C++ 中，`std::vector` 是一种非常灵活的动态数组容器，可以通过多种方式初始化。这里是一些常用的 `std::vector` 初始化方法：

### 1. 默认初始化
`std::vector<int> vec;  // 创建一个空的整型向量`

### 2. 初始化给定大小和默认值
`std::vector<int> vec(10);  // 创建一个包含10个整数的向量，每个整数初始化为0`

### 3. 初始化给定大小和指定值
`std::vector<int> vec(10, 5);  // 创建一个包含10个整数的向量，每个整数初始化为5`

### 4. 列表初始化（C++11 及之后）
`std::vector<int> vec = {1, 2, 3, 4, 5};  // 使用初始化列表初始化向量`

### 5. 使用数组初始化
`int arr[] = {1, 2, 3, 4, 5}; std::vector<int> vec(arr, arr + sizeof(arr) / sizeof(arr[0]));  // 从数组初始化向量`

### 6. 使用另一个向量初始化
`std::vector<int> vec1 = {1, 2, 3, 4, 5}; std::vector<int> vec2(vec1);  // 使用 vec1 初始化 vec2`

### 7. 使用迭代器范围初始化
`std::vector<int> vec1 = {1, 2, 3, 4, 5}; std::vector<int> vec2(vec1.begin(), vec1.end());  // 使用 vec1 的迭代器范围初始化 vec2`

### 8. 复制构造函数
`std::vector<int> vec1 = {1, 2, 3, 4, 5}; std::vector<int> vec2 = vec1;  // 使用 vec1 直接初始化 vec2`

### 9. 移动构造函数（C++11 及之后）
`std::vector<int> vec1 = {1, 2, 3, 4, 5}; std::vector<int> vec2 = std::move(vec1);  // 使用移动构造函数初始化 vec2`

### 10. 使用 `std::initializer_list`（C++11 及之后）
`std::vector<int> initVector(std::initializer_list<int> ilist); std::vector<int> vec = {1, 2, 3, 4, 5};  // 使用初始化列表构造函数`

这些初始化方法提供了极大的灵活性，可以根据不同的需求和上下文选择最合适的方式。例如，如果你需要一个具体大小但初始值不确定的向量，可以选择第二种或第三种方法。如果你已知所有元素值，使用列表初始化是最直观的方式。


以下是一些常用的 `std::vector` 成员函数及其简要说明：
### 修改容器内容的函数

- **`push_back(const T& value)`**：在 vector 的末尾添加一个新元素。
- **`pop_back()`**：移除 vector 末尾的元素。
- **`insert(iterator position, const T& value)`**：在指定位置插入一个新元素。
- **`erase(iterator position)`**：移除指定位置的元素。
- **`erase(iterator first, iterator last)`**：移除从 `first` 到 `last`（不包括 `last`）之间的元素。
- **`clear()`**：清空所有元素。
- **`resize(size_type num, T val = T())`**：调整 vector 的大小，新位置被初始化为 `val` 的拷贝。
- **`emplace_back(Args&&... args)`**：在 vector 末尾直接构造一个新元素，可以避免额外的复制或移动操作。
- **`emplace(iterator position, Args&&... args)`**：在指定位置直接构造一个新元素。

### 容器容量相关的函数

- **`size()`**：返回当前存储在 vector 中的元素数量。
- **`max_size()`**：返回 vector 可以容纳的最大元素数量。
- **`capacity()`**：返回 vector 当前的容量。
- **`empty()`**：检查 vector 是否为空（即 `size() == 0`）。
- **`reserve(size_type n)`**：请求改变 vector 的容量，以至少容纳 `n` 个元素。
- **`shrink_to_fit()`**：尝试减少容量以匹配其大小，释放未使用的内存。

### 元素访问相关的函数

- **`operator[](size_type n)`**：返回对应于位置 `n` 的元素的引用。
- **`at(size_type n)`**：与 `operator[]` 类似，但带有边界检查，如果 `n` 超出范围则抛出 `std::out_of_range` 异常。
- **`front()`**：返回对第一个元素的引用。
- **`back()`**：返回对最后一个元素的引用。
- **`data()`**：返回指向第一个元素的指针。

### 迭代器相关的函数

- **`begin()`**：返回指向 vector 开始位置的迭代器。
- **`end()`**：返回指向 vector 结束位置的迭代器（指向最后一个元素之后的位置）。
- **`rbegin()`**：返回指向 vector 末尾的反向迭代器。
- **`rend()`**：返回指向 vector 开头之前位置的反向迭代器。

这些函数使得 `std::vector` 可以灵活地处理各种数据和操作，是 C++ 标准模板库中使用最广泛的容器之一。


参考：[C++中push_back和emplace_back的区别](https://zhuanlan.zhihu.com/p/213853588)
push_back
```text
/**
 *  以下程序来自STL源码 bits/stl_vector.h
 *
 *  @brief  Add data to the end of the %vector.
 *  @param  __x  Data to be added.
 *
 *  This is a typical stack operation.  The function creates an
 *  element at the end of the %vector and assigns the given data
 *  to it.  Due to the nature of a %vector this operation can be
 *  done in constant time if the %vector has preallocated space
 *  available.
 */
void push_back(const value_type &__x) {
    if (this->_M_impl._M_finish != this->_M_impl._M_end_of_storage) {
        // 首先判断容器满没满，如果没满那么就构造新的元素，然后插入新的元素
        _Alloc_traits::construct(this->_M_impl, this->_M_impl._M_finish,
                                 __x);
        ++this->_M_impl._M_finish; // 更新当前容器内元素数量
    } else
        // 如果满了，那么就重新申请空间，然后拷贝数据，接着插入新数据 __x
        _M_realloc_insert(end(), __x);
}

// 如果 C++ 版本为 C++11 及以上（也就是从 C++11 开始新加了这个方法），使用 emplace_back() 代替
#if __cplusplus >= 201103L
void push_back(value_type &&__x) {
    emplace_back(std::move(__x));
}
#endif
```
emplace_back() 直接使用**构造参数列表**来添加元素的方法，它会使用到了移动构造函数 `move` 。这也是 `emplace_back()` 方法的一大特色。
`emplace_back()` 函数在原理上比 `push_back()` 有了一定的改进，包括在内存优化方面和运行效率方面。内存优化主要体现在使用了**就地构造（直接在容器内构造对象，不用拷贝一个复制品再使用）+强制类型转换**的方法来实现，在运行效率方面，由于省去了拷贝构造过程，因此也有一定的提升。

## String

substr用法
```cpp
#include <iostream>
#include <string>

int main() {
    std::string str = "Hello, world!";
    std::string sub1 = str.substr(0, 5);  // 从位置 0 开始，长度为 5
    std::string sub2 = str.substr(7);     // 从位置 7 开始到结束

    std::cout << "Sub1: " << sub1 << std::endl;  // 输出 "Hello"
    std::cout << "Sub2: " << sub2 << std::endl;  // 输出 "world!"

    return 0;
}

```

在 C++ 中，`std::stoi` 是一个用来将字符串转换为整数的函数。这个函数定义在 `<string>` 头文件中，并是 C++11 标准的一部分。它提供了一个方便的方式来处理和转换包含数字的字符串

```cpp
int stoi(const std::string& str, std::size_t* pos = 0, int base = 10);
```
- **参数**：
    - `str`：要转换的字符串。
    - `pos`：可选参数，是一个指针，用来存储第一个未被转换的字符的位置。如果你不关心这个信息，可以忽略这个参数。
    - `base`：转换的基数。默认是 10，意味着按十进制进行转换。你可以指定其他值如 2（二进制）、8（八进制）或 16（十六进制）来进行转换。


## Queue

在 C++ 的标准库中，`std::queue` 是一个容器适配器，它提供了先进先出（FIFO）的数据结构。它在内部通常使用 `std::deque` 或 `std::list` 作为底层容器来实现。以下是 `std::queue` 的一些主要成员函数和它们的用途：

### 容器操作

- **`push(const T& value)`**：将一个新元素添加到队列的末尾。
- **`emplace(Args&&... args)`**：在队列末尾直接构造一个元素，可以减少一次复制或移动操作，提高效率。
- **`pop()`**：移除队列前端的元素。
- **`swap(queue& other)`**：与另一个相同类型的队列交换内容。

### 元素访问

- **`front()`**：访问队列前端的元素。
- **`back()`**：访问队列末尾的元素。

### 容量和状态检查

- **`empty()`**：检查队列是否为空。
- **`size()`**：返回队列中的元素数量。


## Type
在 C++ 中，`<cctype>` 头文件（在 C 中是 `<ctype.h>`）提供了一系列用于字符分类的函数，这些函数可以帮助你确定字符的具体类别，比如是否是字母、数字等。以下是一些与 `isdigit` 和 `isalpha` 类似的函数及其用途：

1. **`isalpha(int c)`**：检查给定字符是否为字母（a-z 或 A-Z）。
2. **`isdigit(int c)`**：检查给定字符是否为十进制数字（0-9）。
3. **`isalnum(int c)`**：检查给定字符是否为字母或数字（即 `isalpha` 或 `isdigit` 的合集）。
4. **`iscntrl(int c)`**：检查给定字符是否为控制字符。
5. **`islower(int c)`**：检查给定字符是否为小写字母。
6. **`isupper(int c)`**：检查给定字符是否为大写字母。
7. **`ispunct(int c)`**：检查给定字符是否为标点符号（即非字母、非数字、非控制字符的可打印字符）。
8. **`isspace(int c)`**：检查给定字符是否为空白字符，如空格、制表符、换行符等。
9. **`isxdigit(int c)`**：检查给定字符是否为十六进制数字（0-9, a-f, A-F）。
10. **`isgraph(int c)`**：检查给定字符是否有图形表示（即除空格外的所有可打印字符）。
11. **`isprint(int c)`**：检查给定字符是否为可打印字符（包括空格）。


## algorithm
在 C++ 中，`reverse` 函数是用于反转容器中元素顺序的算法。这个函数定义在 `<algorithm>` 头文件中，可以应用于任何支持双向迭代器的容器，比如 `std::vector`, `std::deque`, `std::list` 等。


```cpp
void reverse(BidirectionalIterator first, BidirectionalIterator last);
```

[【C++】万能头文件 ＜bits/stdc++.h＞ 的用法和优缺点](https://blog.csdn.net/Sunnyside_/article/details/118190897)
>优点：\
1、在竞赛中节约时间 \
2、减少了编写所有必要头文件的工作量 \
3、对于使用的每个函数，不用记住GNU C++的所有STL \
缺点：\
1、不属于GNU C++库的标准头文件，在部分情况下可能会失败 \
2、使用它将包含许多不必要的东西，并增加编译时间 \
3、这个头文件不是C++标准的一部分，因此是不可移植的，应该避免 \
4、编译器每次编译翻译单元时都必须实际读取和分析每个包含的头文件，应该减少这类头文件的使用


- [geeksforgeeks | ＜bits/stdc++.h＞ in C++](https://www.geeksforgeeks.org/bitsstdc-h-c/)
- [C++中getline()的用法](https://blog.csdn.net/weixin_44480968/article/details/104282535)
- [【数据结构】02.C++ ACM模式总结](https://www.nowcoder.com/discuss/476652382114357248?sourceSSR=search) 