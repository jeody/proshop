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
} from '../../slices/stocksApiSlice';

const StockEditScreen = () => {
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
  const [source, setSource] = useState('');
  const [qtyIssued, setQtyIssued] = useState('0');
  const [onHand, setOnHand] = useState('0');
  const [dateIssued, setDateIssued] = useState('');
  const [requisitioningUnit, setRequisitioningUnit] = useState('');
  const [authority, setAuthority] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [fsc, setFsc] = useState('0');
  const [niin, setNiin] = useState('0');
  const [description, setDescription] = useState('');
  const [warehouse, setWarehouse] = useState(0);

  const { data: stock, isLoading, error } = useGetStockDetailsQuery(stockId);

  const [updateStock, { isLoading: loadingUpdate }] = useUpdateStockMutation();

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
      setSource(stock.source);
      setQtyIssued(stock.qtyIssued);
      setOnHand(stock.onHand);
      setDateIssued(stock.dateIssued);
      setRequisitioningUnit(stock.requisitioningUnit);
      setAuthority(stock.authority);
      setDocumentNumber(stock.documentNumber);
      setFsc(stock.fsc);
      setNiin(stock.niin);
      setDescription(stock.description);
      setWarehouse(stock.warehouse);
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
      source,
      qtyIssued,
      onHand,
      dateIssued,
      requisitioningUnit,
      authority,
      documentNumber,
      fsc,
      niin,
      description,
      warehouse,
    };

    const result = await updateStock(updatedStock);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Stock updated');
      navigate('/stockAdmin/stocklist/mylist');
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
      <Link to='/stockAdmin/stocklist/mylist' className='btn btn-light my-3'>
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

            <Form.Group controlId='source' className='my-2'>
              <Form.Label>Source</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter source'
                value={source}
                onChange={(e) => setSource(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='qtyIssued' className='my-2'>
              <Form.Label>Quantity Issued</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Qty Issued'
                value={qtyIssued}
                onChange={(e) => setQtyIssued(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='onHand' className='my-2'>
              <Form.Label>Quantity On Hand</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Qty on Hand'
                value={onHand}
                onChange={(e) => setOnHand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='dateIssued' className='my-2'>
              <Form.Label>Date Issued</Form.Label>
              <Form.Control
                type='date'
                placeholder='Date Issued'
                value={dateIssued}
                onChange={(e) => setDateIssued(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='requisitioningUnit' className='my-2'>
              <Form.Label>Requisitioning Unit</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Requisitioning Unit'
                value={requisitioningUnit}
                onChange={(e) => setRequisitioningUnit(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='authority' className='my-2'>
              <Form.Label>Authority</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Authority'
                value={authority}
                onChange={(e) => setAuthority(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='documentNumber' className='my-2'>
              <Form.Label>Document Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Document Number'
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='fsc' className='my-2'>
              <Form.Label>FSC</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter FSC'
                value={fsc}
                onChange={(e) => setFsc(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='niin' className='my-2'>
              <Form.Label>NIIN</Form.Label>
              <Form.Control
                type='number'
                placeholder='NIIN'
                value={niin}
                onChange={(e) => setNiin(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description' className='my-2'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='warehouse' className='my-2'>
              <Form.Label>Warehouse</Form.Label>
              <Form.Control
                as='select'
                value={warehouse}
                onChange={(e) => setWarehouse(Number(e.target.value))}
              >
                <option value='0'>Select...</option>
                <option value='1'>Warehouse 1</option>
                <option value='2'>Warehouse 2</option>
                <option value='3'>Warehouse 3</option>
                <option value='4'>Warehouse 4</option>
                <option value='5'>Warehouse 5</option>
                <option value='6'>Warehouse 6</option>
              </Form.Control>
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
