'use client'

import { useEffect, useRef, useState } from 'react'
import { DotLottie } from '@lottiefiles/dotlottie-web'
import { RegisterTask } from '../enum/task'

export default function DotLottieCanvasPlayer() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [message, setMessage] = useState<string>('Loading...')
    const [queue, setQueue] = useState<string[]>([])

    useEffect(() => {
        const allMessages = Object.values(RegisterTask)

        const interval = setInterval(() => {
            setQueue((prevQueue) => {
                let updatedQueue = [...prevQueue]

                // Jika sudah habis semua, reset
                if (updatedQueue.length === 0) {
                    updatedQueue = [...allMessages]
                }

                // Ambil salah satu secara acak
                const randomIndex = Math.floor(Math.random() * updatedQueue.length)
                const selected = updatedQueue[randomIndex]

                // Tampilkan
                setMessage(selected)

                // Hapus dari antrian
                updatedQueue.splice(randomIndex, 1)
                return updatedQueue
            })
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (!canvasRef.current) return

        const dotLottie = new DotLottie({
            canvas: canvasRef.current,
            src: '/assets/machine.lottie',
            loop: true,
            autoplay: true,
            backgroundColor: '#ffffff',
            renderConfig: {
                autoResize: true,
            },
        })

        dotLottie.addEventListener('loadError', console.error)

        return () => {
            dotLottie.destroy()
        }
    }, [])

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-white gap-4">
            <canvas
                ref={canvasRef}
                width={300}
                height={300}
                style={{ width: '300px', height: '300px' }}
            />
            <p className="text-gray-600 font-medium text-lg">{message}</p>
        </div>
    )
}
