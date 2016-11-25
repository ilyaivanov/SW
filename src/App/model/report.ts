import * as _ from 'lodash';
import {SortingIndicator, Report, Group, Answers} from '../../types/report'; 

const row = (name: string, count: number, initialOrder: number) => ({
    initialOrder,
    values: _.flatten<string | number>([name, _.map(Array(count), () => Math.floor(Math.random() * 100))])
});

const createGroup = (name, columns: number) => ({
    name,
    isCollapsed: false,
    answers: [
        row('Some freak', columns, 0),
        row('Ex', columns, 1),
        row('Married', columns, 2),
        row('Single', columns, 3),
    ],
    footer: [8, 100, 180]
})

const column = name => ({ name, sorted: SortingIndicator.None })



export default function createReport(): Report {
    return {
        columns: [column('Name'), column('Acura'), column('BMW'), column('Total')],
        groups: [
            createGroup('Gender', 3),
            createGroup('Marital Status', 3)
        ]
    };
}

export function sort(report: Report, columnIndex: number) {
    let currentColumn = report.columns[columnIndex];

    if (currentColumn.sorted == SortingIndicator.Asc) {
        report.columns.forEach(c => c.sorted = SortingIndicator.None);
        currentColumn.sorted = SortingIndicator.Desc;
    } else if (currentColumn.sorted == SortingIndicator.Desc) {
        report.columns.forEach(c => c.sorted = SortingIndicator.None);
    } else {
        report.columns.forEach(c => c.sorted = SortingIndicator.None);
        currentColumn.sorted = SortingIndicator.Asc;
    }

    report.groups.forEach(g => {
        if (currentColumn.sorted == SortingIndicator.None)
            g.answers = _.orderBy(g.answers, (x: Answers) => x.initialOrder);
        else
            g.answers = _.orderBy(g.answers, (x: Answers) => x.values[columnIndex]);

        if (currentColumn.sorted === SortingIndicator.Desc)
            g.answers = _.reverse(g.answers);
    });
    return report;
}

export function toggleCollapsed(report: Report, group: Group){
    group.isCollapsed = !group.isCollapsed;
    return report;
}


export function removeGroup(report:Report, group: Group){
    report.groups = report.groups.filter(g => g != group);
    return report;
}