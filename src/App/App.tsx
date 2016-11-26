import * as React from 'react';
import RichTable from './RichTable/RichTable';
import createReport, { sort, toggleCollapsed, removeGroup } from './model/report';
import { Group, Report, Sorting } from '../types/report';

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

  headers = () => {

  }

  render() {
    return (
      <div>
        {navBar()}
        <h2>Summary</h2>
        <RichTable
          report={this.state.report}
          headers={header(this.state.report, this.sort)}
          onGroupCollapse={this.toggle}
          removeGroup={this.remove} />
      </div>
    )
  }
}
function header(report: Report, sorter: Function) {
  const sortingIndicator = (sorter: Sorting) =>
    sorter == Sorting.Asc ? <span className="glyphicon glyphicon-chevron-up"></span> :
      sorter == Sorting.Desc ? <span className="glyphicon glyphicon-chevron-down"></span> :
        null;

  const width = (100 / report.columns.length) + '%';
  return (<tr>
    {report.columns.map((c, i) => <th className="text-center" style={{ width }}
      key={i}>
      <span className="column-title" onClick={() => sorter(i)}>{c.name}</span>
      {sortingIndicator(c.sorted)}
      {(i != 0 && i != report.columns.length - 1) ? <span className="glyphicon glyphicon-remove text-danger"></span> : null}
    </th>)}
  </tr>);
}

function navBar() {
  return (<nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">SW Prototype</a>
      </div>

      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li ><a href="#">Details</a></li>
          <li className="active"><a href="#">Summary</a></li>
        </ul>
      </div>
    </div>
  </nav>);
}