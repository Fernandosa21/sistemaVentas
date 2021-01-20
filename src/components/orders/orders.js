import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { getSales } from '../../services/SaleService'
import { getSaleDetails } from '../../services/SaleDetailsService'

const Orders = () => {
  useEffect(() => {
    callApi();
  },
    []);

  const callApi = async () => {
    const sales = await getSales(true);
    setOrders(sales.sales)
  }

  const [details, setDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [orders, setOrders] = useState([]);
  const [selectedMethod, setSetelectedMethod] = useState("");
  const [cash, setCash] = useState(0);
  const [change, setChange] = useState(0);
  const [card, setCard] = useState("");
  const [nip, setNip] = useState("");

  const selectOrder = async (order) => {
    const saleDetails = await getSaleDetails(order.id_sale);
    const currentOrder = {
      ...order,
      products: saleDetails.saleDetails
    }
    setSelectedOrder(currentOrder)
    setDetails(true);
  }

  const calculateTotal = () => {
    const total = selectedOrder.products.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    return total.toFixed(2)
  }

  const calculateChange = () => {
    setChange((cash - calculateTotal()).toFixed(2))
  }

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'cash':
        setCash(event.target.value);
        break;
      case 'card':
        setCard(event.target.value);
        break;
      case 'nip':
        setNip(event.target.value);
        break;
      default:
        break;
    }
  }

  const renderOrders = () => {
    return (
      <div className="col-8 ">
        <h1>Ordenes</h1>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center" scope="col">#</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <th className="text-center" scope="row">{order.id_order}</th>
                <td className="text-right">
                  <button type="button" class="btn btn-link" onClick={() => selectOrder(order)}>
                    <FiChevronRight />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderOrderDetail = () => {
    return (
      <div className="col-8 ">
        <h1>Detallas de Ordenes</h1>
        <div className="col-8">
          <button type="button" class="btn btn-link" onClick={() => setDetails(false)}>
            <FiChevronLeft />
            <text>Atras</text>
          </button>
        </div>
        <div className="col-8 row">
          <text>Orden Numero:</text>
          <text> {selectedOrder.id_order}</text>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center" scope="col">Cantidad</th>
              <th className="text-center" scope="col">Producto</th>
              <th className="text-center" scope="col">Precio</th>
            </tr>
          </thead>
          <tbody>
            {selectedOrder.products.map((product, index) => (
              <tr key={index}>
                <td className="text-center">{product.quantity}</td>
                <td className="text-center">{product.name}</td>
                <td className="text-center">{product.price}</td>
              </tr>
            ))}
            <td className="text-center"></td>
            <th className="text-center">Total</th>
            <td className="text-center">{calculateTotal()}</td>
          </tbody>
        </table>
        <div className="row d-flex justify-content-end">
          <h5 className="text-right m-5">Metodo de Pago</h5>
          <div className="text-right m-5">
            <button type="button" class="btn btn-outline-info btn-lg" onClick={() => setSetelectedMethod('Efectivo')}>Efectivo</button>
          </div>
          <div className="text-right m-5">
            <button type="button" class="btn btn-outline-info btn-lg" onClick={() => setSetelectedMethod('Tarjeta')}>Tarjeta</button>
          </div>
        </div>
        {selectedMethod !== "" ?
          renderMethods()
          : null
        }
      </div>
    )
  }

  const renderMethods = () => {
    return (
      <div>
        { selectedMethod === 'Efectivo' ?
          <div>
            <h5>Pago en Efectivo</h5>
            <text>Ingresa los datos correspondientes</text>
            <div className="row d-flex justify-content-between mt-4 mb-4">
              <div class="d-flex justify-content-between ml-3">
                <text className="font-weight-bold mr-3">Monto</text>
                <input type="text" name="cash" value={cash} onChange={handleChange} class="form-control" />
              </div>
              <div className="text-right">
                <button type="button" class="btn btn-outline-info btn-lg" onClick={() => calculateChange()}>Calcular</button>
              </div>
            </div>
            {change !== 0 ?
              <div className="row">
                <div class="d-flex justify-content-between m-3">
                  <text className="font-weight-bold mr-3">Cambio</text>
                  <input type="text" name="change" value={change} class="form-control" disabled />
                </div>
              </div>
              : null}
          </div>
          :
          <div>
            <h5>Pago con Tarjeta</h5>
            <text>Ingresa los datos correspondientes</text>
            <div className="row d-flex justify-content-between mt-4 mb-4">
              <div class="d-flex justify-content-between m-3 col">
                <text className="font-weight-bold mr-3">Numero de tarjeta</text>
                <input type="text" name="card" value={card} onChange={handleChange} class="form-control" />
              </div>
              <div class="d-flex justify-content-between m-3 col">
                <text className="font-weight-bold mr-3">Nip</text>
                <input type="password" name="nip" value={nip} onChange={handleChange} class="form-control" />
              </div>
            </div>
          </div>
        }
        <div className="text-right m-3">
          <button type="button" class="btn btn-info btn-lg">Pagar</button>
        </div>
      </div>
    )
  }

  return (
    <div className="col-12 p-0 d-flex justify-content-center">
      {!details ?
        renderOrders()
        :
        renderOrderDetail()
      }
    </div>
  );
}

export default Orders;