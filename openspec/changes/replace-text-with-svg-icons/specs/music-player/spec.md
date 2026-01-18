# Spec Delta: music-player

## MODIFIED Requirements

### Requirement: Icon-Only UI

The system SHALL use SVG icons instead of text labels for all static UI elements including buttons, status indicators, and section headers. The system MUST preserve text display for dynamic content (song titles, artist names, lyrics) and accessibility labels (aria-label).

#### Scenario: Brand logo display
- **Given**: User opens the application
- **When**: The header is rendered
- **Then**: A Logo SVG icon is displayed instead of text "MPlayer"

#### Scenario: Random play button
- **Given**: User views the main interface
- **When**: The random play button is rendered
- **Then**: Only a dice SVG icon is shown without accompanying text

#### Scenario: Search input hint
- **Given**: User views the search bar
- **When**: The input field is empty
- **Then**: No placeholder text is shown; the search icon serves as the visual hint

#### Scenario: Search results header
- **Given**: User has performed a search
- **When**: Results are displayed
- **Then**: A list SVG icon is shown instead of "搜索结果" text

#### Scenario: Loading state
- **Given**: User initiates a search or random play
- **When**: Data is being fetched
- **Then**: An animated spinner SVG is displayed instead of "搜索中..." text

#### Scenario: Retry action
- **Given**: An error has occurred
- **When**: The retry option is shown
- **Then**: A refresh SVG icon is displayed instead of "重试" text

#### Scenario: Empty state
- **Given**: User has not searched yet
- **When**: The song list area is empty
- **Then**: A music note SVG icon is displayed instead of "搜索你喜欢的歌曲" text

#### Scenario: Now playing header
- **Given**: User opens the now playing view
- **When**: The header is rendered
- **Then**: An animated music note SVG is shown instead of "正在播放" text

#### Scenario: No lyrics available
- **Given**: Current song has no lyrics
- **When**: The lyrics section is rendered
- **Then**: A microphone-off SVG icon is displayed instead of "暂无歌词" text

#### Scenario: Platform badge
- **Given**: A song from a specific platform is displayed
- **When**: The platform indicator is rendered
- **Then**: The platform's logo SVG is shown instead of text (e.g., Netease, QQ Music, Kugou)

#### Scenario: Accessibility preservation
- **Given**: Any interactive element with an SVG icon
- **When**: The element is rendered
- **Then**: The aria-label attribute MUST be preserved for screen reader accessibility
