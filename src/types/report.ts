export enum Sorting {
    Asc,
    Desc,
    None
}
export interface Report {
    groups: Group[]
    columns: ColumnInfo[]
}
export interface Group {
    name: string
    isCollapsed: boolean

    footer: Cell[]
    answers: Answers[]
}
export interface Answers {
    initialOrder: number
    values: (string | Cell)[]
}

export interface ColumnInfo {
    name: string
    sorted: Sorting
}
export class Cell {
    v: number
    p: number
}

//models to create:
// report creating spec (simple pojo with initial values)
// report itself (pojo, with totals, percents, etc)
// report view model (with react elements and callbacks set)