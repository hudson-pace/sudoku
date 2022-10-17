import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Sudoku from './Sudoku';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Sudoku />
  </React.StrictMode>
);