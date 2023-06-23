import React, { useState } from 'react';
import { Card, Col, Form, Input, Row, Button, Space} from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;

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
    const updatedCards = cards.map((card) =>
      card.id === Number(cardId) ? { ...card, column } : card
    );
    setCards(updatedCards);
  };

  const handleFormSubmit = (values, column) => {
    const newCard = {
      id: Date.now(),
      title: values.cardTitle,
      column: column,
    };
    setCards([...cards, newCard]);
  };

  const handleAddColumn = (values) => {
    const newColumn = {
      id: Date.now(),
      title: values.columnTitle,
    };
    setColumns([...columns, newColumn]);
  };

  return (
    <>
      <Title>Kanban</Title>
      <Row gutter={16} className="kanban-board">

        {columns.map((column) => (
          <Col key={column.id} span={6}>
            <Card title={column.title} className="column">
              <div
                className="card-container"
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, column.title)}
              >
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                {cards
                  .filter((card) => card.column === column.title)
                  .map((card) => (
                    <Card
                      key={card.id}
                      className="card"
                      draggable
                      onDragStart={(event) => handleDragStart(event, card.id)}
                    >
                      {card.title}
                    </Card>
                  ))}
                  </Space>

                <Form
                  className="new-card-form"
                  onFinish={(values) => handleFormSubmit(values, column.title)}
                >
                  <Form.Item name="cardTitle" rules={[{ required: true }]}>
                    <Input placeholder="Digite o título do card" />
                  </Form.Item>
                  <Button type="primary" htmlType='submit'>Adicionar Card</Button>
                </Form>
              </div>
            </Card>
          </Col>
        ))}

        
        <Form onFinish={handleAddColumn}>
          <Form.Item name="columnTitle" rules={[{ required: true }]}>
            <Input placeholder="Digite o título da coluna" />
          </Form.Item>
          <Button type="link" htmlType='submit'>Adicionar Coluna</Button>
        </Form>
      </Row>
    </>
  );
};

export default KanbanBoard;
