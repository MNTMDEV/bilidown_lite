# bilidown_lite

b站源视频下载chrome插件版，完全的支持无脑操作。

Update:为了方便维护，python版已经迁移到了[bilidown_py](https://github.com/MNTMDEV/bilidown_py)中。

Notice:音视频合成可以使用ffmpeg，嫌麻烦可以使用[音视频合成无脑版工具](https://github.com/MNTMDEV/Qtavcombine)。

## bili_down_chrome

这个就是我开发的第一个可用的chrome拓展版的bilidown插件了。你可以用它下载高画质视频，如果你登录的用户是大会员，您还可以下载大会员专属的视频。

这个版本有些细节问题还需完善，后续还会更新。

注意事项：
- 由于chrome浏览器的更新，未签名的crx包已经不允许安装。现在可行的方法是在chrome浏览器打开chrome://extensions，开启开发者模式，把crx后缀改成zip并解压，加载解压后的插件目录。
- 为了更好的用户体验，即使不安装迅雷等多线程下载软件也可以使用浏览器直接下载，但是CDN有时候会对单连接限速，多线程下载可以使用[bilidown_py](https://github.com/MNTMDEV/bilidown_py)，20线程安排。

## TODO

- [ ] WIP:UI优化，现在的UI有点简单粗暴了
- [ ] 对接调用后续开发的bilidown_py的GUI程序
- [x] 解决标签页URL变化时不清空老页面资源的问题