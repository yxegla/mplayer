# Spec Delta: music-player

## MODIFIED Requirements

### Requirement: Random Playback List Display

The system SHALL display the random playback song list in a collapsed state by default. Users MAY manually expand or collapse the list.

#### Scenario: Default collapsed state after random play
- **Given**: 用户在主界面
- **When**: 用户点击随机播放按钮
- **Then**: 歌曲开始播放，但随机歌曲列表保持折叠状态

#### Scenario: Manual expand random list
- **Given**: 随机播放已启动且列表处于折叠状态
- **When**: 用户点击展开按钮
- **Then**: 随机歌曲列表展开显示所有歌曲

#### Scenario: Manual collapse random list
- **Given**: 随机歌曲列表处于展开状态
- **When**: 用户点击折叠按钮
- **Then**: 列表折叠，仅显示折叠指示器

---

## ADDED Requirements

### Requirement: Auto-refill Queue on Exhaustion

The system SHALL automatically fetch and append new random songs to the queue when the current queue is exhausted during random playback mode. The system MUST continue playback seamlessly without user intervention.

#### Scenario: Auto-refill when queue exhausted
- **Given**: 用户正在随机播放模式
- **And**: 当前播放的是队列中的最后一首歌
- **When**: 该歌曲播放结束
- **Then**: 系统自动从 toplist 获取新歌曲
- **And**: 新歌曲经过随机排序后追加到队列末尾
- **And**: 播放器继续播放新添加的第一首歌曲

#### Scenario: Avoid duplicate songs in auto-refill
- **Given**: 队列中已有若干歌曲
- **When**: 系统自动补充新歌曲
- **Then**: 不会添加队列中已存在的歌曲（基于歌曲 ID 去重）

#### Scenario: Continuous playback experience
- **Given**: 用户启动随机播放后未进行其他操作
- **When**: 播放持续进行
- **Then**: 用户可以无限期享受随机音乐，无需手动干预
