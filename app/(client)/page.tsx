import Container from "@/components/common/ui/Container"
import LatestArticles from "@/components/client/articles/LatestArticles"

export default function Home() {
  
  return (
    <Container as="section" id="articles">
        <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
        <LatestArticles/>
    </Container>
  )
}
