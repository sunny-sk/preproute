import { TestType } from "@/types"
const TABS = [
  { id: TestType.CHAPTERWISE, label: "Chapterwise" },
  { id: TestType.PYQ, label: "PYQ" },
  { id: TestType.MOCK, label: "Mock Test" },
] as const

const TestTypeInput = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: TestType
  setActiveTab: (tab: TestType) => void
}) => {
  return (
    <div className="mt-6 inline-flex gap-1 rounded-xl border border-[#e4e9f4] p-1">
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-5 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-[#F8FAFF] text-[#384EC7]"
                : "text-[#7c879f] hover:text-[#33415c]"
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export default TestTypeInput
