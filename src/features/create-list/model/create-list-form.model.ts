import { z } from "zod";

export const CreateListFormSchema = z.object({
    title: z.string().min(3, {message:'Минимум 3 символа'}).max(30, {message:"Максимум 30 символов"}),
})