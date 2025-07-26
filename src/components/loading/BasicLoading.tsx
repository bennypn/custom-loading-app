'use client'

export default function BasicLoading() {
    return (
        <div className="flex items-center justify-center h-screen bg-white text-gray-700">
            <div className="flex space-x-2 animate-pulse text-2xl font-semibold">
                <span>L</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-150">.</span>
                <span className="animate-bounce delay-300">.</span>
            </div>
        </div>
    )
}
