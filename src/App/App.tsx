import * as React from 'react';
import * as _ from 'lodash';

import RichTable from './RichTable/RichTable';
import createReport, { sort } from './model/report';

import { Report } from '../types/report';

import './style.scss';


export default class App extends React.Component<{}, { report: Report }>{
  constructor(props) {
    super(props);
    this.state = { report: createReport() }
  }

  sort = (columnIndex: number) => {
    this.setState({ report: sort(this.state.report, columnIndex)});
  }
  render() {
    return <RichTable report={this.state.report} onSort={this.sort} />
  }
}