import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import PaginateWarehouse from '../components/PaginateWarehouse';
import { useGetWarehouseProductsQuery } from '../slices/productsApiSlice';

const OpenWarehouse = () => {
  const { id: warehouseNumber, pageNumber } = useParams();
  const { data, isLoading, error } = useGetWarehouseProductsQuery({
    warehouseNumber,
    pageNumber,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            <Col>
              <Link to='/' className='btn btn-light mb-4'>
                Go Back
              </Link>
            </Col>
            <Col className='text-end'>
              <h4>
                Warehouse #{data.warehouseNumber} = {data.count}
              </h4>
            </Col>
          </Row>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <PaginateWarehouse
            warehouseNumber={data.warehouseNumber}
            pages={data.pages}
            page={data.page}
          />
        </>
      )}
    </>
  );
};

export default OpenWarehouse;