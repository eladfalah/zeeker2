import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input_section } from './Input_section';
import { Orange_button } from './Orange_button';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../firebase';

export const Contact_page = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    birthDate: '',
    phone: '',
    email: '',
    city: '',
    street: '',
    houseNumber: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fieldKeys = [
    'firstName',
    'lastName',
    'idNumber',
    'birthDate',
    'phone',
    'email',
    'city',
    'street',
    'houseNumber'
  ];

  const fields = [
    ['שם פרטי', 'text'],
    ['שם משפחה', 'text'],
    ['תעודת זהות', 'text'],
    ['תאריך לידה', 'date'],
    ['מספר טלפון', 'tel'],
    ['כתובת מייל', 'email'],
    ['עיר מגורים', 'text'],
    ['רחוב', 'text'],
    ['מספר בית', 'number'],
  ];

  const handleChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    const isAnyFieldEmpty = Object.values(formData).some(val => !val || String(val).trim() === '');
    const fileInput = document.getElementById('formFile');
    
    if (isAnyFieldEmpty || !fileInput || !fileInput.files[0]) {
      setError('נא למלא את כל השדות ולצרף קובץ רישיון נהיגה');
      return;
    }

    setLoading(true);
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      const data = new FormData();
      data.append('phone', formData.phone);
      data.append('email', formData.email);
      data.append('fullName', fullName || 'משתמש חדש');
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('idNumber', formData.idNumber);
      data.append('birthDate', formData.birthDate);
      data.append('city', formData.city);
      data.append('street', formData.street);
      data.append('houseNumber', formData.houseNumber);
      if (fileInput && fileInput.files[0]) {
        data.append('licenseFile', fileInput.files[0]);
      }

      const registerResponse = await axios.post('/api/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (registerResponse.data && registerResponse.data.token) {
        sessionStorage.setItem('token', registerResponse.data.token);
       /* 
        const userId = registerResponse.data.user?._id;
        const uploadedFile = fileInput.files[0];
        const fileUrl = registerResponse.data.user?.licenseUrl || registerResponse.data.fileUrl || '';
*/
//העלאת אוביקת למומנגו, למחוק אם אין צורך
        //if (userId) {
          //await axios.post('/api/documents', {
            //userId: userId,
            //fileName: uploadedFile.name,
            //fileUrl: fileUrl,
           // fileType: uploadedFile.type
         // });
        //}

        try {
          const loginFetchRes = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: formData.phone })
          });

          const loginDataJson = await loginFetchRes.json().catch(() => ({}));

          if (!loginFetchRes.ok) {
            throw new Error(loginDataJson.message || 'שגיאה בשרת, נא לנסות שוב מאוחר יותר');
          }

          await signInWithCustomToken(auth, loginDataJson.token);

          navigate('/Home_page');
        } catch (err) {
          setError(err.message || 'שגיאה בהתחברות');
        }

      } else {
        setError('הקובץ לא הועלה בהצלחה לסטורג\', אנא נסה שוב');
      }
    } catch (err) {
      console.error('Registration Error:', err);
      setError(err.response?.data?.message || 'שגיאה בתהליך ההרשמה');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='baner container-fluid'>
        {error && (
          <div className="alert alert-danger text-center mt-2" role="alert">
            {error}
          </div>
        )}

        <div className='row'>
          <ul className='list-group'>
            {fields.map((field, i) => {
              const fieldKey = fieldKeys[i];
              return (
                <li key={i} className='list-group-item bg-black bg-75-100 text-white border border-black'>
                  <Input_section 
                    name={fieldKey} 
                    text={field[0]} 
                    type={field[1]}
                    value={formData[fieldKey]}
                    onChange={(e) => handleChange(fieldKey, e.target.value)}
                  />
                </li>
              );
            })}
          </ul>    
        </div>
      </div>

      <div className='container bottom mt-3'>
        <div className='row d-flex justify-content-end'>
          <h6 className=' d-flex justify-content-end'>איך לעדכן פרטים?</h6>
          <span className=' d-flex justify-content-end'>מייל וכתובת על ידי לחיצה על העיפרון</span>
          <span className=' d-flex justify-content-end'>שם, ת.ז, תאריך לידה וטלפון ע"י צילום רישיון הנהיגה </span>
        </div>

        <div className='row mt-2 d-flex flex-column  justify-content-center p-1'>
          <div className="input-group d-flex flex-column  justify-content-center p-1">
           <div className="border border-1 p-2 d-flex justify-content-end" style={{ borderStyle: 'dashed !important'}} >
           <label htmlFor="formFile">צילום רישיון נהיגה</label>
          
<img className="m-2" src='../../public/assets/icons/upload.png' />
<input className="form-control d-none" type="file" id="formFile" accept="image/*,.png, .jpg, .svg" />
            </div>
            <div className='m-1 p-0 d-flex justify-content-center' onClick={handleSubmit} style={{ cursor: 'pointer' }}>
              <Orange_button text={loading ? "נרשם..." : "קדימה"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact_page;
