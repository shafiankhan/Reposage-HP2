# RepoSage 🧠

**AI-Powered Code Intelligence & Meeting Collaboration Platform**

RepoSage transforms your development workflow with cutting-edge AI that understands your codebase and intelligently analyzes your team meetings. Get instant answers, smart summaries, and actionable insights to supercharge your productivity.

RepoSage Dashboard ![image](https://github.com/user-attachments/assets/a77c03d6-f4ad-4f65-8c42-06806c89c800)

## ✨ Features

### 🤖 AI Code Intelligence
- **Smart Code Analysis**: Ask questions about your codebase and get contextual answers with file references
- **Intelligent Search**: AI-enhanced code exploration and navigation
- **Code Optimization**: Get suggestions for performance improvements and best practices
- **Architecture Insights**: Understand component relationships and system design

### 📹 Meeting Intelligence
- **Automatic Transcription**: Upload meeting recordings for instant transcripts
- **Smart Summaries**: AI-generated meeting summaries with key decisions and outcomes
- **Action Item Extraction**: Automatically identify and track action items
- **Searchable Q&A**: Find specific discussions and decisions across all meetings

### 📊 Analytics & Insights
- **Usage Analytics**: Track team productivity and collaboration patterns
- **Code Quality Metrics**: Monitor code health and improvement trends
- **Team Performance**: Understand development velocity and bottlenecks
- **Custom Dashboards**: Personalized views of your most important metrics

### 👥 Team Collaboration
- **Multi-Project Support**: Manage multiple repositories and codebases
- **Team Management**: Invite members with role-based permissions
- **Shared Conversations**: Save and share important AI conversations
- **Real-time Sync**: Stay updated with live repository changes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Firebase account for authentication and database
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shafiankhan/Repo-Sage
   cd reposage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Configure Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication with Email/Password, Google, and GitHub providers
   - Create a Firestore database
   - Copy your config values to `.env.local`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
reposage/
├── app/                          # Next.js 13+ App Router
│   ├── (dashboard)/             # Dashboard layout group
│   │   ├── analytics/           # Analytics pages
│   │   ├── billing/             # Billing and subscription
│   │   ├── chat/                # AI chat interface
│   │   ├── meetings/            # Meeting management
│   │   ├── projects/            # Project management
│   │   ├── settings/            # User settings
│   │   └── team/                # Team management
│   ├── auth/                    # Authentication pages
│   │   ├── signin/              # Sign in page
│   │   └── signup/              # Sign up page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/                   # Reusable UI components
│   ├── analytics/               # Analytics components
│   ├── billing/                 # Billing components
│   ├── chat/                    # Chat interface components
│   ├── dashboard/               # Dashboard components
│   ├── landing/                 # Landing page components
│   ├── meetings/                # Meeting components
│   ├── project/                 # Project-specific components
│   ├── projects/                # Projects list components
│   ├── settings/                # Settings components
│   ├── team/                    # Team management components
│   ├── ui/                      # Base UI components (shadcn/ui)
│   └── theme-provider.tsx       # Theme context provider
├── contexts/                     # React contexts
│   └── auth-context.tsx         # Authentication context
├── lib/                         # Utility libraries
│   ├── auth.ts                  # Authentication helpers
│   ├── firebase.ts              # Firebase configuration
│   └── utils.ts                 # General utilities
├── public/                      # Static assets
└── package.json                 # Dependencies and scripts
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend & Services
- **Firebase Auth** - User authentication
- **Firestore** - NoSQL database
- **Firebase Storage** - File storage

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

## 🔧 Configuration

### Firebase Setup

1. **Authentication Providers**
   - Enable Email/Password authentication
   - Configure Google OAuth (optional)
   - Configure GitHub OAuth (optional)

2. **Firestore Database**
   - Create a database in production mode
   - Set up security rules for user data protection

3. **Storage Rules**
   - Configure storage bucket for meeting recordings
   - Set appropriate security rules

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | ✅ |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | ✅ |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | ✅ |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | ✅ |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | ✅ |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | ✅ |

## 📱 Usage

### Getting Started

1. **Sign Up**: Create an account using email or social providers
2. **Add Projects**: Connect your GitHub repositories
3. **Start Chatting**: Ask AI questions about your codebase
4. **Upload Meetings**: Add meeting recordings for analysis
5. **Explore Analytics**: View insights about your development workflow

### Key Features

#### AI Chat
- Ask questions about code functionality
- Get explanations of complex algorithms
- Request optimization suggestions
- Understand architecture decisions

#### Meeting Analysis
- Upload audio/video recordings
- Get automatic transcriptions
- Extract action items and decisions
- Search across all meeting content

#### Project Management
- Monitor multiple repositories
- Track commit activity
- Analyze code quality trends
- Collaborate with team members

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Environment Variables**
   - Add all Firebase environment variables in Vercel dashboard
   - Ensure all variables are properly configured

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Add proper type definitions
- Include JSDoc comments for complex functions
- Use meaningful variable and function names

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [API Documentation](docs/api.md)
- [Component Guide](docs/components.md)
- [Deployment Guide](docs/deployment.md)

### Community
- [Discord Server](https://discord.gg/reposage)
- [GitHub Discussions](https://github.com/your-username/reposage/discussions)
- [Twitter](https://twitter.com/reposage)

### Issues
If you encounter any issues, please [create a GitHub issue](https://github.com/your-username/reposage/issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details

## 🗺️ Roadmap

### Upcoming Features
- [ ] **IDE Extensions** - VS Code and JetBrains plugins
- [ ] **API Access** - RESTful API for integrations
- [ ] **Advanced Analytics** - Machine learning insights
- [ ] **Mobile App** - iOS and Android applications
- [ ] **Enterprise Features** - SSO, advanced security, audit logs
- [ ] **Integrations** - Slack, Microsoft Teams, Jira

### Recent Updates
- [x] **Team Management** - Invite and manage team members
- [x] **Meeting Intelligence** - Upload and analyze meetings
- [x] **Analytics Dashboard** - Usage and productivity metrics
- [x] **Billing System** - Subscription management

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Firebase](https://firebase.google.com/) for backend services
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for the icon library

---

**Built with ❤️ by the RepoSage team**

[Website](https://reposage.dev) • [Documentation](https://docs.reposage.dev) • [Blog](https://blog.reposage.dev)
