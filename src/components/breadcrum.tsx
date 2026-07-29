import { Fragment } from "react"
import { Link } from "react-router"

import { cn } from "@/lib/utils"

export type BreadcrumbItem = {
  label: string
  /** When provided (and the item isn't the current/last crumb), the label renders as a link. */
  href?: string
}

type BreadcrumProps = {
  items: BreadcrumbItem[]
  className?: string
}

const Breadcrum = ({ items, className }: BreadcrumProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-2 text-sm", className)}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <Fragment key={`${item.label}-${index}`}>
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="text-placeholder transition-colors hover:text-body"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={
                  isLast ? "font-medium text-body" : "text-placeholder"
                }
              >
                {item.label}
              </span>
            )}

            {!isLast ? <span className="text-faint">/</span> : null}
          </Fragment>
        )
      })}
    </nav>
  )
}

export default Breadcrum
