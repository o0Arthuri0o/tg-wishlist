import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg'];

export const CreateGiftFormSchema = z.object({
    name: z.string().min(2, {message:'Минимум 2 символа'}).max(30, {message:"Максимум 30 символов"}),
    description: z.string().min(0, {message:''}).max(250, {message:"Максимум 250 символов"}),
    price: z.string({required_error:"Укажите стоимость", message:"Укажиет стоимость"}).refine((value) => { 
        if(!Number.isNaN(Number(value))) return Number(value),
        "Введите стоимость"
    }),
    link: z.string().optional(),
    photo: z
    .instanceof(File)
    .optional()
})