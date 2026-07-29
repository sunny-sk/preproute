import { ROW_GRID } from "./columns"

const THead = () => {
  return (
    <div
      className={`${ROW_GRID} border-b border-line bg-canvas px-3 py-3.5 text-xs font-semibold tracking-wide text-placeholder uppercase`}
    >
      <span>Test Name</span>
      <span>Subject</span>
      <span>Status</span>
      <span>Created Date</span>
      <span className="text-right">Actions</span>
    </div>
  )
}

export default THead
