import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from '../slices/ordersApiSlice';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const OrderScreen = () => {
  const navigate = useNavigate();
  const pdfRef = useRef();
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isloading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            clientId: paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success('Payment successful');
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  //Payment OptionNoPaypal
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    //toast.success('Payment successful');
    toast.success('Orders posted!');
  }
  //Payment OptionNoPaypal

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
      const imgX = (pdfWidth - imageWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        'PNG',
        imgX,
        imgY,
        imageWidth * ratio,
        imageHeight * ratio
      );
      pdf.save(`afplsc-Invoice.pdf`);
    });
  };

  const uploadPermit = async () => {
    navigate('/directive');
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <>
      <div className='container' ref={pdfRef}>
        <h1>Order # {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong> {order.user.email}
                </p>
                <p>
                  <strong>Address: </strong> {order.shippingAddress.address},{' '}
                  {order.shippingAddress.city}{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant='success'>
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
              </ListGroup.Item>
              {/* PAYPAL Payment */}
              {/*
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            */}
              {/* PAYPAL Payment */}
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col to={`/product/${item.product}`}>{item.name}</Col>
                      <Col md={4}>
                        {item.qty} x 0.00 {/* {item.price} */} ={' '}
                        <span>&#8369;</span>{' '}
                        {(item.qty * item.price).toLocaleString('en-US')}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    <Col>
                      <span>&#8369;</span>
                      {order.itemsPrice.toLocaleString('en-US')}
                    </Col>
                  </Row>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>
                      <span>&#8369;</span>
                      {order.shippingPrice.toLocaleString('en-US')}
                    </Col>
                  </Row>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>
                      <span>&#8369;</span>
                      {order.taxPrice.toLocaleString('en-US')}
                    </Col>
                  </Row>
                  <Row>
                    <Col>Total:</Col>
                    <Col>
                      <span>&#8369;</span>
                      {order.totalPrice.toLocaleString('en-US')}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}

                    {isPending ? (
                      <Loader />
                    ) : (
                      <div>
                        {/* Payment Option_noPaypal */}
                        {!order.isUpload ? (
                          <Button
                            onClick={onApproveTest}
                            style={{ marginBottom: '10px' }}
                            disabled
                          >
                            Finalize Order
                          </Button>
                        ) : (
                          <Button
                            onClick={onApproveTest}
                            style={{ marginBottom: '10px' }}
                          >
                            Finalize Order
                          </Button>
                        )}

                        {/* Payment Option_noPaypal */}
                        {/* PAYPAL Payment */}
                        {/*
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                      */}
                        {/* PAYPAL Payment */}
                      </div>
                    )}
                  </ListGroup.Item>
                )}

                {loadingDeliver && <Loader />}

                {userInfo && userInfo.isAdmin && !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverOrderHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
                {/*
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverOrderHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              */}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
      <div className='text-center my-3'>
        {!order.isUpload ? (
          <button className='btn btn-primary btn-lg' onClick={uploadPermit}>
            Upload Issuance Directive
          </button>
        ) : (
          <button className='btn btn-primary btn-lg' onClick={downloadPDF}>
            Download as PDF
          </button>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
