import  { Link, useParams,useNavigate } from 'react-router-dom'
import { Row,Col,Card,ListGroup,Button,Image,Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import { useGetProductDetailsQuery } from '../slices/productsAppSlice'
import { useDispatch } from 'react-redux'
import Message from '../components/Message'
import { useState } from 'react'
import { addToCart } from '../slices/cartSlice'



const ProductScreen = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {qty,setQty} = useState(1)
    const {data:products,isLoading,error} =  useGetProductDetailsQuery(productId);
    const addToCartHandler = () => {
        dispatch(addToCart({...products,qty}))
        navigate('/cart')
    }
  return (
    <>
        <Link className='btn btn-light my-3' to='/'>
        Go Back
        </Link>
        {isLoading ?  <Loader /> : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
          <Row>
          <Col md={5}>
              <Image src={products.image} alt={products.name} fluid />
          </Col>
          <Col md={4}>
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                  <h3>{products.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                  <Rating values={products.rating} text={`${products.numReviews} reviews`} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                  Price: ${products.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                  Description : {products.description}
                  </ListGroup.Item>
              </ListGroup>
          </Col>
          <Col md={3}>
              <Card>
                  <ListGroup variant='flush'>
                  <ListGroup.Item>
                  <Row>
                  <Col>Price:</Col>
                  <Col>
                  <strong>${products.price}</strong>
                  </Col>
                  </Row>
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                  <Row>
                  <Col>Status:</Col>
                  <Col>
                  <strong>{products.countInStock > 0 ? 'In Stocks': 'Out of Stock'}</strong>
                  </Col>
                  </Row>
                  </ListGroup.Item>

                  {products.countInStock > 0 && (
                    <ListGroup.Item>
                        <Row>
                            <Col>Qty</Col>
                            <Col>
                                <Form.Control as='select' value={qty} onChange={(e)=> setQty(Number(e.target.value))}>
                                    {[...Array(products.countInStock).keys()].map((x)=>(
                                        <option key={x+1} value={x+1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                  <Button className='btn-block' type='button' disabled={products.countInStock === 0} onClick={addToCartHandler}>
                  Add To Cart
                  </Button>
                  </ListGroup.Item>
                  </ListGroup>
              </Card>
          </Col>
      </Row>
        )}
       
    </>
  )
}

export default ProductScreen