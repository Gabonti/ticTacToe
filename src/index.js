import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Square from './Square';
import ResetButton from './ResetButton';

class Board extends React.Component {

    constructor() {
        super();

        this.state = {
            squares : Array(9).fill(null),
            xIsNext : true,
            winner  : null,
            full    : false
        }
    }

    handleOnClick(index, turn) {

        const newSquares = this.state.squares.slice();
        newSquares[index] = turn;

        var winner = this.calculateWinner(newSquares);

        this.setState({
            xIsNext: ! this.state.xIsNext,
            squares: newSquares,
            winner: winner !== null ? winner : this.state.winner
        });

        if (winner !== null) {
            document.getElementById('titleWinner');
        }
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];

            if (squares[a] !== null && squares[b] !== null && squares[c] !== null) {
                if (squares[a] === squares[b] && squares[a] === squares[c] && squares[b] === squares[c]) {
                    return squares[a];
                }
            }
        }

        if (squares.every(function(el) {
            let arg = el !== null ? true : false;
            return arg;
        })) {
            this.setState({
                full: true
            })
        };

        return null;
    }

    handleResetGame() {
        window.location.reload()
    }

    render() {
        const indexSquares = [0,1,2,3,4,5,6,7,8];

        var squares = indexSquares.map(function(indexSquare, i) {
            return (<Square
                value={this.state.squares[i]}
                key={i}
                index={i}
                winner={this.state.winner}
                xIsNext={this.state.xIsNext}
                onClick={this.handleOnClick.bind(this)} />)
        },this)

        return (
            <div>
                <h1>Tic-Tac-Toe</h1>
                <h3 id="titleWinner">{this.state.winner !== null ? <p>Winner <b>{this.state.winner}</b></p> : ""}</h3>
                <div className="container">
                    <div className="row">
                        <br />
                        <div className="col-xs-12">{squares}</div>
                    </div>
                </div>
                <br />
                {this.state.winner !== null || this.state.full === true ? <ResetButton onClick={this.handleResetGame.bind(this)} /> : ""}
            </div>
        )
    }
}

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
