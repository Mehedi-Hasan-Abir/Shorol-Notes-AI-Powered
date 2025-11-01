# Shorol Notes (সরল নোট)

A beautiful Bangla-first web-based note-taking application with voice recording, AI transcription, summarization, and calendar integration.

![Shorol Notes](screenshots\noteslist.png)

## ✨ Features

- 📝 **Rich Text Notes** - Create and edit notes with a clean, distraction-free editor
- 🎤 **Voice Recording** - Record audio notes using your browser's microphone
- 🔍 **Smart Search** - Quickly find notes with real-time search
- ⭐ **Important Notes** - Star and filter important notes
- 🤖 **AI-Powered** - Transcribe audio to text and generate summaries using OpenAI (or other providers)
- 📅 **Calendar Integration** - Create events in Google Calendar and Outlook
- 🌙 **Dark Mode** - Beautiful light and dark themes
- 🇧🇩 **Bangla-First** - Designed with excellent Bangla typography support
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile
- 💾 **Offline-First** - In-memory storage for quick access (database support ready)

## 🖼️ Screenshots


### Note Editor
A distraction-free editor with voice recording, transcription, and calendar integration.

![Note Editor](screenshots\notesedit.png)

### Voice Recording
Record audio notes with a beautiful, intuitive interface.

![Voice Recorder](screenshots\voice.png)

### Calendar View
See all your scheduled events from Google Calendar and Outlook in one place.

![Calendar](screenshots\calender_events.png)

### Settings
Configure your API keys and connect your calendar accounts.

![Settings](screenshots\settings.png)

### Light Mode
Beautiful light mode for comfortable note-taking at night.

![Dark Mode](screenshots\light.png)

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   The application will automatically open at `http://localhost:5000`

   If it doesn't open automatically, navigate to:
   ```
   http://localhost:5000
   ```

### First Time Setup

1. **Click the Settings tab** (⚙️ icon) at the top
2. **Add your OpenAI API Key** for transcription and summarization (or configure alternative providers via Settings)
3. **Connect your calendar accounts** (optional)
   - Click "Connect" for Google Calendar or Outlook

## 🏗️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Wouter** - Client-side routing
- **TanStack Query** - Data fetching and state management
- **date-fns** - Date formatting

### Backend
- **Express.js** - Web server
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **SQLite/PostgreSQL** - Database (switchable)

### APIs & Integrations
- **Hugging Face Inference API** (free) or **OpenAI** for transcription/summarization
- **Ollama** (local) for private/offline LLM summarization
- **Google Calendar API** and **Microsoft Graph API** for calendar integration

## 📁 Project Structure

```
shorol-notes/
├── client/                   # Frontend React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── NoteCard.tsx
│   │   │   ├── VoiceRecorder.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FilterChips.tsx
│   │   │   ├── NoteEditor.tsx
│   │   │   ├── CalendarView.tsx
│   │   │   ├── SettingsSection.tsx
│   │   │   └── ui/          # Shadcn UI components
│   │   ├── pages/           # Page components
│   │   │   ├── NotesPage.tsx
│   │   │   ├── CalendarPage.tsx
│   │   │   └── SettingsPage.tsx
│   │   ├── lib/             # Utilities
│   │   ├── App.tsx          # Main app component
│   │   └── index.css        # Global styles
│   └── index.html
├── server/                   # Backend Express server
│   ├── routes.ts            # API routes
│   ├── storage.ts           # Storage interface
│   └── index.ts             # Server entry point
├── shared/                   # Shared types and schemas
│   └── schema.ts            # Database schema & types
├── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory (optional - most settings can be configured via the Settings UI):

```env
# Session Secret (automatically generated if not provided)
SESSION_SECRET=your-secret-key-here

# Google Calendar (optional)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Microsoft Outlook (optional)
MS_CLIENT_ID=...
MS_CLIENT_SECRET=...
```

**Note**: AI provider settings (Hugging Face token, Ollama models, or OpenAI key) are configured through the Settings page in the application, not only via environment variables.

### Database Setup

The application uses in-memory storage by default for quick prototyping. To enable persistent storage:

1. Uncomment PostgreSQL setup in `server/storage.ts`
2. Configure `DATABASE_URL` environment variable
3. Run migrations:
   ```bash
   npm run db:push
   ```

## 🌐 Deployment

### Common steps (any platform)

```bash
# Build client and bundle server
npm run build

# Start production server
npm start
```

Ensure your platform runs **Node.js 18+** and sets the environment variables described above.

### One-click / managed platforms (choose one)

- **Railway** — Full‑stack Node + Postgres. Create a new project → "Deploy from GitHub" → add `DATABASE_URL` if using Postgres.
- **Render** — Web Service (Node) + managed Postgres. Set build command `npm run build`, start `npm start`.
- **Vercel** — Frontend + Serverless API routes. Use a Node server or adapt `server/index.ts` to serverless functions.
- **Netlify** — Frontend + Functions. Build with `vite` and expose APIs via Netlify Functions.
- **Docker** — Build an image and run anywhere:
  ```Dockerfile
  FROM node:20-alpine
  WORKDIR /app
  COPY package*.json .
  RUN npm ci
  COPY . .
  RUN npm run build
  EXPOSE 5000
  CMD ["npm","start"]
  ```
- **Replit** — Import the repo and run `npm run dev` for development or `npm start` for production.

## 🤖 AI Provider Options

- **Free:** Hugging Face Inference API (Whisper/BART)
- **Local/Private:** Ollama (e.g., `llama3`, `mistral`, `deepseek-r1`)
- **Cloud:** OpenAI (GPT models)

Configure in the Settings page.

## 🛠️ Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Push schema to database (if using Drizzle)
npm run db:push
```

## 🐛 Troubleshooting

- **Microphone not working:** grant browser permissions; prefer `https://`.
- **Hugging Face errors:** verify token & rate limits.
- **Ollama not detected:** ensure `ollama serve` is running and a model is pulled.
- **Calendar issues:** verify OAuth creds and API enabled in provider console.

## 📝 Data Model

### Notes
- `id` - Unique identifier
- `title` - Note title
- `body` - Note content
- `isImportant` - Whether the note is starred
- `summaryTldr` - AI-generated summary
- `transcriptText` - Transcribed audio text
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Media
- `id` - Unique identifier
- `noteId` - Associated note
- `type` - Media type (audio/video)
- `uri` - File location
- `durationMs` - Duration in milliseconds

### Events
- `id` - Unique identifier
- `noteId` - Associated note
- `provider` - Calendar provider (google/outlook)
- `providerEventId` - External event ID
- `title` - Event title
- `startsAt` - Start time
- `endsAt` - End time

## 📄 License

MIT License - feel free to use this project for your own applications.

---

**Made with ❤️ for the Bangla-speaking community**
