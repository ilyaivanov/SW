import * as _ from 'lodash';
import { Cell, ColumnInfo, Sorting, Report, Group, Answers } from '../../types/report';

export function sort(report: Report, columnIndex: number) {
    let currentColumn = report.columns[columnIndex];
    let currentSortingOrder = currentColumn.sorted;

    report.columns.forEach(c => c.sorted = Sorting.None);

    if (currentSortingOrder == Sorting.Asc) {
        currentColumn.sorted = Sorting.Desc;
    } else if (currentSortingOrder == Sorting.None) {
        currentColumn.sorted = Sorting.Asc;
    }

    report.groups.forEach(g => {
        if (currentColumn.sorted == Sorting.None)
            g.answers = _.orderBy(g.answers, (x: Answers) => x.initialOrder);
        else {
            const predicate = (cell: (string | Cell)) => typeof cell == 'string' ? cell : cell.v;
            g.answers = _.orderBy(g.answers, (x: Answers) => predicate(x.values[columnIndex]));
        }

        if (currentColumn.sorted == Sorting.Desc)
            g.answers = _.reverse(g.answers);
    });
    return report;
}

export function toggleCollapsed(report: Report, group: Group) {
    group.isCollapsed = !group.isCollapsed;
    return report;
}


export function removeGroup(report: Report, group: Group) {
    report.groups = report.groups.filter(g => g != group);
    return report;
}


export function removeColumn(report: Report, columnIndex: number) {
    report.columns.splice(columnIndex, 1)

    report.groups.forEach(g => {
        g.answers.forEach(a => {
            a.values.splice(columnIndex, 1);
        })
        g.footer.splice(columnIndex - 1, 1);
    })
    return report;
}