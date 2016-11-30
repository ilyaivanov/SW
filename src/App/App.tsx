import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import RichTable from './RichTable/RichTable';

import Container from '../sortable-target/Container';

import createReport from './model/report';
import DragableHeaders from '../sortable-target/DragableHeaders';
import { removeColumn, sort, toggleCollapsed, removeGroup, swapColumns } from './sumary/operations';

import { Group, Report, Sorting } from '../types/report';
import Menu from './Menu';

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

  swapColumns = (firstIndex, secondIndex) => {
    const columns = this.state.report.columns;
    const dragCard = columns[firstIndex];
    columns.splice(firstIndex, 1);
    columns.splice(secondIndex, 0, dragCard);
    this.forceUpdate();

    this.setState({ report: swapColumns(this.state.report, firstIndex, secondIndex) });
  }

  render() {
    const header1res = header1(this.state.report, this.sort, this.removeColumn);
    const cDropd = <DragableHeaders headers={header1res} moveCard={this.swapColumns} />;
    return (
      <div>
        <Menu />
        <RichTable
          report={this.state.report}
          headers={cDropd}
          onGroupCollapse={this.toggle}
          removeGroup={this.remove} />
      </div>
    )
  }
}
function header1(report: Report, sorter: Function, removeColumn: Function) {
  const sortingIndicator = (sorter: Sorting) =>
    sorter == Sorting.Asc ? <span className="glyphicon glyphicon-chevron-up"></span> :
      sorter == Sorting.Desc ? <span className="glyphicon glyphicon-chevron-down"></span> :
        null;

  return report.columns.map((c, i) => <span
    key={i}>
    <span className="column-title" onClick={() => sorter(i)}>{c.name}</span>
    {sortingIndicator(c.sorted)}
    {(i != 0 && i != report.columns.length - 1) ? <span className="glyphicon glyphicon-remove text-danger" onClick={() => removeColumn(i)}></span> : null}
  </span>);
}

