import React from 'react';
import '../index.css';
type squareProps = {
  value: string,
  onClick(): void,
}

export const Square: React.FC<squareProps> = props => {
  return (
    <button 
      className="square" 
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
