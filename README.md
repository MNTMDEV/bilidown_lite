# bilidown_lite

b站源视频下载chrome插件版，完全的支持无脑操作。

关于视频处理方法：音视频合成可以直接使用ffmpeg，嫌麻烦可以使用[音视频合成无脑版工具](https://github.com/MNTMDEV/Qtavcombine)，最简单实用的方法是使用[bilidown_py](https://github.com/MNTMDEV/bilidown_py)的bilidownGUI对接此插件一步到位。

## bili_down_chrome

这个就是我开发的第一个可用的chrome拓展版的bilidown插件了。你可以用它下载高画质视频，如果你登录的用户是大会员，您还可以下载大会员专属的视频。(港番支持在考虑做了)

注意事项：
- 由于chrome浏览器的更新，未签名的crx包已经不允许安装。现在可行的方法是在chrome浏览器打开chrome://extensions，开启开发者模式，把crx后缀改成zip并解压，加载解压后的插件目录。
- 为了更好的用户体验，即使不安装迅雷等多线程下载软件也可以使用浏览器直接下载，但是CDN有时候会对单连接限速，多线程下载可以使用[bilidown_py](https://github.com/MNTMDEV/bilidown_py)，10线程安排，同时一键处理视频，bilidownGUI带图形界面实现一键化操作。
- 新版本chrome已经不再建议使用v2清单文件(2023年将彻底废除)，因此后续开发master分支将以v3标准维护，保留v2分支可供老版本的chrome使用。

## TODO

- [ ] 考虑添加支持港番的feature