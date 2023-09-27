import React, { useEffect, useState } from 'react'

export default function useBottomPage() {
    const [bottom, setBottom] = useState(false)
    useEffect(() => {
        const onScroll = () => {
            let positionOfScroll = window.innerHeight + Math.ceil(document.documentElement.scrollTop)
            let isBottom = positionOfScroll >= document.documentElement.offsetHeight
            setBottom(isBottom)
        }
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])
    return bottom
}