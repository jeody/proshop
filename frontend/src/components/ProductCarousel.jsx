import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <table width='100%' align='center' border='0'>
              <tr>
                <td width='50%'>
                  <Image src={product.image} alt={product.name} fluid />
                </td>
                <td width='50%'>
                  <h6 style={{ color: 'white' }}>{product.description}</h6>
                </td>
              </tr>
            </table>
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (<span>&#8369;</span>
                {product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
