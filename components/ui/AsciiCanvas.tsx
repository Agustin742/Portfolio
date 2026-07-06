'use client'

import dynamic from 'next/dynamic'

// El canvas ASCII vive 100% en el cliente (usa canvas 2D, ResizeObserver,
// IntersectionObserver y getComputedStyle). ssr:false evita cualquier
// hidratación/parpadeo del retrato.
const AsciiCanvas = dynamic(() => import('./AsciiCanvasImpl'), { ssr: false })

export default AsciiCanvas
