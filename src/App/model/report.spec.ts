import * as _ from 'lodash';
import { Answers } from '../../types/report';

import { calculateTotals } from './report';

describe('foo', () => {
    it('bar', () => {
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
    
})