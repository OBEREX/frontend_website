import { Sparkles } from 'lucide-react'
import AIChatbot from '../components/AIChatbot'

export default function AiAssistant() {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">Home</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 sm:mt-3">
            Your intelligent inventory management companion
          </p>
        </div>
        <div className="flex items-center space-x-2 text-yellow-500">
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-sm sm:text-base font-medium">Powered by AI</span>
        </div>
      </div>

      {/* AI Chatbot */}
      <div className="max-w-4xl mx-auto">
        <AIChatbot />
      </div>
    </div>
  )
}
