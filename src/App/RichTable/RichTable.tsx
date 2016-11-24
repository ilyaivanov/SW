import * as React from 'react';

function group(group: Group) {
    return [
        (<tr className="group-title">
            <td>{group.name}</td>
            <td><small>wgt</small></td>
            <td><small>wgt</small></td>
            <td><small>wgt</small></td>
        </tr>),
        (
            [group.answers.map((a, i) => (
                <tr key={i} className="subgroup">
                    {a.values.map((v, si) => <td key={si}>{v}</td>)}
                </tr>
            )),
            (<tr>
                <td><b>Footer</b></td>
                {group.footer.map((v, si) => <td key={si}><b>{v}</b></td>)}
            </tr>)
            ]

        )
    ];
}

const sortingIndicator = (sorter: 'asc' | 'desc' | null) =>
    sorter == 'asc' ? <span className="glyphicon glyphicon-chevron-up"></span> :
        sorter == 'desc' ? <span className="glyphicon glyphicon-chevron-down"></span> :
            null;

function header(report: Report, sorter: Sorter) {
    const width = (100 / report.columns.length)+'%';
    return (<tr>
        {report.columns.map((c, i) => <th style={{width}} key={i} onClick={() => sorter(i)}>{c.name}{sortingIndicator(c.sorted)}</th>)}
    </tr>);
}

type Sorter = (index: number) => void;

export default (props: { report: Report, onSort: Sorter }) => (
    <table className="table">
        <thead>
            {header(props.report, props.onSort)}
        </thead>
        <tbody>
            {props.report.groups.map(group)}
        </tbody>
    </table>
);