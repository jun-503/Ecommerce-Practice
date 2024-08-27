
import { useLoaderData, useParams } from 'react-router-dom';
import ProductGrid from './ProductList';
import { useEffect, useState } from 'react';


const ProductPage = () => {
  const products_data = useLoaderData(); // Gets data from the loader
  const [products,setProducts] = useState([])
  const { category } = useParams();
  useEffect(() => {
    setProducts(products_data)
  },[products_data])

  
  
  return (
    <div>
       

      <ProductGrid products={products} category={category} />
    </div>
  );
};

export default ProductPage;
