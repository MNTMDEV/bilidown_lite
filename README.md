# bilidown_lite

b站源视频下载chrome插件版，完全的支持无脑操作。

Update:为了方便维护，python版已经迁移到了[bilidown_py](https://github.com/MNTMDEV/bilidown_py)中。

Notice:近期计划启动C++版的项目[bilidown_cpp](https://github.com/MNTMDEV/bilidown_cpp)。

人活着就是为了效率、代码执行时间！预期实现登录、下载、音视频合成。

## bili_down_chrome

这个就是我开发的第一个可用的chrome拓展版的bilidown插件了。你可以用它下载高画质视频，如果你登录的用户是大会员，您还可以下载大会员专属的视频。
这个版本有些细节问题还需完善，后续还会更新。

Update:关于CRX_REQUIRED_PROOF_MISSING问题的解释

这个程序没有上架商店，因此没有得到签名，必须开启开发者模式，再刷新chrome://extension/之后即可正常使用

拖入窗口如果显示的下载crx，一定会出现CRX_REQUIRED_PROOF_MISSING错误；

开启开发者模式+刷新的情况下，拖入时背景会出现遮盖层。

## TODO

- [x] 解决chrome插件中视频多开如何识别各个标签页的下载链接
- [ ] 页面未完全加载会执行脚本与它本身的js起冲突的问题
- [x] 解除对于迅雷下载的依赖