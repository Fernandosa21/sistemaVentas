
import React, { useState, useEffect } from 'react';
import { getSales } from '../../services/SaleService'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Sales = () => {
  useEffect(() => {
    callApi();
  },
    []);

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


  const handleAlert = (type, message) => {
    setOpen(true);
    setMessage(message)
    setType(type)
  }


  const [sales, setSales] = useState([])
  const totalDay = sales.filter(({ pay_method }) => pay_method === 'Efectivo').reduce((acc, { amount }) => acc + amount, 0)
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const callApi = async () => {
    try {
      const responseSales = (await getSales()).sales;
      setSales(responseSales)
    }
    catch (err) {
      handleAlert("error", "Hubo un error al cargar las ventas");
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="col-12 p-0 d-flex justify-content-center">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
      <div className="col-8 ">
        <h1>Ventas de hoy</h1>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center" scope="col">#</th>
              <th className="text-center" scope="col">Método de Pago</th>
              <th className="text-center" scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={index}>
                <th className="text-center" scope="row">{sale.id_order}</th>
                <td className="text-center">{sale.pay_method}</td>
                <td className="text-right">{sale.amount.toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <th></th>
              <td className="text-right">Total</td>
              <td className="text-right">${totalDay}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sales;