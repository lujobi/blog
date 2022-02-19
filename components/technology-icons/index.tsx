import VSCode from './vscode.svg'
import Terminal from './terminal.svg'
// Icons taken from: https://simpleicons.org/

const components = {
  vscode: VSCode,
  zsh: Terminal,
}

const TechnologyIcon = ({ kind, href, tooltip }) => {
  const TechnologySvg = components[kind]

  if (!TechnologySvg) {
    return null
  }

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      {tooltip ? (
        <div className="has-tooltip">
          <span className="tooltip -mt-8 rounded bg-gray-100 p-1 pr-2 pl-2 uppercase text-gray-600 shadow-lg">
            {kind}
          </span>
          <TechnologySvg
            className={`mr-3 h-4 w-4 fill-current text-primary-500 hover:text-primary-600 dark:hover:text-primary-200`}
          />
        </div>
      ) : (
        <TechnologySvg
          className={`mr-3 h-4 w-4 fill-current text-primary-500 hover:text-primary-600 dark:hover:text-primary-200`}
        />
      )}
    </a>
  )
}

export default TechnologyIcon
