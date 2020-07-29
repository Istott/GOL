import React, {useState, useCallback, useRef} from 'react';
import './App.css';
import produce from 'immer';

import LeftBar from './leftBar';
import RightBar from './rightBar';

const numRows = 30;
const numCols = 40;

const operations = [ //neighbor locations around a cell.
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++){
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
}

function App() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid()
  });

  const [running, setRunning] = useState(false);

  const [square, setSquare] = useState({
    color: '#05F2F2',
    speed: 500
  })

  const handleSelectChanges = e => {
    const valueSelected = e.target.value;
    setSquare({ ...square, [e.target.name]: valueSelected });
    console.log('Square color: ', e.target.name, valueSelected, square);
  };

  const handleChange = e => {
    const valueSelected = parseInt(e.target.value, 10);
    setSquare({ ...square, [e.target.name]: valueSelected });
    console.log('Square speed: ', e.target.name, valueSelected, square);
  };

  const runningRef = useRef();
  runningRef.current = running

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    //simulation logic
    setGrid((g) => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK]
              }
            })

            if (neighbors < 2 || neighbors > 3) { // determines whether to kill cell. 
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) { // determines whether to make cell come to life.
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    
    setTimeout(runSimulation, square.speed)
  }, [square.speed])

  // console.log(grid);

  return (
    <div className='backpic'>
      <div className='app'> 
        <h1>Its Alive</h1>
        <div className='buttons'>

          <div className='options' >More Options</div>

          <button 
            className='button'
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                runSimulation();
              }
            }} 
          >
            {running ? 'stop' : 'start'}
          </button>
          <button 
            className='button'
            onClick={() => {
              const rows = [];
              for (let i = 0; i < numRows; i++){
                rows.push(
                  Array.from(Array(numCols), () => Math.random() > .8 ? 1 : 0)
                );
              }
            
              setGrid(rows);
            }}
          >
            random
          </button>
          <button 
            className='button'
            onClick={() => {
              setGrid(generateEmptyGrid())
            }}
          >
            clear
          </button>

          <div className='about' >About</div>
        </div>
        
        <div className='gridWrapper'>
          <div className='leftBar'>
            <LeftBar 
              color={square.color}
              speed={square.speed}
              handleSelectChanges={handleSelectChanges}
              handleChange={handleChange}
            />
          </div>
          <div className='theGrid'
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${numCols}, 15px)`
            }}
          >
            {grid.map((rows, i) => 
              rows.map((col, k) => (
              <div 
                  className='gridsquare'
                  key={`${i}-${k}`}
                  onClick={() => {
                    const newGrid = produce(grid, gridCopy => {
                      gridCopy[i][k] = grid[i][k] ? 0 : 1;
                    })
                    setGrid(newGrid);
                  }}
                  style={{
                    width: 12, 
                    height: 10, 
                    backgroundColor: grid[i][k] ? square.color : undefined,
                    // border: 'solid 2px black'
                    margin: 1
                  }} 
                />
              ))
            )}
          </div>
          <div className='rightBar'>
            <RightBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
