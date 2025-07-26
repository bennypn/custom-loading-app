'use client'

export default function LogoSplashLoading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-700 to-purple-900 text-white animate-fadeIn">
            <img
                src="/luffy-gear-5-colored.png"
                alt="Logo"
                className="w-120 h-120 mb-4 animate-bounce"
            />
            <h1 className="text-2xl font-semibold">Memuat aplikasi...</h1>
            <p className="text-sm text-gray-300 mt-2">Powered by Next.js</p>
        </div>
    )
}
