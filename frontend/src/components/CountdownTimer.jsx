import React, { useState, useEffect } from "react";

const CountdownTimer = ({ minutes }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    if (timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
  };

  return (
    <div>
      {timeLeft > 0 ? (
        <p>Tempo restante: {formatTime(timeLeft)}</p>
      ) : (
        <p>Pedido Concluído!</p>
      )}
    </div>
  );
};

export default CountdownTimer;
