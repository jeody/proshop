import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
//import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Warehouse from '../components/Warehouse';

const warehouses = [
  {
    id: 1,
    title: 'Mobility Spareparts',
    image: '/uploads/image-1700730512716.jpg',
    price: '3500',
  },
  {
    id: 2,
    title: 'Firearms & Spareparts',
    image: '/uploads/image-1700730623298.jpg',
    price: '2000',
  },
  {
    id: 3,
    title: 'Warehouse 3',
    image: '/uploads/image-1700730664298.jpg',
    price: '5000',
  },
  {
    id: 4,
    title: 'KM450 Spare Parts',
    image: '/uploads/image-1700730714808.jpg',
    price: '3000',
  },
];

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  // const [advice, setAdvice] = useState('');
  // const [count, setCount] = useState(0);

  // async function getAdvice() {
  //   const res = await fetch('https://api.adviceslip.com/advice');
  //   const dataAdvice = await res.json();
  //   setAdvice(dataAdvice.slip.advice);
  //   setCount((c) => c + 1);
  // }

  // useEffect(function () {
  //   getAdvice();
  // }, []);

  // function Message(props) {
  //   return (
  //     <p>
  //       You have read <strong>{props.count}</strong> pieces of advice.
  //     </p>
  //   );
  // }
  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        ''
      ) : (
        // <Message variant='danger'>
        //   {error?.data?.message || error.error}
        // </Message>
        <>
          <h1>Latest Items</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
      <Row>
        {warehouses.map((warehouse) => (
          <Col key={warehouse._id} sm={12} md={6} lg={4} xl={3}>
            <Warehouse warehouse={warehouse} />
          </Col>
        ))}
      </Row>
      {/*
      <p>
        <button onClick={getAdvice} className='btn btn-light my-1'>
          Get advice
        </button>
        &nbsp; &nbsp; &nbsp;
        {advice}
      </p>
      <Message count={count} />
        */}
    </>
  );
};

export default HomeScreen;
