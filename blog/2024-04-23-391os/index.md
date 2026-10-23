---
title: Computer Systems Engineering UIUC ECE 391
date: '2024-04-23T16:17:49'
authors:
- jerry
tags:
- OS
- SDE
category: SDE
draft: false
---

## 仓库
[**Link to Github Repository**](https://github.com/L10yx/ECE391/tree/main/mp3)
## C语言基础
|             | 2's complement        | unsigned             |
|-------------|-----------------------|----------------------|
| **8 bits**  | char                  | unsigned char        |
| **16 bits** | short int             | unsigned short int   |
| **32 bits** | int                   | unsigned int         |
| **32 or 64 bits** | long            | unsigned long        |
| **64 bits** | long long int         | unsigned long long int |


<!-- truncate -->
<!-- 
|             | 2's complement | unsigned   |
|-------------|----------------|------------|
| **8 bits**  | int8_t         | uint8_t    |
| **16 bits** | int16_t        | uint16_t   |
| **32 bits** | int32_t        | uint32_t   |
| **64 bits** | int64_t        | uint64_t   |

In Linux, they can be used by including the `stdint.h` header file in user code or the `linux/types.h` header file in kernel code.


## Linux
Linux 操作系统提供了大量的命令用于各种任务，包括文件管理、系统监控、网络配置等。这里列出一些常用的 Linux 命令：

#### 文件和目录管理

- `ls`：列出目录内容
- `cd`：更改目录
- `mkdir`：创建新目录
- `rmdir`：删除空目录
- `cp`：复制文件或目录
- `mv`：移动文件或目录
- `rm`：删除文件或目录
- `touch`：创建空文件或更改文件时间戳

#### 文本处理

- `cat`：查看文件内容、创建文件、文件合并、追加文件内容等
- `grep`：搜索文本并显示匹配行
- `awk`：文本和数据的模式扫描和处理语言
- `sed`：流编辑器，用于对文本进行过滤和转换
- `echo`：输出参数指定的文本

#### 系统信息

- `uname`：显示系统信息
- `top`：显示当前运行的进程和系统运行状态
- `df`：显示磁盘空间使用情况
- `free`：显示内存使用情况

#### 网络管理

- `ping`：检查网络连接
- `ifconfig`：配置或显示网络接口参数
- `netstat`：显示网络连接、路由表、接口统计等网络信息
- `ssh`：安全地访问远程服务器
- `scp`：通过 SSH 传输文件

#### 权限和用户管理

- `chmod`：更改文件或目录的权限
- `chown`：更改文件或目录的所有者
- `useradd`：添加用户
- `usermod`：修改用户信息

#### 进程管理

- `ps`：显示当前进程
- `kill`：终止进程
- `jobs`：列出当前会话中的任务
- `bg`：将任务放在后台执行
- `fg`：将任务调到前台继续执行

这只是 Linux 命令的一小部分，还有很多其他命令和选项可用于各种用途。如果有特定的需求或想了解某个命令的详细用法，可以使用 `man` 命令查看该命令的手册页，例如 `man ls`。

## debug.sh 详解

`chmod +x debug.sh` 添加执行权限
`dos2unix debug.sh` 将文本格式从 DOS（或 Windows）格式转换为 Unix/Linux 格式。
- DOS 与 Unix 文本文件的差异：
行结束符：DOS/Windows 文本文件的行结束符是回车符（CR）加换行符（LF），记作 \r\n。而 Unix/Linux 系统中的文本文件只使用换行符（LF），记作 \n。
- dos2unix 的运作原理：
移除 \r：该工具会遍历文件，查找每一行的结尾处的 \r\n 组合，并将其替换为单个的 \n，从而使文件符合 Unix/Linux 系统的文本格式标准。

```bash
#!/bin/bash

if [ -d /mnt/tmpmp3 ]; then
    rm -rf /mnt/tmpmp3
fi

if [ -d /tmp/mp3 ]; then
    rm -rf /tmp/mp3
fi

mkdir /mnt/tmpmp3
mkdir /tmp/mp3
cp ./bootimg /tmp/mp3/
cp ./filesys_img /tmp/mp3/
cp ./mp3.img /tmp/mp3/
mount -o loop,offset=32256 /tmp/mp3/mp3.img /mnt/tmpmp3
cp -f /tmp/mp3/bootimg /mnt/tmpmp3/
cp -f /tmp/mp3/filesys_img /mnt/tmpmp3/
umount /mnt/tmpmp3
cp -f /tmp/mp3/mp3.img ./
rm -rf /tmp/mp3
rm -rf /mnt/tmpmp3
```
这个Bash脚本主要用于处理文件和目录操作，特别是涉及挂载、复制和清理操作。以下是每个部分的作用说明：
1. **检查和删除目录**:
首先，脚本检查`/mnt/tmpmp3`和`/tmp/mp3`这两个目录是否存在。如果存在，脚本将使用`rm -rf`命令删除这些目录及其内容，确保目录是空的，避免复制时发生错误或数据冲突。
2. **创建新的空目录**:
接下来，脚本创建两个新的空目录`/mnt/tmpmp3`和`/tmp/mp3`，用于存放临时文件和挂载镜像文件。
3. **复制文件到临时目录**:
将当前目录下的`bootimg`、`filesys_img`和`mp3.img`文件复制到`/tmp/mp3`目录，这是为了进行一些操作，比如更新或修改这些文件。
4. **挂载文件系统镜像**:
使用`mount`命令将`/tmp/mp3/mp3.img`文件系统镜像以只读和指定偏移量的方式挂载到`/mnt/tmpmp3`。这里的偏移量`32256`通常是文件系统分区的起始位置。挂载后，可以在挂载点操作文件系统中的文件。
5. **复制更新的文件到挂载的文件系统**:
将`bootimg`和`filesys_img`从`/tmp/mp3`复制到已挂载的`/mnt/tmpmp3`目录。这可能是用于更新镜像中的启动或系统文件。
6. **卸载挂载的文件系统**:
执行`umount`命令来卸载`/mnt/tmpmp3`，以确保所有更改都被写入磁盘并且文件系统不再被系统使用。
7. **复制镜像回原始位置并清理临时目录**:
将更新后的`mp3.img`从`/tmp/mp3`复制回脚本运行的当前目录。然后删除`/tmp/mp3`和`/mnt/tmpmp3`目录，清理所有临时文件和目录，保持环境整洁。

这个脚本通常用于在系统或设备中更新或替换文件系统镜像的场景。通过这种方式，可以安全地修改镜像文件，同时保留原始文件和设置的安全备份。
### Bash
Bash（Bourne Again SHell）脚本是一种用于自动化Unix和Linux系统上的任务的脚本语言。它是Shell脚本的一种形式，允许你编写一系列命令来执行复杂的操作，这些命令通常是你会在命令行界面中手动输入的。Bash脚本提供了一个强大的工具，以简化日常任务，自动化程序，以及管理系统。
- 最常用的 Shell 之一，由 GNU 项目作为 Bourne Shell 的自由替代品开发。
- 它是许多 Linux 发行版和 macOS 的默认 Shell。
- Bash 扩展了 Bourne Shell 的功能，包括整合编程功能（如数组和整数算术）。

#### 主要特点

- **自动化**: Bash脚本能够自动化几乎任何可以在命令行执行的任务，包括文件操作、程序运行和系统监控等。
- **条件语句**: 支持`if-else`结构，使得根据条件执行不同的代码段成为可能。
- **循环控制**: 支持`for`、`while`和`until`循环，使得重复执行任务变得简单。
- **变量和参数**: Bash允许定义变量和接受传递给脚本的参数，使脚本更加灵活和动态。
- **函数**: 可以定义函数来组织和复用代码，提高脚本的可维护性和可读性。

#### 基本组成

1. **Shebang**: 脚本的第一行通常是Shebang（`#!/bin/bash`），它告诉系统使用哪个解释器来运行脚本。
2. **注释**: 以`#`开头的行，用于解释脚本的功能和复杂部分，提高可读性。
3. **命令**: Bash脚本中的命令和在命令行中输入的命令一样，可以执行程序、调用工具或修改文件。
4. **控制结构**: 使用条件语句和循环来控制脚本的流程。
5. **输入/输出重定向**: 使用重定向和管道来处理数据流。

输入/输出重定向和管道是 Bash 脚本中处理数据流的重要技术。它们允许你控制程序从哪里获取输入以及将输出发送到哪里。这些功能提高了脚本的灵活性和功能强大性，使得能够构建复杂的数据处理管道和命令序列。

##### 输入/输出重定向

重定向是改变标准输入（stdin）、标准输出（stdout）和标准错误（stderr）的默认目的地的过程。

1. **标准输入重定向（`<`）**：
    
    - 使用 `<` 符号可以将文件的内容重定向为命令的输入。例如，`command < inputfile` 会将 `inputfile` 的内容用作 `command` 的输入。
2. **标准输出重定向（`>` 和 `>>`）**：
    
    - 使用 `>` 符号可以将命令的输出写入到文件中，替换文件原有内容。例如，`command > outputfile` 将 `command` 的输出保存到 `outputfile`，覆盖其原有内容。
    - 使用 `>>` 符号可以将命令的输出追加到现有文件的末尾。例如，`command >> outputfile` 将 `command` 的输出追加到 `outputfile`。
3. **标准错误重定向（`2>` 和 `2>>`）**：
    
    - 使用 `2>` 符号可以将错误信息输出到指定文件，替换文件原有内容。例如，`command 2> errorfile` 将错误信息输出到 `errorfile`。
    - 使用 `2>>` 可以将错误信息追加到文件末尾。
4. **同时重定向标准输出和标准错误（`&>` 和 `&>>`）**：
    
    - `command &> file` 将标准输出和标准错误合并后重定向到 `file`，覆盖原内容。
    - `command &>> file` 将标准输出和标准错误合并后追加到 `file` 的末尾。

##### 管道（`|`）

管道是用于将一个命令的输出直接作为另一个命令的输入的技术。它是在命令之间创建数据流动的一种方式。

- **使用管道**：使用 `|` 符号可以将一个命令的标准输出直接传递给另一个命令作为输入。例如，`command1 | command2` 将 `command1` 的输出作为 `command2` 的输入。

这种技术非常适合处理数据流和创建复杂的命令链，特别是在处理文本和文件内容时。通过组合重定向和管道，你可以构建功能强大且灵活的脚本，以实现复杂的数据处理任务。


#### 使用场景

- **系统管理**: 自动备份、用户管理、系统监测等。
- **软件开发**: 自动编译和部署应用程序。
- **数据处理**: 批量处理文件、自动化数据转换和分析。
- **网络操作**: 自动化FTP传输、网络监控等。

Bash脚本是系统管理员和开发人员的重要工具，因为它们可以大大简化重复性任务并减少人为错误。通过合理利用Bash脚本，可以实现高效、可靠的系统管理和数据操作流程。

## Image
文件扩展名 `.img` 通常与磁盘映像文件关联，它是一个计算机磁盘驱动器或整个数据存储设备的精确复制。这些文件包含了原始磁盘或分区的完整副本，通常用于备份、系统迁移或复制磁盘内容。

#### 使用场景

1. **系统备份和恢复**：.img 文件可用于操作系统的完整备份。在系统崩溃或硬件故障时，可以使用此类文件快速恢复系统。
2. **虚拟机**：虚拟化软件如 VMware 或 VirtualBox 可使用 .img 文件作为虚拟机的磁盘驱动器。
3. **软件分发**：操作系统分发，例如 Linux 发行版，经常以 .img 文件的形式提供，便于用户在不同的硬件上安装和运行。

#### 创建和使用

.img 文件可以通过各种磁盘克隆工具创建，如 dd（在 Unix 和 Linux 系统中常用），或者 Windows 的磁盘映像工具。创建 .img 文件的基本命令（使用 dd 工具）如下：

```bash
dd if=/dev/sdx of=/path/to/file.img
```
这里 `if` 表示输入文件（一个磁盘或分区），`of` 表示输出文件（.img 文件）。

#### 挂载 .img 文件

在 Linux 系统中，你可以挂载 .img 文件来访问其内容，就像挂载实际的物理磁盘一样。挂载命令可能如下：

```bash
sudo mount -o loop file.img /mnt/img
```
这里 `/mnt/img` 是挂载点目录，你需要提前创建它。

#### 注意事项

.img 文件通常很大，因为它们包含了磁盘的完整内容。因此，处理这些文件时，需要有足够的存储空间和相应的硬件支持。

总之，.img 文件是一种非常实用的工具，可以用于数据备份、系统迁移，以及操作系统的安装和虚拟化。

## multiboot.h
#### GRUB 的关键特性：

1. **多操作系统支持**：GRUB 可以管理多个操作系统的启动，让用户在启动时可以选择不同的操作系统。
2. **配置灵活**：GRUB 提供了一个配置文件（通常是 `/boot/grub/grub.cfg`），用户可以编辑这个文件来改变启动菜单的行为，如添加新的启动项、修改默认的操作系统、调整超时时间等。
3. **模块化设计**：GRUB 采用模块化设计，可以动态加载模块来支持不同的文件系统、图形界面等。
4. **交互式命令行模式**：在启动过程中，GRUB 提供一个命令行模式，允许用户手动输入命令来加载操作系统或进行故障排除。

#### GRUB Compliance 的意义：

- **启动协议**：操作系统需要支持与 GRUB 通信的协议（如 Multiboot Specification），使得 GRUB 可以正确加载和启动操作系统。
- **文件系统兼容性**：GRUB 必须能识别操作系统所在的文件系统。例如，它支持 ext2, ext3, ext4, FAT, NTFS 等文件系统。
- **硬件支持**：操作系统和硬件平台需要适配 GRUB。对于新的硬件平台，可能需要更新或修改 GRUB 来提供支持。
- **配置和自定义**：操作系统发行版通常提供预配置的 GRUB 设置，确保在安装操作系统时 GRUB 能正确设置并能引导新安装的系统。

如果一个系统或组件是 GRUB compliant，这意味着它可以无缝地与 GRUB 集成，确保在启动时能被 GRUB 正确识别、配置和加载。这对于确保用户可以在包含多个不同操作系统的计算机上顺利选择和启动所需系统至关重要。

## 开发流程
[Intel Docs](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)
[OSDev](https://wiki.osdev.org/Expanded_Main_Page)
### Checkpoint 1
#### OS Booting: GDT & IDT Setup
#### PIC (Programmable interrupt controller)

| Chip          | Purpose  | I/O port |
|---------------|----------|----------|
| Master PIC    | Command  | 0x0020   |
| Master PIC    | Data     | 0x0021   |
| Slave PIC     | Command  | 0x00A0   |
| Slave PIC     | Data     | 0x00A1   |

#### RTC
#### Keyboard
>PS/2 控制器是一种接口硬件，用于连接键盘和鼠标到个人计算机。它得名于 IBM 的 Personal System/2 系列计算机，这些计算机在 1987 年首次引入了 PS/2 端口。尽管 USB 接口在现代计算机中更加普遍，PS/2 接口仍然在某些情况下因其独特的优势而被使用。
>#### 主要特点和功能
>1. **接口类型**：
PS/2 端口是一个 6 针的迷你DIN连接器。通常有两个端口，一个用于键盘（通常是紫色的），另一个用于鼠标（通常是绿色的）。
>2. **通信协议**：
PS/2 设备使用同步串行通信协议。这意味着数据在键盘或鼠标和计算机之间以串行方式传输。
>3. **优点**：
**硬件级中断**：PS/2 设备在用户按键或移动鼠标时可以生成硬件中断，允许立即处理，这对于要求高响应性的应用非常重要。
**不占用 USB 资源**：在资源有限的环境中，使用 PS/2 可以留出 USB 端口用于其他设备。
**全 N-Key Rollover**：许多 PS/2 键盘支持全 N-Key Rollover（NKRO），意味着键盘可以同时注册每个按下的键，这对于高速打字或游戏非常有利。
>4. **缺点**：
**不支持热插拔**：PS/2 设备不支持热插拔，连接或断开设备时需要关闭电源，以防止端口或设备损坏。
**逐渐被淘汰**：随着 USB 接口的普及，许多现代计算机已经不再配备 PS/2 端口。
>#### 应用场景
>尽管 PS/2 接口在新的设备和系统中已较少见，但它仍然在一些特定的场合中被使用，尤其是在需要高可靠性和响应性的环境中，如某些工业、商业和专业音频设备领域。此外，一些高性能游戏键盘也保留了对 PS/2 的支持，以利用其优异的响应速度和全键无冲的特性。

#### Paging 分页
##### Page Directory Entry (4 MB)

| Bit Range    | Description          | Notes                          |
|--------------|----------------------|--------------------------------|
| 31-22        | Bits 31-22 of address|                                |
| 21           | R/S                  | Reserved (0)                   |
| 20           | AVL                  | Available for system programmer|
| 13-12        | P/S                  | Page Size                      |
| 11           | A                    | Accessed                       |
| 10           | PCD                  | Cache Disable                  |
| 9            | PWT                  | Write-Through                  |
| 8            | U/S                  | User/Supervisor                |
| 7            | R/W                  | Read/Write                     |
| 6-4          | -                    | Reserved                       |
| 3            | PWT                  | Write-Through                  |
| 2            | PCD                  | Cache Disable                  |
| 1            | A                    | Accessed                       |
| 0            | P                    | Present                        |

##### Page Directory Entry

| Bit Range    | Description          | Notes                          |
|--------------|----------------------|--------------------------------|
| 31-12        | Bits 31-12 of address|                                |
| 11           | AVL                  | Available                      |
| 10-9         | -                    | Reserved                       |
| 8            | G                    | Global                         |
| 7            | PS                   | Page Size                      |
| 6            | D                    | Dirty                          |
| 5            | A                    | Accessed                       |
| 4            | PCD                  | Cache Disable                  |
| 3            | PWT                  | Write-Through                  |
| 2            | U/S                  | User/Supervisor                |
| 1            | R/W                  | Read/Write                     |
| 0            | P                    | Present                        |

##### Legend

- **P**: Present
- **R/W**: Read/Write
- **U/S**: User/Supervisor
- **PWT**: Write-Through
- **PCD**: Cache Disable
- **A**: Accessed
- **D**: Dirty
- **PS**: Page Size
- **G**: Global
- **AVL**: Available
- **PAT**: Page Attribute Table

### Checkpoint 2
#### Terminal Driver
read
write
scrolling
clear

#### File system (Read-only)

### Checkpoint 3
#### System Calls
int $0x80呼叫，最多接受三个参数
call number, arg1, arg2, arg3 → EAX, EBX, ECX, EDX
成功return 0，失败return -1，返回值放在EAX
一部分不会返回（如halt）

**Open**
在文件系统中找到文件，分配一个空闲的描述符并初始化（注意文件类型）

**Close**
检测描述符合法性，后释放描述符

**Read**
从RTC/键盘/文件/目录读取数据，返回读取的bytes数量
RTC：接收到virtual interrupt时返回0
键盘：读取到\n时 或 buffer满时返回
文件：读取到EOF时 或 buffer满时返回
File Position指读取位置

system call的传入参数性质也决定了我们需要为它们编写一个wrapper(linkage)来保证参数正常传递
在IDT的0x80号位置调用wrapper：
1. callee saved
2. get arguments，from EBX, ECX, EDX
3. get system call number，int 0x80
4. restore callee saved

**Execute**
Check file validity

Create PCBs

Set up paging

flush tlb (translation lookaside buffer )
- 重新载入cr3

context switch
- **SS0** gets the kernel data segment descriptor (e.g., `0x10` if the third entry in your GDT describes your kernel's data)
- **ESP0** gets the value the stack-pointer shall get at a system call

**Halt**

### Checkpoint 4
getargs
vidmap

### Checkpoint 5
Multiple Terminals
Separate I/O buffer
Switch
Scheduling

### 改进
文件系统可写




## Guide to WFH with Docker
### Overview
The intention of this local development setup is for those who prefer working at home and do not want to go through the long setup time needed with a setup script. Just remember that everything you do with this setup will be stored on your local machine. So after doing your mp, make sure to use Git to commit your code to GitLab. The document includes the setup instruction for Windows, Mac, and Linux.
### Disclaimer
While developing using this setup is supposedly the same as developing on a ECE391 lab computer, there are still chances that your code won’t work the same on it. So please run your code on a lab computer before your hand in time slot to make sure everything is working. For previously stated reason, we will not accept and demo running using this setup.
### Setup steps
#### Downloading docker and pulling the image
##### Windows/Mac Users
1. Download and install<sup>[[1]](#jump1)</sup> [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. In the image tab of Docker Desktop, search for averagefossenjoyer/ece391_docker
3. Pull the image that matches your architecture by selecting the tag<sup>[[2]](#jump2)</sup>
##### Linux Users
1. Install Docker from your distro's repo.<sup>[[3]](#jump3)</sup>
2. Start the Docker daemon.
3. docker pull averagefossenjoyer/ece391_docker:latest-amd64 or latest-arm64
#### Persistent storage?
Keeping everything on Docker has its risks. If you accidentally delete the container, everything in it will be lost, including code that you did not back up to git. It is highly recommended to continue the setup with persistent storage. Follow one of the two sections below based on your choice.
Bottom line: ***!!PUSH OFTEN!!***

#### Starting the container without persistent storage
##### Windows/Mac Users
1. Click on the run button (the little triangle) next to the pulled image
2. Drop down Optional Settings
3. Under Ports put down pairs of 6901 , 8080 , and 37391<sup>[[4]](#jump4)</sup>
4. Press run to create and start the container
##### Linux Users
1. 运行以下命令启动容器：

```bash
docker run -d -p 6901:6901 -p 8080:8080 -p 37391:37391 \
  averagefossenjoyer/ece391_docker
```

<sup>[[4]](#jump4)</sup>
#### Starting the container with persistent storage
##### Windows/Mac Users
1. Create an empty folder, we will mount this onto the container
2. Drop down Optional Settings
3. Under Ports , put down matching pairs of 6901 , 8080 , and 37391<sup>[[4]](#jump4)</sup>
4. Under Volumes->Host Path , look for the folder you just created
5. Under Volumes->Container Path , put down /home/user/mount_share
6. Press run to create and start the container
##### Linux Users
1. Create an empty folder, we will mount this onto the container. We will refer the absolute path of this
folder as `${mount_share}`
2. 运行以下命令：

```bash
docker run -d -p 6901:6901 -p 8080:8080 -p 37391:37391 \
  -v ${mount_share}:/home/user/mount_share:rw \
  averagefossenjoyer/ece391_docker
```
#### Using the container

|Port| Usage|
|------|------|
|6901| VNC|
|37391| SSH|
|8080| [Code Server](https://github.com/coder/code-server)|


Simply open up localhost:6901 in your browser
#### Extra setup with persistent storage
We will need to copy the kernel source to your persistent storage
1. Within the container, open up a terminal
2. sudo chown user:root ~/mount_share
3. cp -pr ~/ece391/smb_share/work ~/mount_share/
4. Open up /etc/samba/smb.conf with ~~your favorite editor~~ vim or xedit if you prefer gui
5. Scroll to the bottom, comment the docker share and uncomment the mounted share to look like below:

\### BEGIN ECE391 CONFIG ###
\### Docker samba share
\#[ece391_share]
\# path = "/home/user/ece391/smb_share"
\# valid users = user
\# create mask = 0755
\# read only = no

\### Mounted samba share
[ece391_share]
&emsp;&emsp;path = "/home/user/mount_share"
&emsp;&emsp;valid users = user
&emsp;&emsp;create mask = 0755
&emsp;&emsp;read only = no

6. sudo service smbd restart

Note: For consistency w.r.t. makefile, you **must** repeat all of these steps **every time** the container is destroyed (you don't have to if you just stop it). Yes, that involves overwriting the kernel source code, and you must do any patch necessary for the MP.
### Extra notes
#### What's the password for...?
- ece391

#### SSH access
- Check ~/.ssh/config for HostName to ssh into devel/test
- Syntax is `ssh ${HostName}`
#### Qemu tools for arm64
- You may want access to qemu terminal, the way to do this is different for qemu 2.0
- Instead of launching Qemu via ./devel , do it with ./devel -monitor stdio
#### X-forwarding
- No. If you really really need it for some reason, email zongrui3@illinois.edu
#### Source Code
- Available at https://gitea.averagefossenjoyer.com/frank/ece391_docker


1. <span id="jump1">For Windows users: During installation, you may get a prompt saying WSL is outdated. Open command prompt and type in wsl --update ↩</span>
2. <span id="jump2">For Windows users, it will be latest-amd64 . For Mac users, it is the same unless you have an M1/M2, then it will be latest-arm64 ↩</span>
3. <span id="jump3">You may want to setup [rootless mode](https://docs.docker.com/engine/security/rootless/) ↩</span>
4. <span id="jump4">You may change the port mapping as you wish. It is recommended to keep it the same for ease of remembering. ↩ ↩ ↩ ↩</span>


## Working on Illinix 391
### 14 Appendix G: Troubleshooting
#### 14.1 Debugging with QEMU
This section describes how to build your new OS which will be embedded, together with the filesys img, in mp3.img.
Wheneverachangeismadetoyourkernelorfilesystem,youneedtosudo makeanewkernel,whichconsequently prepares the mp3.img file which is used in the newly modified test debug.lnk file.
Your new test debug.lnk file should be modified to pass the new mp3 QEMU image. Change the target line to 
>"c:\qemu-1.5.0-win32-sdl\qemu-system-i386w.exe" -hda "&lt;mp3 directory&gt;\mp3.img" -m 256 -gdb tcp:127.0.0.1:1234 -S -name mp3

You may also write the following to a .bat file to accomplish the same thing:
>c:
cd "c:\qemu-1.5.0-win32-sdl\"
qemu-system-i386w.exe -hda &lt;mp3 directory&gt;\mp3.img -m 256 -gdb tcp:127.0.0.1:1234 -S -name mp3


where &lt;mp3 directory&gt; is likely to be: z:\mp3\student-distrib. In order to start debugging with GDB, run your test debug.lnk file, then issue the following commands in the development machine:
```bash
cd &lt;mp3 directory&gt;/student-distrib 
gdb bootimg
target remote 10.0.2.2:1234
```
GDB should now be started and connected to QEMU. From here, you can set up break points and everything else that you would normally do with GDB. Type c to continue execution instead of r since you connected to QEMU which is already running. When you do continue execution in GDB, GRUB will load first in QEMU. You need to hit enter, or wait 5 seconds, for your OS to load. QEMU is known to crash if your page tables are incorrectly setup. You might have to use the task manager in Windows to kill QEMU if this happens.
#### 14.2 /mnt/tmpmp3 Compile Error
When compiling your kernel in MP3, you must first close the test machine. If you forget to close the test machine while compiling, or forget to run as root when you make, you will need to remove the old MP3 image before you can compile again. The commands below can be added to a script to remove the broken files and correct the issue (the last command should be run in git-bash).
```bash
sudo rm -rf /mnt/tmpmp3
rm bootimg
rm mp3.img
git checkout mp3.img
```
If you run the above steps and you still can’t compile, the mp3.img in your repo is broken. You will need to re- vert back to an earlier version of mp3.img or you will need to grab a fresh mp3.img from the class directory under mp3/student-distrib.
#### 14.3 Buffer I/O error on device loop0, logical block \#\#\#\# lost page write due to I/O error on loop0
While this error may be caused by many issues, it’s likely it was caused by an mp3.img corruption. Follow the above steps to attempt a fix. --> 
