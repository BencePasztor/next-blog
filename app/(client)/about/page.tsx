import Container from "@/components/common/ui/Container"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'About',
}

export default function About() {
  return (
    <Container className="bg-white shadow" as="section">
      <div className="prose">
        <h1>About</h1>

        <section>
          <h2>The application</h2>
          <p>This practice project is a simple, minimalistic blog application that has an admin panel for managing the articles and the users</p>
          <p>The admin panel can be reached at <Link href="/admin">/admin</Link></p>
          <p>The test user and password are: <b>test@test.hu</b>  and <b>testpassword</b></p>
        </section>

        <section>
          <h2>Features</h2>
          <ul>
            <li>Infinite Scroll on the home page</li>
            <li>Local image storage (to avoid using 3rd party services)</li>
            <li>Image manipulation (conversion to .webp, and resizing)</li>
            <li>Admin panel for articles and users</li>
            <li>Markdown based article content</li>
          </ul>
        </section>

        <section>
          <h2>Tools used</h2>
          <ul>
            <li>NextJS (App router)</li>
            <li>Prisma</li>
            <li>Typescript</li>
            <li>Tailwind CSS</li>
            <li>React Hook Form</li>
            <li>React Query / React Table</li>
            <li>Zod</li>
          </ul>
          <p>... and some other libraries</p>
        </section>

      </div>
    </Container>
  )
}
