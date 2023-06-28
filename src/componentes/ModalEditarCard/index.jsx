import { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import { Tag } from 'antd';
import { TagFilled } from '@ant-design/icons';
import { Typography } from 'antd';

const { Text  } = Typography;

const ModalEditarCard = ({ isModalOpen, handleOk, handleCancel, card, column}) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
  if (card) {
    setTitle(card.title);
  }
  }, [card]);
 

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  if (!card) {
    return null; // Renderiza null caso card seja nulo ou indefinido
  }

  console.log(card)
  return (
     <Modal title="Editar Card" visible={isModalOpen} onOk={() => handleOk(card.id, title)} onCancel={handleCancel}>
     <Text>
        Escreva um novo título para o card: 
        <Input value={title} onChange={handleTitleChange} maxLength={35} />
      </Text>
      <Tag color='processing' icon={<TagFilled />} style={{ marginTop: '16px' }}>Coluna: {column.title}</Tag>
    </Modal>
  );
};


export default ModalEditarCard;