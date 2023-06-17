import moment from 'moment'
import React from 'react'
import CartProduct from './CartProduct'
import { DocumentData } from 'firebase/firestore';
import CurrencyFormat from 'react-currency-format';


interface ItemOrdered {
  order: {
    data: DocumentData;
  };
}
const Order:React.FC<ItemOrdered> = ({order}) => {
  return (
    <div className="order p-10 my-5 border border-gray-200 bg-white relative">
      <p className="order-date">
        {moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}
      </p>
      {order.data.products?.map((item: DocumentData) => (
        <CartProduct
          key={item.id}
          id={item.id}
          image={item.image}
          title={item.title}
          description={item.description}
          price={item.price}
          category={item.category}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
            <h3 className='order__total font-medium text-right'>
              Order Total: <strong>{value}</strong>
            </h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Gh₵"}
      />
    </div>
  );
}

export default Order