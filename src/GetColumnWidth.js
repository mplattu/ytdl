export default class GetColumnWidth {
  // https://github.com/tannerlinsley/react-table/issues/94
  get(rows, accessor, headerText) {
    const maxWidth = 400
    const magicSpacing = 12
    const cellLength = Math.max(
      ...rows.map(row => (`${row[accessor]}` || '').length),
      headerText.length,
    )
    return Math.min(maxWidth, cellLength * magicSpacing)
  };
}
