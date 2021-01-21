import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es-mx'
import { getCutoffs, putCutoff } from '../../services/CutoffService'
import { getSales } from '../../services/SaleService'

const CutOff = () => {
  useEffect(() => {
    callApi();
  }, []);

  moment.locale('es');
  const [openCutoff, setOpenCutoff] = useState({})
  const [closedCutoff, setClosedCutoff] = useState([])
  const [sales, setSales] = useState([]) 
  const cash = sales.filter(sale => sale.pay_method === 'Efectivo')
  const totalCash = cash.reduce((acc, { amount }) => acc + amount, 0)
  const totalDay = sales.reduce((acc, { amount }) => acc + amount, 0)

  const callApi = async () => {
    try {
      const response = (await getCutoffs()).cutOffs;
      const open = response.filter(item => item.status === 'opened')[0];
      const closed = response.filter(item => item.status === 'closed');
      const responseSales = (await getSales()).sales;
      
      console.log(responseSales)
      setOpenCutoff(open)
      setClosedCutoff(closed)
      setSales(responseSales)
    }
    catch (err) {

    }
  }

  const buildCutoff = (item, index, open) => (
    <div className="row">
      <div key={index} class="col">
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
          <text> Roberto Gutierrez</text>
        </div>
      </div>
      <div class="col">
        <div class="d-flex justify-content-between pr-2 ml-3">
          <text className="font-weight-bold">Cantidad Inicial</text>
          <text> ${item.initial || '0.00'}</text>
        </div>
        <div class="d-flex justify-content-between pr-2 ml-3">
          <text className="font-weight-bold">Total</text>
          <text> ${open ? totalDay.toFixed(2) : (item.total || 0).toFixed(2)}</text>
        </div>
        <div class="d-flex justify-content-between pr-2 ml-3">
          <text className="font-weight-bold">Total a entregar</text>
          <text> ${open ? totalCash.toFixed(2) : (item.total_income || 0).toFixed(2)}</text>
        </div>
      </div>
      <div class="col">
        <div class="d-flex justify-content-between pr-2 ml-3">
          <text className="font-weight-bold">Cobros Realizados</text>
          <text> {open ? sales.length : (item.transactions_quantity || 0)}</text>
        </div>
      </div>
    </div>
  )

  return (
    <div className="col-12 p-0 d-flex justify-content-center">
      <div className="col-8 ">
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
          <button type="button" class="btn btn-info">Registrar</button>
        </div>
        <h1>Historial</h1>
        {closedCutoff.map((item,index) => buildCutoff(item,index))}
      </div>
    </div>
  );
}

export default CutOff;