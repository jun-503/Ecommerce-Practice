import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import CardTemplate from "./Cards/Card";
import './styles.css';

const ProductGrid = ({ products, category }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for loading indicator demo
    setTimeout(() => setLoading(false), 1000); // Adjust based on your loading time
  }, [products]);

  return (
    <Container >
      <Row className="mt-5">
        <h1>{category ? `Category: ${category}` : "All Products"}</h1>
      </Row>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row className="gy-4 gx-4">
          {products.length > 0 ? (
            products.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                <CardTemplate
                  img={product.image}
                  price={product.price}
                  title={product.title}
                  pid={product.id}
                  name={product.name}
                />
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <p>No products found.</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default ProductGrid;
