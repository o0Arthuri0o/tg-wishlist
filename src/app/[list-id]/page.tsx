import { GetList } from "@/shared";
import Link from "next/link";


export default async function ListPage({params}:{params: {'list-id': string}}) {
  const id = params["list-id"]
  // const list = await GetList(id)
  return (
    <div>
      <Link href={'/'} >back</Link>
      <div>page {id} </div>
      {/* <div>{list?.title}</div> */}
    </div>
    
  )
}

