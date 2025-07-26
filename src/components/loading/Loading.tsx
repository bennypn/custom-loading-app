'use client'

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-black text-white">
            <div className="text-center animate-pulse">
                <h1 className="text-3xl font-bold">Loading App...</h1>
                <p className="text-sm text-gray-400 mt-2">Please wait 🔄</p>
            </div>
        </div>
    )
}
