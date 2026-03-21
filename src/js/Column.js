import { Card } from './Card';

export class Column {
  constructor(column, onAddCard, onDeleteCard, onCardDragStart, onCardDragEnd, onCardDrop, onUpdate) {
    this.id = column.id;
    this.title = column.title;
    this.cards = column.cards || [];
    this.onAddCard = onAddCard;
    this.onDeleteCard = onDeleteCard;
    this.onCardDragStart = onCardDragStart;
    this.onCardDragEnd = onCardDragEnd;
    this.onCardDrop = onCardDrop;
    this.onUpdate = onUpdate;
    this.isAdding = false;
  }

  render() {
    const column = document.createElement('div');
    column.className = 'column';
    column.setAttribute('data-column-id', this.id);
    
    const header = document.createElement('div');
    header.className = 'column-header';
    header.textContent = this.title;
    
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';
    cardsContainer.setAttribute('data-column-id', this.id);
    
    cardsContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    });
    
    cardsContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      const cardId = e.dataTransfer.getData('text/plain');
      const targetCard = e.target.closest('.card');
      const position = targetCard ? targetCard.getAttribute('data-id') : null;
      this.onCardDrop(cardId, this.id, position, e.clientY);
    });
    
    this.cards.forEach(cardData => {
      const card = new Card(
        cardData,
        this.onDeleteCard,
        this.onCardDragStart,
        this.onCardDragEnd
      );
      cardsContainer.append(card.render());
    });
    
    const addBtn = document.createElement('button');
    addBtn.className = 'add-card-btn';
    addBtn.textContent = '+ Add another card';
    addBtn.addEventListener('click', () => this.showForm(column, cardsContainer));
    
    column.append(header, cardsContainer, addBtn);
    
    return column;
  }
  
  showForm(column, cardsContainer) {
    if (this.isAdding) return;
    this.isAdding = true;
    
    const form = document.createElement('div');
    form.className = 'card-form';
    
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Enter a title for this card...';
    textarea.rows = 3;
    
    const buttons = document.createElement('div');
    buttons.className = 'card-form-buttons';
    
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add Card';
    addBtn.addEventListener('click', () => {
      const text = textarea.value.trim();
      if (text) {
        this.onAddCard(this.id, text);
        this.isAdding = false;
        this.onUpdate();
      }
    });
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = '✕';
    cancelBtn.addEventListener('click', () => {
      this.isAdding = false;
      this.onUpdate();
    });
    
    buttons.append(addBtn, cancelBtn);
    form.append(textarea, buttons);
    
    const addBtnElement = column.querySelector('.add-card-btn');
    column.insertBefore(form, addBtnElement);
  }
}