import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es-mx'

const CutOff = () => {
  useEffect(() => {
    obtainTurn();
  },
  []);

  const sales = [
    {
      orderNo: 1,
      paymentMethod: 'Efectivo',
      total: 145.00
    },
    {
      orderNo: 2,
      paymentMethod: 'Contraventa',
      total: 155.00
    },
    {
      orderNo: 3,
      paymentMethod: 'Tarjeta',
      total: 165.00
    },
    {
      orderNo: 4,
      paymentMethod: 'Contraventa',
      total: 300.00
    },
    {
      orderNo: 5,
      paymentMethod: 'Contraventa',
      total: 135.15
    },
    {
      orderNo: 6,
      paymentMethod: 'Tarjeta',
      total: 135.10
    },
    {
      orderNo: 7,
      paymentMethod: 'Efectivo',
      total: 100.00
    },
    {
      orderNo: 8,
      paymentMethod: 'Efectivo',
      total: 50.00
    },
    {
      orderNo: 9,
      paymentMethod: 'Tarjeta',
      total: 1520.00
    },
    {
      orderNo: 10,
      paymentMethod: 'Tarjeta',
      total: 400.00
    },
  ]

  const cash = sales.filter(sale => sale.paymentMethod === 'Efectivo')
  const totalCash = cash.reduce((acc, { total }) => acc + total, 0)
  const totalDay = sales.reduce((acc, { total }) => acc + total, 0)
  moment.locale('es');
  const today = moment().format('DD/MMMM/YYYY');
  const [openingTime, setOpeningTime] = useState(""); 
  const [closingTime, setClosingTime] = useState("")
  
  //Obtener el dia y hora para poner las horas de apertuara y cierre de cada turno

  const obtainTurn = () => {
    const hour = moment().hour();
    if (hour > 8 && hour < 13) {
      setOpeningTime("09:00 a.m.");
      setClosingTime("02:00 p.m.");
    } 
    else {
      setOpeningTime("03:00 a.m.");
      setClosingTime("08:00 p.m.");
    }
  }

  return (
    <div className="col-12 p-0 d-flex justify-content-center">
      <div className="col-8 ">
        <h1>Corte de Caja</h1>
        <div className="row">
          <div class="col">
            <div class="d-flex justify-content-between pr-2 ml-3">
              <text className="font-weight-bold">Fecha</text>
              <text> {today}</text>
            </div>
            <div class="d-flex justify-content-between pr-2 ml-3">
              <text className="font-weight-bold">Hora de Apertura</text>
              <text> {openingTime}</text>
            </div>
            <div class="d-flex justify-content-between pr-2 ml-3">
              <text className="font-weight-bold">Hora de Cierre</text>
              <text> {closingTime}</text>
            </div>
            <div class="d-flex justify-content-between pr-2 ml-3">
              <text className="font-weight-bold">Cajero / Operador</text>
              <text> Roberto Gutierrez</text>
            </div>
          </div>
          <div class="col">
            <div class="d-flex justify-content-between pr-2 ml-3">
              <text className="font-weight-bold">Cantidad Inicial</text>
              <text> $0.00</text>
            </div>
            <div class="d-flex justify-content-between pr-2 ml-3">
              <text className="font-weight-bold">Total</text>
              <text> ${totalDay.toFixed(2)}</text>
            </div>
            <div class="d-flex justify-content-between pr-2 ml-3">
              <text className="font-weight-bold">Total a entregar</text>
              <text> ${totalCash.toFixed(2)}</text>
            </div>
          </div>
          <div class="col">
            <div class="d-flex justify-content-between pr-2 ml-3">
              <text className="font-weight-bold">Cobros Realizados</text>
              <text> {sales.length}</text>
            </div>
          </div>
        </div>
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
                <th className="text-center" scope="row">{sale.orderNo}</th>
                <td className="text-center">{sale.paymentMethod}</td>
                <td className="text-right">{sale.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right">
          <button type="button" class="btn btn-info">Registrar</button>
        </div>
      </div>
    </div>
  );
}

export default CutOff;