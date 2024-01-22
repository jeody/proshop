import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Warehouse = ({ warehouse }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/warehouse/${warehouse.id}`}>
        <Card.Img src={warehouse.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/warehouse/${warehouse.id}`}>
          <Card.Title as='div' className='warehouse-title'>
            <strong>{warehouse.title}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={warehouse.rating}
            text={`${warehouse.numReviews} reviews`}
          />
        </Card.Text>
        {/*
        <Card.Text as='h3'>
          <span>&#8369; </span>
          {warehouse.price.toLocaleString('en-US')}
        </Card.Text>
  */}
      </Card.Body>
    </Card>
  );
};

export default Warehouse;
