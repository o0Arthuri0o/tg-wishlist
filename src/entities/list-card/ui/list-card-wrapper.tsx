"use client"

import { Suspense, lazy } from "react"

const ListCard = lazy(() => import('./list-card'))

export function ListCardWrapper({title, id}:{title:string, id:string}) {
  return (
    <Suspense fallback={<p>Загрузка...</p>} >
      <ListCard id={id} title={title} />
    </Suspense>
  )
}

