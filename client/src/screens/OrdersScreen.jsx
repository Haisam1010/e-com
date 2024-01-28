import { Link,useParams } from "react-router-dom"
import { Row,Col,ListGroup,Image,Form,Button,Card } from "react-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { useGetOrderQuery } from "../slices/ordersApiSlice"


const OrdersScreen = () => {
  const {id:orderId} = useParams()
   const {data:order,isLoading,error} = useGetOrderQuery(orderId)

   console.log(orderId)
  return (
    <div>
      order Page
    </div>
  )
}

export default OrdersScreen