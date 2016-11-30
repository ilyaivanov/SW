import * as React from 'react';
import * as _ from 'lodash';
import { NotificationStack } from 'react-notification';

import RichTable from './RichTable/RichTable';
import DragableHeaders from './sortable-target/DragableHeaders';
import Menu from './Menu';

import createReport from './model/report';
import { removeColumn, sort, toggleCollapsed, removeGroup, swapColumns } from './model/operations';
import createHeaders from './summary/headers';

import { Report, Group } from './types/report';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './styles/styles.scss';

interface State { report: Report, notifications: any[], newNotificationId: number }

export default class App extends React.Component<{}, State>{

  addNotification(message) {
    const newCount = this.state.newNotificationId + 1;
    this.setState({
      notifications: this.state.notifications.concat([{
        message,
        key: newCount,
        report: _.cloneDeep(this.state.report),
        action: 'UNDO',
        onClick: () => this.revertToNotificationState(newCount),
        dismissAfter: 10000
      }]),
      newNotificationId: newCount
    } as State);
  }

  revertToNotificationState(id) {
    const notification = this.state.notifications.filter(n => n.key === id)[0];
    this.setState({ report: notification.report } as State);
    this.setState({ notifications: _.takeWhile(this.state.notifications, n => n.key !== id) } as State);
  }

  dismissNotificaiton(id) {
    this.setState({ notifications: this.state.notifications.filter(n => n.key !== id) } as State);
  }

  constructor(props) {
    super(props);
    this.state = { report: createReport(3, 3), notifications: [], newNotificationId: 0 }
  }

  sort = (columnIndex: number) => {
    this.setState({ report: sort(this.state.report, columnIndex) } as State);
  }


  toggle = (group) =>
    this.setState({ report: toggleCollapsed(this.state.report, group) } as State);


  remove = (group: Group) => {
    this.addNotification(`${group.name} removed`);
    this.setState({ report: removeGroup(this.state.report, group) } as State);
  }


  removeColumn = (index) => {
    const header = this.state.report.columns[index];
    this.addNotification(`${header.name} removed`);
    this.setState({ report: removeColumn(this.state.report, index) } as State);
  }

  swapColumns = (firstIndex, secondIndex) => {

    this.setState({ report: swapColumns(this.state.report, firstIndex, secondIndex) } as State);

  }

  render() {
    const headers = createHeaders(this.state.report, this.sort, this.removeColumn);
    const dragabbleHeaders = <DragableHeaders headers={headers} moveCard={this.swapColumns} />;
    return (
      <div>
        <div>
          <Menu />
          <RichTable
            report={this.state.report}
            headers={dragabbleHeaders}
            onGroupCollapse={this.toggle}
            removeGroup={this.remove} />

        </div>
        <NotificationStack
          notifications={this.state.notifications}
          onDismiss={notification => this.dismissNotificaiton(notification.key)}
          />
      </div>
    )
  }
}