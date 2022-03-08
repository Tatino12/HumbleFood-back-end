import { PrismaClient } from "@prisma/client";
import { Review } from "../Items/Review.interface";
import prisma from "../database/db";



export const addNewComment = async (data: any) => {
   try {
    const { pointProduct: PointProduct, ...rest } = data;   
    const newComment : any = await prisma.reviews.create({ data: rest})
        return newComment;
   } catch (error) {
       return null;
   } 
};

