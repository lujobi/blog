import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'
import TechnologyIcon from './technology-icons'

interface Props {
  text: string
  enforce_text?: boolean
}

const Technology = ({ text, enforce_text }: Props) => {
  const TechIcon = TechnologyIcon({
    kind: text.split(' ').join('-'),
    href: `/technologies/${kebabCase(text)}`,
    tooltip: !enforce_text,
  })
  const TechLink = (
    <Link href={`/technologies/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-200">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
  if (enforce_text) {
    return (
      <div className="flex flex-row">
        {TechIcon}
        {TechLink}
      </div>
    )
  }
  return TechIcon || TechLink
}

export default Technology
