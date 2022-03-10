import { PrismaClient } from "@prisma/client";
import { Review } from "../Items/Review.interface";
import prisma from "../database/db";
import { resolveTxt } from "dns";

export const addNewComment = async (data: any) => {
  try { 
    const newComment: any = await prisma.reviews.create({ data });
   
    return newComment;
  } catch (error) {
    return null;
  }
};

export const getProductReviews = async (id: string) => {
try {
  const reviews = await prisma.reviews.findMany({
    where: {
      productId: id,
    },
  })
  
    const reviewAndPoint = [...reviews]
    return reviewAndPoint;
} catch (error) {
  return null;
}
}