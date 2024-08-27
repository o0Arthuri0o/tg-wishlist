import { getList } from "@/shared";
import Link from "next/link";


export default async function ListPage({params}:{params: {'list-id': string}}) {
  const id = params["list-id"].slice(3).slice(0, 20)
  const list = await getList(id)
  return (
    <div className="p-6 " >
      <Link href={'/'} >back</Link>
      <p className="text-base " >{list?.title}</p>
      <div className="mt-6  " >
        список подарков
      </div>
    </div>
    
  )
}

