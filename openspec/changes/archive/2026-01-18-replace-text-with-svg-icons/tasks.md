# Tasks: replace-text-with-svg-icons

## Implementation Tasks

1. [x] **创建 SVG 图标组件库**
   - 创建 `src/components/icons/` 目录
   - 实现以下 SVG 图标组件：
     - `LogoIcon` - MPlayer 品牌 logo
     - `ShuffleIcon` - 随机播放
     - `ListIcon` - 搜索结果列表
     - `SpinnerIcon` - 加载动画
     - `RefreshIcon` - 重试/刷新
     - `MusicNoteIcon` - 空状态/正在播放
     - `MicOffIcon` - 暂无歌词
     - `ChevronDownIcon` / `ChevronUpIcon` - 折叠/展开
     - `PlatformIcon` - 平台图标 (Netease, QQ, Kugou, Kuwo, Migu)

2. [x] **改造 page.tsx**
   - "MPlayer" → `<LogoIcon />`
   - "随机播放" → 移除文字，仅保留骰子图标
   - "搜索结果" → `<ListIcon />`
   - "搜索中..." → `<SpinnerIcon />`
   - "重试" → `<RefreshIcon />`

3. [x] **改造 SearchBar.tsx**
   - 移除 placeholder 文字
   - 搜索图标已有，确保足够明显

4. [x] **改造 SongList.tsx**
   - "搜索你喜欢的歌曲" → `<MusicNoteIcon />` 居中显示
   - platform badge → 对应平台 logo SVG

5. [x] **改造 NowPlaying.tsx**
   - "正在播放" → `<MusicNoteIcon />` 
   - "暂无歌词" → `<MicOffIcon />`

6. [x] **验证**
   - 确认所有静态文字已替换
   - 确认 aria-label 保留
   - 确认动态数据（歌曲名/歌手名）保留
   - 视觉检查图标清晰度和大小
   - 无 TypeScript 错误

## Validation

- [x] 界面无静态中文/英文文字（品牌、按钮、提示）
- [x] 保留歌曲名、歌手名、歌词
- [x] 保留所有 aria-label
- [x] 图标语义清晰可辨
- [x] 移动端显示正常
