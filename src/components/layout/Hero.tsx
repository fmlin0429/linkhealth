'use client'

import AuthButton from '@/components/auth/AuthButton'

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="absolute inset-y-0 right-0 hidden h-full w-48 transform translate-x-1/2 text-white lg:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <div className="flex items-center space-x-2">
                    <img src="/images/heart.png" alt="LinkHealth Logo" className="h-8 w-8" />
                    <span className="text-2xl font-bold text-primary-600">LinkHealth</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block md:ml-10 md:pr-4">
                <AuthButton />
              </div>
            </nav>
          </div>

          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Welcome to</span>{' '}
                <span className="block text-primary-600 xl:inline">LinkHealth</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Your intelligent healthcare assistant powered by AI. 
                Get personalized health insights, connect with professionals, and manage your wellness journey.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => {
                      const chatSection = document.getElementById('chat-section');
                      chatSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-8 py-3 text-base font-medium text-white hover:bg-primary-700 md:py-4 md:px-10 md:text-lg"
                  >
                    Get Started
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => {
                      const chatSection = document.getElementById('chat-section');
                      chatSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-100 px-8 py-3 text-base font-medium text-primary-700 hover:bg-primary-200 md:py-4 md:px-10 md:text-lg"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:h-full lg:w-full relative">
          <img 
            src="/images/healthcare-bg.jpg" 
            alt="Healthcare Professional" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-600/70 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <img src="/images/heart.png" alt="LinkHealth" className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-semibold">Healthcare AI Assistant</h3>
              <p className="mt-2 text-primary-100">Connecting you to better health outcomes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}