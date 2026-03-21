const STORAGE_KEY = 'trello-board';

export const loadState = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    columns: [
      {
        id: 'todo',
        title: 'TODO',
        cards: [
          { id: '1', text: 'Welcome to Trello!' },
          { id: '2', text: 'This is a card.' },
          { id: '3', text: 'Click on a card to see what\'s behind it.' },
          { id: '4', text: 'You can attach pictures and files...' }
        ]
      },
      {
        id: 'inprogress',
        title: 'IN PROGRESS',
        cards: [
          { id: '5', text: 'Drag people onto a card to indicate that they\'re responsible for it.' },
          { id: '6', text: 'Use color-coded labels for organization' },
          { id: '7', text: 'Make as many lists as you need!' }
        ]
      },
      {
        id: 'done',
        title: 'DONE',
        cards: [
          { id: '8', text: 'Finished with a card? Archive it.' },
          { id: '9', text: 'Try dragging cards anywhere.' },
          { id: '10', text: 'To learn more tricks, check out the guide.' }
        ]
      }
    ]
  };
};

export const saveState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};