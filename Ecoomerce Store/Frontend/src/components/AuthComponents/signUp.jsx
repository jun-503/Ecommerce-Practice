import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './SignupForm.css';
import { useAuth } from '../../Context/AuthContext';

const SignupForm = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { signUp } = useAuth();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userCredential = await signUp(formData.email, formData.password);
            const user = userCredential.user;
            alert(`New user is ${user.email}`);
            setFormData({ username: '', email: '', password: '' });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title className='mb-4'>Create Account</Card.Title>
                    {error && <p className="text-danger">{error}</p>}
                    <Form onSubmit={handleSignUp}>
                        <Form.Group as={Row} className="mb-4">
                            <Form.Label column sm="3">Username</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" placeholder="Username" required 
                                  value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">Email</Form.Label>
                            <Col sm="9">
                                <Form.Control type="email" placeholder="abc@xyz.com" required 
                                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4" controlId="formPlaintextPassword">
                            <Form.Label column sm="3">Password</Form.Label>
                            <Col sm="9">
                                <Form.Control type="password" placeholder="Password" required 
                                  value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                            </Col>
                        </Form.Group>
                        <Button as="input" type="submit" value="Submit" style={{ display: 'block' }} />
                        <div className="mt-4">
                            <p style={{ display: 'inline-block', marginRight: '12rem' }}>Already have an account?</p>
                            <Link to="/signIn"  style={{ textDecoration: 'none', color: 'red' }}>Sign In</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SignupForm;
