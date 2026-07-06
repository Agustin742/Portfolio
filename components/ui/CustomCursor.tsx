'use client'

import dynamic from 'next/dynamic'

const CustomCursor = dynamic(() => import('./CustomCursorImpl'), { ssr: false })

export default CustomCursor
