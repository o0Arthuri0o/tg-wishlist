"use client"

import { Skeleton } from "@/shared"
import { Suspense, lazy } from "react"

const ListCard = lazy(() => import('./list-card'))

export function ListCardWrapper({title, id}:{title:string, id:string}) {
  return (
    <Suspense fallback={<Skeleton className="w-full h-full " />} >
      <ListCard id={id} title={title} />
    </Suspense>
  )
}

