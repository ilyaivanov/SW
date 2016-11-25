import * as React from 'react';
import * as cx from 'classnames';

import { Group, Report, Sorting } from '../../types/report';

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
    const formatNumber = (cell: number) => splitedCell((cell % 2 == 0 ? cell + '' : '13,659'), '0%', true);
    const cell: React.ReactElement<{}> = (typeof cellInfo == 'string') ? <div>{cellInfo}</div> : formatNumber(cellInfo);
    return (
        <td key={index}>
            {cell}
        </td>
    );
}

const labels = group => group.footer.map(() => <td>{splitedCell('wgt', 'cnt', false)}</td>);

export default function createGroup(group: Group, onGroupCollapse, removeGroup) {
    const style = group.isCollapsed ? { display: 'none' } : {};
    return [
        (
            <tr className="group-title">
                <td>{collapsed(group.isCollapsed, () => onGroupCollapse(group))}
                    {group.name}
                    <span onClick={() => removeGroup(group)} className="glyphicon glyphicon-remove"></span>
                </td>
                {labels(group)}
            </tr>
        ),
        (
            [
                group.answers.map((a, i) => (
                    <tr key={i} className="subgroup" style={style}>
                        {a.values.map(cell)}
                    </tr>
                )),
                (
                    <tr style={style}>
                        <td><b>Footer</b></td>
                        {group.footer.map(cell)}
                    </tr>
                )
            ]
        )
    ];
}