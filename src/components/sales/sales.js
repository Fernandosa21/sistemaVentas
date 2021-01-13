const Sales = () => {
  const sales = [
    {
      orderNo: 0,
      paymentMethod: 'Tarjeta',
      total: 135.00
    },
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

  const totalDay = sales.reduce((acc, { total }) => acc + total, 0)

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
                <th className="text-center" scope="row">{sale.orderNo}</th>
                <td className="text-center">{sale.paymentMethod}</td>
                <td className="text-right">{sale.total.toFixed(2)}</td>
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