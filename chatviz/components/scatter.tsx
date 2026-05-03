'use client'

import { Data, Layout } from 'plotly.js';
import dynamic from 'next/dynamic';
import { SalesRow } from '@/lib/types'
import { filterRows } from '@/lib/helpers'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

type ScatterProps = {
    rows: SalesRow[]
    selectedProduct?: string;
    selectedRegion?: string;
}

export default function Scatter({ rows, selectedProduct, selectedRegion}: ScatterProps) {

    const filteredRows = filterRows(rows, selectedProduct, selectedRegion)

    const data: Partial<Data>[] = [
        {
            type: 'scatter',
            mode: 'markers',
            x: filteredRows.map(r => r.units_sold),
            y: filteredRows.map(r => r.revenue),
        },
    ]

    const layout: Partial<Layout> = {
        title: { text: 'Units sold vs Revenue' },
        xaxis: { title: { text: 'Units sold' } },
        yaxis: { title: { text: 'Revenue' } },
    }

    return <Plot data={data} layout={layout} />
}