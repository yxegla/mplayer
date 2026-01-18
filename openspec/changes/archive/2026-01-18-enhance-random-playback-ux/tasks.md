# Tasks: enhance-random-playback-ux

## Implementation Tasks

1. [x] **添加随机播放列表折叠状态**
   - 在 `page.tsx` 中添加 `isRandomListCollapsed` 状态，默认为 `true`
   - 随机播放结果使用独立的列表组件或条件渲染
   - 添加展开/折叠切换按钮

2. [x] **实现队列自动补充逻辑**
   - 在 `usePlayer.tsx` 中添加队列耗尽检测
   - 当播放到队列最后一首歌时，自动调用 toplist API
   - 将新获取的歌曲 shuffle 后追加到队列末尾
   - 确保不重复添加已在队列中的歌曲

3. [x] **添加自动补充的 API 调用**
   - 在 `usePlayer` 中暴露 `appendToQueue` 方法
   - 通过 useEffect 检测队列剩余歌曲数量并自动补充

4. [x] **验证功能**
   - 测试默认折叠状态
   - 测试手动展开/折叠
   - 测试队列播放完毕后自动补充
   - 测试移动端响应式布局

## Validation

- [x] 随机播放后列表默认折叠
- [x] 可手动展开查看随机列表
- [x] 播放完所有歌曲后自动添加新歌曲继续播放
- [x] 无 TypeScript 错误
