import './style.css';
import { Trello } from './Trello';

const board = document.getElementById('board');
new Trello(board);