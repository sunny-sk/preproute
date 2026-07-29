import { useCallback } from "react"
import { List, type RowComponentProps } from "react-window"

import type { Test } from "@/types"
import TRowMob from "./t-row-mob"

// Card height incl. the 12px gap baked into each row (via pb-3 on the wrapper).
const CARD_HEIGHT = 136
const MAX_HEIGHT = 600

type RowProps = {
  tests: Test[]
  onDeleted: (id: string) => void
}

const Row = ({
  index,
  style,
  ariaAttributes,
  tests,
  onDeleted,
}: RowComponentProps<RowProps>) => (
  <div style={style} className="pb-3" {...ariaAttributes}>
    <TRowMob test={tests[index]} onDeleted={onDeleted} />
  </div>
)

type TVirtualCardsProps = {
  tests: Test[]
  onDeleted: (id: string) => void
}

const TVirtualCards = ({ tests, onDeleted }: TVirtualCardsProps) => {
  const rowKey = useCallback(
    (index: number, { tests }: RowProps) => tests[index].id,
    []
  )

  return (
    <List
      rowComponent={Row}
      rowCount={tests.length}
      rowHeight={CARD_HEIGHT}
      rowProps={{ tests, onDeleted }}
      rowKey={rowKey}
      overscanCount={4}
      style={{ height: Math.min(tests.length * CARD_HEIGHT, MAX_HEIGHT) }}
    />
  )
}

export default TVirtualCards
