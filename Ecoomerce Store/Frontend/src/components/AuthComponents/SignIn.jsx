import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';




const SignInForm = () => {
    const { signIn } = useAuth();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate()
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const result = await signIn(credentials.email, credentials.password);
            // const user = userCredential.user
            setCredentials({email:'',password:''})
            const token = await result.user.getIdToken();
            Cookies.set('idToken',token,{path:'/'})
            navigate("/products")
            
            
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title>Sign In</Card.Title>
                    <Form onSubmit={handleSignIn}>
                        <Form.Group as={Row} className="mb-4" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">
                                Email
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="abc@xyz.com"
                                    required
                                    onChange={handleChange}
                                    value={credentials.email}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-4" controlId="formPlaintextPassword">
                            <Form.Label column sm="3">
                                Password
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    onChange={handleChange}
                                    value={credentials.password}
                                />
                            </Col>
                        </Form.Group>

                        <Button as="input" type="submit" value="Submit" style={{ display: 'block' }} />
                    </Form>
                    <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p>Create New Account?</p>
                        <Link to="/signup" style={{ textDecoration: 'none', color: 'red' }}>Sign Up</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SignInForm;
