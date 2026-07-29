/**
 * Shared CSS-grid column template for the desktop test list.
 *
 * react-window v2 virtualizes plain <div> rows (not <table>/<tr>), so the
 * header, data rows and skeleton rows all use this same grid so their columns
 * stay aligned. Columns: Test Name · Subject · Status · Created Date · Actions.
 */
export const ROW_GRID =
  "grid grid-cols-[minmax(0,2.4fr)_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.2fr)_120px] items-center gap-3"
