import React, { useState, useRef, useEffect } from 'react';

const buttons = [
    { text: 'Button 1' },
    { text: 'Button 2' },
    { text: 'Button 3' },
    { text: 'Button 4' },
    { text: 'Button 5' },
  ];
const ButtonRow = ({ buttons }) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const intervalRef = useRef(null);

  const blinkButton = (index) => {
    if (!isFlashing) return; // Don't blink if not activated
    buttons[index].current.classList.toggle('blinking');
  };

  const toggleFlashing = () => {
    setIsFlashing(!isFlashing);
    if (!isFlashing) {
      clearInterval(intervalRef.current); // Clear interval if deactivated
    } else {
      intervalRef.current = setInterval(() => {
        buttons.forEach(blinkButton); // Blink all buttons each interval
      }, 200); // Adjust delay for blink duration (in milliseconds)
    }
  };

  useEffect(() => {
    if (isFlashing) {
      intervalRef.current = setInterval(() => {
        buttons.forEach(blinkButton); // Blink all buttons each interval
      }, 200); // Adjust delay for blink duration (in milliseconds)
    }
    return () => clearInterval(intervalRef.current);
  });

  return (
    <div>
    <div className="button-row">
      {buttons.map((button, index) => (
        <button key={index} ref={buttons[index]} className="button blinking">
          {button.text}
        </button>
      ))}
    </div>
     <div>
     <button onClick={toggleFlashing}>Toggle Flashing</button>
     </div>
 </div>
  );
};

export default ButtonRow;
