import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared";
import { Gift } from "@/shared/lib/get-gifts";
import { Gift as GiftSVG } from "lucide-react";
import Link from "next/link";

export function GiftCard({gift}:{gift:Gift}) {
  return (
    <Card className="p-3 w-full h-full flex items-center gap-3" >
        <div className="w-[100px] h-[100px] bg-slate-400 rounded-xl " >
            <GiftSVG width={40}  height={40} />
        </div>
        <CardHeader>
            <CardTitle>
                {gift.name}
            </CardTitle>
            {gift.description.length > 0 &&
                <CardDescription>
                    {gift.description}
                </CardDescription>
            }
        </CardHeader>
        <CardContent className="flex justify-between gap-3" >
            {gift.link.length > 0 &&
                <Link href={gift.link} className="p-2 text-blue-400" >В магазин</Link>
            }
            <p className="text-base p-2" >{gift.price}</p>
        </CardContent>
    </Card>
  )
}

