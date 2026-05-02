'use client'

import { Data, Layout } from 'plotly.js';
import dynamic from 'next/dynamic';
import { SalesRow } from '@/lib/types'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

type ScatterProps = {
    rows: SalesRow[]
}

export default function Bar({ rows }: ScatterProps) {
    const data: Partial<Data>[] = [
        {
            type: 'bar',
            x: rows.map(r => r.product),
            y: rows.map(r => r.revenue),
        },
    ]

    const layout: Partial<Layout> = {
        title: { text: 'Units sold vs Revenue' },
        xaxis: { title: { text: 'Units sold' } },
        yaxis: { title: { text: 'Revenue' } },
    }

    return <Plot data={data} layout={layout} />
}