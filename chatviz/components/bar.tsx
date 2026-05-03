'use client'

import { Data, Layout } from 'plotly.js';
import dynamic from 'next/dynamic';
import { SalesRow } from '@/lib/types'
import { filterRows } from '@/lib/helpers'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

type BarProps = {
    rows: SalesRow[]
    selectedProduct?: string;
    selectedRegion?: string;
}

export default function Bar({ rows, selectedProduct, selectedRegion}: BarProps) {

    const filteredRows = filterRows(rows, selectedProduct, selectedRegion)

    const data: Partial<Data>[] = [
        {
            type: 'bar',
            x: filteredRows.map(r => r.product),
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