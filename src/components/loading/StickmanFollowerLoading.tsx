'use client'

import { useEffect, useRef } from 'react'

export default function StickmanFollowerLoading() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const stickCount = 50

    useEffect(() => {
        const canvas = canvasRef.current!
        const ctx = canvas.getContext('2d')!
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        let cameraX = 0
        let cameraY = 0
        const viewportWidth = canvas.width
        const viewportHeight = canvas.height

        const mouse = { x: canvas.width / 2, y: canvas.height / 2 }
        let cameraSpeed = 2

        let angleToMouse = 0
        let lastMouseX = mouse.x
        let lastMouseY = mouse.y
        let lastDirectionTime = Date.now()

        class Stick {
            x: number
            y: number
            vx = 0
            vy = 0
            walkPhase = 0
            constructor(x: number, y: number) {
                this.x = x
                this.y = y
            }
            update(sticks: Stick[]) {
                const dx = this.x - (cameraX + viewportWidth / 2)
                const dy = this.y - (cameraY + viewportHeight / 2)
                const dist = Math.sqrt(dx * dx + dy * dy)
                const repelDist = 100
                if (dist < repelDist) {
                    const force = (repelDist - dist) / repelDist
                    const angle = Math.atan2(dy, dx)
                    this.vx += Math.cos(angle) * force * 4
                    this.vy += Math.sin(angle) * force * 4
                }

                for (const other of sticks) {
                    if (other === this) continue
                    const dx = this.x - other.x
                    const dy = this.y - other.y
                    const d = Math.sqrt(dx * dx + dy * dy)
                    if (d < 20 && d > 0) {
                        const push = (20 - d) / 20
                        const angle = Math.atan2(dy, dx)
                        this.vx += Math.cos(angle) * push * 0.5
                        this.vy += Math.sin(angle) * push * 0.5
                    }
                }

                this.vx *= 0.9
                this.vy *= 0.9
                this.x += this.vx
                this.y += this.vy

                if (Math.abs(this.vx) + Math.abs(this.vy) > 0.1) {
                    this.walkPhase += 0.2
                }
            }
            draw() {
                const screenX = this.x - cameraX
                const screenY = this.y - cameraY
                ctx.strokeStyle = 'black'
                ctx.beginPath()
                ctx.arc(screenX, screenY, 10, 0, Math.PI * 2)
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo(screenX, screenY)
                ctx.lineTo(screenX, screenY + 20)
                ctx.moveTo(screenX - 10, screenY + 10)
                ctx.lineTo(screenX + 10, screenY + 10)

                const legOffset = Math.sin(this.walkPhase) * 5
                ctx.moveTo(screenX, screenY + 20)
                ctx.lineTo(screenX - 7 + legOffset, screenY + 35)
                ctx.moveTo(screenX, screenY + 20)
                ctx.lineTo(screenX + 7 - legOffset, screenY + 35)
                ctx.stroke()
            }
        }

        const sticks: Stick[] = []
        for (let i = 0; i < stickCount; i++) {
            // Spawn all sticks initially within current viewport
            const angle = Math.random() * 2 * Math.PI
            const radius = Math.max(viewportWidth, viewportHeight)
            const rx = Math.cos(angle) * radius + cameraX + viewportWidth / 2
            const ry = Math.sin(angle) * radius + cameraY + viewportHeight / 2
            sticks.push(new Stick(rx, ry))
        }

        canvas.addEventListener('mousemove', e => {
            const rect = canvas.getBoundingClientRect()
            mouse.x = e.clientX - rect.left + cameraX
            mouse.y = e.clientY - rect.top + cameraY

            const dx = mouse.x - lastMouseX
            const dy = mouse.y - lastMouseY

            if (Math.hypot(dx, dy) > 2) {
                angleToMouse = Math.atan2(dy, dx)
                lastDirectionTime = Date.now()
            }

            lastMouseX = mouse.x
            lastMouseY = mouse.y
        })

        const spawnSticksAround = () => {
            for (let i = 0; i < 5; i++) {
                // Spawn just outside current view
                const side = Math.floor(Math.random() * 4)
                let rx = 0, ry = 0
                if (side === 0) {
                    rx = cameraX - 50
                    ry = cameraY + Math.random() * viewportHeight
                } else if (side === 1) {
                    rx = cameraX + viewportWidth + 50
                    ry = cameraY + Math.random() * viewportHeight
                } else if (side === 2) {
                    rx = cameraX + Math.random() * viewportWidth
                    ry = cameraY - 50
                } else {
                    rx = cameraX + Math.random() * viewportWidth
                    ry = cameraY + viewportHeight + 50
                }
                sticks.push(new Stick(rx, ry))
            }
        }

        const animate = () => {
            cameraX += Math.cos(angleToMouse) * cameraSpeed
            cameraY += Math.sin(angleToMouse) * cameraSpeed

            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const screenX = viewportWidth / 2
            const screenY = viewportHeight / 2
            ctx.strokeStyle = 'red'
            ctx.beginPath()
            ctx.arc(screenX, screenY, 10, 0, Math.PI * 2)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(screenX, screenY)
            ctx.lineTo(screenX, screenY + 20)
            ctx.moveTo(screenX - 10, screenY + 10)
            ctx.lineTo(screenX + 10, screenY + 10)

            const legOffset = Math.sin(Date.now() / 100) * 5
            ctx.moveTo(screenX, screenY + 20)
            ctx.lineTo(screenX - 7 + legOffset, screenY + 35)
            ctx.moveTo(screenX, screenY + 20)
            ctx.lineTo(screenX + 7 - legOffset, screenY + 35)
            ctx.stroke()

            for (const s of sticks) {
                s.update(sticks)
                s.draw()
            }

            if (Math.random() < 0.02) spawnSticksAround()
            requestAnimationFrame(animate)
        }

        animate()
    }, [])

    return (
        <div className="w-screen h-screen bg-white">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute top-4 left-4 text-black text-sm">🧍 Auto jalan. Map terus bergeser sesuai arah mouse terakhir. Stickman lainnya menghindar dan saling menggeser.</div>
        </div>
    )
}
