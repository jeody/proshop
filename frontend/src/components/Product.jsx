import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as='div'>
          <span>Available Stocks: </span>
          {product.countInStock.toLocaleString('en-US')}
        </Card.Text>
        {/*
        <Card.Text as='h3'>
          <span>&#8369; </span>
          {product.price.toLocaleString('en-US')}
        </Card.Text>
  */}
      </Card.Body>
    </Card>
  );
};

export default Product;
