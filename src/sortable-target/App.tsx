import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';

class App extends React.Component<{}, {}> {

	render() {
		const style: any = {
			display: "flex",
			justifyContent: "space-around",
			paddingTop: "20px"
		}

		const listOne = [
			{ id: 1, text: "Item 1 foo bar long long long long" },
			{ id: 2, text: "Item 2" },
			{ id: 3, text: "Item 3" },
			{ id: 4, text: "Item 4" },
			{ id: 5, text: "Item 5" },
		];

		return (
			<div>
				<table className="table">
					<thead>
						<tr>
							<th>1</th>
							<th>2</th>
							<th>3</th>
							<th>4</th>
							<th>5</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1.1</td>
							<td>1.2</td>
							<td>1.3</td>
							<td>1.5</td>
							<td>1.6</td>
						</tr>
					</tbody>
				</table>
				<div style={style}>
					<Container id={1} list={listOne} />
				</div>
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(App);