import * as _ from 'lodash';
import { Cell, Sorting, Report, Group, Answers } from '../../types/report';

const answer = (initialOrder, values) => ({ initialOrder, values });

export default function createReport(): Report {
    return {
        columns: [column('Name'), column('Acura'), column('BMW'), column('Total')],
        groups: [
            createGroups('Gender'),
            createGroups('Marital Status')
        ]
    };
}
const column = name => ({ name, sorted: Sorting.None })

const createGroups = (name) => {
    let answers: Answers[];
    if (name == 'Gender')
        return createGroup(name, [
            answer(1, ['Male', { v: 100, p: 0 }, { v: 1740, p: 0 }]),
            answer(2, ['Female', { v: 3700, p: 0 }, { v: 1500, p: 0 }]),
        ])
    else
        return createGroup(name, [
            answer(1, ['Married', { v: 4700, p: 0 }, { v: 1200, p: 0 }]),
            answer(2, ['Single', { v: 8700, p: 0 }, { v: 1400, p: 0 }]),
            answer(3, ['Other', { v: 7600, p: 0 }, { v: 7500, p: 0 }]),
            answer(4, ['Partened', { v: 2700, p: 0 }, { v: 1330, p: 0 }]),
        ]);
}

export function createGroup(name, answers: Answers[]): Group {
    return {
        name,
        isCollapsed: false,
        answers: getAnswersWithTotal(answers),
        footer: footer(answers)
    };
}

function percent(cells: Cell[]) {
    let total = cells[cells.length - 1].v;
    cells.forEach(c => c.p = c.v / total);
}

function getAnswersWithTotal(answers: Answers[]) {
    answers.forEach(answer => {
        let cells = answers => answer.values
            .filter(v => typeof v != 'string') as Cell[];
        const total = _.sum(cells(answers).map((c: Cell) => c.v))
        answer.values.push({ v: total, p: 0 })
        percent(cells(answers));
    });
    return answers;
}
function footer(answers: Answers[]): Cell[] {
    const footer = [];
    const add = (arrays) => _.zipWith(...arrays, (...numbers) => ({ v: _.sum(numbers), p: 1 })) as Cell[];
    const cells = answers.map(a => a.values.filter(v => typeof v != 'string').map((c: Cell) => c.v));
    let c = add(cells);
    percent(c);
    return c;
}




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
