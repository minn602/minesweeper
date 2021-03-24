import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Cell } from "./Cell";
import { createBoard } from "../../util/createBoard";
import { reveal } from "../../util/reveal";

export const GameBoard = ({ row, column, mine }) => {
  const [grid, setGrid] = useState([]);
  const [mineLocations, setMineLocations] = useState([]);

  //draw grid
  useEffect(() => {
    const freshBoard = () => {
      const newBoard = createBoard(10, 10, 10);
      setMineLocations(newBoard.mineLocation);
      setGrid(newBoard.board);
    };
    freshBoard();
  }, []);

  //onRightClick
  const updateFlag = (evt, x, y) => {
    evt.preventDefault();
    //deep copy of state
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[x][y].flagged = true;
    setGrid(newGrid);
  };

  //click to reveal cell
  const revealCell = (x, y) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "💣") {
      alert("Game Over!");
      for (let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
      }
      setGrid(newGrid);
    } else {
      let newRevealedBoard = reveal(newGrid, x, y);
      setGrid(newRevealedBoard.arr);
    }
  };

  return (
    <Wrapper>
      <h1>지뢰찾기 게임</h1>
      {grid.map((singleRow) => {
        return (
          <BoardContainer>
            {singleRow.map((singleBlock) => {
              return (
                <Cell
                  revealCell={revealCell}
                  updateFlag={updateFlag}
                  details={singleBlock}
                />
              );
            })}
          </BoardContainer>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoardContainer = styled.div`
  display: flex;
`;
