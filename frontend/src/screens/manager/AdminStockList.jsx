import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { BsCart4 } from 'react-icons/bs';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  useGetAdminStocksQuery,
  useDeleteStockMutation,
  useCreateStockMutation,
  useCreateNewStockMutation,
} from '../../slices/stocksApiSlice';
import { useParams } from 'react-router-dom';
import PaginateStocksAdmin from '../../components/PaginateStocksAdmin';

const AdminStockList = () => {
  const { pageNumber } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;
  const [createStock, { isLoading: loadingCreate }] = useCreateStockMutation();
  const [createNewStock, { isLoading: loadingNewCreate }] =
    useCreateNewStockMutation();
  const { data, isLoading, error, refetch } = useGetAdminStocksQuery({
    userId,
    pageNumber,
  });

  const [deleteStock, { isLoading: loadingDelete }] = useDeleteStockMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteStock(id);
        toast.success('Stock deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createStockHandler = async () => {
    if (window.confirm('Are you sure you want to add a new item?')) {
      try {
        await createStock();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createNewStockHandler = async (id) => {
    if (
      window.confirm('Are you sure you want to add stock to product table?')
    ) {
      try {
        await createNewStock(id);
        toast.success('Stock added to Product table.');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h1>Available Stocks</h1>
        </Col>
        <Col className='text-end'>
          <Button className='btb-sm m-3' onClick={createStockHandler}>
            <FaEdit /> Add New Item
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingNewCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>#</th>
                <th>
                  FSN/
                  <br />
                  Part NR
                </th>
                <th>NOMENCLATURE</th>
                <th>Location</th>
                <th>U/P ($)</th>
                <th>
                  Year
                  <br />
                  Acquired
                </th>
                <th>Source</th>
                <th>
                  QTY
                  <br />
                  Rec'd
                </th>
                <th>
                  QTY
                  <br />
                  Issued
                </th>
                <th>
                  On
                  <br />
                  Hand
                </th>
                <th>
                  Date
                  <br />
                  Issued
                </th>
                <th>U/I</th>
              </tr>
            </thead>
            <tbody>
              {data.stocks.map((stock, index) => (
                <tr key={stock._id}>
                  <td>{index + 1}.</td>
                  <td>
                    {stock.fsn}
                    {stock.partNumber}
                    {stock.serialNumber}
                  </td>
                  <td style={{ textAlign: 'left' }}>{stock.nomenclature}</td>
                  <td>
                    {stock.location}
                    {stock.boxNumber}
                  </td>
                  <td>{stock.unitPrice}</td>
                  <td>{stock.yearAcquired.split('-')[0]}</td>
                  <td>{stock.source}</td>
                  <td>{stock.qtyReceived}</td>
                  <td>{stock.qtyIssued}</td>
                  <td>{stock.onHand}</td>
                  <td>{stock.dateIssued.substring(0, 10)}</td>
                  <td>{stock.unitItem}</td>
                  <td>
                    <LinkContainer to={`/stockAdmin/stock/${stock._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='success'
                      className='btn-sm'
                      onClick={() => createNewStockHandler(stock._id)}
                    >
                      <BsCart4 style={{ color: 'white' }} />
                    </Button>
                    &nbsp;
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(stock._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginateStocksAdmin
            pages={data.pages}
            page={data.page}
            isManager={true}
          />
        </>
      )}
    </>
  );
};

export default AdminStockList;
