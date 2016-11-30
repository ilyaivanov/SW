import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';

class DragableHeaders extends React.Component<{ headers: any, moveCard:Function }, {}> {
	render() {
		var headersInfo = this.props.headers.map((element, id) => ({ element, id }));
		return (
			<Container list={headersInfo} moveCard={this.props.moveCard}/>
		);
	}
}

export default DragDropContext(HTML5Backend)(DragableHeaders);