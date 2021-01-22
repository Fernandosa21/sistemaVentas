import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es-mx'
import { getCutoffs, putCutoff } from '../../services/CutoffService'
import { getSales, getSalesByCutoff } from '../../services/SaleService'
import styles from '../styles.module.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { FiChevronDown } from "react-icons/fi";

const CutOff = () => {
  useEffect(() => {
    callApi();
  }, []);

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleAlert = (type, message) => {
    setShowAlert(true);
    setMessage(message)
    setType(type)
  }

  moment.locale('es');
  
  const [openCutoff, setOpenCutoff] = useState({})
  const [closedCutoff, setClosedCutoff] = useState([])
  const [sales, setSales] = useState([])
  const cash = sales && sales.filter(sale => sale.pay_method === 'Efectivo')
  const totalCash = cash && cash.reduce((acc, { amount }) => acc + amount, 0)
  const totalDay = sales &&  sales.reduce((acc, { amount }) => acc + amount, 0)
  const [casher, setCasher] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const callApi = async () => {
    try {
      const response = (await getCutoffs()).cutOffs;
      const open = response.filter(item => item.status === 'opened')[0];
      const closed = response.filter(item => item.status === 'closed');
      const responseSales = (await getSales()).sales;
      setOpenCutoff(open)
      setClosedCutoff(closed)
      setSales(responseSales)
    }
    catch (err) {
      handleAlert("error", "Algo salió mal")
    }
  }

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'casher':
        setCasher(event.target.value);
        break;
      case 'initialAmount':
        setInitialAmount(event.target.value);
        break;
      // case 'nip':
      //   setNip(event.target.value);
      //   break;
      default:
        break;
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowAlert(false);
  };

  const register = async () => {
    if (casher !== "" && initialAmount !== ""){
      try {
        const response = await putCutoff(
          openCutoff.id_cutoff,
          casher,
          parseFloat(initialAmount).toFixed(2),
          totalDay.toFixed(2),
          totalCash.toFixed(2),
          sales.length)
        if(!response.success)
          throw('Algo salio mal');
        callApi()
        handleAlert("success","El corte de venta se registro correctamente");
      } catch (err) {
        console.log(err)
        handleAlert("error", "Algo salió mal")
      }
    } else {
      handleAlert("error", "Debe llenar todos los datos")
    }
  }

  const showSales = async (index, value, id_cutoff) => {
    try {
      const response = (await getSalesByCutoff(id_cutoff)).sales;
      const closedTemp = [...closedCutoff];
      closedTemp[index].sales = response;
      closedTemp[index].showSales = value;
      setClosedCutoff(closedTemp)
    }
    catch (err) {
      handleAlert("error", "Algo salió mal")
    }
  }

  const buildCutoff = (item, index, open) => (
    <div key={index}>
      <div className="row mt-3 border rounded">
        <div  class="col mt-2 mb-2">
          <div class="d-flex justify-content-between pr-2 ml-3">
            <text className="font-weight-bold">Fecha</text>
            <text> {moment(item.oppened_hour).format('DD/MMMM/YYYY')}</text>
          </div>
          <div class="d-flex justify-content-between pr-2 ml-3">
            <text className="font-weight-bold">Hora de Apertura</text>
            <text> {moment(item.oppened_hour).format('hh:mm a')}</text>
          </div>
          <div class="d-flex justify-content-between pr-2 ml-3">
            <text className="font-weight-bold">Hora de Cierre</text>
            <text> {moment(item.closed_hour).format('hh:mm a')}</text>
          </div>
          <div class="d-flex justify-content-between pr-2 ml-3">
            <text className="font-weight-bold">Cajero / Operador</text>
            {open ?
              <input type="text" name="casher" value={casher} onChange={handleChange} className={styles.input} />
              :
              <text>{item.user_name}</text>
            }
          </div>
        </div>
        <div class="col mt-2 mb-2">
          <div class="d-flex justify-content-between pr-2 ml-3">
            <text className="font-weight-bold">Cantidad Inicial</text>
            {open ?
              <input type="text" size="sm" name="initialAmount" value={initialAmount} onChange={handleChange} className={styles.input} />
              :
              <text> ${item.initial_amount || '0.00'}</text>
            }
          </div>
          <div class="d-flex justify-content-between pr-2 ml-3">
            <text className="font-weight-bold">Total</text>
            <text> ${open ? totalDay.toFixed(2) : (item.income || 0).toFixed(2)}</text>
          </div>
          <div class="d-flex justify-content-between pr-2 ml-3">
            <text className="font-weight-bold">Total a entregar</text>
            <text> ${open ? totalCash.toFixed(2) : (item.total_income).toFixed(2)}</text>
          </div>
        </div>
        <div class="col mt-2 mb-2">
          <div class="d-flex justify-content-between pr-2 ml-3">
            <text className="font-weight-bold">Cobros Realizados</text>
            <text> {open ? sales.length : (item.transactions_quantity || 0)}</text>
          </div>
        </div>
        {!open ?
          <div>
            <button type="button" class="btn btn-link" onClick={() => showSales(index, !item.showSales, item.id_cutoff)}>
              <FiChevronDown />
            </button>
          </div>
          :
          null}
      </div>
      {item.showSales && !open ?
        renderMoves(item.sales || [])
        :
        null
      }
    </div>

  )

  const renderMoves = (specificSales) => {
    return (
      <div>
        <table className="table mt-5">
          <thead>
            <tr>
              <th className="text-center" scope="col">#</th>
              <th className="text-center" scope="col">Método de Pago</th>
              <th className="text-center" scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {specificSales.map((sale, index) => (
              <tr key={index}>
                <th className="text-center" scope="row">{sale.id_order}</th>
                <td className="text-center">{sale.pay_method}</td>
                <td className="text-right">{sale.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="col-12 p-0 d-flex justify-content-center row">
      <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
      {openCutoff && <div className="col-8 ">
        <h1>Corte de Caja</h1>
        {buildCutoff(openCutoff, 0, true)}
        <table className="table mt-5">
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
          </tbody>
        </table>
        <div className="text-right">
          <button type="button" class="btn btn-info" onClick={() => register()}>Registrar</button>
        </div>
      </div>}
      <div className="col-8 ">
        <h3>Historial</h3>
        {closedCutoff.sort((a,b)=>{
          if(a.closed_hour > b.closed_hour)
            return -1;
          else if(a.closed_hour < b.closed_hour)
            return 1;
          return 0;

        }).map((item, index) => buildCutoff(item, index))}
      </div>
    </div>
  );
}

export default CutOff;