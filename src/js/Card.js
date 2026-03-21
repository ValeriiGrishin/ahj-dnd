export class Card {
  constructor(data, onDelete, onDragStart, onDragEnd) {
    this.id = data.id;
    this.text = data.text;
    this.onDelete = onDelete;
    this.onDragStart = onDragStart;
    this.onDragEnd = onDragEnd;
  }

  render() {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('draggable', 'true');
    card.setAttribute('data-id', this.id);
    
    const textSpan = document.createElement('span');
    textSpan.textContent = this.text;
    
    const deleteBtn = document.createElement('span');
    deleteBtn.className = 'delete-card';
    deleteBtn.textContent = '✕';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.onDelete(this.id);
    });
    
    card.append(textSpan, deleteBtn);
    
    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', this.id);
      e.dataTransfer.effectAllowed = 'move';
      this.onDragStart(this.id, e.clientX, e.clientY);
    });
    
    card.addEventListener('dragend', () => {
      this.onDragEnd();
    });
    
    return card;
  }
}