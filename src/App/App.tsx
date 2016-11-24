import * as React from 'react';

import * as _ from 'lodash';

import RichTable from './RichTable/RichTable';

import './style.scss';

const row = (name: string, count: number, initialOrder: number) => ({
  initialOrder,
  values: _.flatten<string | number>([name, _.map(Array(count), () => Math.floor(Math.random() * 100))])
});

const createGroup = (name, columns: number) => ({
  name,

  answers: [
    row('Some freak', columns, 0),
    row('Ex', columns, 1),
    row('Married', columns, 2),
    row('Single', columns, 3),
  ],
  footer: [8, 10, 18]
})

const column = name => ({ name, sorted: null })

const report: Report = {
  columns: [column('Name'), column('Acura'), column('BMW'), column('Total')],
  groups: [
    createGroup('Gender', 3),
    createGroup('Marital Status', 3)
  ]
}
export default class App extends React.Component<{}, { report: Report }>{
  constructor(props) {
    super(props);
    this.state = { report }
  }

  sort = (columnIndex: number) => {
    let currentColumn = this.state.report.columns[columnIndex];
    if (currentColumn.sorted) {
      if (currentColumn.sorted == 'asc') {
        this.state.report.columns.forEach(c => c.sorted = null);
        currentColumn.sorted = 'desc';
      } else {
        this.state.report.columns.forEach(c => c.sorted = null);
      }
    }
    else {
      this.state.report.columns.forEach(c => c.sorted = null);
      currentColumn.sorted = 'asc';
    }

    this.state.report.groups.forEach(g => {
      if (currentColumn.sorted)
        g.answers = _.orderBy(g.answers, (x:Answers) => x.values[columnIndex]);
      else
        g.answers = _.orderBy(g.answers, (x:Answers) => x.initialOrder);
      if (currentColumn.sorted === 'desc')
        g.answers = _.reverse(g.answers);

    });

    this.forceUpdate();
  }
  render() {
    return <RichTable report={this.state.report} onSort={this.sort} />
  }
}