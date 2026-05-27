import AppLink from './AppLink'

export default function InfoCard({ title, description, href, label }) {
  return (
    <article className="card fade-in">
      <h3>{title}</h3>
      <p>{description}</p>
      {href && label ? <AppLink href={href}>{label} &rarr;</AppLink> : null}
    </article>
  )
}
