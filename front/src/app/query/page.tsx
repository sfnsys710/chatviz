'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function QueryPage() {
  const router = useRouter()
  const [key, setKey] = useState('')

  const [result, setResult] = useState<{ key: string; value: string; requestedBy: string } | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setResult(null)

    const token = localStorage.getItem('token')

    const res = await fetch(`http://localhost:3001/query?key=${key}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Request failed')
      return
    }

    setResult(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Query Redis</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Key (e.g. city)"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-black text-white rounded px-4 py-2 hover:bg-gray-800"
          >
            Query
          </button>
        </form>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {result && (
          <div className="bg-gray-100 rounded p-4 text-sm flex flex-col gap-1">
            <p><span className="font-medium">Key:</span> {result.key}</p>
            <p><span className="font-medium">Value:</span> {result.value}</p>
            <p><span className="font-medium">Requested by:</span> {result.requestedBy}</p>
          </div>
        )}

      </div>
    </div>
  )
}
