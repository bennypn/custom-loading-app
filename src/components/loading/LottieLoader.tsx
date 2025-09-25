'use client'

import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'

export default function LottieLoader() {
    const [animationData, setAnimationData] = useState(null)

    useEffect(() => {
        fetch('/Loader.json')
            .then(res => res.json())
            .then(setAnimationData)
            .catch(err => console.error('Gagal load animasi:', err))
    }, [])

    if (!animationData) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-white">
                <p className="text-black">Loading animation...</p>
            </div>
        )
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-white">
            <Lottie animationData={animationData} loop autoplay style={{ height: 300, width: 300 }} />
            <p className="text-black mt-4">Memuat konten...</p>
        </div>
    )
}
