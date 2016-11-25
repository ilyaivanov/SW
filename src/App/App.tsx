import * as React from 'react';
import * as _ from 'lodash';

import RichTable from './RichTable/RichTable';
import createReport, { sort, toggleCollapsed, removeGroup } from './model/report';

import { Report } from '../types/report';

import './style.scss';


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
    return <RichTable
      report={this.state.report}
      onSort={this.sort}
      onGroupCollapse={this.toggle} 
      removeGroup={this.remove} />
  }
}