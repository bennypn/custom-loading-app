'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Report {
    id: string
    name: string
    description: string
    url: string
    category: string
    icon: string
    color: string
}

export default function ReportsPage() {
    const [selectedReport, setSelectedReport] = useState<Report | null>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const reports: Report[] = [
        {
            id: 'analytics',
            name: 'Google Analytics',
            description: 'Website traffic and user behavior analytics',
            url: 'https://analytics.google.com',
            category: 'Analytics',
            icon: '📊',
            color: 'bg-blue-500'
        },
        {
            id: 'grafana',
            name: 'Grafana Dashboard',
            description: 'System monitoring and performance metrics',
            url: 'https://grafana.com/grafana/',
            category: 'Monitoring',
            icon: '📈',
            color: 'bg-orange-500'
        },
        {
            id: 'kibana',
            name: 'Kibana Logs',
            description: 'Application logs and error tracking',
            url: 'https://www.elastic.co/kibana',
            category: 'Logging',
            icon: '🔍',
            color: 'bg-green-500'
        },
        {
            id: 'powerbi',
            name: 'Power BI Reports',
            description: 'Business intelligence and data visualization',
            url: 'https://powerbi.microsoft.com',
            category: 'Business Intelligence',
            icon: '💼',
            color: 'bg-yellow-500'
        },
        {
            id: 'tableau',
            name: 'Tableau Dashboard',
            description: 'Interactive data visualization platform',
            url: 'https://www.tableau.com',
            category: 'Data Visualization',
            icon: '📋',
            color: 'bg-purple-500'
        },
        {
            id: 'demo',
            name: 'Sample Report',
            description: 'Interactive demo report with sample data',
            url: 'data:text/html,<html><head><style>body{font-family:Arial,sans-serif;padding:20px;background:linear-gradient(135deg,%23667eea%200%25,%23764ba2%20100%25);color:white;margin:0;}</style></head><body><h1>📊 Sample Dashboard</h1><div style="background:rgba(255,255,255,0.1);padding:20px;border-radius:10px;margin:20px 0;"><h2>Key Metrics</h2><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;"><div style="background:rgba(255,255,255,0.2);padding:15px;border-radius:8px;text-align:center;"><h3>Users</h3><p style="font-size:2em;margin:10px 0;">12,847</p><small>+23% from last month</small></div><div style="background:rgba(255,255,255,0.2);padding:15px;border-radius:8px;text-align:center;"><h3>Revenue</h3><p style="font-size:2em;margin:10px 0;">$45,280</p><small>+12% from last month</small></div><div style="background:rgba(255,255,255,0.2);padding:15px;border-radius:8px;text-align:center;"><h3>Conversion</h3><p style="font-size:2em;margin:10px 0;">3.2%</p><small>+0.5% from last month</small></div></div></div><div style="background:rgba(255,255,255,0.1);padding:20px;border-radius:10px;"><h2>Recent Activity</h2><ul style="list-style:none;padding:0;"><li style="padding:10px;margin:5px 0;background:rgba(255,255,255,0.1);border-radius:5px;">✅ System backup completed</li><li style="padding:10px;margin:5px 0;background:rgba(255,255,255,0.1);border-radius:5px;">📈 Traffic spike detected (+45%)</li><li style="padding:10px;margin:5px 0;background:rgba(255,255,255,0.1);border-radius:5px;">🔔 New user registration milestone reached</li></ul></div></body></html>',
            category: 'Demo',
            icon: '🎯',
            color: 'bg-indigo-500'
        }
    ]

    const categories = [...new Set(reports.map(report => report.category))]

    const handleReportClick = (report: Report) => {
        setSelectedReport(report)
        setIsFullscreen(false)
    }

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-gray-900">📊 Reports Dashboard</h1>
                        </div>

                        <Link href="/" className="text-gray-600 hover:text-gray-900 transition">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </header>

            {/* Fullscreen Modal */}
            {isFullscreen && selectedReport && (
                <div className="fixed inset-0 bg-black z-50 flex flex-col">
                    <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">{selectedReport.name}</h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={toggleFullscreen}
                                className="text-white hover:text-gray-300 p-2"
                            >
                                📐 Exit Fullscreen
                            </button>
                        </div>
                    </div>
                    <iframe
                        src={selectedReport.url}
                        className="flex-1 w-full border-0"
                        title={selectedReport.name}
                    />
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Available Reports</h2>

                            {categories.map(category => (
                                <div key={category} className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                        {category}
                                    </h3>
                                    <div className="space-y-2">
                                        {reports.filter(report => report.category === category).map(report => (
                                            <button
                                                key={report.id}
                                                onClick={() => handleReportClick(report)}
                                                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${selectedReport?.id === report.id
                                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className={`${report.color} w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm`}>
                                                        {report.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-medium text-gray-900">{report.name}</div>
                                                        <div className="text-sm text-gray-500">{report.description}</div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Info Panel */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start space-x-2">
                                <div className="text-blue-600 text-lg">💡</div>
                                <div>
                                    <h4 className="font-semibold text-blue-900 mb-1">How it works</h4>
                                    <p className="text-blue-800 text-sm">
                                        Select a report from the list to embed it in the viewer.
                                        Use the fullscreen button for better visibility.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            {selectedReport ? (
                                <>
                                    {/* Report Header */}
                                    <div className="bg-gray-50 border-b px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className={`${selectedReport.color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}>
                                                    {selectedReport.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">{selectedReport.name}</h3>
                                                    <p className="text-sm text-gray-600">{selectedReport.description}</p>
                                                </div>
                                            </div>

                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={toggleFullscreen}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm"
                                                >
                                                    📐 Fullscreen
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Report Content */}
                                    <div className="relative" style={{ height: '600px' }}>
                                        <iframe
                                            src={selectedReport.url}
                                            className="w-full h-full border-0"
                                            title={selectedReport.name}
                                            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-96 text-gray-500">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4">📊</div>
                                        <h3 className="text-xl font-medium text-gray-900 mb-2">Select a Report</h3>
                                        <p className="text-gray-600">
                                            Choose a report from the sidebar to view it here
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Features */}
                        {!selectedReport && (
                            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ Dashboard Features</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">🖥️ Embedded Reports</h4>
                                        <p className="text-gray-600 text-sm">
                                            View external dashboards and reports directly within your application using secure iframes.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">📱 Responsive Design</h4>
                                        <p className="text-gray-600 text-sm">
                                            Reports adapt to different screen sizes and work seamlessly across all devices.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">🔒 Secure Integration</h4>
                                        <p className="text-gray-600 text-sm">
                                            Sandboxed iframes ensure secure embedding of third-party content with controlled permissions.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">📐 Fullscreen Mode</h4>
                                        <p className="text-gray-600 text-sm">
                                            Expand reports to fullscreen for detailed analysis and better visibility of complex dashboards.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}