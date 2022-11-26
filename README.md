project for:
= 博客平台
= 离线 PC 端记录笔记
= 自动同步 Web 端
未来设想
= 低代码个性生成 Web 界面 组件化形式（比如 2D 人物组件 音乐播放组件...）
= 超简单的部署方式 以及博客更新方式

git子模块依赖
git submodule add https://github.com/LinYUAN-code/vditor.git packages/viditor
git submodule add https://github.com/LinYUAN-code/linyuan-storage.git packages/linyuan-storage

开发环境搭建
git submodule init
git submodule update

pnpm i

pnpm link ./packages/viditor
pnpm link ./packages/linyuan-storage

npm run tauri dev / cargo tauri dev 
如果之前没用过tauri请先安装tauri 同时需要nightly版本 可以使用rustup进行安装

cargo tauri build --target universal-apple-darwin/aarch64-apple-darwin/x86_64-apple-darwin

- tauri
- vditor


一些坑：
    1. toolbar 怎么设置居中 以及 失焦后消失 做不到像qq 网易云音乐的那个效果
    2. minWidth 和 minHeight 必须同时设置