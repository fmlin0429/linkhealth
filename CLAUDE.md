# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Agent as a Service Website - MVP/PoC (Learning Purpose)
Creating a Forest Lin AI agent chatbot service similar to https://www.qrate.one/

## Technology Stack

- **Frontend**: Next.js with React and TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI Integration**: OpenAI API
- **Payments**: Stripe
- **Package Manager**: npm

## Development Phases

### Phase 1: Landing Page with AI Chatbot ✅ Completed
**Objective**: Build and deploy a landing page with an AI chatbot that behaves as Forest Lin

**Requirements**:
- Landing page with professional design (reference: qrate.one)
- AI chatbot integration using OpenAI API
- Chatbot personality: Forest Lin (LinkedIn: https://www.linkedin.com/in/forest-lin-7672186/)
- Deploy to Vercel and verify functionality
- Responsive design for mobile and desktop

**Key Features**:
- Hero section with value proposition
- Chatbot widget/interface
- Professional styling matching qrate.one aesthetic
- OpenAI API integration for conversations

**Completion Criteria**:
- ✅ Landing page deployed to Vercel
- ✅ Chatbot functional and responding as Forest Lin
- ✅ Responsive design working on all devices
- ✅ Clean, professional UI/UX

### Phase 2: User Authentication & Database ✅ Current Phase
**Objective**: Add Firebase authentication and user data storage

**Requirements**:
- Firebase Auth integration (Google, email/password)
- User profile storage in Firestore
- Chatbot context awareness of logged-in users
- Protected routes and user sessions

**Completion Criteria**:
- User can sign up/login via Firebase Auth
- User data stored in Firestore
- Chatbot knows user information when authenticated
- Secure session management

### Phase 3: Payment Integration (Pending)
**Objective**: Implement Stripe for subscription billing

**Requirements**:
- Stripe integration for subscription plans
- Payment flow and billing management
- Different subscription tiers
- Usage tracking and limits

**Completion Criteria**:
- Stripe payment system functional
- Subscription plans available
- Billing and payment processing working
- Usage-based access control

## Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Deploy (Vercel CLI)
vercel

# Lint
npm run lint

# Type check
npm run type-check
```

## Environment Variables Required

### Phase 1 (Current)
```
# Google Gemini API (required for chatbot)
GEMINI_API_KEY=your_gemini_api_key_here
```

### Phase 2 (Future)
```
# Firebase (Phase 2)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```

### Phase 3 (Future)
```
# Stripe (Phase 3)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

## Deployment Setup

### Local Development
1. Copy `.env.example` to `.env.local`
2. Add your Gemini API key to `.env.local`
3. Run `npm run dev`

### Vercel Deployment
1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Add environment variable in Vercel:
   - Key: `GEMINI_API_KEY`
   - Value: `your_actual_gemini_api_key`
4. Deploy

## Architecture

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── chatbot/      # Chatbot components
│   └── layout/       # Layout components
├── pages/            # Next.js pages
├── lib/              # Utilities and configurations
├── styles/           # Global styles and Tailwind
└── types/            # TypeScript type definitions
```

## Important Notes

- Complete each phase fully before moving to the next
- Follow instructions exactly as specified
- Reference qrate.one for design inspiration
- Ensure all deployments are verified and functional
- Maintain clean, professional code throughout