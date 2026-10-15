import React from 'react';
import {InfoPanelsList} from '../components/InfoPanelsList' 
import {InfoPanel} from '../components/InfoPanel' 
import {PaymentPageBar} from '../components/PaymentPageBar' 

export const PaymentPage3 = () => {
 return (
      
    <>
<PaymentPageBar page_num={3} />
            <InfoPanelsList 
          title={""}
followingLine={true}
          dataObjects={
            [
              { title: "0556665382", text:"lugluglu", note:"דייייייי" },
              { title: "0556665382", text:"lugluglu", note:"דייייייי" },
              { phone: "0556665382" }
            ].map((massage, index) => (
              <InfoPanel  key={ index} title={massage.title} text={massage.text}/>
            ))
          }
        />

    </>
  );
};

export default PaymentPage3;
