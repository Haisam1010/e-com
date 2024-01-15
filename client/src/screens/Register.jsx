import { useEffect, useState } from "react"
import { Link,useLocation,useNavigate} from "react-router-dom"
import { Form,Button,Row,Col } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { useDispatch,useSelector } from "react-redux"
import Loader from "../components/Loader"
import { useRegisterMutation } from "../slices/usersApiSlices"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"

const RegisterScreen = () => {
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register,{isLoading}] = useRegisterMutation()

    const {userInfo} = useSelector((state) => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo,navigate,redirect])

    const submitHandler = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('Passwords do not match')
            return
        }
        try {
            const res = await register({name,email,password}).unwrap()
            dispatch(setCredentials({...res,}))
            navigate(redirect)
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    } 
  return (
            <FormContainer>
            <h1>Register</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>Register / Sign in</Button>
            {isLoading && <Loader/>}
        </Form>
        <Row className="py-3">
            <Col>
                Already have an Account?{' '} <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen