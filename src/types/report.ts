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

    footer: number[]
    answers: Answers[]
}
export interface Answers {
    initialOrder: number
    values: (string | number)[]
}

export interface ColumnInfo {
    name: string
    sorted: Sorting
}
