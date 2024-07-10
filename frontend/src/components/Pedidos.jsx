import "./Pedidos.css";
import React from "react";
import CountdownTimer from "./CountdownTimer";

const Pedidos = ({ pedidos, setPedidos }) => {
  const handleCancel = (index) => {
    setPedidos((prevPedidos) => prevPedidos.filter((_, i) => i !== index));
  };

  return (
    <div id="container-pedidos">
      <h2>Pedidos</h2>
      <ul>
        {pedidos.length > 0 ? (
          pedidos.map((pedido, index) => (
            <li key={index}>
              <p id="itens-comprados">
                <strong>Compra:</strong> {pedido.itens}
              </p>
              <div id="timer">
                <CountdownTimer minutes={pedido.travelTime} />{" "}
                {/* Tempo de viagem + 30min de preparo */}
                <span> (incluso 30min de preparo)</span>
              </div>
              <button onClick={() => handleCancel(index)} id="cancel-button">
                Cancelar
              </button>
            </li>
          ))
        ) : (
          <li>Nenhum pedido disponível</li>
        )}
      </ul>
    </div>
  );
};

export default Pedidos;
