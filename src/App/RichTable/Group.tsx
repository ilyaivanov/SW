import * as React from 'react';
import * as cx from 'classnames';

import { Cell, Group, Report, Sorting } from '../../types/report';

const collapsed = (isCollapsed) => isCollapsed ?
    <span className="glyphicon glyphicon-plus-sign"></span> :
    <span className="glyphicon glyphicon-minus-sign"></span>;

const splitedCell = (leftValue, rightValue, bordered) => (
    <div className="wrapper">
        <span className={cx('firstCell', { borderedCell: bordered })}>{leftValue}</span>
        <span className="secondCell">{rightValue}</span>
    </div>
);

const cell = (cellInfo: string | Cell, index: number) => {
    const cell = (typeof cellInfo == 'string') ?
        <div>{cellInfo}</div> :
        splitedCell(cellInfo.v, (cellInfo.p*100).toFixed(0)+'%', true);
    return (
        <td key={index}>
            {cell}
        </td>
    );
}

const labels = group => group.footer.map(() => <td>{splitedCell('wgt', 'cnt', false)}</td>);

export default function createGroup(group: Group, onGroupCollapse, removeGroup) {
    const collapsedStyle = group.isCollapsed ? { display: 'none' } : {};
    return [
        (
            <tr className="group-title" onClick={() => onGroupCollapse(group)}>
                <td>{collapsed(group.isCollapsed )}
                    {group.name}
                    <span onClick={() => removeGroup(group)} className="glyphicon glyphicon-remove"></span>
                </td>
                {labels(group)}
            </tr>
        ),
        (
            [
                group.answers.map((a, i) => (
                    <tr key={i} className="subgroup" style={collapsedStyle}>
                        {a.values.map(cell)}
                    </tr>
                )),
                (
                    <tr>
                        <td><b>Footer</b></td>
                        {group.footer.map(cell)}
                    </tr>
                )
            ]
        )
    ];
}