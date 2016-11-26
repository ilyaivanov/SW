import * as React from 'react';

import { Group, Report, Sorting } from '../../types/report';
import createGroup from './Group';


type GroupAction = (group: Group) => void;

export default (props: { report: Report, headers:any, onGroupCollapse: GroupAction, removeGroup: GroupAction }) => (
    <table className="table">
        <thead>
            {props.headers}
        </thead>
        <tbody>
            {props.report.groups.map(g => createGroup(g, props.onGroupCollapse, props.removeGroup))}
        </tbody>
    </table>
);