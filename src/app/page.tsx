import Hero from '@/components/layout/Hero'
import Chatbot from '@/components/chatbot/Chatbot'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Hero />
      <Chatbot />
    </main>
  )
}