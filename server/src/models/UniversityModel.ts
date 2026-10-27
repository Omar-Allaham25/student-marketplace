import prisma from "../lib/prisma";

export const findAvailableUniversities = async () =>
  prisma.university.findMany({
    where: { domains: { some: {} } },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
