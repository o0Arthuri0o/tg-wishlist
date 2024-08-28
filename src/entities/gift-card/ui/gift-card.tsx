import { Gift } from "@/shared/lib/get-gifts";

export function GiftCard({gift}:{gift:Gift}) {
  return (
    <div>
        {gift.name}
        {gift.description}
        {gift.price}
    </div>
  )
}

