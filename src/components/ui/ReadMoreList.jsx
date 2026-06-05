import { useEffect, useState } from 'react'

const MOBILE_QUERY = '(max-width: 768px)'

export default function ReadMoreList({
  items,
  initialVisible = 4,
  listClassName = '',
  moreLabel = 'Leer más',
  lessLabel = 'Leer menos',
  children,
}) {
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY)

    const update = (event) => {
      setIsMobile(event.matches)
      if (!event.matches) {
        setExpanded(false)
      }
    }

    setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener('change', update)

    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  const shouldCollapse = isMobile && items.length > initialVisible
  const visibleItems = shouldCollapse && !expanded ? items.slice(0, initialVisible) : items
  const showExtra = !shouldCollapse || expanded

  return (
    <div
      className={[
        'read-more',
        shouldCollapse && !expanded ? 'read-more--collapsed' : '',
        expanded ? 'read-more--expanded' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <ul className={listClassName}>
        {visibleItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {shouldCollapse ? (
        <button
          type="button"
          className="read-more-btn"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
        >
          <span className="read-more-btn-label">{expanded ? lessLabel : moreLabel}</span>
          <span className="read-more-btn-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      ) : null}

      {showExtra && children ? <div className="read-more-extra">{children}</div> : null}
    </div>
  )
}
