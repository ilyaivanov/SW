import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import * as _ from 'lodash';

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	margin: '.5rem',
	backgroundColor: 'white',
	cursor: 'move'
};

class Card extends React.Component<{}, {}> {

	render() {
		const { card, isDragging, connectDragSource, connectDropTarget } = this.props;
		// const opacity = isDragging ? 0 : 1;
		const opacity = isDragging ? 0 : 1;
		return connectDragSource(connectDropTarget(
			<div style={_.assign({}, style, {opacity})}>
				{card.text}
			</div>
		));
	}
}

const cardSource = {

	beginDrag(props) {
		return {
			index: props.index,
			listId: props.listId,
			card: props.card
		};
	},

	endDrag(props, monitor) {
		// const item = monitor.getItem();
		// const dropResult = monitor.getDropResult();

		// if (dropResult && dropResult.listId !== item.listId) {
		// 	props.removeCard(item.index);
		// }
	}
};

const cardTarget = {

	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		const sourceListId = monitor.getItem().listId;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientX = clientOffset.X - hoverBoundingRect.left;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		// if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
		// 	return;
		// }

		// Dragging upwards
		// if (dragIndex > hoverIndex && hoverClientX < hoverMiddleX) {
		// 	return;
		// }

		// Time to actually perform the action
		if (props.listId === sourceListId) {
			props.moveCard(dragIndex, hoverIndex);

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
		}
	}
};

export default _.flow(
	DropTarget("CARD", cardTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("CARD", cardSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(Card);