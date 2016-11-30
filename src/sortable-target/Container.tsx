import * as React from 'react';
import * as _ from 'lodash';
import Header from './Header';
import { DropTarget } from 'react-dnd';

class Container extends React.Component<{ list: any, connectDropTarget: Function, moveCard: Function }, { cards: Card[] }> {

	//extract moveCard to App.tsx
	moveCard(dragIndex, hoverIndex) {
		this.props.moveCard(dragIndex, hoverIndex);
	}

	render() {
		const cards = this.props.list;
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