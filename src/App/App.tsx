import * as React from 'react';
import RichTable from './RichTable/RichTable';
import createReport, { sort, toggleCollapsed, removeGroup } from './model/report';

import { Report } from '../types/report';

import './App.scss';


export default class App extends React.Component<{}, { report: Report }>{
  constructor(props) {
    super(props);
    this.state = { report: createReport() }
  }

  sort = (columnIndex: number) => {
    this.setState({ report: sort(this.state.report, columnIndex) });
  }

  toggle = (group) => {
    this.setState({ report: toggleCollapsed(this.state.report, group) });
  }

  remove = (group) => {
    this.setState({ report: removeGroup(this.state.report, group) });
  }

  render() {
    return (
      <div>
        <h2>Summary</h2>
        <RichTable
          report={this.state.report}
          onSort={this.sort}
          onGroupCollapse={this.toggle}
          removeGroup={this.remove} />
      </div>
    )
  }
}