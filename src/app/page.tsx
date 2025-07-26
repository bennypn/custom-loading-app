'use client'

import { useState } from 'react'
import CurrentLoading from '@/components/loading/CurrentLoadingComponent'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'temporary' | 'permanent'>('temporary')
  const [delaySeconds, setDelaySeconds] = useState(3)

  const handleRefresh = () => {
    setLoading(true)

    if (mode === 'temporary') {
      setTimeout(() => {
        setLoading(false)
      }, delaySeconds * 1000)
    }
  }

  if (loading) {
    return <CurrentLoading />
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 space-y-6">
      <h1 className="text-4xl font-bold text-center">Welcome to Custom Loading App 🚀</h1>

      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        {/* Toggle Permanent vs Temporary */}
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="temporary"
              checked={mode === 'temporary'}
              onChange={() => setMode('temporary')}
            />
            <span>Temporary</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="permanent"
              checked={mode === 'permanent'}
              onChange={() => setMode('permanent')}
            />
            <span>Permanent</span>
          </label>
        </div>

        {/* Input Delay */}
        <div className="flex items-center space-x-2">
          <label htmlFor="delay" className="text-gray-700">Delay (sec):</label>
          <input
            id="delay"
            type="number"
            min={1}
            className="border px-2 py-1 rounded w-20"
            value={delaySeconds}
            onChange={(e) => setDelaySeconds(Number(e.target.value))}
            disabled={mode === 'permanent'}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleRefresh}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            ⏳ Test Loading
          </button>

          <a
            href="/loading"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            🔁 Go to Loading Test Page
          </a>
        </div>
      </div>
    </main>
  )
}
