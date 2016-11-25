import * as _ from 'lodash';
import { SortingIndicator, Report, Group, Answers } from '../../types/report';

const answer = (initialOrder, values) => ({ initialOrder, values });

const createGroup = (name) => {
    let answers: Answers[];
    if (name == 'Gender')
        return calculateTotals(name, [
            answer(1, ['Male', 1700, 130]),
            answer(2, ['Female', 560, 160]),
        ])
    else
        return calculateTotals(name, [
            answer(1, ['Married', 1700, 130]),
            answer(2, ['Single', 560, 160]),
            answer(3, ['Other', 550, 180]),
            answer(4, ['Partened', 530, 140]),
        ]);
}

const column = name => ({ name, sorted: SortingIndicator.None })

export default function createReport(): Report {
    return {
        columns: [column('Name'), column('Acura'), column('BMW'), column('Total')],
        groups: [
            createGroup('Gender'),
            createGroup('Marital Status')
        ]
    };
}

function getAnswersWithTotal(answers: Answers[]) {
    answers.forEach(answer => {
        answer.values.push(_.sum(answer.values.filter(v => typeof v == 'number')))
    });
    return answers;
}
function footer(answers: Answers[]): number[] {
    const footer = [];
    const add = (arrays) => _.zipWith(...arrays, (...numbers) => _.sum(numbers)) as number[];
    const numbers = answers.map(a => a.values.filter(v => typeof v == 'number'));
    return add(numbers);
}

export function calculateTotals(name, answers: Answers[]): Group {
    return {
        name,
        isCollapsed: false,
        answers: getAnswersWithTotal(answers),
        footer: footer(answers)
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

export function toggleCollapsed(report: Report, group: Group) {
    group.isCollapsed = !group.isCollapsed;
    return report;
}


export function removeGroup(report: Report, group: Group) {
    report.groups = report.groups.filter(g => g != group);
    return report;
}
