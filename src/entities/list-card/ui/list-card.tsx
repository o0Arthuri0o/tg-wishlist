import { CardTitle, Card} from "@/shared"
import Link from "next/link"

export function ListCard({title, id}:{title:string, id:string}) {
  return (
    <Link href={`/${id}`} >
        <Card>
            <CardTitle>
                {title}
            </CardTitle>
        </Card>
    </Link> 
  )
}

