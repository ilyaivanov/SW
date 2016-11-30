import * as React from 'react';
import * as _ from 'lodash';
import Header from './Header';
import { DropTarget } from 'react-dnd';

class Container extends React.Component<{ list: any, connectDropTarget: Function, moveCard: Function }, { cards: Card[] }> {

	constructor(props) {
		super(props);
		this.state = { cards: props.list };
	}

	componentWillReceiveProps(newProps) {
		this.setState({ cards: newProps.list })
	}

	//extract moveCard to App.tsx
	moveCard(dragIndex, hoverIndex) {
		const { cards } = this.state;
		const dragCard = cards[dragIndex];
		this.state.cards.splice(dragIndex, 1);
		this.state.cards.splice(hoverIndex, 0, dragCard);
		this.forceUpdate();
	}

	render() {
		const { cards } = this.state;
		const width = (100 / cards.length) + '%';
		return <tr>
			{cards.map((card, i) => {
				return (
					<Header
						key={card.id}
						width={width}
						subnode={card.element}
						index={i}
						card={card}
						moveCard={this.moveCard.bind(this)} />
				);
			})}
		</tr>;
	}
}

export default Container;