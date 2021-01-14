import { FiChevronRight } from "react-icons/fi";
const Orders = () => {
  const orders = [
    {
      orderNo: 0,
      clientName: 'Tarjeta',
      total: 135.00
    },
    {
      orderNo: 1,
      clientName: 'Efectivo',
      total: 145.00
    },
    {
      orderNo: 2,
      clientName: 'Contraventa',
      total: 155.00
    },
    {
      orderNo: 3,
      clientName: 'Tarjeta',
      total: 165.00
    },
    {
      orderNo: 4,
      clientName: 'Contraventa',
      total: 300.00
    },
    {
      orderNo: 5,
      clientName: 'Contraventa',
      total: 135.15
    },
    {
      orderNo: 6,
      clientName: 'Tarjeta',
      total: 135.10
    },
    {
      orderNo: 7,
      clientName: 'Efectivo',
      total: 100.00
    },
    {
      orderNo: 8,
      clientName: 'Efectivo',
      total: 50.00
    },
    {
      orderNo: 9,
      clientName: 'Tarjeta',
      total: 1520.00
    },
    {
      orderNo: 10,
      clientName: 'Tarjeta',
      total: 400.00
    },
  ]

  return (
    <div className="col-12 p-0 d-flex justify-content-center">
      <div className="col-8 ">
        <h1>Ordenes</h1>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center" scope="col">#</th>
              <th className="text-center" scope="col">Método de Pago</th>
              <th className="text-center" scope="col">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <th className="text-center" scope="row">{order.orderNo}</th>
                <td className="text-center">{order.clientName}</td>
                <td className="text-center">{order.total.toFixed(2)}</td>
                <td className="text-right"><FiChevronRight /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;