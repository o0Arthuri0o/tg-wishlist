import Link from "next/link";


export default function ListPage({params}:{params: {'list-id': string}}) {
  return (
    <div>
      <Link href={'/'} >back</Link>
      <div>page {params["list-id"]} </div>
    </div>
    
  )
}

