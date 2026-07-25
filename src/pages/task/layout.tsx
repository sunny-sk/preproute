import { NavLink, Outlet, useLocation } from "react-router"
import { BarChart3, ClipboardPenLine, FileText, CircleCheck } from "lucide-react"
import Logo from "@/components/logo"
import Header from "@/components/header"

const MAIN_MENU_ITEMS = [
  {
    label: "Dashboard",
    path: "/task/dashboard",
    icon: BarChart3,
  },
  {
    label: "Test Creation",
    path: "/task/create",
    icon: ClipboardPenLine,
  },
  {
    label: "Test Tracking",
    path: "/task/tracking",
    icon: FileText,
  },
]

const QUESTION_ITEMS = ["Question 1", "Question 2", "Question 3", "Question X", "Question 5", "Question 6"]
const PRIMARY_EXPANDED_SIDEBAR_WIDTH = "w-[230px]"
const PRIMARY_COLLAPSED_SIDEBAR_WIDTH = "w-[88px]"
const SECONDARY_SIDEBAR_WIDTH = "w-[210px]"


const TaskLayout = () => {
  const { pathname } = useLocation()
  const isSecondarySidebarVisible = pathname.startsWith("/task/create")
  const leftPanelWidthClass = isSecondarySidebarVisible ? "w-[298px]" : PRIMARY_EXPANDED_SIDEBAR_WIDTH

  return (
    <section className="flex min-h-screen bg-[#f8faff]">
      <aside className={`${leftPanelWidthClass} border-r border-[#e8edf8] bg-white`}>
        <div className="px-6 py-7">
          <Logo />
        </div>

        <div className="flex min-h-0">
          <div
            className={`border-r border-[#eef2fb] py-6 ${isSecondarySidebarVisible ? PRIMARY_COLLAPSED_SIDEBAR_WIDTH : PRIMARY_EXPANDED_SIDEBAR_WIDTH
              } ${isSecondarySidebarVisible ? "px-3" : "px-4"}`}
          >
            <nav aria-label="Task primary menu" className="space-y-2">
              {MAIN_MENU_ITEMS.map((item) => {
                const Icon = item.icon

                return (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center rounded-lg py-2 text-sm font-medium transition-colors ${isSecondarySidebarVisible ? "justify-center px-2" : "gap-3 px-3"
                      } ${isActive ? "bg-[#eef3ff] text-[#4f6fff]" : "text-[#52607a] hover:bg-[#f6f8ff]"
                      }`
                    }
                  >
                    <Icon size={16} />
                    {!isSecondarySidebarVisible ? <span>{item.label}</span> : null}
                  </NavLink>
                )
              })}
            </nav>
          </div>

          {isSecondarySidebarVisible ? (
            <div className={`${SECONDARY_SIDEBAR_WIDTH} px-3 py-4`}>
              <section className="rounded-xl border border-[#dce7ff] bg-[#f8fbff] p-3">
                <p className="mb-3 text-xs font-semibold tracking-wide text-[#5f6b84]">Question creation</p>
                <p className="mb-3 text-xs text-[#7583a0]">Total Questions : 50</p>

                <div className="space-y-1.5 rounded-lg border border-dashed border-[#90c9ff] p-2">
                  {QUESTION_ITEMS.map((question) => {
                    return (
                      <button
                        key={question}
                        type="button"
                        className="flex w-full items-center justify-between rounded-md border border-[#e7ecfa] bg-white px-2.5 py-1.5 text-left text-xs text-[#4f5f7f]"
                      >
                        <span className="flex items-center gap-2">
                          <CircleCheck size={13} className="text-[#2ab37f]" />
                          {question}
                        </span>
                        <span className="text-[#8f9bb8]">›</span>
                      </button>
                    )
                  })}
                </div>
              </section>
            </div>
          ) : null}
        </div>
      </aside>

      <main className="flex min-h-screen flex-1 flex-col bg-[#f8faff]">
        <Header />

        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </section>
  )
}

export default TaskLayout
