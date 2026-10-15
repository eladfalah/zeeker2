import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input_section } from './Input_section';
import { signInWithCustomToken, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

export const Logine_page = () => {
  const navigate = useNavigate();
  const [carNumber, setCarNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleLogin = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setErrorMessage('');

    if (!isChecked) {
      setErrorMessage('יש לאשר את תנאי השימוש כדי להמשיך');
      return;
    }

    const cleanPhone = phone.trim().replace(/\D/g, '');

    if (!cleanPhone) {
      setErrorMessage('נא להזין מספר טלפון תקין');
      return;
    }

    if (carNumber.length < 2) {
      setErrorMessage('נא להזין מספר רכב');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'שגיאה בשרת, נא לנסות שוב מאוחר יותר');
      }

      const userCredential = await signInWithCustomToken(auth, data.token);

      if (data.user && data.user.fullName) {
        await updateProfile(userCredential.user, {
          displayName: data.user.fullName.trim()
        });
      }

      sessionStorage.setItem('activeCarNumber', carNumber);
      console.log(sessionStorage.getItem('activeCarNumber'));
      navigate('/Home_page');
    } catch (err) {
      setErrorMessage(err.message || 'שגיאה בהתחברות');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0 header">
        <div className="col-12 px-0">
          <img 
            src="/assets/image_car_1.png" 
            alt="Car Header" 
            className="w-100" 
            style={{ 
              maxHeight: '280px', 
              objectFit: 'cover', 
              objectPosition: 'center' 
            }}
          />
        </div>
      </div>

      <form onSubmit={handleLogin} noValidate>
        <div className="row g-0 banner">
          <div className="col-12 px-0 d-flex justify-content-center pt-2">
            <img 
              src="/assets/ZEEKR_full logo white SHKOF.png" 
              alt="ZEEKR Logo" 
            />
          </div>

          <div className="d-flex flex-column p-1 mt-2">
            <Input_section 
              name="car" 
              type="text" 
              text="מספר רישוי רכב" 
              value={carNumber}
              onChange={(e) => setCarNumber(e.target.value)}
              disabled={isLoading}
            />

            <Input_section 
              name="phone" 
              type="tel" 
              text="מספר טלפון נייד" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
            />

            {errorMessage && (
              <div className="text-danger text-center mt-2 fw-bold" role="alert">
                {errorMessage}
              </div>
            )}

            <span className="d-flex justify-content-center mt-3 text-center text-secondary">
              ניתן להוסיף רק רכבים שיובאו <br /> על ידי ניאו מוביליטי בע"מ
            </span>
          </div>
        </div>

        <div className="row g-0 mt-5 mb-0 footer">
          <div className="d-flex justify-content-center">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="flexCheckDefault"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                אישור תנאי שימוש
              </label>
            </div>
          </div>
          <button type="submit" className="btn bg-warning text-white" disabled={isLoading}>המשך</button> 

          <h6 className="text-center mt-3">
            <a className="text-white" href="#contact">יצירת קשר</a>
          </h6>
        </div>
      </form>
    </div>
  );
};

export default Logine_page;
