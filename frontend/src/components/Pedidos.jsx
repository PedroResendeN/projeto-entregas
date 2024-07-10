import "./Pedidos.css";
import React from "react";
import CountdownTimer from "./CountdownTimer";

const Pedidos = ({ pedidos, setPedidos }) => {
  const handleCancel = (id) => {
    setPedidos((prevPedidos) =>
      prevPedidos.filter((pedido) => pedido.id !== id)
    );
  };

  return (
    <div id="container-pedidos">
      <h2>Pedidos</h2>
      <ul>
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <li key={pedido.id}>
              <span>Pedido #{pedido.id}. </span>
              <p id="itens-comprados">
                <strong>Compra:</strong> {pedido.itens}
              </p>
              <div id="timer">
                <CountdownTimer minutes={pedido.travelTime} />
                <span> (incluso 30min de preparo)</span>
              </div>
              <svg
                onClick={() => handleCancel(pedido.id)}
                id="cancel-button"
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
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
