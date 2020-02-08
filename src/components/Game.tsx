import React from 'react';
import '../index.css';

import Board from './Board';


export default class Game extends React.Component {
  state = {
    history: [{
      squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    XIsNext: true,
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.XIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      XIsNext: !this.state.XIsNext,
    })
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      XIsNext: step % 2  === 0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
       return (
         <li key={move}>
           <button onClick={() => this.jumpTo(move)}>{desc}</button>
         </li>
       )
    })

    let status;
    if (winner) {
      status = 'Winner' + winner;
    } else {
      status = 'Next player: ' + (this.state.XIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)} 
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares: any[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
