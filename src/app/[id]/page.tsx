import { getList } from "@/shared";
import Link from "next/link";


export default async function ListPage({params}:{params: {id: string}}) {
  const id = params.id
  // const list = await getList(id)
  return (
    <div className="p-6 " >
      <Link href={'/'} >back</Link>
      <p className="text-base " >{id}</p>
      <div className="mt-6  " >
        список подарков
      </div>
    </div>
    
  )
}

