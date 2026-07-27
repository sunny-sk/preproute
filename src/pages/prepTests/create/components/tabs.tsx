import { useState } from "react"
const TABS = [
  { id: "chapterwise", label: "Chapterwise" },
  { id: "pyq", label: "PYQ" },
  { id: "mock", label: "Mock Test" },
] as const
type TabId = (typeof TABS)[number]["id"]

const Tabs = () => {
  const [activeTab, setActiveTab] = useState<TabId>("chapterwise")
  return (
    <div className="mt-6 inline-flex gap-1 rounded-xl border border-[#e4e9f4] p-1">
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-5 py-2 text-sm font-medium transition-colors ${isActive
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

export default Tabs