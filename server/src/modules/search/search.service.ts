import { prisma } from "../../lib/prisma";

class SearchService {
  async search(search: string) {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: search,
          mode: "insensitive"
        }
      },
      select: {
        id: true,
        avatar: true,
        username: true,
        profession: true
      },
      take: 10
    })

    return users
  }
}

export const searchService = new SearchService()