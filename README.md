# Illustrious 角色提示词查询工具

为 [WAI-NSFW-illustrious-SDXL](https://civitai.com/models/827184?modelVersionId=1183765) 系列模型提供便捷的角色提示词查询功能，帮助用户快速获取角色生成参数。

## 项目起源

基于 [WAI-NSFW-illustrious-character-select](https://github.com/lanner0403/WAI-NSFW-illustrious-character-select) 二次开发，感谢原作者的贡献。


## 功能特性

- **角色提示词查询** — 快速检索和获取 Illustrious 系列模型的角色提示词
- **自定义扩展** — 支持通过配置文件添加新角色和自定义动作
- **多语言支持** — 中英文界面切换
- **AI 辅助生成** — 集成 AI 功能辅助生成角色描述（需配置 API 密钥）
- **随机画师** — 随机推荐画师风格
- **收藏功能** — 收藏常用角色
- **批量操作** — 批量选择角色提示词
- **拼音搜索** — 支持中文拼音首字母搜索

## 在线使用

打开浏览器访问：[https://zhuanqianfish.github.io/Luckyfish-illustrious-character-select/](https://zhuanqianfish.github.io/Luckyfish-illustrious-character-select/)

## 本地运行

### Windows 系统

1. 确保已安装 Python 环境
2. 双击执行 `runserver.bat`
3. 浏览器将自动打开 [http://localhost:8888/](http://localhost:8888/)

> 本项目内置 PHP 运行环境（`Lib/php.exe`），无需额外安装 PHP。

### 作为 Stable-Diffusion-WebUI 插件

请参考原项目仓库的安装说明：[WAI-NSFW-illustrious-character-select](https://github.com/lanner0403/WAI-NSFW-illustrious-character-select)

## 项目结构

```
├── index.html              # 主页面
├── api.php                 # 后端 API（角色增删改查）
├── random_artist.php       # 随机画师 API
├── runserver.bat           # Windows 一键启动脚本
├── settings.json           # 全局设置（模型参数、AI 配置等）
├── prompts_config.json     # 提示词分类配置（质量、动作、表情等）
├── action.json             # 动作提示词配置
├── zh_CN.json              # 中文角色名称映射
├── artists_cache.json      # 画师缓存数据
├── output_1~10.json        # 角色图片数据
├── localize_config.py      # 提示词配置汉化脚本
├── Lib/
│   └── php.exe             # 内置 PHP 运行环境
└── web/
    ├── index.css           # 样式文件
    └── index.js            # 前端逻辑
```

## 配置说明

### settings.json

| 字段 | 说明 |
|------|------|
| `wai_json_url1/2` | 角色数据源 JSON 地址 |
| `neg_prompt` | 默认反向提示词 |
| `steps` | 生成步数 |
| `height` / `width` | 图片尺寸 |
| `nsfw` | NSFW 提示词前缀 |
| `quality` | 画质提示词 |
| `ai` | 是否启用 AI 辅助 |
| `base_url` | AI API 地址 |
| `model` | AI 模型名称 |
| `api_key` | AI API 密钥 |

## 致谢

- [lanner0403/WAI-NSFW-illustrious-character-select](https://github.com/lanner0403/WAI-NSFW-illustrious-character-select) — 原项目
