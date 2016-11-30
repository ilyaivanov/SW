import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as _ from 'lodash';
import Header from './Header';
import { DropTarget } from 'react-dnd';

class DragableHeaders extends React.Component<any, {}> {

    render() {
        var headersInfo = this.props.headers.map((element, id) => ({ element, id }));
        const width = (100 / headersInfo.length) + '%';
        return <tr>
            {headersInfo.map((card, i) => {
                return (
                    <Header
                        key={card.id}
                        width={width}
                        isDraggable={i != 0}
                        subnode={card.element}
                        index={i}
                        card={card}
                        moveCard={this.props.moveCard} />
                );
            })}
        </tr>;
    }
}

export default DragDropContext(HTML5Backend)(DragableHeaders);
