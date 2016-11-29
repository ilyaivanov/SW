import * as React from 'react';
import * as _ from 'lodash';
import Card from './Header';
import { DropTarget } from 'react-dnd';

class Container extends React.Component<{}, { cards: Card[] }> {

	constructor(props) {
		super(props);
		this.state = { cards: props.list };
	}

	pushCard(card) {
		this.state.cards.push(card);
		this.forceUpdate();
	}

	removeCard(index) {
		this.state.cards.splice(index, 1);
		this.forceUpdate();
	}

	moveCard(dragIndex, hoverIndex) {
		const { cards } = this.state;
		const dragCard = cards[dragIndex];
		this.state.cards.splice(dragIndex, 1);
		this.state.cards.splice(hoverIndex, 0, dragCard);
		this.forceUpdate();
	}

	render() {
		const { cards } = this.state;
		const { canDrop, isOver, connectDropTarget } = this.props;
		const isActive = canDrop && isOver;

		return connectDropTarget(
			<tr>
				{cards.map((card, i) => {
					return (
						<Card
							key={card.id}
							index={i}
							listId={this.props.id}
							card={card}
							removeCard={this.removeCard.bind(this)}
							moveCard={this.moveCard.bind(this)} />
					);
				})}
			</tr>
		);
	}
}

const cardTarget = {
	drop(props, monitor, component) {
		const { id } = props;
		const sourceObj = monitor.getItem();
		if (id !== sourceObj.listId) component.pushCard(sourceObj.card);
		return {
			listId: id
		};
	}
}

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(Container);