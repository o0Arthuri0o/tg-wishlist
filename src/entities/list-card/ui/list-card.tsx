import { Card, CardContent } from "@/shared"
import Link from "next/link"

function ListCard({title, id}:{title:string, id:string}) {
  return (
    <Link href={`/${id}`} >
        <Card className="w-full h-full p-3 " >
            <CardContent className="p-0 h-full w-full flex items-center justify-center " >
                {title}
            </CardContent>
        </Card>
    </Link> 
  )
}

export default ListCard