"use client"

import { CardTitle, Card, CardContent} from "@/shared"
import Link from "next/link"
import { Suspense } from "react"
import { ListCardSkeleton } from "./list-card-skeleton"

export function ListCard({title, id}:{title:string, id:string}) {

  return (
    <Suspense fallback={<p>Загрузка...</p>} >
      <Link href={`/${id}`} >
          <Card>
              <CardContent>
                  {title}
              </CardContent>
          </Card>
      </Link> 
    </Suspense>
  )
}

