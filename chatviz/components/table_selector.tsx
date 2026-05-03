'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


type TableSelectorProps = {
    column: 'Product' | 'Region';
    values: string[];
    value: string;
    onChange: (value: string) => void;
}

export default function TableSelector({ column, values, value, onChange }: TableSelectorProps) {
    return (
        <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
            <SelectValue placeholder={column} />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value='All'>All</SelectItem>
            {values.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
        </SelectContent>
        </Select>
    )
}