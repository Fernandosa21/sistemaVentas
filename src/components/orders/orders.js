import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { getSales, putSale } from '../../services/SaleService';
import { getSaleDetails } from '../../services/SaleDetailsService';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Orders = () => {
  useEffect(() => {
    callApi();
  },
    []);

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const callApi = async () => {
    try {
      const sales = await getSales(true);
      setOrders(sales.sales)
    } catch (err) {
      handleAlert("error", "Hubo un error de conexión")
    }
  }

  const handleAlert = (type, message) => {
    setOpen(true);
    setMessage(message)
    setType(type)
  }

  const [details, setDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [orders, setOrders] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [cash, setCash] = useState(0);
  const [change, setChange] = useState(0);
  const [card, setCard] = useState("");
  const [nip, setNip] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const selectOrder = async (order) => {
    try {
      const saleDetails = await getSaleDetails(order.id_sale);
      const currentOrder = {
        ...order,
        products: saleDetails.saleDetails
      }
      setSelectedOrder(currentOrder)
      setDetails(true);
    } catch (err) {
      setOpen(true);
      setMessage("Hubo un error de conexión")
      setType("error")
    }
  }

  const calculateTotal = () => {
    const total = selectedOrder.products.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    return total.toFixed(2)
  }

  const calculateChange = () => {
    console.log(calculateTotal());
    const total = calculateTotal();
    if (parseFloat(cash) < total) {
      handleAlert("error", "El monto en efectivo debe ser mayor que el total de la orden");
    }
    else {
      setChange((cash - total).toFixed(2))
    }
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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const pay = async () => {
    if ((selectedMethod === 'Efectivo' && cash === "") || (selectedMethod === "Tarjeta" && (card === "" || nip === ""))) {
      handleAlert("error", "No debe haber campos vacios");
    }
    else {
      try{
        const response = await putSale(selectedOrder.id_order, selectedMethod, card, nip);
        if(!response.success)
          throw('Algo salio mal');
        goBack();
        handleAlert("success", "El pago se aplico con exito");
      }
      catch(err){
        handleAlert("error", "Hubo un error al registrar el pago");
      }
    }

  }

  const renderOrders = () => {
    return (
      <div className="col-8 ">
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={type}>
            {message}
          </Alert>
        </Snackbar>
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

  const goBack = () => {
    callApi()
    setDetails(false);
    setCash("");
    setChange(0);
    setCard("");
    setNip("");
    setSelectedMethod("");
    setSelectedOrder({})
  }

  const renderOrderDetail = () => {
    return (
      <div className="col-8 ">
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={type}>
            {message}
          </Alert>
        </Snackbar>
        <h1>Detallas de Ordenes</h1>
        <div className="col-8">
          <button type="button" class="btn btn-link" onClick={() => goBack()}>
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
            <button type="button" class="btn btn-outline-info btn-lg" onClick={() => setSelectedMethod('Efectivo')}>Efectivo</button>
          </div>
          <div className="text-right m-5">
            <button type="button" class="btn btn-outline-info btn-lg" onClick={() => setSelectedMethod('Tarjeta')}>Tarjeta</button>
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
            {change !== 0                    ?
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
          <button type="button" class="btn btn-info btn-lg" onClick={() => pay()}>Pagar</button>
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