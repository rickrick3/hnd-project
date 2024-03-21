'use client'
import { DataTable } from '@/components/DataTable'
import PageTitle from '@/components/PageTitle'
import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

type Props = {}

export default function OrderPage({}: Props) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Orders " />
      <DataTable columns={columns} data={data} />
    </div>
  )
} 


export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "order",
    header: "Order",

  },
  {
    accessorKey: "status",
    header: "Status",
    cell:({row})=>{
return <div className={cn("font-medium w-medium px-4 py-4 rounded-lg",{
"bg-red-200": row.getValue("status") === "pending",
"bg-orange-200": row.getValue("status") === "processing",
"bg-green-200": row.getValue("status") === "complete"
})}
    >
    {row.getValue("status")}</div>
    }
  },
  {
    accessorKey: "lastOrder",
    header: "Last Order"
  },
  {
    accessorKey: "method",
    header: "Method"
  },

];

type Payment = {
  order:string;
  status:string;
  lastOrder: string;
  method: string;
};


export const data: Payment[] = [
  {
    order: "ORD001",
    status: "pending",
    lastOrder: "12/06/2023",
    method: "credit card",
  },
  {
    order: "ORD00Z",
    status: "processing",
    lastOrder: "12/12/2023",
    method: "credit card",
  },
  {
    order: "ORD003",
    status: "complete",
    lastOrder: "06/12/2023",
    method: "credit card",
  },
  {
    order: "ORD001",
    status: "pending",
    lastOrder: "12/06/2023",
    method: "credit card",
  },
  {
    order: "ORD00Z",
    status: "processing",
    lastOrder: "12/12/2023",
    method: "credit card",
  },
  {
    order: "ORD003",
    status: "complete",
    lastOrder: "06/12/2023",
    method: "credit card",
  },
  {
    order: "ORD001",
    status: "pending",
    lastOrder: "12/06/2023",
    method: "credit card",
  },
  {
    order: "ORD00Z",
    status: "processing",
    lastOrder: "12/12/2023",
    method: "credit card",
  },
  {
    order: "ORD003",
    status: "complete",
    lastOrder: "06/12/2023",
    method: "credit card",
  },
  {
    order: "ORD001",
    status: "pending",
    lastOrder: "12/06/2023",
    method: "credit card",
  },
  {
    order: "ORD00Z",
    status: "processing",
    lastOrder: "12/12/2023",
    method: "credit card",
  },
  {
    order: "ORD003",
    status: "complete",
    lastOrder: "06/12/2023",
    method: "credit card",
  },
  {
    order: "ORD001",
    status: "pending",
    lastOrder: "12/06/2023",
    method: "credit card",
  },
  {
    order: "ORD00Z",
    status: "processing",
    lastOrder: "12/12/2023",
    method: "credit card",
  },
  {
    order: "ORD003",
    status: "complete",
    lastOrder: "06/12/2023",
    method: "credit card",
  },
  {
    order: "ORD001",
    status: "pending",
    lastOrder: "12/06/2023",
    method: "credit card",
  },
  {
    order: "ORD00Z",
    status: "processing",
    lastOrder: "12/12/2023",
    method: "credit card",
  },
  {
    order: "ORD003",
    status: "complete",
    lastOrder: "06/12/2023",
    method: "credit card",
  },
  // ...
]
