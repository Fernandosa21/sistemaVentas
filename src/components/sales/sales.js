
import React, { useState, useEffect } from 'react';
import { getSales } from '../../services/SaleService'

const Sales = () => {
  useEffect(() => {
    callApi();
  },
    []);

  const [sales, setSales] = useState([]) 
  const totalDay = sales.filter(({pay_method}) => pay_method === 'Efectivo' ).reduce((acc, { amount }) => acc + amount, 0)

  const callApi = async () => {
    try {
      const responseSales = (await getSales()).sales;
      setSales(responseSales)
    }
    catch (err) {

    }
  }

  return (
    <div className="col-12 p-0 d-flex justify-content-center">
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