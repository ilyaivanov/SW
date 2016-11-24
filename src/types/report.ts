interface Report {
    groups: Group[]
    columns: ColumnInfo[]
}
interface Group {
    name: string

    footer: number[]
    answers: Answers[]
}
interface Answers{
    initialOrder:number
    values: (string | number)[]
}

interface ColumnInfo {
    name: string
    sorted: 'asc' | 'desc' | null
}