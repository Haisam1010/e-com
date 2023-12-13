import {Container,Row,Col} from 'react-bootstrap'

const Footer = () => { 
    const current_year = new Date().getFullYear()
  return (
    <footer>
    <Container>
    <Row>
    <Col className='text-center py-3'>
    <p>E-Shop Developed By Haizam &copy; {current_year}</p>
    </Col>
    </Row>
    </Container>
    </footer>
  )
}

export default Footer