import { SalesRow } from '@/lib/types'

function filterRows(rows: SalesRow[], selectedProduct?: string, selectedRegion?: string) {
    if (selectedProduct && selectedProduct !== 'All') {
        rows = rows.filter(r => r.product === selectedProduct)
    }
    if (selectedRegion && selectedRegion !== 'All') {
        rows = rows.filter(r => r.region === selectedRegion)
    }
    return rows
}

export { filterRows }