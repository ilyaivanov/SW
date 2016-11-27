import * as _ from 'lodash';
import { Answers, Report } from '../../types/report';

import createReport, { group as createGroup } from './report';

describe('When creating a report', () => {
    it('totals should be calculated correctly', () => {
        const answers: Answers[] = [
            {
                initialOrder: 1,
                values: ['Male', { v: 50, p: 0 }, { v: 150, p: 0 }]
            },
            {
                initialOrder: 2,
                values: ['Female', { v: 90, p: 0 }, { v: 10, p: 0 }]
            }
        ];
        const group = createGroup('_', answers);
        expect(group.answers[0].values)
            .toEqual(['Male', { v: 50, p: 0.25 }, { v: 150, p: 0.75 }, { v: 200, p: 1 }]);

        expect(group.answers[1].values)
            .toEqual(['Female', { v: 90, p: 0.9 }, { v: 10, p: 0.1 }, { v: 100, p: 1 }]);
        expect(group.footer).toEqual([
            { v: 140, p: 0.4666666666666667 },
            { v: 160, p: 1 - 0.4666666666666667 },
            { v: 300, p: 1 }]);
    })
})


