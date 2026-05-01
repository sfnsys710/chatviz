'use client'

import { Data, Layout } from 'plotly.js';
import dynamic from 'next/dynamic';
import { SalesRow } from '../lib/types'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

type TableProps = {
    rows: SalesRow[]
}

export default function Table({ rows }: TableProps) {
    const data = [
        {
            type: 'table',
            header: {
                values: ['Date', 'Product', 'Region', 'Units', 'Revenue', 'Satisfaction'],
                align: 'left',                                                                                      
                fill: { color: '#eee' },
            },                                                                                                      
            cells: {
                values: [                                                                                           
                    rows.map(r => r.date),
                    rows.map(r => r.product),
                    rows.map(r => r.region),                                                                        
                    rows.map(r => r.units_sold),
                    rows.map(r => r.revenue.toFixed(2)),                                                            
                    rows.map(r => r.satisfaction.toFixed(2)),                                                       
                ],
                align: 'left',                                                                                      
            },  
        },
    ] as Partial<Data>[]

    const layout: Partial<Layout> = {
        title: { text: 'Sales Data' },
    }

    return <Plot data={data} layout={layout} />
}