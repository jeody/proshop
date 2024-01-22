import React from 'react';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadExcelFileScreen = () => {
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects

  const navigate = useNavigate();

  // handle File
  const fileType = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      //console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    } else {
      console.log('plz select your file');
    }
  };

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      //console.log(data);
    } else {
      setExcelData(null);
    }
  };

  // save json file to database
  const createMultipleStockHandler = async (excelData) => {
    //console.log(excelData);
    if (
      window.confirm(
        'Are you sure you want to add these new stocks to database?'
      )
    ) {
      axios({
        method: 'POST',
        url: '/api/stocks/excel',
        data: {
          excelData: excelData,
        },
      })
        .then((res) => {
          console.log('res', res.data);
          toast.success('Stocks added to inventory.');
          navigate('/stockAdmin/stocklist/mylist');
        })
        .catch((err) => {
          console.log('error in request', err);
          toast.error(err?.data?.message || err.error);
        });
    }
  };

  return (
    <div className='container'>
      {/* upload file section */}
      <div className='form'>
        <form className='form-group' autoComplete='off' onSubmit={handleSubmit}>
          <label>
            <h5>Upload Excel file</h5>
          </label>
          <br></br>
          <input
            type='file'
            className='form-control'
            onChange={handleFile}
            required
          ></input>
          {excelFileError && (
            <div className='text-danger' style={{ marginTop: 5 + 'px' }}>
              {excelFileError}
            </div>
          )}
          <button
            type='submit'
            className='btn btn-success'
            style={{ marginTop: 5 + 'px' }}
          >
            Submit
          </button>
        </form>
      </div>

      <br></br>
      <hr></hr>

      {/* view file section */}
      <h5>View Excel file</h5>
      <div className='viewer'>
        {excelData === null && <>No file selected</>}
        {excelData !== null && (
          <div className='table-responsive'>
            {excelData.length > 0 && (
              <table className='table'>
                <thead>
                  <tr>
                    {Object.keys(excelData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {excelData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, index) => (
                        <td key={index}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {excelData !== null && (
          <Button
            className='btb-sm m-3'
            onClick={() => createMultipleStockHandler(excelData)}
          >
            <FaSave /> Save to DB
          </Button>
        )}
      </div>
    </div>
  );
};

export default UploadExcelFileScreen;
