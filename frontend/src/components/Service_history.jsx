import React from 'react';
import { useNavigate } from 'react-router-dom';
import {InfoPanelsList} from '../components/InfoPanelsList' 
import {InfoPanel} from '../components/InfoPanel' 

export const Service_history = () => {
const navigate = useNavigate();
return (
      
    <>
                  <InfoPanelsList 
          title={""}
followingLine={true}
          dataObjects={
            [
              { title: "27/01/1111", text:"הילוך שלישי מרכז" },
              { title: "27/01/1111", text:"הילוך שלישי מרכז" },
              { title: "27/01/1111", text:"הילוך שלישי מרכז" },
              { title: "27/01/1111", text:"הילוך שלישי מרכז" },
              { title: "0556665382", text:"lugluglu", note:"דייייייי" },
              { phone: "0556665382" }
            ].map((massage, index) => (
              <InfoPanel  key={ index} title={massage.title} text={massage.text}/>
            ))
          }
        />

<button type="button" class="btn bg-warning btn-primary position-fixed bottom-0 end-0 m-3 z-3" onClick={() => navigate('/contact_page')}>
  שליחת מייל
</button>
    </>
  );
};

export default Service_history;
