import {  removeColumn, swapColumns } from './operations';
import createReport from './report';
import { Answers, Report } from './../../types/report';

describe('when removing a column by index', () => {
    it('should be remove from report', () => {
        const report: Report = createReport(2,2);
        
        expect(report.columns.map(c => c.name)).toEqual(['Name', 'Category A', 'Category B', 'Total']);
        expect(report.groups[0].answers[0].values.length).toBe(4);
        expect(report.groups[0].footer.length).toBe(3);

        const newReport = removeColumn(report, 1);

        expect(report.columns.map(c => c.name)).toEqual(['Name', 'Category B', 'Total']);
        expect(report.groups[0].answers[0].values.length).toBe(3);
        expect(report.groups[0].footer.length).toBe(2);
    })
})
