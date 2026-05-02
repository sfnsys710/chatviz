'use client'

import { useEffect, useState } from 'react'
import type { SalesRow } from '@/lib/types'
import Scatter from '@/components/scatter'
import Table from '@/components/table'
import Bar from '@/components/bar'

export default function VizPage() {
    const [rows, setRows] = useState<SalesRow[]>([])

    useEffect(() => {
        fetch('/api/sales')
            .then(res => res.json())
            .then(setRows)
    }, [])

    return (
      <div>
        <Table rows={rows} />
        <Bar rows={rows} />
        <Scatter rows={rows} />
      </div>
  )
    
}
