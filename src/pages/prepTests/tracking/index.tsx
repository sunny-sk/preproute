import Seo from "@/components/seo"

const TaskTracking = () => {
  return (
    <>
      <Seo
        title="Test Tracking | Preproute"
        description="Track test progress and monitor performance insights."
        path="/test/tracking"
      />
      <div className="bg-white p-8">
        <h1 className="text-xl font-semibold text-heading">Test Tracking</h1>
        <p className="mt-2 text-sm text-body-subtle">
          Tracking content will be implemented here.
        </p>
      </div>
    </>
  )
}

export default TaskTracking
