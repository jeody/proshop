import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetStockDetailsQuery,
  useUpdateStockMutation,
  useUploadStockImageMutation,
  useCreateNewStockMutation,
} from '../../slices/stocksApiSlice';
//import { useCreateProductMutation } from '../../slices/productsApiSlice';

const StockEditScreen = () => {
  //const { data: products } = useGetProductDetailsNameQuery();
  const { id: stockId } = useParams();

  const [nomenclature, setNomenclature] = useState('');
  const [serialNumber, setSerialNumber] = useState(0);
  const [makeBrand, setMakeBrand] = useState('');
  const [unitItem, setUnitItem] = useState('');
  const [boxNumber, setBoxNumber] = useState('');
  const [location, setLocation] = useState('');
  const [remarks, setRemarks] = useState('');
  const [dateInventory, setDateInventory] = useState('');
  const [ptisNumber, setPtisNumber] = useState(0);
  const [unitPrice, setUnitPrice] = useState('');
  const [qtyReceived, setQtyReceived] = useState('');
  const [yearAcquired, setYearAcquired] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const { data: stock, isLoading, error } = useGetStockDetailsQuery(stockId);
  //const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const [updateStock, { isLoading: loadingUpdate }] = useUpdateStockMutation();
  const [createNewStock, { isLoading: LoadingNewStock }] =
    useCreateNewStockMutation();

  const [uploadStockImage, { isLoading: loadingUpload }] =
    useUploadStockImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (stock) {
      setNomenclature(stock.nomenclature);
      setSerialNumber(stock.serialNumber);
      setMakeBrand(stock.makeBrand);
      setUnitItem(stock.unitItem);
      setBoxNumber(stock.boxNumber);
      setLocation(stock.location);
      setRemarks(stock.remarks);
      setDateInventory(stock.dateInventory);
      setPtisNumber(stock.ptisNumber);
      setUnitPrice(stock.unitPrice);
      setQtyReceived(stock.qtyReceived);
      setYearAcquired(stock.yearAcquired);
      setImage(stock.image);
      setCategory(stock.category);
    }
  }, [stock]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedStock = {
      stockId,
      nomenclature,
      serialNumber,
      makeBrand,
      unitItem,
      boxNumber,
      location,
      remarks,
      dateInventory,
      ptisNumber,
      unitPrice,
      qtyReceived,
      yearAcquired,
      image,
      category,
    };

    const result = await updateStock(updatedStock);
    if (result.error) {
      toast.error(result.error);
    } else {
      //CHECK IF ITEM EXIST IN PRODUCTS TABLE
      await createNewStock(updatedStock);
      toast.success('Stock updated');
      navigate('/stockAdmin/stocklist');
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    //console.log(e.target.files[0]);
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadStockImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/stockAdmin/stocklist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Stock</h1>

        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='nomenclature' className='my-2'>
              <Form.Label>Nomenclature</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={nomenclature}
                onChange={(e) => setNomenclature(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='serialNumber' className='my-2'>
              <Form.Label>Serial Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Serial Number'
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='my-2'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage}
              ></Form.Control>
              <Form.Control
                type='file'
                label='Choose file'
                onChange={uploadFileHandler}
              ></Form.Control>
            </Form.Group>

            {LoadingNewStock && <Loader />}
            {loadingUpload && <Loader />}

            <Form.Group controlId='makeBrand' className='my-2'>
              <Form.Label>Make Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Make/Brand'
                value={makeBrand}
                onChange={(e) => setMakeBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='unitItem' className='my-2'>
              <Form.Label>Unit Item</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Unit Item'
                value={unitItem}
                onChange={(e) => setUnitItem(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='boxNumber' className='my-2'>
              <Form.Label>Box Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Box Number'
                value={boxNumber}
                onChange={(e) => setBoxNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='location' className='my-2'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='remarks' className='my-2'>
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter remarks'
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='dateInventory' className='my-2'>
              <Form.Label>Date Inventory</Form.Label>
              <Form.Control
                type='date'
                placeholder='Enter description'
                value={dateInventory}
                onChange={(e) => setDateInventory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='ptisNumber' className='my-2'>
              <Form.Label>PTIS Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={ptisNumber}
                onChange={(e) => setPtisNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='unitPrice' className='my-2'>
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Unit Price'
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='qtyReceived' className='my-2'>
              <Form.Label>QTY Received</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Quantity Received'
                value={qtyReceived}
                onChange={(e) => setQtyReceived(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='yearAcquired' className='my-2'>
              <Form.Label>Date Acquired</Form.Label>
              <Form.Control
                type='date'
                placeholder='Enter Year Acquired'
                value={yearAcquired}
                onChange={(e) => setYearAcquired(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category' className='my-2'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default StockEditScreen;
