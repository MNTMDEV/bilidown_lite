# bilidown_lite

b站源视频下载轻量级，这将是第一个README比程序更有用、展示思想而非代码的项目。(orz)

你还在苦恼b站视频素材下不了吗？你还在抱怨bilibilijj不好使吗？

如果你能熟练的操作这个小小小小小小小小小小小小小小小小小小...py程序，那么实际的效率不比那些使用图形化并且高集成的程序差哦。

目前已经支持bypass_4480.py的av号和bv号的双兼容、chrome插件的av号和bv号的双兼容

## 本项目优势

- 由于本项目代码极其精简，您甚至可以自己编写出代码。
- 由于集成度小，bilibili的URL格式或者参数格式发生变化，您仍然可以正常使用并且不用做代码改动。
- 本项目只引入了requests，直接pip装上依赖就能使了，集成的太多装依赖也费时间。
- 毕竟是落后的flash播放器嘛，估计bilibili的程序猿也很少会做改动了，这个方法理论上更不容易失效。
- 坠重要的~~~需要登录或者大会员的资源也能下(只要你当前的bilibili账号有权限访问，毕竟它灵活嘛)。

## 本项目不足

- 不到20行代码，这意味这什么呢？当然是手动为重，程序为辅了。
- 对非专业人员不友好。(不过来看代码的基本功都不会我信你个鬼啊)
- 没做GUI。(就两个输入，做个毛线GUI啊)

## 操作步骤(Flash播放器)

- 首先，要有chrome浏览器、python运行环境、[ffmpeg](http://ffmpeg.org/download.html)，要安装requests(一行pip install requests的事)
- 打开chrome浏览器，打开bilibili视频页，启用flash，切换bilibili的flash播放器，选择好要下载的画质
- F12打开调试，选择Network，然后刷新网页
- 网站刚开始会加载一堆文件，这些不用管。随着时间推进，它会一直加载一个包，那个包一定是最大的flv视频文件，用鼠标覆盖那一条长直线会筛选出一个包，选中那个包，复制它的URL，应该是.flv?后面跟着一堆参数的那种
- 打开这个py程序，粘贴URL，回车
- 复制浏览器地址栏中视频的地址
- 在py程序中粘贴Referer值，回车
- 它会生成一个1.tmp的文件，改成.flv格式的，如果你不喜欢flv格式的，可以使用ffmpeg -i 1.flv 1.mp4这样的命令转格式(前提你有ffmpeg)

## 操作步骤(H5播放器)

- 同样，要有chrome浏览器、python运行环境、[ffmpeg](http://ffmpeg.org/download.html)，要安装requests(一行pip install requests的事)
- 打开chrome浏览器，打开bilibili视频页，使用bilibili默认的H5播放器，选择好要下载的画质
- F12打开调试，选择Network，然后刷新网页
- 网站刚开始会加载一堆文件，这些不用管。直接搜m4s后缀的request包，会有2个包，一个是音频一个是视频，复制它们的URL，应该是.m4s?后面跟着一堆参数的那种
- 打开这个py程序，粘贴URL，回车
- 复制浏览器地址栏中视频的地址
- 在py程序中粘贴Referer值，回车
- 两次它都会生成1.tmp的文件，都改成.mp4格式的，然后视频音频自然你就能区分出来了，然后上ffmpeg，把视频音频全打到一个文件里

## 演示截图(Flash播放器)

就拿bilibili的这个视频试试手吧！！！

[洛天依滴极乐净土](https://www.bilibili.com/video/av5473936)

直接调成flash播放器，1080画质

![图片](https://raw.githubusercontent.com/MNTMDEV/bilidown_lite/master/pic/1.png)

开调试，刷新网页抓包

![图片](https://raw.githubusercontent.com/MNTMDEV/bilidown_lite/master/pic/2.png)

py程序的参数

![图片](https://raw.githubusercontent.com/MNTMDEV/bilidown_lite/master/pic/3.png)

## 新增的bypass_480.py

为什么说是bypass_480呢，这个可是确实已经达到了完全自动化的目标，但是你是知道的，游客所能看到的bili视频最高画质就是480，你没有登录的Cookies，bilibili自然不会叫你看高画质的视频，当然更别提下载它的源文件了。就不多说了，好处自然是输入https://www.bilibili.com/video/av(bv)xxxxxxxx 就能全自动下载，缺点你懂的，高画质别想了，如果还要让程序输入Cookies，那还不如直接使用上面那个最简版的用抓包来做呢。当然，不要忽略一点，这个家伙还是支持下载同一个av/bv号不同页的视频哦。

## 新增的bili_down_chrome

这个就是我开发的第一个可用的chrome拓展版的bilidown插件了。你可以用它下载高画质视频，如果你登录的用户是大会员，您还可以下载大会员专属的视频。
这个版本有些细节问题还需完善，后续还会更新。

Update:关于CRX_REQUIRED_PROOF_MISSING问题的解释

这个程序没有上架商店，因此没有得到签名，必须开启开发者模式，再刷新chrome://extension/之后即可正常使用

拖入窗口如果显示的下载crx，一定会出现CRX_REQUIRED_PROOF_MISSING错误；

开启开发者模式+刷新的情况下，拖入时背景会出现遮盖层。

## TODO

- [x] 做一个对于H5播放器的版本的类似功能(bypass已经支持)
- [ ] bypass_480做一个对于H5播放器的版本的类似功能
- [x] 解决chrome插件中视频多开如何识别各个标签页的下载链接
- [ ] 页面未完全加载会执行脚本与它本身的js起冲突的问题
- [x] 解除对于迅雷下载的依赖