# Forest Lin AI Agent - Phase 1

A professional AI agent service website featuring Forest Lin's expertise, built with Next.js and Google Gemini API.

## 🚀 Features

- **Professional Landing Page**: Clean, modern design inspired by qrate.one
- **AI Chatbot**: Powered by Google Gemini API with Forest Lin's personality
- **Responsive Design**: Works perfectly on desktop and mobile
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern, utility-first styling

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key (free at [Google AI Studio](https://makersuite.google.com/app/apikey))

## 🔧 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/fmlin0429/linkhealth.git
   cd linkhealth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment to Vercel

1. **Push to GitHub** (already done)

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Import Project"
   - Select this repository

3. **Configure Environment Variables**
   In Vercel dashboard, add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `your_actual_gemini_api_key_here`

4. **Deploy**
   Click deploy and wait for the build to complete

## 🎯 Usage

- Visit the deployed website
- Scroll down or click "Start Chatting" 
- Ask Forest Lin questions about technology, business, or career advice
- Wait a moment between questions (rate limiting protection)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/chat/          # API route for Gemini integration
│   ├── layout.tsx         # Root layout component
│   └── page.tsx          # Home page
├── components/
│   ├── chatbot/          # Chatbot components
│   ├── layout/           # Layout components (Hero)
│   └── ui/               # Reusable UI components
├── lib/
│   └── gemini.ts         # Gemini API integration
├── styles/
│   └── globals.css       # Global styles
└── types/
    └── chat.ts           # TypeScript definitions
```

## ⚠️ Important Notes

- **Rate Limiting**: Wait 1-2 seconds between chat messages to avoid rate limiting
- **API Costs**: Gemini API is free with generous limits
- **Environment Variables**: Never commit `.env.local` to version control

## 🔮 Future Phases

- **Phase 2**: Firebase authentication and user management
- **Phase 3**: Stripe payment integration for subscription plans

## 📝 License

This project is for learning purposes.

---

Built with ❤️ using [Claude Code](https://claude.ai/code)