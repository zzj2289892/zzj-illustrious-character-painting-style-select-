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

# 项目功能详解
## 1. 角色搜索
- 中文/英文搜索：输入中文名或英文提示词关键词进行模糊匹配
- 拼音搜索：支持中文拼音全拼和首字母搜索（如输入 "gj" 可匹配 "光景"）
- 搜索高亮：搜索结果中匹配的关键词会高亮显示
- 防抖搜索：输入时自动延迟 300ms 搜索，避免频繁请求
- 搜索状态记忆：刷新页面后自动恢复上次的搜索内容

## 2. 角色选择与复制
- 点击即复制：点击角色条目，英文提示词自动复制到剪贴板
- 复制成功提示：复制后在页面右下角显示提示词内容的通知
- 预览图展示：选中角色后右侧面板显示该角色的预览图

## 3. 添加角色
- 填写信息：输入中文名称和英文提示词
- 上传图片：可选上传角色预览图（限制 100KB 以内），支持图片预览
- 添加标签：为角色添加自定义标签（回车添加）
- API 持久化：通过 api.php 后端接口将数据写入 zh_CN.json 和 output_*.json

## 4. 编辑角色
- 修改名称/提示词：可修改角色的中文名和英文提示词
- 更换图片：可上传新图片替换旧图片
- 编辑标签：修改角色的标签
- 图片自动迁移：修改英文提示词时，已有图片会自动迁移到新的 key 下

## 5. 删除角色
- 确认删除：删除前弹出确认对话框
- 级联删除：同时从 zh_CN.json 和 output_*.json 中移除数据

## 6. 收藏功能
- 收藏/取消收藏：点击心形按钮切换收藏状态
- 收藏列表视图：点击"收藏"按钮只显示已收藏的角色
- 本地持久化：收藏数据保存在 localStorage

## 7. 批量操作模式
- 多选角色：进入批量模式后，点击角色条目可多选
- 批量编辑标签：为选中的角色批量添加/移除标签
- 批量导出：将选中角色导出为 JSON 文件下载
- 批量导入：从 JSON 文件导入角色数据（支持新增和更新）
- 批量删除：一键删除选中的角色

## 8. 标签系统
- 自定义标签：为角色添加任意标签
- 标签筛选：按标签过滤显示角色，支持多标签 OR 筛选
- 标签排序：画师串标签优先排序，支持数字排序
- 筛选状态记忆：刷新页面后保持标签筛选状态

## 9. 拖拽排序
- 自定义排序：非批量模式下可拖拽角色条目调整顺序
- 排序记忆：排序结果按搜索/收藏/标签筛选等不同上下文分别保存
- 重置排序：可一键恢复默认排序

## 10. 提示词构建器
- 分类标签选择：提供以下分类的可视化标签面板：
  - 画质标签（masterpiece, best quality 等）
  - 风格选择
  - 场景标签
  - 姿势标签
  - 服装标签（含正装、日式、中式、婚纱、制服、服装风格、套装等子类）
  - 以及更多分类...
- 权重显示：标签旁显示权重值（非 1.0 时）
- 实时生成：选中的标签自动组合生成完整提示词
- 手动编辑：可直接在文本框中手动修改提示词
- 复制提示词：一键复制生成的提示词
- 收藏提示词：收藏常用的提示词组合
- 清空重置：一键清空所有选择

## 11. 翻译功能
- 中英互译：支持中文→英文、英文→中文双向翻译
- 在线翻译：调用 MyMemory 翻译 API
- 重试机制：翻译失败自动重试最多 3 次
- 复制结果：一键复制翻译结果

## 12. 随机画师
- 随机推荐：点击按钮随机推荐一个画师风格
- 画师缓存：画师数据缓存在 artists_cache.json

## 13. 主题切换
- 亮色/暗色主题：点击月亮图标切换
- 主题记忆：主题偏好保存在 localStorage

## 14. 快捷键
- Esc — 关闭所有弹窗
- Ctrl+F 或 / — 聚焦搜索框
- Ctrl+N — 打开添加角色弹窗
- Ctrl+B — 切换批量模式
- ← / → — 翻页
- F — 切换收藏视图
- T — 切换主题

## 15. PNG 元数据提取
- 点击"元数据提取"按钮跳转到 yuanshuju.html 页面，可从 PNG 图片中提取嵌入的提示词信息

## 16. 清除缓存
- 清除图片缓存：清除 IndexedDB 和 localStorage 中的图片缓存数据
- 释放空间：解决缓存过大导致的性能问题

## 17. 分页显示
- 每页 50 条：搜索结果分页展示
- 翻页控制：上一页/下一页按钮
- 页码信息：显示当前页/总页数和角色总数

## 18. 图片缓存系统
- IndexedDB 优先：使用 IndexedDB 存储图片缓存（容量大）
- localStorage 降级：不支持 IndexedDB 时自动降级到 localStorage
- 懒加载：图片按需从 output_1~10.json 加载并缓存


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


## 致谢

- [lanner0403/WAI-NSFW-illustrious-character-select](https://github.com/lanner0403/WAI-NSFW-illustrious-character-select) — 原项目
