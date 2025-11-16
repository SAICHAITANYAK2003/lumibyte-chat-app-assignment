# ChatAI - Intelligent Chat Application

A modern, ChatGPT-style application built with React, TypeScript, and Tailwind CSS. Features intelligent responses with structured tabular data, session management, and theme customization.

## Features

- 🚀 **Chat Interface** - Clean, modern ChatGPT-inspired design
- 📊 **Structured Data** - Answers displayed in organized tables with descriptions
- 💾 **Session Management** - All conversations saved with session history
- 🔄 **Session-based URLs** - Each chat has a unique URL for easy sharing
- 👍👎 **Feedback System** - Like/dislike buttons for each response
- 🌓 **Dark/Light Theme** - Toggle between themes with persistent preference
- 📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- 🔌 **Collapsible Sidebar** - Maximize screen space when needed

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React hooks with localStorage persistence

## Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:8080`

## Building for Production

```bash
npm run build
# or
yarn build
# or
bun run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── ChatInput.tsx    # Message input component
│   ├── ChatMessage.tsx  # Individual message display
│   ├── Sidebar.tsx      # Session history sidebar
│   ├── ThemeToggle.tsx  # Theme switcher
│   └── WelcomeScreen.tsx # Landing page
├── services/
│   └── mockApi.ts       # Mock API service with data
├── types/
│   └── chat.ts          # TypeScript interfaces
├── pages/
│   └── Index.tsx        # Main chat page
├── index.css            # Global styles & design system
└── main.tsx             # Application entry point
```

## How It Works

### Mock Data System
The application uses a frontend-only mock API system that simulates backend responses:
- Questions are analyzed to determine appropriate response data
- Responses include structured tables with relevant information
- All data is stored in browser localStorage for persistence

### Session Management
- Each new chat creates a unique session ID
- Session ID is stored in the URL (`?session=xxx`)
- Sessions are persisted in localStorage
- Session history visible in the sidebar

### Theme System
- Uses CSS custom properties for theming
- Dark/light mode toggle in header
- Theme preference saved to localStorage
- Supports system theme preference on first load

## Customization

### Adding Mock Data
Edit `src/services/mockApi.ts` to add more mock responses:

```typescript
const mockTableData: Record<string, TableData> = {
  'your-topic': {
    headers: ['Column 1', 'Column 2'],
    rows: [['Data 1', 'Data 2']],
    description: 'Your description here'
  }
};
```

### Styling
All colors and design tokens are in `src/index.css`. Modify CSS custom properties to change the theme:

```css
:root {
  --primary: 221 83% 53%;  /* Your brand color */
  /* ... other tokens */
}
```

