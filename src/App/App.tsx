import * as React from 'react';
// import {NotificationStack} from 'react-notification';

import RichTable from './RichTable/RichTable';
import DragableHeaders from '../sortable-target/DragableHeaders';
import Menu from './Menu';

import createReport from './model/report';
import { removeColumn, sort, toggleCollapsed, removeGroup, swapColumns } from './model/operations';
import createHeaders from './summary/headers';

import { Report } from '../types/report';
import './App.scss';

interface State { report: Report }

export default class App extends React.Component<{}, State>{
  constructor(props) {
    super(props);
    this.state = { report: createReport(3, 3) }
  }

  sort = (columnIndex: number) =>
    this.setState({ report: sort(this.state.report, columnIndex) });


  toggle = (group) =>
    this.setState({ report: toggleCollapsed(this.state.report, group) });


  remove = (group) =>
    this.setState({ report: removeGroup(this.state.report, group) });


  removeColumn = (index) =>
    this.setState({ report: removeColumn(this.state.report, index) });

  swapColumns = (firstIndex, secondIndex) =>
    this.setState({ report: swapColumns(this.state.report, firstIndex, secondIndex) });

  render() {
    const headers = createHeaders(this.state.report, this.sort, this.removeColumn);
    const dragabbleHeaders = <DragableHeaders headers={headers} moveCard={this.swapColumns} />;
    return (
      <div>
        <Menu />
        <RichTable
          report={this.state.report}
          headers={dragabbleHeaders}
          onGroupCollapse={this.toggle}
          removeGroup={this.remove} />
      </div>
    )
  }
}