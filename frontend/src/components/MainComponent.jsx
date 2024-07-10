import "./MainComponent.css";
import React, { useState, useEffect } from "react";
import TravelTimeForm from "./TravelTimeForm";
import Pedidos from "./Pedidos";

const MainComponent = () => {
  const [pedidos, setPedidos] = useState([]);

  const handleTravelTimeCalculated = (novoPedido) => {
    setPedidos((prevPedidos) => [novoPedido, ...prevPedidos]);
  };

  useEffect(() => {
    console.log("Pedidos atualizados:", pedidos);
  }, [pedidos]);

  return (
    <main>
      <div id="main-container">
        <TravelTimeForm onTravelTimeCalculated={handleTravelTimeCalculated} />
        <Pedidos pedidos={pedidos} setPedidos={setPedidos} />
      </div>
    </main>
  );
};

export default MainComponent;
