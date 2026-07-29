import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/utils/helper"
import useUser from "@/store/useUser"

const Header = () => {
  const user = useUser(s => s.user)
  const USER_NAME = user?.name
  const USER_ROLE = user?.role
  return (
    <header className="flex h-[78px] items-center justify-end border-b border-line-strong bg-white px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-12 w-12 items-center justify-center rounded-full border border-line-strong text-body-muted transition-colors hover:bg-canvas"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-success" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              role="button"
              className="flex cursor-pointer items-center gap-3 rounded-full bg-white py-1 pr-3 pl-1"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-warning-soft text-sm font-semibold text-heading">
                <img
                  src="/user.svg"
                  alt="User avatar"
                  className="relative top-[-5px] h-full w-full"
                />
              </span>
              <div className="flex flex-row">
                <span className="text-left">
                  <span className="block text-base leading-none font-semibold text-body">
                    {USER_NAME}
                  </span>
                  <span className="block pt-1 text-xs text-body-subtle">
                    {USER_ROLE}
                  </span>
                </span>
                <div className="px-4">
                  <img
                    src="/arrow-drop-down.svg"
                    alt="Arrow down"
                    className="h-4 w-4"
                  />
                </div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
