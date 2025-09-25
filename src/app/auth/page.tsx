'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export default function AuthPage() {
    const { data: session, status } = useSession()
    const [selectedTab, setSelectedTab] = useState('overview')

    const features = [
        {
            title: 'Single Sign-On (SSO)',
            description: 'Seamless authentication with Keycloak SSO integration',
            icon: '🔐',
            color: 'bg-blue-500'
        },
        {
            title: 'Role-Based Access',
            description: 'Granular permissions based on user roles and groups',
            icon: '👥',
            color: 'bg-green-500'
        },
        {
            title: 'Session Management',
            description: 'Secure session handling with automatic token refresh',
            icon: '⏱️',
            color: 'bg-purple-500'
        },
        {
            title: 'Multi-Provider Support',
            description: 'Support for multiple identity providers and protocols',
            icon: '🌐',
            color: 'bg-orange-500'
        }
    ]

    const renderUserInfo = () => {
        if (!session?.user) return null

        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl">
                        {session.user.name?.charAt(0) || session.user.email?.charAt(0) || '👤'}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-green-900 mb-2">
                            Welcome, {session.user.name || session.user.email}!
                        </h3>
                        <div className="space-y-2 text-sm">
                            {session.user.email && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-green-700 font-medium">📧 Email:</span>
                                    <span className="text-green-800">{session.user.email}</span>
                                </div>
                            )}
                            {session.user.name && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-green-700 font-medium">👤 Name:</span>
                                    <span className="text-green-800">{session.user.name}</span>
                                </div>
                            )}
                            <div className="flex items-center space-x-2">
                                <span className="text-green-700 font-medium">🔑 Status:</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Authenticated
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderSessionDetails = () => {
        if (!session) return null

        return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">🔍 Session Details</h3>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">Session Data</h4>
                            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                                {JSON.stringify({
                                    user: session.user,
                                    expires: session.expires,
                                    // Hide sensitive token data for security
                                    accessToken: (session as any).access_token ? '[HIDDEN]' : undefined,
                                    sub: (session as any).sub || undefined
                                }, null, 2)}
                            </pre>
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">Security Features</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-gray-700">JWT Token Validation</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-gray-700">Automatic Token Refresh</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-gray-700">Secure Session Storage</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-gray-700">CSRF Protection</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-gray-900">🔐 Keycloak Authentication</h1>
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
                        Enterprise Authentication
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Secure your application with Keycloak SSO integration. Experience enterprise-grade
                        authentication with role-based access control and session management.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="mb-8">
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit mx-auto">
                        <button
                            onClick={() => setSelectedTab('overview')}
                            className={`px-6 py-2 rounded-md font-medium transition-colors ${selectedTab === 'overview'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setSelectedTab('demo')}
                            className={`px-6 py-2 rounded-md font-medium transition-colors ${selectedTab === 'demo'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Live Demo
                        </button>
                        {session && (
                            <button
                                onClick={() => setSelectedTab('session')}
                                className={`px-6 py-2 rounded-md font-medium transition-colors ${selectedTab === 'session'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Session Info
                            </button>
                        )}
                    </div>
                </div>

                {/* Content */}
                {selectedTab === 'overview' && (
                    <div className="space-y-12">
                        {/* Features Grid */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">🚀 Authentication Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {features.map((feature, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                        <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mb-4`}>
                                            {feature.icon}
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                                        <p className="text-gray-600 text-sm">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technical Details */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">⚙️ Technical Implementation</h3>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">🔧 Technology Stack</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm">
                                                K
                                            </div>
                                            <div>
                                                <div className="font-medium">Keycloak</div>
                                                <div className="text-sm text-gray-600">Identity and Access Management</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm">
                                                N
                                            </div>
                                            <div>
                                                <div className="font-medium">NextAuth.js</div>
                                                <div className="text-sm text-gray-600">Authentication library for Next.js</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm">
                                                J
                                            </div>
                                            <div>
                                                <div className="font-medium">JWT Tokens</div>
                                                <div className="text-sm text-gray-600">Secure token-based authentication</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">🛡️ Security Features</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm">OAuth 2.0 / OpenID Connect</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm">Multi-factor Authentication (MFA)</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm">Role-based Access Control (RBAC)</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm">Session Management</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-sm">Token Refresh & Validation</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === 'demo' && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                🧪 Live Authentication Demo
                            </h3>

                            {status === 'loading' && (
                                <div className="text-center py-8">
                                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                                    <p className="mt-2 text-gray-600">Checking authentication status...</p>
                                </div>
                            )}

                            {status === 'authenticated' && session ? (
                                <div className="space-y-6">
                                    {renderUserInfo()}

                                    <div className="text-center">
                                        <button
                                            onClick={() => signOut()}
                                            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                                        >
                                            🚪 Sign Out
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center space-y-6">
                                    <div className="text-6xl mb-4">🔒</div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Not Authenticated</h4>
                                        <p className="text-gray-600 mb-6">
                                            Click the button below to authenticate with Keycloak SSO
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => signIn('keycloak')}
                                        className="bg-indigo-500 text-white px-8 py-3 rounded-lg hover:bg-indigo-600 transition-colors font-semibold inline-flex items-center space-x-2"
                                    >
                                        <span>🔐</span>
                                        <span>Sign In with Keycloak</span>
                                    </button>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                                        <div className="flex items-start space-x-2">
                                            <div className="text-blue-600">ℹ️</div>
                                            <div className="text-left">
                                                <p className="text-blue-800 text-sm">
                                                    <strong>Demo Note:</strong> This demo requires a configured Keycloak server.
                                                    In a real deployment, clicking this button would redirect you to your
                                                    organization&apos;s SSO login page.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {selectedTab === 'session' && session && (
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            {renderUserInfo()}
                            {renderSessionDetails()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}