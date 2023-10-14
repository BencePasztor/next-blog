# Next Blog

## About
This practice project is a simple, minimalistic blog application that has an admin panel for managing the articles and the users.

The admin panel can be reached at **/admin**. The test user is "test@test.hu" and the password is "testpassword". There are some preuploaded articles and the data for the test user in the seed.sql and some preuploaded images in the /images folder

To try the application navigate to the directory of the project and run:

    docker-compose up --build
    
![1](https://github.com/BencePasztor/next-blog/assets/41210416/000e8ab2-8f54-4cd3-b7f2-e5df132ff8b8)
![2](https://github.com/BencePasztor/next-blog/assets/41210416/0f847124-33b0-4ad0-a6d8-b2e4065dce47)
![3](https://github.com/BencePasztor/next-blog/assets/41210416/6ec63781-81e3-47af-a6a7-602beab1fa8a)



## Features

 - Infinite Scroll on the home page
 - Local image storage (to avoid using 3rd party services)
 - Image manipulation (conversion to .webp, and resizing)
 - Admin panel for articles and user
 - Markdown based article content
 
 ## Tools Used
 
 - NextJS (App Router)
 - Typescript
 - Prisma
 - Zod
 - Tailwind CSS
 - React Hook Form
 - Next Auth
 - React Query / React Table
...and some other libraries
