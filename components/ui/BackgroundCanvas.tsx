'use client'

import dynamic from 'next/dynamic'

const BackgroundCanvas = dynamic(() => import('./BackgroundCanvasImpl'), {
  ssr: false,
})

export default BackgroundCanvas
