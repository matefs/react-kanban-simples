import React, { useState } from 'react';
import './KanbanBoard.css';

/* 
Requisitos MVP:   
- 3 Colunas padrão 
- Criar card em qualquer coluna
- Poder Apagar cards
- Poder editar o card
- Ordenar indice dos cards dentro da coluna 
- Poder excluir nova coluna criada
*/

const KanbanBoard = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'Card 1', column: 'Para Fazer' },
    { id: 2, title: 'Card 2', column: 'Para Fazer' },
    { id: 3, title: 'Card 3', column: 'Fazendo' },
    { id: 4, title: 'Card 4', column: 'Feito' },
  ]);

  const [columns, setColumns] = useState([
    { id: 1, title: 'Para Fazer' },
    { id: 2, title: 'Fazendo' },
    { id: 3, title: 'Feito' },
  ]);

  const handleDragStart = (event, cardId) => {
    event.dataTransfer.setData('text/plain', cardId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, column) => {
    const cardId = event.dataTransfer.getData('text/plain');
    const updatedCards = cards.map((card) => {
      if (card.id === Number(cardId)) {
        return { ...card, column };
      }
      return card;
    });
    setCards(updatedCards);
  };

  const handleFormSubmit = (event, column) => {
    event.preventDefault();
    const newCardTitle = event.target.elements.cardTitle.value;
    const newCard = {
      id: Date.now(),
      title: newCardTitle,
      column: column,
    };
    setCards([...cards, newCard]);
    event.target.reset();
  };

  const handleAddColumn = (event) => {
    event.preventDefault();
    const newColumnTitle = event.target.elements.columnTitle.value;
    const newColumn = {
      id: Date.now(),
      title: newColumnTitle,
    };
    setColumns([...columns, newColumn]);
    event.target.reset();
  };

  return (
    <>
    <h1>Kanban</h1>
    <div className="kanban-board">
      {columns.map((column) => (
        <div key={column.id} className="column">
          <h3>{column.title}</h3>
          <div
            className="card-container"
            onDragOver={(event) => handleDragOver(event)}
            onDrop={(event) => handleDrop(event, column.title)}
          >
            {cards
              .filter((card) => card.column === column.title)
              .map((card) => (
                <div
                key={card.id}
                className="card"
                draggable
                onDragStart={(event) => handleDragStart(event, card.id)}
                >
                  {card.title}
                </div>
              ))}
            <form
              className="new-card-form"
              onSubmit={(event) => handleFormSubmit(event, column.title)}
              >
              <input
                type="text"
                name="cardTitle"
                placeholder="Digite o título do card"
                required
              />
              <button type="submit">Adicionar Card</button> 
            </form>
          </div>
        </div>
      ))}
      <form className="new-column-form" onSubmit={handleAddColumn}>
        <input
          type="text"
          name="columnTitle"
          placeholder="Digite o título da coluna"
          required
          />
        <button type="submit">Adicionar Coluna</button>
      </form>
    </div>
          </>
  );
};

export default KanbanBoard;
