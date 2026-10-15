import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input_section } from './Input_section';
import { Orange_button } from './Orange_button';

export const Contact_page = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    emailPassword: '',
    subject: '',
    message: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fieldKeys = [
    'firstName',
    'lastName',
    'phone',
    'email',
    'emailPassword',
    'subject',
  ];

  const fields = [
    ['שם פרטי', 'text'],
    ['שם משפחה', 'text'],
    ['מספר טלפון', 'tel'],
    ['כתובת מייל', 'email'],
    ['סיסמה למייל', 'password'],
    ['נושא', 'text'],
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
    
    if (isAnyFieldEmpty) {
      setError('נא למלא את כל השדות');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/contacts', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.success) {
        navigate('/Home_page');
      }
    } catch (err) {
      console.error('Contact Error:', err);
      setError(err.response?.data?.error || 'שגיאה בשליחת הפנייה, נא לנסות שוב');
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

            <li className='list-group-item bg-black bg-75-100 text-white border border-black'>
              <label htmlFor="message" className="form-label">הודעה</label>
              <textarea 
                className="form-control" 
                id="message" 
                name="message"
                rows="4"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
              />
            </li>
          </ul>   
        </div>
      </div>

      <div className='container bottom mt-3'>
        <div className='row mt-2 d-flex flex-column justify-content-center p-1'>
          <div className="input-group d-flex flex-column justify-content-center p-1">
            <div className='m-1 p-0 d-flex justify-content-center' onClick={handleSubmit} style={{ cursor: 'pointer' }}>
              <Orange_button text={loading ? "שולח..." : "קדימה"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact_page;
