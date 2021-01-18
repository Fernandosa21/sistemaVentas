import React, { useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const Orders = () => {
  const orders = [
    {
      orderNo: 0,
      products: [
        {
          name: "Hamburguesa",
          price: 100.00,
          quantity: 1,
        },
        {
          name: "Soda",
          price: 35.00,
          quantity: 1,
        }
      ],
    },
    {
      orderNo: 1,
      products: [
        {
          name: "Hamburguesa",
          price: 100.00,
          quantity: 2,
        },
        {
          name: "Soda",
          price: 35.00,
          quantity: 2,
        }
      ],
    },
    {
      orderNo: 2,
      products: [
        {
          name: "Hamburguesa",
          price: 100.00,
          quantity: 1,
        },
        {
          name: "Soda",
          price: 35.00,
          quantity: 1,
        }
      ],
    },
    {
      orderNo: 3,
      products: [
        {
          name: "Hamburguesa",
          price: 100.00,
          quantity: 1,
        },
        {
          name: "Soda",
          price: 35.00,
          quantity: 1,
        }
      ],
    },
    {
      orderNo: 4,
      products: [
        {
          name: "Hamburguesa",
          price: 100.00,
          quantity: 1,
        },
        {
          name: "Soda",
          price: 35.00,
          quantity: 1,
        }
      ],
    },
    {
      orderNo: 5,
      products: [
        {
          name: "Hamburguesa",
          price: 100.00,
          quantity: 1,
        },
        {
          name: "Soda",
          price: 35.00,
          quantity: 1,
        }
      ],
    },
    {
      orderNo: 6,
      products: [
        {
          name: "Hamburguesa",
          price: 100.00,
          quantity: 1,
        },
        {
          name: "Soda",
          price: 35.00,
          quantity: 1,
        }
      ],
    },
    {
      orderNo: 7,
      products: [
        {
          name: "Hamburguesa",
          price: 100.00,
          quantity: 1,
        },
        {
          name: "Soda",
          price: 35.00,
          quantity: 1,
        }
      ],
    },
    {
      orderNo: 8,
      products: [
        {
          name: "Hamburguesa",
          price: 100.00,
          quantity: 1,
        },
        {
          name: "Soda",
          price: 35.00,
          quantity: 1,
        }
      ],
    },
    {
      orderNo: 9,
      products: [
        {
          name: "Hamburguesa",
          price: 100.00,
          quantity: 1,
        },
        {
          name: "Soda",
          price: 35.00,
          quantity: 1,
        }
      ],
    },
    {
      orderNo: 10,
      products: [
        {
          name: "Hamburguesa",
          price: 100.00,
          quantity: 1,
        },
        {
          name: "Soda",
          price: 35.00,
          quantity: 1,
        }
      ],
    },
  ]

  const [details, setDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();

  const selectOrder = (order) => {
    setDetails(true);
    setSelectedOrder(order)
  }

  const calculateTotal = () => {
    const total = selectedOrder.products.reduce((acc,item) => acc+(item.price*item.quantity) , 0)
    return total
  }

  return (
    <div className="col-12 p-0 d-flex justify-content-center">
      { !details ?
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
                  <th className="text-center" scope="row">{order.orderNo}</th>
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
        :
        <div className="col-8 ">
          <h1>Detallas de Ordenes</h1>
          <div className="col-8">
            <button type="button" class="btn btn-link" onClick={() => setDetails(false)}>
              <FiChevronLeft />
              <text>Atras</text>
            </button>
          </div>
          <div className="col-8 row">
            <text>Order Numero:</text>
            <text>{selectedOrder.orderNo}</text>
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
                  <td className="text-center" scope="row">{product.quantity}</td>
                  <td className="text-center" scope="row">{product.name}</td>
                  <td className="text-center" scope="row">{product.price}</td>
                </tr>
              ))}
              <td className="text-center" scope="row"></td>
              <th className="text-center" scope="row">Total</th>
              <td className="text-center" scope="row">{calculateTotal()}</td>
            </tbody>
          </table>
          <div className="text-right">
            <button type="button" class="btn btn-info">Cobrar</button>
          </div>
        </div>
      }
    </div>
  );
}

export default Orders;