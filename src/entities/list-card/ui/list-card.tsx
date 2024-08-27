import { Card, CardContent } from "@/shared"
import Link from "next/link"

function ListCard({title, id}:{title:string, id:string}) {
  return (
    <Link href={`/${id}`} >
        <Card>
            <CardContent>
                {title}
            </CardContent>
        </Card>
    </Link> 
  )
}

export default ListCard