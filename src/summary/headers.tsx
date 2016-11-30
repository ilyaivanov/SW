import * as React from 'react';

import { Group, Report, Sorting } from '../types/report';

//if you want to swap remove icon and drag handle
// you will need to return custom objects here and render them accordingly at Header.tsx
export default function createHeadersViews(report: Report, sorter: Function, removeColumn: Function) {
  const sortingIndicator = (sorter: Sorting) =>
    sorter == Sorting.Asc ? <span className="glyphicon glyphicon-chevron-up"></span> :
      sorter == Sorting.Desc ? <span className="glyphicon glyphicon-chevron-down"></span> :
        null;

  return report.columns.map((c, i) => <span
    key={i}>
    <span className="column-title" onClick={() => sorter(i)}>{c.name}</span>
    {sortingIndicator(c.sorted)}
    {(i != 0 && i != report.columns.length - 1) ? <span className="glyphicon glyphicon-remove text-danger" onClick={() => removeColumn(i)}></span> : null}
  </span>);
}