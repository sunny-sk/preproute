import { useCallback } from "react"
import { List, type RowComponentProps } from "react-window"

import type { Test } from "@/types"
import TRow from "./t-row"

// Fixed row height keeps virtualization cheap; rows truncate their content so
// every row is exactly this tall. Cap the viewport so short lists don't leave
// a tall empty scroll area, while long lists scroll internally.
const ROW_HEIGHT = 72
const MAX_HEIGHT = 560

type RowProps = {
  tests: Test[]
  onDeleted: (id: string) => void
}

/** Renders a single virtualized row; `style` positions it within the list. */
const Row = ({
  index,
  style,
  ariaAttributes,
  tests,
  onDeleted,
}: RowComponentProps<RowProps>) => (
  <TRow
    test={tests[index]}
    onDeleted={onDeleted}
    style={style}
    {...ariaAttributes}
  />
)

type TVirtualTableProps = {
  tests: Test[]
  onDeleted: (id: string) => void
}

const TVirtualTable = ({ tests, onDeleted }: TVirtualTableProps) => {
  // Stable key per row so filtering/deleting keeps row identity (and lets the
  // memoized TRow skip re-rendering unaffected rows).
  const rowKey = useCallback(
    (index: number, { tests }: RowProps) => tests[index].id,
    []
  )

  return (
    <List
      rowComponent={Row}
      rowCount={tests.length}
      rowHeight={ROW_HEIGHT}
      rowProps={{ tests, onDeleted }}
      rowKey={rowKey}
      overscanCount={6}
      style={{ height: Math.min(tests.length * ROW_HEIGHT, MAX_HEIGHT) }}
    />
  )
}

export default TVirtualTable
