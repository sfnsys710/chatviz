'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function StreamPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<string[]>([])
  const [streaming, setStreaming] = useState(false)
  const sourceRef = useRef<EventSource | null>(null)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }
    return () => sourceRef.current?.close()
  }, [])

  function startStream() {
    const token = localStorage.getItem('token')
    setMessages([])
    setStreaming(true)

    // EventSource doesn't support custom headers
    // so we pass the token as a query param
    const source = new EventSource(
      `http://localhost:3001/stream?token=${token}`
    )
    sourceRef.current = source

    source.onmessage = (e) => {
      if (e.data === '[DONE]') {
        setStreaming(false)
        source.close()
        return
      }
      setMessages((prev) => [...prev, e.data])
    }

    source.onerror = () => {
      setStreaming(false)
      source.close()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Stream</h1>

        <button
          onClick={startStream}
          disabled={streaming}
          className="bg-black text-white rounded px-4 py-2 hover:bg-gray-800 disabled:opacity-50"
        >
          {streaming ? 'Streaming...' : 'Start Stream'}
        </button>

        {messages.length > 0 && (
          <ul className="bg-gray-100 rounded p-4 text-sm flex flex-col gap-1">
            {messages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        )}

      </div>
    </div>
  )
}
