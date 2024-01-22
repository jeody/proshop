import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import axios from 'axios';
import { toast } from 'react-toastify';

const IssueDirectiveScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo.id;
  const [isUploading, setIsUploading] = useState('');
  const [name, setName] = useState(userInfo?.name || '');

  //const uploadHandler = () => {};
  const uploadHandler = async (images, userId) => {
    const formData = new FormData();
    Array.from(images).forEach((image) => {
      formData.append('images', image);
    });
    try {
      await axios.post(
        'http://localhost:5000/api/users/permitUpload?userId=' + userId,
        formData
      );
      toast.success('Files uploaded!');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      //toast.error(err?.data?.message || err.error);
      toast.error('Invalid file, not uploaded!');
    }
  };

  return (
    <FormContainer>
      <h1>Upload PDF File</h1>

      <Form>
        <Form.Group controlId='name' className='my-2'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='uploadfile' className='my-2'>
          <Form.Label>Upload Issuance Directive</Form.Label>
          <Form.Control
            type='file'
            multiple
            onChange={(e) => {
              setIsUploading('upload files in progress ...');
              uploadHandler(e.target.files, userId)
                .then((data) => {
                  setIsUploading('upload file completed');
                })
                .catch((er) =>
                  setIsUploading(
                    er.response.data.message
                      ? er.response.data.message
                      : er.response.data
                  )
                );
            }}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='my-2'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default IssueDirectiveScreen;
