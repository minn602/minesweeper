import React from "react";
import styled from "styled-components";

export const Cell = ({ details, updateFlag, revealCell }) => {
  return (
    <CellContainer
      onClick={() => revealCell(details.x, details.y)}
      onContextMenu={(evt) => updateFlag(evt, details.x, details.y)}
      style={{ width: 30, height: 30, border: "1px solid black" }}
    >
      {details.revealed ? details.value : ""}
    </CellContainer>
  );
};

const CellContainer = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
