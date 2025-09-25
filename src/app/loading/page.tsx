'use client'

import { useState } from 'react'
import Link from 'next/link'
import CurrentLoading from '@/components/loading/CurrentLoadingComponent'

export default function LoadingPage() {
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

    const loadingComponents = [
        {
            name: 'Brick Breaker',
            description: 'Classic arcade game while loading',
            icon: '🧱',
            color: 'bg-red-500'
        },
        {
            name: 'Flappy Bird',
            description: 'Navigate through pipes',
            icon: '🐦',
            color: 'bg-yellow-500'
        },
        {
            name: 'Snake Game',
            description: 'Classic snake game',
            icon: '🐍',
            color: 'bg-green-500'
        },
        {
            name: 'Interactive Balls',
            description: 'Physics-based animation',
            icon: '⚪',
            color: 'bg-blue-500'
        },
        {
            name: 'Lottie Animations',
            description: 'Smooth vector animations',
            icon: '✨',
            color: 'bg-purple-500'
        },
        {
            name: 'Stickman Follower',
            description: 'Interactive cursor follower',
            icon: '🏃',
            color: 'bg-indigo-500'
        }
    ]

    if (loading) {
        return <CurrentLoading />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-gray-900">⏳ Custom Loading Components</h1>
                        </div>

                        <Link href="/" className="text-gray-600 hover:text-gray-900 transition">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Interactive Loading Experiences
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Transform boring loading screens into engaging experiences with games and animations.
                        Keep your users entertained while they wait.
                    </p>
                </div>

                {/* Demo Controls */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">🎮 Try It Out</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Loading Mode
                            </label>
                            <select
                                value={mode}
                                onChange={(e) => setMode(e.target.value as 'temporary' | 'permanent')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="temporary">Temporary (Auto-dismiss)</option>
                                <option value="permanent">Permanent (Manual dismiss)</option>
                            </select>
                        </div>

                        {mode === 'temporary' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Duration (seconds)
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    max={30}
                                    value={delaySeconds}
                                    onChange={(e) => setDelaySeconds(Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}

                        <div className="flex items-end">
                            <button
                                onClick={handleRefresh}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 font-semibold"
                            >
                                🚀 Start Loading Demo
                            </button>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                            <div className="text-blue-600">ℹ️</div>
                            <p className="text-blue-800 text-sm">
                                <strong>Tip:</strong> The loading component will randomly select one of the available animations.
                                Each refresh might show a different loading experience!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Available Components */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">🎨 Available Loading Components</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loadingComponents.map((component, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                                <div className={`${component.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mb-4`}>
                                    {component.icon}
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">{component.name}</h4>
                                <p className="text-gray-600 text-sm">{component.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">✨ Key Features</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">🎮 Interactive Games</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>Fully playable mini-games</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>Touch and keyboard controls</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>Score tracking and progress</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">🎨 Smooth Animations</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Lottie vector animations</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Physics-based interactions</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Responsive and fluid motion</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">⚙️ Flexible Configuration</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <span>Temporary or permanent modes</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <span>Customizable duration</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <span>Easy integration</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">📱 Cross-Platform</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span>Mobile-friendly design</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span>Works on all modern browsers</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span>Optimized performance</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}