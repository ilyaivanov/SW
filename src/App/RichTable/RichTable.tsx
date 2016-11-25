import * as React from 'react';
import * as cx from 'classnames';

import { Group, Report, SortingIndicator } from '../../types/report';

const collapsed = (isCollapsed, onGroupCollapse) => isCollapsed ?
    <span onClick={onGroupCollapse} className="glyphicon glyphicon-plus"></span> :
    <span onClick={onGroupCollapse} className="glyphicon glyphicon-minus"></span>;

const splitedCell = (leftValue, rightValue, bordered) => (
    <div className="wrapper">
        <span className={cx('firstCell', { borderedCell: bordered })}>{leftValue}</span>
        <span className="secondCell">{rightValue}</span>
    </div>
);

const cell = (cellInfo: string | number, index: number) => {
    const formatNumber = (cell: number) => splitedCell((cell % 2 == 0 ? cell + '' : '13,659'), '69%', true);
    const cell: React.ReactElement<{}> = (typeof cellInfo == 'string') ? <div>{cellInfo}</div> : formatNumber(cellInfo);
    return (
        <td key={index}>
            {cell}
        </td>
    );
}

function group(group: Group, onGroupCollapse, removeGroup) {

    const style = group.isCollapsed ? { display: 'none' } : {};
    return [
        (<tr className="group-title">
            <td>{collapsed(group.isCollapsed, () => onGroupCollapse(group))}
                {group.name}
                <span onClick={() => removeGroup(group)} className="glyphicon glyphicon-remove"></span>
            </td>
            <td>{splitedCell('wgt', 'cnt', false)}</td>
            <td>{splitedCell('wgt', 'cnt', false)}</td>
            <td>{splitedCell('wgt', 'cnt', false)}</td>
        </tr>),
        (
            [group.answers.map((a, i) => (
                <tr key={i} className="subgroup" style={style}>
                    {a.values.map(cell)}
                </tr>
            )),
            (<tr style={style}>
                <td><b>Footer</b></td>
                {group.footer.map(cell)}
            </tr>)
            ]
        )
    ];
}
//TODO: extract 'Footer' as param

const sortingIndicator = (sorter: SortingIndicator) =>
    sorter == SortingIndicator.Asc ? <span className="glyphicon glyphicon-chevron-up"></span> :
        sorter == SortingIndicator.Desc ? <span className="glyphicon glyphicon-chevron-down"></span> :
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
            {props.report.groups.map(g => group(g, props.onGroupCollapse, props.removeGroup))}
        </tbody>
    </table>
);