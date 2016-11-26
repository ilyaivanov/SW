import * as _ from 'lodash';
import { Cell, Sorting, Report, Group, Answers } from '../../types/report';


//Utils
const start = 'A'.charCodeAt(0);
const charFromIndex = index => String.fromCharCode(start + index);
const randomInteger = max => Math.floor(Math.random() * max);

const integersFromZero = (length: number) => _.range(0, length);



const column = name => ({ name, sorted: Sorting.None })

const answer = (initialOrder, values) => ({ initialOrder, values });
function generateGroup(questionIndex: number, width: number) {
    let indices = _.range(1, randomInteger(11));
    let answers = indices.map(i => {
        let cells = _.range(0, width).map(i => ({ v: randomInteger(1000), p: 0 }));
        return answer(i, [`Answer ${i}`].concat(cells as any));
    });
    return createGroup(`Question ${charFromIndex(questionIndex)}`, answers)
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

function footer(answers: Answers[]): Cell[] {
    const footer = [];
    const add = (arrays) => _.zipWith(...arrays, (...numbers) => ({ v: _.sum(numbers), p: 1 })) as Cell[];
    const cells = answers.map(a => a.values.filter(v => typeof v != 'string').map((c: Cell) => c.v));
    let c = add(cells);
    percent(c);
    return c;
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

export default function createReport(numberOfRows: number, numberOfColumns: number): Report {
    let columns = integersFromZero(numberOfColumns).map(i => column(`Category ${charFromIndex(i)}`));
    columns = [column('Name')].concat(columns).concat([column('Total')]);
    let groups = integersFromZero(numberOfRows).map(i => generateGroup(i, numberOfColumns));
    return { columns, groups };
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