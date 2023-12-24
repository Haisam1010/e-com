import { Link, useParams } from 'react-router-dom'
import { Row,Col,Card,ListGroup,Button,Image } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import { useGetProductDetailsQuery } from '../slices/productsAppSlice'
import Message from '../components/Message'



const ProductScreen = () => {
    const { id: productId } = useParams();
    const {data:products,isLoading,error} =  useGetProductDetailsQuery(productId);
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
                  <ListGroup.Item>
                  <Button className='btn-block' type='button' disabled={products.countInStock === 0}>
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