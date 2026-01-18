# Proposal: replace-text-with-svg-icons

## Summary

将界面中的静态文字替换为 SVG 图标，实现纯图形化 UI。保留动态数据（歌曲名/歌手名）和无障碍标签（aria-label）。

## Motivation

- 减少界面文字干扰，打造更简洁的视觉体验
- 国际化友好，无需翻译
- 统一的图标风格提升设计一致性

## Scope

**IN（需改造）**:
- "MPlayer" 品牌名 → Logo SVG
- "随机播放" 按钮文字 → 仅保留骰子图标
- "搜索结果" 标题 → 列表图标
- "搜索中..." 状态 → 加载动画 SVG
- "重试" 按钮 → 刷新图标
- 搜索框 placeholder → 移除文字，仅靠搜索图标提示
- "搜索你喜欢的歌曲" 空状态 → 音乐图标
- "正在播放" 标题 → 音符动画图标
- "暂无歌词" 提示 → 麦克风划线图标
- platform badge 文字 → 平台 logo SVG

**OUT（保留）**:
- 歌曲名、歌手名（动态数据）
- aria-label 无障碍标签
- 歌词文本

## Dependencies

- 需要设计或选用一套 SVG 图标

## Risks

- 纯图标可能降低首次使用用户的可理解性（通过 tooltip 或 aria-label 缓解）
