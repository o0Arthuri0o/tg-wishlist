import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared";
import { Gift } from "@/shared/lib/get-gifts";
import { Gift as GiftSVG, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export function GiftCard({gift}:{gift:Gift}) {
  return (
    <Card className="p-2 w-full h-auto flex items-center gap-2" >
        <div className="min-w-[70px] h-[70px] bg-slate-200 rounded-xl flex justify-center items-center " >
            <GiftSVG width={40}  height={40} />
        </div>
        <div className="flex flex-col gap-3 justify-between" >
            <CardHeader>
                <CardTitle className="p-0">
                    {gift.name}
                </CardTitle>
                {gift.description.length > 0 &&
                    <CardDescription>
                        {gift.description}
                    </CardDescription>
                }
            </CardHeader>
            <CardContent className="flex flex-col gap-2 p-0" >
                <div className="flex justify-between gap-3 p-0" >
                    {gift.link.length > 0 &&
                        <Link href={gift.link} className="p-2 text-blue-400" >В магазин</Link>
                    }
                    <p className="text-base p-2" >{gift.price}</p>
                </div>
                <div className="flex gap-2 items-center justify-between " >
                    <Button variant={'secondary'} >
                        <Pencil/>
                    </Button>
                    <Button variant={'destructive'} >
                        <Trash2/>
                    </Button>
                </div>
            </CardContent>
        </div>
    </Card>
  )
}

