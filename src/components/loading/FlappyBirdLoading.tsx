'use client'

import { useEffect, useRef, useState } from 'react'

type Pipe = {
    x: number
    gapY: number
    passed?: boolean
}

export default function FlappyBirdLoading() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isRunning, setIsRunning] = useState(true)

    const gravity = 0.15
    const jumpStrength = -5
    const pipeGap = 160
    const pipeSpacingFrame = 150
    const pipeSpeed = 1.1

    useEffect(() => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext('2d')!
        canvas.width = 400
        canvas.height = 500

        let birdY = 200
        let velocity = 0
        let pipes: Pipe[] = []
        let frame = 0
        let score = 0

        const draw = () => {
            // clear screen
            ctx.fillStyle = '#000'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // draw bird
            velocity += gravity
            birdY += velocity
            ctx.fillStyle = '#FFD700'
            ctx.beginPath()
            ctx.arc(80, birdY, 12, 0, 2 * Math.PI)
            ctx.fill()

            // generate pipe
            if (frame % pipeSpacingFrame === 0) {
                pipes.push({
                    x: canvas.width,
                    gapY: Math.random() * 300 + 50,
                    passed: false,
                })
            }

            pipes.forEach((pipe) => {
                pipe.x -= pipeSpeed

                ctx.fillStyle = '#0f0'
                ctx.fillRect(pipe.x, 0, 40, pipe.gapY - pipeGap / 2)
                ctx.fillRect(pipe.x, pipe.gapY + pipeGap / 2, 40, canvas.height)

                // collision
                const birdLeft = 80 - 12
                const birdRight = 80 + 12
                const pipeLeft = pipe.x
                const pipeRight = pipe.x + 40

                const hitPipeX = birdRight > pipeLeft && birdLeft < pipeRight
                const hitPipeY =
                    birdY - 12 < pipe.gapY - pipeGap / 2 || birdY + 12 > pipe.gapY + pipeGap / 2

                if (hitPipeX && hitPipeY) {
                    velocity = 0
                    birdY = 200
                    pipes = []
                    score = 0
                    frame = 0
                    return
                }

                // score increase
                if (!pipe.passed && pipe.x + 40 < 80) {
                    pipe.passed = true
                    score++
                }
            })

            // remove off-screen pipes
            pipes = pipes.filter((p) => p.x > -40)

            // draw score
            ctx.fillStyle = '#fff'
            ctx.font = '20px sans-serif'
            ctx.fillText(`Score: ${score}`, 10, 30)

            frame++
            if (isRunning) requestAnimationFrame(draw)
        }

        draw()

        const flap = () => {
            velocity = jumpStrength
        }

        document.addEventListener('keydown', flap)
        document.addEventListener('click', flap)

        return () => {
            setIsRunning(false)
            document.removeEventListener('keydown', flap)
            document.removeEventListener('click', flap)
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white space-y-4">
            <h1 className="text-xl font-bold animate-pulse">🐤 Flappy Loading...</h1>
            <canvas ref={canvasRef} className="border-2 border-white rounded shadow-lg" />
            <p className="text-sm text-gray-400">Klik atau tekan spasi untuk terbang!</p>
        </div>
    )
}
