import { LoaderCircle } from "lucide-react"

import { cn } from "@/lib/utils"

type LoaderProps = {
  /** Width of the loader in px (or any CSS length). Defaults to `size`. */
  width?: number | string
  /** Height of the loader in px (or any CSS length). Defaults to `size`. */
  height?: number | string
  /** Convenience prop to set both width and height at once. */
  size?: number | string
  className?: string
}

const Loader = ({ width, height, size = 24, className }: LoaderProps) => {
  return (
    <LoaderCircle
      role="status"
      aria-label="Loading"
      className={cn("animate-spin text-current", className)}
      style={{ width: width ?? size, height: height ?? size }}
    />
  )
}

export default Loader
