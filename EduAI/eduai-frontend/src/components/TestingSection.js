import React, { useState } from 'react';
import { Button } from '@mui/material';

const Quiz = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    // Integrate backend later to verify the answer and provide feedback
  };

  return (
    <div id="quiz">
      <h2>Quiz</h2>
      <p>What is the capital of France?</p>
      <Button onClick={() => handleAnswerClick('Paris')}>Paris</Button>
      <Button onClick={() => handleAnswerClick('London')}>London</Button>
      <Button onClick={() => handleAnswerClick('Berlin')}>Berlin</Button>

      {selectedAnswer && <p>You selected: {selectedAnswer}</p>}
    </div>
  );
};

export default Quiz;
