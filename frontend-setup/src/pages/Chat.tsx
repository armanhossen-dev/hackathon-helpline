import { useOutletContext } from 'react-router-dom'
import { ApiClient } from '../lib/api'
import { ChatContainer } from '../components/chat/ChatContainer'
import { ModelSelector } from '../components/chat/ModelSelector'
import { useState } from 'react'

export default function Chat() {
  const { api } = useOutletContext() as { api: ApiClient }
  const [selectedModel, setSelectedModel] = useState('gpt-4o')

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Chat</h1>
          <p className="text-muted-foreground">Chat with your AI model in real-time</p>
        </div>
        <ModelSelector
          value={selectedModel}
          onChange={setSelectedModel}
        />
      </div>
      
      <ChatContainer api={api} model={selectedModel} />
    </div>
  )
}