// src/components/SearchResults.jsx
import  { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import CardTemplate from '../Cards/Card';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery();
  const searchQuery = query.get('q');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      axios.get(`http://localhost:8000/api/products/search?q=${searchQuery}`)
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    }
  }, [searchQuery]);

  return (
    <Container>
      <Row className='mt-5'>
        <h1>Search Results for <b>{searchQuery}</b></h1>
      </Row>
      <Row className="gy-4">
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <CardTemplate img={product.image} price={product.price} title={product.title} pid={product.id} name = {product.name} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchResults;
