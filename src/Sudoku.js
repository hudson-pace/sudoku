import { useState } from "react";

const puzzle = [
    '9', '',  '',  '',  '',  '',  '1', '8', '',  '8', '',  '3',
    '9', '',  '',  '',  '2', '6', '1', '7', '',  '4', '2', '',
    '',  '',  '',  '',  '',  '',  '8', '4', '',  '',  '',  '1',
    '7', '',  '',  '2', '',  '9', '',  '',  '5', '4', '',  '',
    '',  '5', '7', '',  '',  '',  '',  '',  '',  '',  '3', '2',
    '',  '7', '4', '6', '2', '',  '',  '',  '4', '9', '',  '3',
    '',  '1', '4', '',  '',  '',  '',  '',  '8'
  ];

export default function Sudoku(props) {
    return (
        <div>
            <h1>Welcome To Sudoku</h1>
            <h3>here is puzl:</h3>
            <Puzzle puzzle={puzzle} />
        </div>
    );
}

function Square(props) {
    const classes = `cell ${props.class}`;
    return (
        <div className={classes} onMouseEnter={() => props.onMouseEnter(props.index)}>
            <input
                type='text'
                value={props.value}
                readOnly={props.permanent}
                maxLength='1'
                onChange={(e) => props.onChange(e, props.index)}
                className={props.permanent ? 'readonly': ''}
            ></input>
        </div>
    );
}

const handleMouseEnter = (index, s, setSquares) => {
    const squares = s.slice();
    for (const square of squares) {
        if ((index % 9) === (square.index % 9) || Math.floor(index / 9) === Math.floor(square.index / 9)) {
            square.class = 'selected';
        } else {
            square.class = '';
        }
    }
    setSquares(squares);
}

const handleValueChange = (e, index, s, setSquares) => {
    const squares = s.slice();
    console.log(e);
    squares[index].value = e.target.value;
    setSquares(squares);
}

function Puzzle(props) {
    const initialSquares = props.puzzle.map((value, index) => {
        return {
            value,
            permanent: !!value,
            class: '',
            index
        }
    })
    const [squares, setSquares] = useState(initialSquares);

    const squareComponents = squares.map((cell, index) => {
        return <Square
            key={index}
            index={index}
            value={cell.value}
            class={cell.class}
            onMouseEnter={(index) => handleMouseEnter(index, squares, setSquares)}
            permanent={cell.permanent}
            onChange={(index, value) => handleValueChange(index, value, squares, setSquares)}
            ></Square>
    });

    const rows = [];
    for (let i = 0; i < 9; i++) {
        rows.push(<div className='row' key={i}>{squareComponents.slice(9 * i, (9 * i) + 9)}</div>)
    }
    return (
        <div className="game-container">
            {rows}
        </div>
    );
}