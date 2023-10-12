import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Test User
    await prisma.user.create({
        data: {
            name: "Test User",
            email: "test@test.hu",
            password: "$2a$10$0ieu3TUi9M9AGHzjBYrnR.1uBWPEEjYTGm8ANwz97HMDu8w/a4/KK",
            firstLogin: false
        }
    })

    const content = `## Lorem Ipsum Dolor Sit

Vivamus lacinia lacinia orci, vitae volutpat dolor sodales eget. Etiam at suscipit lacus. Sed pellentesque, urna et **maximus** iaculis, eros erat vehicula ipsum, a pretium lectus tellus sed mi. Nulla ornare nibh vel aliquet efficitur. Pellentesque commodo ex nec ante tincidunt bibendum. Fusce efficitur lacus ut nunc dapibus mattis. Sed facilisis turpis sit amet mauris auctor, vel tristique eros feugiat.

> Sed id nisi sagittis, dapibus leo vitae, auctor eros. Sed gravida mattis egestas. Nam arcu neque, molestie vitae nunc vitae, euismod eleifend nunc. Maecenas eros ex, condimentum in velit at, cursus elementum ipsum.&#x20;

Mauris volutpat, nulla id porta rutrum, est mauris varius velit, nec mollis dui ante non eros:

* Duis&#x20;
* Commodo&#x20;
* Pellentesque&#x20;
* Purus
* Sed facilisis`

    // Dummy Articles
    await prisma.article.createMany({
        data: [
            {
                id: 1,
                title: "Cras vitae hendrerit",
                lead: "Maecenas eros ex, condimentum in velit at, cursus elementum ipsum.",
                slug: "dummy-article-1",
                content,
                image: "/api/images/articles/1/original.jpeg"
            },
            {
                id: 2,
                title: "Sed adipiscing lacinia",
                lead: "Maecenas eros ex, condimentum in velit at, cursus elementum ipsum.",
                slug: "dummy-article-2",
                content,
                image: `/api/images/articles/2/original.jpeg`
            },
            {
                id: 3,
                title: "Vestibulum commodo justo",
                lead: "Maecenas eros ex, condimentum in velit at, cursus elementum ipsum.",
                slug: "dummy-article-3",
                content,
                image: `/api/images/articles/3/original.jpeg`
            },
            {
                id: 4,
                title: "Aenean non purus",
                lead: "Maecenas eros ex, condimentum in velit at, cursus elementum ipsum.",
                slug: "dummy-article-4",
                content,
                image: `/api/images/articles/4/original.jpeg`
            },
            {
                id: 5,
                title: "Fusce in fermentum",
                lead: "Maecenas eros ex, condimentum in velit at, cursus elementum ipsum.",
                slug: "dummy-article-5",
                content,
                image: `/api/images/articles/5/original.jpeg`
            },
            {
                id: 6,
                title: "Pellentesque aliquet mi",
                lead: "Maecenas eros ex, condimentum in velit at, cursus elementum ipsum.",
                slug: "dummy-article-6",
                content,
                image: `/api/images/articles/6/original.jpeg`
            },
            {
                id: 7,
                title: "Cras vel tristique",
                lead: "Maecenas eros ex, condimentum in velit at, cursus elementum ipsum.",
                slug: "dummy-article-7",
                content,
                image: `/api/images/articles/7/original.jpeg`
            },
            {
                id: 8,
                title: "In hac habitasse",
                lead: "Maecenas eros ex, condimentum in velit at, cursus elementum ipsum.",
                slug: "dummy-article-8",
                content,
                image: `/api/images/articles/8/original.jpeg`
            },
            {
                id: 9,
                title: "Ut facilisis ligula",
                lead: "Maecenas eros ex, condimentum in velit at, cursus elementum ipsum.",
                slug: "dummy-article-9",
                content,
                image: `/api/images/articles/9/original.jpeg`
            },
            {
                id: 10,
                title: "Proin eu bibendum",
                lead: "Maecenas eros ex, condimentum in velit at, cursus elementum ipsum.",
                slug: "dummy-article-10",
                content,
                image: `/api/images/articles/10/original.jpeg`
            },
            {
                id: 11,
                title: "Aliquam tincidunt posuere",
                lead: "Maecenas eros ex, condimentum in velit at, cursus elementum ipsum.",
                slug: "dummy-article-11",
                content,
                image: `/api/images/articles/11/original.jpeg`
            },
            {
                id: 12,
                title: "Vestibulum dignissim fringilla",
                lead: "Maecenas eros ex, condimentum in velit at, cursus elementum ipsum.",
                slug: "dummy-article-12",
                content,
                image: `/api/images/articles/12/original.jpeg`
            }
        ]
    })

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })