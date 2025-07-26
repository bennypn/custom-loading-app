'use client'

import { useEffect, useState, useRef } from 'react'

type Point = { x: number; y: number }

const GRID_SIZE = 20
const INITIAL_SNAKE: Point[] = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION: Point = { x: 1, y: 0 }

export default function SnakeGameLoading() {
    const [snake, setSnake] = useState(INITIAL_SNAKE)
    const [food, setFood] = useState<Point>({ x: 5, y: 5 })
    const [dir, setDir] = useState<Point>(INITIAL_DIRECTION)
    const intervalRef = useRef<number | null>(null)

    useEffect(() => {
        intervalRef.current = window.setInterval(() => {
            // ... logic
        }, 150)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [dir, food])


    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp': return setDir({ x: 0, y: -1 })
                case 'ArrowDown': return setDir({ x: 0, y: 1 })
                case 'ArrowLeft': return setDir({ x: -1, y: 0 })
                case 'ArrowRight': return setDir({ x: 1, y: 0 })
            }
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [])

    useEffect(() => {
        intervalRef.current = window.setInterval(() => {
            setSnake(prev => {
                const head = prev[0]
                const newHead = { x: head.x + dir.x, y: head.y + dir.y }
                const newSnake = [newHead, ...prev]

                // check food
                if (newHead.x === food.x && newHead.y === food.y) {
                    setFood({
                        x: Math.floor(Math.random() * (GRID_SIZE - 1)),
                        y: Math.floor(Math.random() * (GRID_SIZE - 1)),
                    })
                } else {
                    newSnake.pop() // move forward
                }

                // check wall collision
                if (
                    newHead.x < 0 || newHead.x >= GRID_SIZE ||
                    newHead.y < 0 || newHead.y >= GRID_SIZE
                ) {
                    return INITIAL_SNAKE
                }

                // check self collision
                for (let i = 1; i < newSnake.length; i++) {
                    if (newSnake[i].x === newHead.x && newSnake[i].y === newHead.y) {
                        return INITIAL_SNAKE
                    }
                }

                return newSnake
            })
        }, 150)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [dir, food])


    const renderGrid = () => {
        const cells = []
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                const isSnake = snake.some(p => p.x === x && p.y === y)
                const isFood = food.x === x && food.y === y
                cells.push(
                    <div
                        key={`${x}-${y}`}
                        className={`w-4 h-4 border border-gray-700 ${isSnake ? 'bg-green-500' : isFood ? 'bg-red-500' : ''
                            }`}
                    />
                )
            }
        }
        return cells
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white space-y-4">
            <h1 className="text-xl font-bold text-center animate-pulse">🐍 Snake Loading Game</h1>
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                    width: `${GRID_SIZE * 1.2}rem`,
                }}
            >
                {renderGrid()}
            </div>
            <p className="text-sm text-gray-400">Gunakan tombol panah ← ↑ → ↓ untuk kontrol</p>
        </div>
    )
}
