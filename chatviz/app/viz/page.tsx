'use client'

import { useEffect, useState } from 'react'
import type { SalesRow } from '@/lib/types'
import Scatter from '../../components/scatter'
import Table from '../../components/table'

export default function VizPage() {
    const [rows, setRows] = useState<SalesRow[]>([])

    useEffect(() => {
        fetch('/api/sales')
            .then(res => res.json())
            .then(setRows)
    }, [])

    return (
      <>
        <Table rows={rows} />
        <Scatter rows={rows} />
      </>
  )
    
}
