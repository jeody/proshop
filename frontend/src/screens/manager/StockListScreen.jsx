import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { BsCart4 } from 'react-icons/bs';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import {
  useGetStocksQuery,
  useDeleteStockMutation,
  useCreateStockMutation,
  useCreateNewStockMutation,
} from '../../slices/stocksApiSlice';

const StockListScreen = () => {
  const [createStock, { isLoading: loadingCreate }] = useCreateStockMutation();
  const [createNewStock, { isLoading: loadingNewCreate }] =
    useCreateNewStockMutation();
  const { data: stocks, isLoading, error, refetch } = useGetStocksQuery();

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

  const createNewStockHandler = async () => {
    if (
      window.confirm('Are you sure you want to add stock to product table?')
    ) {
      try {
        await createNewStock();
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
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>#</th>
                <th>DATE ENCODED</th>
                <th>NOMENCLATURE</th>
                <th>SERIAL NUMBER</th>
                <th>QTY</th>
                <th>MAKE</th>
                <th>UM</th>
                <th>BOX NUMBER</th>
                <th>Year Acquired</th>
                <th>REMARKS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={stock._id}>
                  <td>{index + 1}.</td>
                  <td>{stock.createdAt.substring(0, 10)}</td>
                  <td>{stock.nomenclature}</td>
                  <td>{stock.serialNumber}</td>
                  <td>{stock.qtyReceived}</td>
                  <td>{stock.makeBrand}</td>
                  <td>{stock.unitItem}</td>
                  <td>{stock.boxNumber}</td>
                  <td>{stock.yearAcquired.split('-')[0]}</td>
                  <td>{stock.remarks}</td>
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
        </>
      )}
    </>
  );
};

export default StockListScreen;
