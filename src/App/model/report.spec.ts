import * as _ from 'lodash';
import { Answers } from '../../types/report';

import createReport, { calculateTotals } from './report';

describe('When creating a report', () => {
    it('totals should be calculated correctly', () => {
        const answers: Answers[] = [
            {
                initialOrder: 1,
                values: ['Male', 50, 10]
            },
            {
                initialOrder: 2,
                values: ['Female', 500, 100]
            }
        ];
        const group = calculateTotals('_', answers);
        expect(group.answers[0].values).toEqual(['Male', 50, 10, 60]);
        expect(group.answers[1].values).toEqual(['Female', 500, 100, 600]);
        expect(group.footer).toEqual([550, 110, 660]);
    })

    it('Gender structure should be correct', () => {
        const report = createReport();

        expect(report.columns.length).toBe(4);

        expect(report.groups[0]).toEqual({
            name: 'Gender',
            isCollapsed: false,
            answers: [
                {
                    initialOrder: 1,
                    values: ['Male', 1700, 130, 1830]
                },
                {
                    initialOrder: 2,
                    values: ['Female', 560, 160, 720]
                },
            ],
            footer: [2260, 290, 2550]
        })

    })

})