import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const USER_NAME = "Alex Wando"
const USER_ROLE = "Admin"

const Header = () => {
  return (
    <header className="flex h-[78px] items-center justify-end border-b border-[#e8edf8] bg-white px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#dde3ef] text-[#4f5f7f] transition-colors hover:bg-[#f5f8ff]"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-[#16c47f]" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger >
            <button
              type="button"
              className="flex items-center gap-3 cursor-pointer rounded-full bg-white py-1 pr-3 pl-1"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffd292] text-sm font-semibold text-[#27324a]">
                <img src="/user.svg" alt="User avatar" className="h-full w-full relative top-[-5px]" />
              </span>
              <div className="flex flex-row">
                <span className="text-left">
                  <span className="block text-base leading-none font-semibold text-[#2f3b52]">{USER_NAME}</span>
                  <span className="block pt-1 text-xs text-[#6e7b94]">{USER_ROLE}</span>
                </span>
                <div className="px-4"><img src="/arrow-drop-down.svg" alt="Arrow down" className="h-4 w-4" /></div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>

  )
}

export default Header