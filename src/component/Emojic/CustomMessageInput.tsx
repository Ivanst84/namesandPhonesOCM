import React, { useState } from 'react';
import EmojiPickerComponent from './EmojiPicker';

const SomeComponent: React.FC = () => {
  const [customMessage, setCustomMessage] = useState<string>('');

  const handleEmojiSelect = (emoji: string) => {
    setCustomMessage(prev => prev + emoji);
  };

  return (
    <div>
      <textarea
        value={customMessage}
        onChange={(e) => setCustomMessage(e.target.value)}
        placeholder="Ingresa tu mensaje personalizado aquí..."
        className="p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded w-full"
        rows={4}
      />
      <EmojiPickerComponent onSelect={handleEmojiSelect} />
    </div>
  );
};

export default SomeComponent;