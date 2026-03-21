import { Column } from './Column';
import { loadState, saveState } from './storage';

export class Trello {
  constructor(container) {
    this.container = container;
    this.state = loadState();
    this.draggedCardId = null;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = '';
    this.state.columns.forEach(columnData => {
      const column = new Column(
        columnData,
        this.addCard.bind(this),
        this.deleteCard.bind(this),
        this.onDragStart.bind(this),
        this.onDragEnd.bind(this),
        this.onDrop.bind(this),
        this.render.bind(this)
      );
      this.container.append(column.render());
    });
  }

  addCard(columnId, text) {
    const column = this.state.columns.find(col => col.id === columnId);
    if (column) {
      const newCard = {
        id: Date.now().toString(),
        text: text
      };
      column.cards.push(newCard);
      this.saveAndRender();
    }
  }

  deleteCard(cardId) {
    for (const column of this.state.columns) {
      const index = column.cards.findIndex(card => card.id === cardId);
      if (index !== -1) {
        column.cards.splice(index, 1);
        break;
      }
    }
    this.saveAndRender();
  }

  onDragStart(cardId, clientX, clientY) {
    this.draggedCardId = cardId;
    this.dragStartX = clientX;
    this.dragStartY = clientY;
  }

  onDragEnd() {
    this.draggedCardId = null;
  }

  onDrop(cardId, targetColumnId, targetCardId, mouseY) {
    if (!this.draggedCardId || this.draggedCardId !== cardId) return;
    
    let sourceColumn = null;
    let sourceCardIndex = -1;
    let draggedCard = null;
    
    for (const column of this.state.columns) {
      const index = column.cards.findIndex(card => card.id === cardId);
      if (index !== -1) {
        sourceColumn = column;
        sourceCardIndex = index;
        draggedCard = column.cards[index];
        break;
      }
    }
    
    if (!draggedCard) return;
    
    const targetColumn = this.state.columns.find(col => col.id === targetColumnId);
    if (!targetColumn) return;
    
    sourceColumn.cards.splice(sourceCardIndex, 1);
    
    if (targetCardId) {
      const targetIndex = targetColumn.cards.findIndex(card => card.id === targetCardId);
      if (targetIndex !== -1) {
        const targetCardElement = document.querySelector(`.card[data-id="${targetCardId}"]`);
        if (targetCardElement) {
          const rect = targetCardElement.getBoundingClientRect();
          const isAfter = mouseY > rect.top + rect.height / 2;
          const insertIndex = isAfter ? targetIndex + 1 : targetIndex;
          targetColumn.cards.splice(insertIndex, 0, draggedCard);
        } else {
          targetColumn.cards.push(draggedCard);
        }
      } else {
        targetColumn.cards.push(draggedCard);
      }
    } else {
      targetColumn.cards.push(draggedCard);
    }
    
    this.saveAndRender();
    this.draggedCardId = null;
  }

  bindEvents() {
    document.addEventListener('dragend', () => {
      this.draggedCardId = null;
    });
  }

  saveAndRender() {
    saveState(this.state);
    this.render();
  }
}