import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { EmojiClickData } from 'emoji-picker-react';
import { FaRegSmile } from 'react-icons/fa'; // Asegúrate de instalar react-icons si aún no lo has hecho

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

const EmojiPickerComponent: React.FC<EmojiPickerProps> = ({ onSelect }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onSelect(emojiData.emoji);
    setShowEmojiPicker(false); // Opcional: ocultar el picker después de seleccionar un emoji
  };

  return (
    <div className="relative">
      <div
        className="absolute bottom-2 left-2 cursor-pointer"
        onClick={() => setShowEmojiPicker(prev => !prev)} // Alterna la visibilidad del picker
      >
        <FaRegSmile size={24} />
      </div>
      {showEmojiPicker && (
        <div className="absolute bottom-12 left-2 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerComponent;
