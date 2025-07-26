'use client'

import { useEffect, useRef, useState } from 'react'

export default function BrickBreakerLoading() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isRunning, setIsRunning] = useState(true)
    let resetting = false
    let levelUp = false

    useEffect(() => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext('2d')!
        canvas.width = 640
        canvas.height = 640

        // Constants
        const paddleWidth = 100
        const paddleHeight = 12
        const ballRadius = 8
        const brickPadding = 8
        const brickOffsetTop = 60
        const brickOffsetLeft = 32
        const brickWidth = 70
        const brickHeight = 20

        // Game state
        let level = 1
        let score = 0
        let paddleX = canvas.width / 2 - paddleWidth / 2
        let ballX = canvas.width / 2
        let ballY = canvas.height - 50
        let dx = 3
        let dy = -3
        let bricks: { x: number; y: number; visible: boolean }[][] = []

        const initLevel = (difficulty: number) => {
            const rows = 3 + difficulty
            const cols = 5 + difficulty
            dx = 2 + difficulty
            dy = -(2 + difficulty)

            bricks = []
            for (let c = 0; c < cols; c++) {
                bricks[c] = []
                for (let r = 0; r < rows; r++) {
                    const visible = Math.random() > 0.2 // 80% chance to appear
                    const x = c * (brickWidth + brickPadding) + brickOffsetLeft
                    const y = r * (brickHeight + brickPadding) + brickOffsetTop
                    bricks[c][r] = { x, y, visible }
                }
            }
        }

        initLevel(level)

        const resetGame = () => {
            resetting = true
            setTimeout(() => {
                level = 1
                score = 0
                ballX = canvas.width / 2
                ballY = canvas.height - 50
                dx = 3
                dy = -3
                initLevel(level)
                resetting = false
            }, 500)
        }



        const nextLevel = () => {
            levelUp = true
            setTimeout(() => {
                level++
                ballX = canvas.width / 2
                ballY = canvas.height - 50
                initLevel(level)
                levelUp = false
            }, 500)
        }


        let restarting = false

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = '#111'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw paddle
            ctx.fillStyle = '#00f'
            ctx.fillRect(paddleX, canvas.height - paddleHeight - 20, paddleWidth, paddleHeight)

            // Draw ball
            ctx.beginPath()
            ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
            ctx.fillStyle = '#FFD700'
            ctx.fill()
            ctx.closePath()

            // Draw bricks
            let allDestroyed = true
            bricks.forEach(col => {
                col.forEach(brick => {
                    if (brick.visible) {
                        ctx.fillStyle = '#0f0'
                        ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight)
                        allDestroyed = false
                    }
                })
            })

            // Draw score & level
            ctx.fillStyle = '#fff'
            ctx.font = '16px sans-serif'
            ctx.fillText(`Score: ${score}`, 10, 25)
            ctx.fillText(`Level: ${level}`, 10, 45)

            // Move ball
            ballX += dx
            ballY += dy

            // Wall collision
            if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) dx = -dx
            if (ballY + dy < ballRadius) dy = -dy

            // Paddle collision
            if (
                ballY + ballRadius > canvas.height - paddleHeight - 20 &&
                ballX > paddleX &&
                ballX < paddleX + paddleWidth
            ) {
                dy = -dy
            }

            // Brick collision
            bricks.forEach(col => {
                col.forEach(brick => {
                    if (brick.visible) {
                        if (
                            ballX > brick.x &&
                            ballX < brick.x + brickWidth &&
                            ballY > brick.y &&
                            ballY < brick.y + brickHeight
                        ) {
                            dy = -dy
                            brick.visible = false
                            score++
                        }
                    }
                })
            })

            // Check lose
            if (ballY + ballRadius > canvas.height) {
                resetGame()
            }

            // Check win
            if (allDestroyed) {
                nextLevel()
            }

            if (!restarting && isRunning) {
                requestAnimationFrame(draw)
            }
        }

        draw()

        const movePaddle = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            paddleX = Math.max(0, Math.min(x - paddleWidth / 2, canvas.width - paddleWidth))
        }

        document.addEventListener('mousemove', movePaddle)

        return () => {
            setIsRunning(false)
            document.removeEventListener('mousemove', movePaddle)
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white space-y-4">
            <h1 className="text-xl font-bold animate-pulse">🧱 Brick Breaker Loading...</h1>
            <canvas ref={canvasRef} className="border-2 border-white rounded shadow-lg" />
            <p className="text-sm text-gray-400">Mouse untuk kendali. Level naik tiap selesai. Reset saat kalah.</p>
        </div>
    )
}
