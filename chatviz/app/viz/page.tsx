'use client'

import { useEffect, useMemo, useState } from 'react'
import type { SalesRow } from '@/lib/types'
import Scatter from '@/components/scatter'
import Table from '@/components/table'
import Bar from '@/components/bar'
import TableSelector from '@/components/table_selector'

export default function VizPage() {
    const [rows, setRows] = useState<SalesRow[]>([])
    const [selectedProduct, setSelectedProduct] = useState<string>('')
    const [selectedRegion, setSelectedRegion] = useState<string>('')
    const uniqueProducts = useMemo(() => [...new Set(rows.map(row => row.product))], [rows])
    const uniqueRegions = useMemo(() => [...new Set(rows.map(row => row.region))], [rows])

    useEffect(() => {
        fetch('/api/sales')
            .then(res => res.json())
            .then(setRows)
    }, [])

    return (
      <div>
        <div className='flex justify-evenly p-8'>
          <TableSelector column='Product' values={uniqueProducts} value={selectedProduct} onChange={setSelectedProduct} />
          <TableSelector column='Region' values={uniqueRegions} value={selectedRegion} onChange={setSelectedRegion} />
        </div>
        <Table rows={rows} />
        <Bar rows={rows} selectedProduct={selectedProduct} selectedRegion={selectedRegion} />
        <Scatter rows={rows} selectedProduct={selectedProduct} selectedRegion={selectedRegion} />
      </div>
  )
    
}
