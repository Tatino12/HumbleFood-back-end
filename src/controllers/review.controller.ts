import { PrismaClient } from "@prisma/client";
import { Review } from "../Items/Review.interface";
import prisma from "../database/db";
import { resolveTxt } from "dns";

export const addNewComment = async (data: any) => {
  try {
    const { pointProduct: PointProduct, ...rest } = data;
    const prod = await prisma.products.findUnique({
      where: {
        id: rest.productId,
      },
      select: { pointProduct: true },
    });

    const newComment: any = await prisma.reviews.create({ data: rest });
    const arrComment = await prisma.reviews.findMany({
      where: {
        productId: rest.productId,
      },
    });
    console.log(arrComment.length);
    console.log(prod?.pointProduct);
    const product = await prisma.products.update({
      where: {
        id: rest.productId,
      },
      data: {
        pointProduct: Math.ceil(
          (prod?.pointProduct + PointProduct) / arrComment.length
        ),
      },
    });
    console.log(prod);
    return newComment;
  } catch (error) {
    return null;
  }
};
