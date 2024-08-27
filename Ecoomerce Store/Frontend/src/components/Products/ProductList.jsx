import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardTemplate from "./Cards/Card";
import './styles.css'

const ProductGrid = ({ products, category }) => {
  
  

  return (
    <Container>
      <Row className="mt-5">
        <h1>{category ? `Category: ${category}` : "All Products"}</h1>
      </Row>
      <Row className="gy-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <CardTemplate
                img={product.image}
                price={product.price}
                title={product.title}
                pid={product.id}
                name = {product.name}
              />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <p>No products found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ProductGrid;
