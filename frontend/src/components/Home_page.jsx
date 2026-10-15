import React, { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase';

import { Bottom_bar } from './Bottom_bar';

import { InfoPanel } from './InfoPanel';

import { Panel } from './Panel';

import { Carousel } from './Carousel';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';



export const Home_page = () => {

  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState(null);
  
  const [vehicle, setVehicle] = useState(null);

  const navigate = useNavigate();



  const carNumber = sessionStorage.getItem('activeCarNumber');



  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);

    });

    return () => unsubscribe();

  }, []);



  useEffect(() => {

    const fetchVehicle = async () => {

      if (!carNumber) {

        return;

      }



      try {

        const response = await axios.get(`/api/vehicles/${carNumber}`);

        setVehicle(response.data);

      } catch (err) {

        console.error(err.response?.data?.message || err.message);

      }

    };



    fetchVehicle();

  }, [carNumber]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user || !user.uid) {
        return;
      }

      try {
        const response = await axios.get(`/api/messages/${user.uid}`);
        setMessages(response.data);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
if (err.response && err.response.status === 404) {
          // אם המשתמש עדיין לא קיים בבסיס ההודעות, נגדיר מערך הודעות ריק
          setMessages({ userMasseges: [] });
        } else {
          console.error(err.response?.data?.message || err.message);
        }
      }
    };

    fetchMessages();
  }, [user]);

  const info = vehicle ? [

    <span className="text-white" key="licensePlate">

      מספר רכב: {vehicle.licensePlate || carNumber}

    </span>

  ] : [];



  const buttonsList = vehicle ? [

    <button

      type="button"

      className="btn text-white btn-warning d-flex align-items-center justify-content-center text-center p-1 flex-shrink-0"

      key="docBtn"

      onClick={() => navigate('/Upload_documents_page')}

    >

      המסמכים שלך

    </button>

  ] : [];



  return (

    <div className="container-fluid m-0 max-width">

      <div className="container header d-flex justify-content-between align-items-center px-1">

        <div className="col-3 d-flex justify-content-start">

          <div className="btn mt-2 bg-secondary p-1 position-relative" 
role="button" 
      tabIndex={0} 
      onClick={()=>navigate("/Massages_page")}
style={{ width: 'fit-content' }}>

            <div className="bg-warning px-1 rounded-circle position-absolute top-0 start-100 translate-middle z-3">

              <small className={`p-0 lh-1 d-block `}>{messages?.userMasseges?.length || 0}</small>

            </div>

            <img src="/assets/icons/Notification.png" alt="Notification" />

          </div>

        </div>



        <div className="btn p-1 col-6 text-center">

          <img src="/assets/icons/my_zeekr_logo.png" alt="Zeekr Logo" />

        </div>



        <div className="col-3 p-1 mt-2 d-flex justify-content-end align-items-center gap-2">

          <div className="text-white d-flex flex-column text-end">

            {user && user.displayName ? (

              <span>שלום {user.displayName}</span>

            ) : (

              <span>טוען נתונים / לא מחובר...</span>

            )}

          </div>



          <div className="btn bg-secondary">

            <div className="white">

              <img

                src="/assets/icons/circle-user-regular-full.svg"

                width="24"

                height="24"

                alt="User"

              />

            </div>

          </div>

        </div>

      </div>



      <div className="container banner align-middle">

        <div className="container mt-5 mb-5">

          <InfoPanel 

            title={vehicle ? vehicle.name : 'טוען פרטי רכב...'} 

            text={info}

            buttons={buttonsList}         

            imgUrl={vehicle ? vehicle.imgURL : ''}

          />

        </div>



        <div className="container">

          <Carousel

            title={"לשירותך"}

            slides={[

              [

                ['my_zeekr_logo.png', 'MY ZEEKER'],

                ['tander.png', 'נקודת טעינה'],

                ['naviget.png', 'ניווט לחניון קרוב'],

              ].map((panel, idx) => (

                <Panel key={idx} icon={panel[0]} bottom_text={panel[1]} />

              )),

            ]}

          />

        </div>



        <div className="container">

          <Bottom_bar />

        </div>

      </div>

    </div>

  );

};



export default Home_page;
