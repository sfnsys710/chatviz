'use client'

import { Data, Layout } from 'plotly.js';
import dynamic from 'next/dynamic';
import { SalesRow } from '../lib/types'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

type ScatterProps = {
    rows: SalesRow[]
}

export default function Scatter({ rows }: ScatterProps) {
    const data: Partial<Data>[] = [
        {
            type: 'scatter',
            mode: 'markers',
            x: rows.map(r => r.units_sold),
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