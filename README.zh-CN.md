# PDF Manager 简体中文版

这是 [PDF Manager](https://github.com/lucianhanga/chrome.extension.manage.pdfs) 的简体中文界面修改版，基于原项目 MIT 许可证。PDF 读取、拖动排序、合并与导出逻辑沿用原版，文件仅在浏览器本地处理。

## 功能

- 左侧素材区：添加 PDF、PNG/JPEG/WebP/GIF 图片和 TXT 文本，预览、展开 PDF 缩略图，单选或多选页面。
- 右侧成品区：将素材拖入，调整顺序、复制或删除页面。
- 导出：打印优先、网页分享或高压缩三种模式。**高压缩会将 PDF 页面栅格化，文字可能无法直接选取**。

## 安装（无须配置 Node.js）

1. 打开本仓库的 **Actions**，找到 **CI** 工作流。
2. 点击最新一次成功的运行，在页面底部 **Artifacts** 区域下载 `PDF-Manager-zh-CN-unpacked`。
3. 把下载的 ZIP **解压**到一个固定目录。
4. 在 Chrome 地址栏输入 `chrome://extensions`，开启右上角“开发者模式”。
5. 点击“加载已解压的扩展程序”，选择**直接包含 manifest.json 的目录**（而不是外层 ZIP）。
6. 点击 Chrome 扩展工具栏中的“PDF Manager 中文版”。

注意：未构建成功的提交不会生成可安装产物。如果 Actions 中看不到新运行，需要先确认是否已经启用 fork 仓库的工作流。

## 开发构建

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

安装目录为 `dist/`。未经测试时不要把 CI 产物等同于 Chrome 实机验证；建议先用非敏感文件测试导入、拖放和导出。

## 开源许可

遵循原项目 [MIT 许可证](LICENSE)；原作者 Lucian Hanga。
