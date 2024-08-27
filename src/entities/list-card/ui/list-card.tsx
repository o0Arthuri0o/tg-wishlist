import { Card, CardContent } from "@/shared"
import Link from "next/link"

function ListCard({title, id}:{title:string, id:string}) {
  return (
    <Link href={`/${id}`} >
        <Card className="w-full h-full " >
            <CardContent>
                {title}
            </CardContent>
        </Card>
    </Link> 
  )
}

export default ListCard