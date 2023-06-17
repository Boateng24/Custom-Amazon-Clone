import {useState, useEffect} from 'react'
import Header from '../components/Header';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { db } from '../firebase/firebase';
import {collection, query, onSnapshot, orderBy, DocumentData} from 'firebase/firestore';
import Order from '../components/Order';


interface ItemOrdered {
  data: DocumentData
}
const Orders = () => {
  const [orders, setOrders] = useState<ItemOrdered[]>([])
  // const {products} = useSelector((state:RootState) => state.addItemToBasket);
  const user = useSelector((state:RootState) => state.auth.user?.user)

  useEffect(() => {
     const unsubscribe = onSnapshot(
      user?.uid ?
      query(
        collection(db, 'users', user.uid, 'orders'),
        orderBy('created', 'desc')
      ):
      query(collection(db, 'orders')),
      (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            data: doc.data()
          }))
        )
      }
     );
     return () => {
      unsubscribe();
     }
  }, [user])
  

  
  return (
    <div>
      <Header />
      <>
        {orders.length < 1 ? (
          <h1 className="order_title font-bold text-2xl flex items-center justify-center mt-4">
            No item Ordered
          </h1>
        ) : (
          <h1 className="order_title font-bold text-2xl flex items-center justify-center mt-4">
            {orders.length === 1
              ? `${orders.length} Item Ordered`
              : `${orders.length} Items Ordered`}
          </h1>
        )}
      </>
      <div className="orders py-5 px-40">
        {orders.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders