import React, { useState, useEffect } from "react";
import { Card, Col, Form, Input, Row, Button, Space } from "antd";
import { Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import ModalEditarCard from "./componentes/ModalEditarCard";
import FormNovoCard from "./componentes/FormNovoCard";

const { Title } = Typography;

const KanbanBoard = () => {
  const [formAdicionarColuna] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);

  const [columns, setColumns] = useState([
  { id: 1, title: "Para Fazer", cards: [
    { id: 1, title: "Card 1" },
    { id: 2, title: "Card 2" }
  ]},
  { id: 2, title: "Fazendo", cards: [
    { id: 3, title: "Card 3" }
  ]},
  { id: 3, title: "Feito", cards: [
    { id: 4, title: "Card 4" }
  ]}
]);

 
const handleDragStart = (event, cardId) => {
  event.dataTransfer.setData("text/plain", cardId.toString());
};

const handleDragOver = (event) => {
  event.preventDefault();
};


const handleDrop = (event, column) => {
  const cardId = Number(event.dataTransfer.getData("text/plain"));
  const updatedColumns = columns.map((col) => {
    if (col.title === column) {
      const updatedCards = [...col.cards, { id: cardId, title: `Card ${cardId}` }];
      return { ...col, cards: updatedCards };
    } else {
      const updatedCards = col.cards.filter((card) => card.id !== cardId);
      return { ...col, cards: updatedCards };
    }
  });
  setColumns(updatedColumns);
};


const handleFormSubmit = (values, column) => {
  const newCardId = Date.now();
  const newCard = { id: newCardId, title: values.cardTitle };
  const updatedColumns = columns.map((col) => {
    if (col.title === column) {
      const updatedCards = [...col.cards, newCard];
      return { ...col, cards: updatedCards };
    }
    return col;
  });
  setColumns(updatedColumns);
};

const handleAddColumn = (values) => {
  const newColumn = {
    id: Date.now(),
    title: values.columnTitle,
    cards: [],
  };
  setColumns([...columns, newColumn]);
  formAdicionarColuna.resetFields();
};

const handleCardDelete = (columnId, cardId) => {
  const updatedColumns = columns.map((col) => {
    if (col.id === columnId) {
      const updatedCards = col.cards.filter((card) => card.id !== cardId);
      return { ...col, cards: updatedCards };
    }
    return col;
  });
  setColumns(updatedColumns);
};

const handleCardEdit = (card) => {
  setCardToEdit(card);
  setIsModalOpen(true);
};

const handleOk = (cardId, newTitle) => {
  const updatedColumns = columns.map((col) => {
    const updatedCards = col.cards.map((card) =>
      card.id === cardId ? { ...card, title: newTitle } : card
    );
    return { ...col, cards: updatedCards };
  });
  setColumns(updatedColumns);
  setIsModalOpen(false);
};


const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteColumn = (columnId) => {
    const updatedColumns = columns.filter((column) => column.id !== columnId);
    setColumns(updatedColumns);
  };

  return (
    <>
      <Title>Quadro Kanban</Title>
      <Row gutter={16} className="kanban-board">

         {columns.map((column) => (
  <Col key={column.id} span={6}>
    {column.id !== 1 && column.id !== 2 && column.id !== 3 ? (
      <DeleteOutlined
        onClick={() => deleteColumn(column.id)}
        style={{
          position: "absolute",
          padding: "0% 5%",
          marginLeft: "79%",
          marginTop: "5.5%",
          zIndex: "1",
          cursor: "pointer",
        }}
      />
    ) : null}

    <Card title={column.title} className="column">
      <div
        className="card-container"
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, column.title)}
      >
        <Space
          direction="vertical"
          size="middle"
          style={{ display: "flex" }}
        >
          
          {column.cards.map((card) => (
            <div
              key={card.id}
              style={{
                boxShadow: "0px 0px 21px rgba(0, 0, 0, .2)",
                borderRadius: "30px",
                cursor: "pointer",
              }}
              draggable
              onDragStart={(event) => handleDragStart(event, card.id)}
            >
              <div
                className="card-wrapper"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <Card
                  key={card.id}
                  className="card"
                  style={{ cursor: "pointer", width: "100%" }}
                  onClick={() => handleCardEdit(card)}
                />
                <span
                  style={{ position: "absolute", padding: "20px" }}
                >
                  {card.title}
                </span>
                <DeleteOutlined
                  onClick={() => handleCardDelete(column.id,card.id)}
                  style={{
                    position: "absolute",
                    margin: "0 75%",
                    cursor: "pointer",
                    padding: "10px",
                  }}
                />
              </div>
            </div>
          ))}
        </Space>

        <FormNovoCard
          handleFormSubmit={handleFormSubmit}
          columnTitle={column.title}
        />
      </div>
    </Card>
  </Col>
))}


        <Form
          onFinish={handleAddColumn}
          initialValues={{ addColumn: "" }}
          form={formAdicionarColuna}
          style={{ marginLeft: "1.4%" }}
        >
          <Form.Item name="columnTitle">
            <Input
              placeholder="Digite o título da coluna"
              name="addColumn"
              maxLength={35}
            />
          </Form.Item>
          <Button type="link" htmlType="submit">
            Adicionar Coluna
          </Button>
        </Form>
      </Row>

      <ModalEditarCard
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        card={cardToEdit}
      />
    </>
  );
};

export default KanbanBoard;
