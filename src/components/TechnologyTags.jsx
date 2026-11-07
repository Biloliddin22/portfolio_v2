function TechnologyTags({ items }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
          {item}
        </li>
      ))}
    </ul>
  )
}

export default TechnologyTags
