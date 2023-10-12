import { PrismaClient, Article } from "@prisma/client";

export type ArticleExtended = Article & {
  cover: string,
  thumbnail: string,
  badge: string
}

type ExtendedClient = ReturnType<typeof getExtendedClient>

function getExtendedClient() {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  }).$extends({
    result: {
      article: {
        cover: {
          needs: {
            id: true,
            image: true
          },
          compute(article) {
            if (article.image) {
              return `/api/images/articles/${article.id}/cover.webp`
            }
            return ''
          }
        },
        thumbnail: {
          needs: {
            id: true,
            image: true
          },
          compute(article) {
            if (article.image) {
              return `/api/images/articles/${article.id}/thumbnail.webp`
            }
            return ''
          }
        },
        badge: {
          needs: {
            id: true,
            image: true
          },
          compute(article) {
            if (article.image) {
              return `/api/images/articles/${article.id}/badge.webp`
            }
            return ''
          }
        }
      }
    }
  })
}

const globalForPrisma = globalThis as unknown as {
  prisma: ExtendedClient | undefined;
};

export const db = globalForPrisma.prisma ?? getExtendedClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;