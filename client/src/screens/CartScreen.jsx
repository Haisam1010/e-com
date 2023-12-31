import {Link,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col,Row,ListGroup,Image,Form,Button,Card } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'


const CartScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state)=> state.cart)
    const {cartItems} = cart
  return (
    <Row>
    <Col md={8}>
        <h1 style={{marginBottom:'20px'}}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
            <Message>
            Your Cart Empty <Link to='/'>Go Back</Link>
            </Message>
        ) : (
            <ListGroup variant='flush' >
            {cartItems.map((item) => {
                <ListGroup.Item key={item._id}>
                <Row>
                    <Col md={2}>
                    <Image src={item.Image} alt={item.name} fluid rounded/>
                    </Col>
                    <Col md={3}>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                    {item.price}
                    </Col>
                    <Col md={2}>
                    
                    </Col>
                </Row>
                </ListGroup.Item>
            })}
            </ListGroup>
        )}
    </Col>
    </Row>
  )
}

export default CartScreen