'use client'

import { useEffect, useRef } from 'react'

export default function SWFLoadingScreen() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            const ruffle = (window as any).RufflePlayer?.newest()
            if (ruffle && containerRef.current) {
                const player = ruffle.createPlayer()
                containerRef.current.innerHTML = ''
                containerRef.current.appendChild(player)
                player.load('/ragdoll-achievement.swf')
                clearInterval(interval)
            }
        }, 100)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-black">
            <div ref={containerRef} style={{ width: '800px', height: '600px' }} />
        </div>
    )
}
