import * as _ from 'lodash';
import { Cell, ColumnInfo, Sorting, Report, Group, Answers } from '../types/report';

//Utils
const start = 'A'.charCodeAt(0);
const charFromIndex = index => String.fromCharCode(start + index);
const randomInteger = max => Math.floor(Math.random() * max);

const integersFromZero = (length: number) => _.range(0, length);
//end of Utils

const getNumericCells = (cells: (string | Cell)[]) => cells.filter(v => typeof v != 'string') as Cell[];

const column = (name: string): ColumnInfo => ({ name, sorted: Sorting.None })
const cell = (v: number): Cell => ({ v, p: 0 });

const answer = (initialOrder, values) => ({ initialOrder, values });

const createAnswers = (answerIndex: number, numberOfCells: number): Answers => {
    let cells = _.range(0, numberOfCells).map(i => cell(randomInteger(1000)));
    return answer(answerIndex, [`Answer ${answerIndex}`].concat(cells as any));
}

const rowisePercent = (cells: Cell[]) => {
    let total = cells[cells.length - 1].v;
    cells.forEach(c => c.p = c.v / total);
}

const footer = (answers: Answers[]): Cell[] => {
    const footer = [];
    const add = (arrays) => _.zipWith(...arrays, (...numbers) => ({ v: _.sum(numbers), p: 0 })) as Cell[];
    const cells = answers.map(a => getNumericCells(a.values).map(c => c.v));
    let c = add(cells);
    rowisePercent(c);
    return c;
}

const totals = (answers: Answers[]) => {
    answers.forEach(answer => {
        const total = _.sum(getNumericCells(answer.values).map(c => c.v))
        answer.values.push({ v: total, p: 0 })
        rowisePercent(getNumericCells(answer.values));
    });
    return answers;
}

export const group = (name, answers: Answers[]): Group => ({
    name,
    isCollapsed: false,
    answers: totals(answers),
    footer: footer(answers)
});

const generateGroup = (questionIndex: number, width: number) => {
    let indices = _.range(1, randomInteger(7) + 3);
    let answers = indices.map(i => createAnswers(i, width));
    return group(`Question ${charFromIndex(questionIndex)}`, answers)
}


const createReport = (numberOfRows: number, numberOfColumns: number): Report => {
    let columns = integersFromZero(numberOfColumns).map(i => column(`Category ${charFromIndex(i)}`));
    columns = [column('Name')].concat(columns).concat([column('Total')]);
    let groups = integersFromZero(numberOfRows).map(i => generateGroup(i, numberOfColumns));
    return { columns, groups };
}

export default createReport;
