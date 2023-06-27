import React, { useState, useEffect } from "react";
import { Card, Col, Form, Input, Row, Button, Space } from "antd";
import { Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import ModalEditarCard from "./componentes/ModalEditarCard";
import FormNovoCard from './componentes/FormNovoCard';

const { Title } = Typography;

const KanbanBoard = () => {
  const [formAdicionarColuna] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);

  const [cards, setCards] = useState([
    { id: 1, title: "Card 1", column: "Para Fazer" },
    { id: 2, title: "Card 2", column: "Para Fazer" },
    { id: 3, title: "Card 3", column: "Fazendo" },
    { id: 4, title: "Card 4", column: "Feito" },
  ]);

  const [columns, setColumns] = useState([
    { id: 1, title: "Para Fazer" },
    { id: 2, title: "Fazendo" },
    { id: 3, title: "Feito" },
  ]);

  const handleDragStart = (event, cardId) => {
    event.dataTransfer.setData("text/plain", cardId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, column) => {
    const cardId = event.dataTransfer.getData("text/plain");
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
    formAdicionarColuna.resetFields();
  };

  const handleCardDelete = (values) => {
    setCards(cards.filter((card) => card != values));
  };

  const handleCardEdit = (values) => {
    setCardToEdit(values);
    setIsModalOpen(true);
  };

  const handleOk = (cardId, newTitle) => {
    setCards((cards) =>
      cards.map((card) =>
        card.id === cardId ? { ...card, title: newTitle } : card
      )
    );
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Title>Quadro Kanban</Title>
      <Row gutter={16} className="kanban-board">

        { columns.map((column) => (
          <Col key={column.id} span={6}>
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
                  {cards
                    .filter((card) => card.column === column.title)

                    .map((card, index) => (
                      <div
                        key={index}
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
                            onClick={() => handleCardDelete(card)}
                            style={{
                              float: "right",
                              position: "absolute",
                              margin: "0 78%",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </Space>

              <FormNovoCard handleFormSubmit={handleFormSubmit} columnTitle={column.title}/>

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
            <Input placeholder="Digite o título da coluna" name="addColumn" maxLength={35} />
          </Form.Item>
          <Button type="link" htmlType="submit">
            Adicionar Coluna
          </Button>
        </Form>
      
      </Row>

      <ModalEditarCard
        isModalOpen={isModalOpen}
        handleOk={handleOk} // Remove a função anônima aqui
        handleCancel={handleCancel}
        card={cardToEdit}
      />
    </>
  );
};

export default KanbanBoard;
