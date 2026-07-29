const THead = () => {
  return (
    <thead>
      <tr className="border-b border-line bg-canvas text-xs font-semibold tracking-wide text-placeholder uppercase">
        <th className="px-3 py-3.5">Test Name</th>
        <th className="px-3 py-3.5">Subject</th>
        <th className="px-3 py-3.5">Status</th>
        <th className="px-3 py-3.5">Created Date</th>
        <th className="px-3 py-3.5 text-right">Actions</th>
      </tr>
    </thead>
  )
}

export default THead
