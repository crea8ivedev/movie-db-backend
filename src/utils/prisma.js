import { PrismaClient } from "@prisma/client";
import { paginate } from "prisma-extension-pagination";

const prisma = new PrismaClient().$extends({
  model: {
    movie: {
      paginate,
    },
  },
});

export default prisma;
