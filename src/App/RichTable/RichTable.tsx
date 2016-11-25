import * as React from 'react';

import { Group, Report, Sorting } from '../../types/report';
import createGroup from './Group';

const sortingIndicator = (sorter: Sorting) =>
    sorter == Sorting.Asc ? <span className="glyphicon glyphicon-chevron-up"></span> :
        sorter == Sorting.Desc ? <span className="glyphicon glyphicon-chevron-down"></span> :
            null;

function header(report: Report, sorter: SortingCallback) {
    const width = (100 / report.columns.length) + '%';
    return (<tr>
        {report.columns.map((c, i) => <th className="text-center" style={{ width }}
            key={i}
            onClick={() => sorter(i)}>{c.name}{sortingIndicator(c.sorted)}</th>)}
    </tr>);
}

type SortingCallback = (index: number) => void;
type GroupCollapse = (group: Group) => void;

export default (props: { report: Report, onSort: SortingCallback, onGroupCollapse: GroupCollapse, removeGroup: GroupCollapse }) => (
    <table className="table">
        <thead>
            {header(props.report, props.onSort)}
        </thead>
        <tbody>
            {props.report.groups.map(g => createGroup(g, props.onGroupCollapse, props.removeGroup))}
        </tbody>
    </table>
);