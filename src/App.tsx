import * as React from 'react';
import { NotificationStack } from 'react-notification';

import RichTable from './RichTable/RichTable';
import DragableHeaders from './sortable-target/DragableHeaders';
import Menu from './Menu';

import createReport from './model/report';
import { removeColumn, sort, toggleCollapsed, removeGroup, swapColumns } from './model/operations';
import createHeaders from './summary/headers';

import { Report } from './types/report';

import './styles/bootstrap-isolated.scss';
import './styles/styles.scss';

interface State { report: Report, notifications: any[], newNotificationId: number }

export default class App extends React.Component<{}, State>{

  // addNotification(message, isError) {
  //   const newCount = this.state.newNotificationId + 1;
  //   return this.setState({
  //     notifications: this.state.notifications.concat([{
  //       message,
  //       key: newCount,
  //       className: isError ? "error-notification" : "",
  //       action: 'Dismiss',
  //       onClick: () => this.removeNotification(newCount),
  //       dismissAfter: 4000
  //     }]),
  //     newNotificationId: newCount
  //   });
  // }

  // removeNotification(id) {
  //   this.setState({ notifications: this.state.notifications.filter(n => n.key !== id) });
  // }


  constructor(props) {
    super(props);
    this.state = { report: createReport(3, 3), notifications: [], newNotificationId: 0 }
  }

  sort = (columnIndex: number) => {
    console.log('sort')
    // this.addNotification('SwappedColumns', false);
    this.setState({ report: sort(this.state.report, columnIndex) });
  }


  toggle = (group) =>
    this.setState({ report: toggleCollapsed(this.state.report, group) });


  remove = (group) =>
    this.setState({ report: removeGroup(this.state.report, group) });


  removeColumn = (index) =>
    this.setState({ report: removeColumn(this.state.report, index) });

  swapColumns = (firstIndex, secondIndex) => {

    this.setState({ report: swapColumns(this.state.report, firstIndex, secondIndex) });

  }

  render() {
    const headers = createHeaders(this.state.report, this.sort, this.removeColumn);
    const dragabbleHeaders = <DragableHeaders headers={headers} moveCard={this.swapColumns} />;
    return (
      <div className="bootstrap-context">
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