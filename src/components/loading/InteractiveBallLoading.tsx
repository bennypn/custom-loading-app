'use client'
import { useState } from 'react'

export default function InteractiveBallLoading() {
    const [jump, setJump] = useState(false)

    const handleClick = () => {
        setJump(true)
        setTimeout(() => setJump(false), 500)
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <h1 className="text-2xl mb-6 font-bold animate-pulse">Loading... Tap the ball!</h1>
            <div className="relative w-40 h-40 flex items-end justify-center">
                <div
                    onClick={handleClick}
                    className={`w-16 h-16 bg-yellow-400 rounded-full cursor-pointer transition-all duration-300 ${jump ? '-translate-y-20 scale-125' : 'translate-y-0'
                        }`}
                />
            </div>
            <p className="mt-6 text-sm text-gray-300 italic">Try clicking the ball!</p>
        </div>
    )
}
