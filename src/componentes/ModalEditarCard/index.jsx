import { useState } from 'react';
import { Modal, Input } from 'antd';


const ModalEditarCard = ({ isModalOpen, handleOk, handleCancel, card }) => {
  const [title, setTitle] = useState(card?.title);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  if (!card) {
    return null; // Renderiza null caso card seja nulo ou indefinido
  }

  return (
    <Modal title="Editar Card" visible={isModalOpen} onOk={() => handleOk(card.id, title)} onCancel={handleCancel}>
      <p>
        Title: 
        <Input value={title} onChange={handleTitleChange} />
      </p>
      <p>Column: {card.column}</p>
    </Modal>
  );
};


export default ModalEditarCard;