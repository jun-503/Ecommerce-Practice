
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function CardTemplate({ img, price, title,pid ,name}) {
  const apiUrl = import.meta.env.VITE_API_URL; 'http://127.0.0.1:8000/';
  
  return (
    <Card style={{ width: '18rem' }} className='p-0 overflow-hidden h-100 shadow'>
      <div className='overflow-hidden rounded p-0 bg-light'>
        <Card.Img variant="top" src={img ? img : apiUrl+img} />
      </div>
      <Card.Body className='text-center'>
      <Card.Title className='display-6'>{name}</Card.Title>
        <Card.Title className='display-7'>Price: ${price}</Card.Title>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Some beautiful products
        </Card.Text>
        <Link to={`/products/product/${pid}`}><Button className='w-100 rounded-0' variant="success" >Go to Product</Button></Link>
      </Card.Body>
    </Card>
  );
}

export default CardTemplate;
