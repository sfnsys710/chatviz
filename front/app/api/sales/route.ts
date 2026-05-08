import { SalesRow } from '@/lib/types'

const DATA: SalesRow[] = generateSales()

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const product = searchParams.get('product')
    const region = searchParams.get('region')

    let rows = DATA
    if (product) rows = rows.filter(r => r.product === product)
    if (region)  rows = rows.filter(r => r.region === region)

    return Response.json(rows)
}

function generateSales(): SalesRow[] {
    const products = [
        { name: 'Widget A', unitsRange: [100, 300], price: 10  },
        { name: 'Widget B', unitsRange: [50,  150], price: 25  },
        { name: 'Gadget X', unitsRange: [10,  50],  price: 200 },
        { name: 'Gadget Y', unitsRange: [5,   30],  price: 500 },
    ] as const

    const regions = ['North', 'South', 'East'] as const
    const months  = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06']

    const rows: SalesRow[] = []
    for (const m of months)
        for (const p of products)
            for (const r of regions) {
                const [lo, hi] = p.unitsRange
                const units = Math.floor(lo + Math.random() * (hi - lo))
                rows.push({
                    date: `${m}-15`,
                    product: p.name,
                    region: r,
                    units_sold: units,
                    revenue: units * p.price * (0.9 + Math.random() * 0.2),
                    satisfaction: 3 + Math.random() * 2,
                })
            }
    return rows
}
