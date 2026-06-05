export default function AppLink({
  href,
  children,
  className = '',
  external = false,
  onClick,
  ...rest
}) {
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer" onClick={onClick} {...rest}>
        {children}
      </a>
    )
  }

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    event.preventDefault()

    if (onClick) {
      onClick(event)
    }

    window.history.pushState({}, '', href)
    window.dispatchEvent(new Event('site:navigate'))

    const hashIndex = href.indexOf('#')
    if (hashIndex >= 0) {
      const targetId = href.slice(hashIndex + 1)
      requestAnimationFrame(() => {
        const target = document.getElementById(targetId)

        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      })
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
