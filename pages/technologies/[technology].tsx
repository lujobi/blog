import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
import fs from 'fs'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import path from 'path'
import { PostFrontMatter } from 'types/PostFrontMatter'

const root = process.cwd()

export async function getStaticPaths() {
  const tags = await getAllTags('blog')

  return {
    paths: Object.keys(tags.technologies).map((technology) => ({
      params: {
        technology,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  posts: PostFrontMatter[]
  technology: string
}> = async (context) => {
  const technology = context.params.technology as string
  const allPosts = await getAllFilesFrontMatter('blog')
  const filteredPosts = allPosts.filter(
    (post) =>
      post.draft !== true && post.technologies?.map((t) => kebabCase(t)).includes(technology)
  )

  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `technologies/${technology}/feed.xml`)
    const rssPath = path.join(root, 'public', 'technologies', technology)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  return { props: { posts: filteredPosts, technology } }
}

export default function Technology({
  posts,
  technology,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // Capitalize first letter and convert space to dash
  const title = technology[0].toUpperCase() + technology.split(' ').join('-').slice(1)
  return (
    <>
      <TagSEO
        title={`${technology} - ${siteMetadata.title}`}
        description={`${technology} technologies - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
