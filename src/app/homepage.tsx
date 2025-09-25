'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
    const { data: session } = useSession()

    const features = [
        {
            id: 'loading',
            title: '⏳ Custom Loading Components',
            description: 'Interactive loading screens with games and animations',
            color: 'bg-gradient-to-r from-blue-500 to-blue-600',
            hoverColor: 'hover:from-blue-600 hover:to-blue-700',
            href: '/loading',
            features: ['Brick Breaker Game', 'Flappy Bird', 'Snake Game', 'Lottie Animations', 'Interactive Balls']
        },
        {
            id: 'reports',
            title: '📊 Reports Dashboard',
            description: 'Dynamic report viewer with embedded analytics',
            color: 'bg-gradient-to-r from-green-500 to-green-600',
            hoverColor: 'hover:from-green-600 hover:to-green-700',
            href: '/reports',
            features: ['Dashboard Overview', 'User Metrics', 'Performance Reports', 'Financial Analytics', 'Real-time Data']
        },
        {
            id: 'builder',
            title: '🎨 Template Builder',
            description: 'Visual HTML template builder with variable support',
            color: 'bg-gradient-to-r from-purple-500 to-purple-600',
            hoverColor: 'hover:from-purple-600 hover:to-purple-700',
            href: '/builder',
            features: ['Drag & Drop Interface', 'Variable Templates', 'Mustache Integration', 'Live Preview', 'Export HTML/CSS']
        },
        {
            id: 'auth',
            title: '🔐 Keycloak Authentication',
            description: 'Secure authentication with Keycloak SSO',
            color: 'bg-gradient-to-r from-red-500 to-red-600',
            hoverColor: 'hover:from-red-600 hover:to-red-700',
            href: '/auth',
            features: ['Single Sign-On', 'JWT Tokens', 'Role Management', 'Session Control', 'Secure Routes']
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-gray-900">🚀 Scratchpad</h1>
                            <span className="text-sm text-gray-500">Feature Demo Dashboard</span>
                        </div>

                        {/* User Info & Auth */}
                        <div className="flex items-center space-x-4">
                            {session ? (
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-700">
                                        Welcome, <strong>{session.user?.name}</strong>
                                    </span>
                                    <button
                                        onClick={() => signOut({ callbackUrl: "/" })}
                                        className="bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600 transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => signIn("keycloak")}
                                    className="bg-green-500 text-white px-3 py-1.5 rounded text-sm hover:bg-green-600 transition"
                                >
                                    Login with Keycloak
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Welcome to Scratchpad
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            A comprehensive demo showcasing custom loading components, report dashboards,
                            template builders, and secure authentication with Keycloak.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">{features.length}</div>
                                <div className="text-sm text-gray-600">Features</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">100%</div>
                                <div className="text-sm text-gray-600">TypeScript</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">React</div>
                                <div className="text-sm text-gray-600">Next.js 15</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {features.map((feature) => (
                        <Link key={feature.id} href={feature.href}>
                            <div className={`${feature.color} ${feature.hoverColor} rounded-xl p-8 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer`}>
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                                        <p className="text-white/90 text-lg">{feature.description}</p>
                                    </div>
                                    <div className="text-3xl opacity-75">→</div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-semibold text-white/90 mb-3">Key Features:</h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {feature.features.map((feat, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                                                <span className="text-sm text-white/80">{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 inline-flex items-center text-white font-semibold">
                                    Explore Feature
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Built With Modern Technologies</h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[
                            { name: 'Next.js', icon: '⚡' },
                            { name: 'React', icon: '⚛️' },
                            { name: 'TypeScript', icon: '🔷' },
                            { name: 'Tailwind CSS', icon: '🎨' },
                            { name: 'GrapesJS', icon: '🏗️' },
                            { name: 'Keycloak', icon: '🔐' },
                        ].map((tech) => (
                            <div key={tech.name} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="text-3xl mb-2">{tech.icon}</div>
                                <div className="text-sm font-medium text-gray-700">{tech.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <p className="text-gray-300">
                            © 2025 Scratchpad. Built with ❤️ using Next.js and React.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}