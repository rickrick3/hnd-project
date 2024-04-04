"use client"
import {QueryClientProvider,QueryClient} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import { ReactNode, useState } from "react"

import React from 'react'

export default function TanstackProvider({children}:{children:ReactNode}) {
  
  const [queryClient] = useState(()=> new QueryClient())

    return (
    <QueryClientProvider client={queryClient}>
{children}
<ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>

    )
}
