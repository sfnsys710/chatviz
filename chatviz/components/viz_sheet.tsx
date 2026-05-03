'use client'

import { useEffect, useState } from 'react'
import type { SalesRow } from '@/lib/types'
import TableSelector from '@/components/table_selector'
import Bar from '@/components/bar'
import Scatter from '@/components/scatter'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'

export type VizKind = 'bar' | 'scatter'

type VizSheetProps = {
    openViz: VizKind | null;
    onOpenVizClose: () => void;
}

export default function VizSheet({ openViz, onOpenVizClose }: VizSheetProps) {
    const [rows, setRows] = useState<SalesRow[]>([])
    const [selectedProduct, setSelectedProduct] = useState<string>('')
    const [selectedRegion, setSelectedRegion] = useState<string>('')

    const uniqueProducts = [...new Set(rows.map(r => r.product))]
    const uniqueRegions = [...new Set(rows.map(r => r.region))]

    useEffect(() => {
        fetch('/api/sales').then(res => res.json()).then(setRows)
    }, [])

    function onOpenChange(open: boolean) {
        if (!open) {
            onOpenVizClose()
        }
    }

    return (
        <Sheet open={openViz !== null} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="data-[side=right]:w-[800px] data-[side=right]:sm:max-w-[800px]">
                <SheetHeader>
                    <SheetTitle>{openViz === 'bar' ? 'Bar chart' : 'Scatter plot'}</SheetTitle>
                </SheetHeader>
                <div className="flex justify-evenly p-4">
                    <TableSelector column="Product" values={uniqueProducts} value={selectedProduct} onChange={setSelectedProduct} />
                    <TableSelector column="Region" values={uniqueRegions} value={selectedRegion} onChange={setSelectedRegion} />
                </div>
                <div className="p-4">
                    {openViz === 'bar' && <Bar rows={rows} selectedProduct={selectedProduct} selectedRegion={selectedRegion} />}
                    {openViz === 'scatter' && <Scatter rows={rows} selectedProduct={selectedProduct} selectedRegion={selectedRegion} />}
                </div>
            </SheetContent>
        </Sheet>
    )
}
