import {GoogleMapContainer} from '../GoogleMapContainer';
import {Orange_button} from '../Orange_button';
import { useState } from 'react';

import {ErrorMessage} from '../ErrorMessage';
import {Panel} from '../Panel';
export const Locations_section = () => {
const [selectedLocation, setSelectedLocation] = useState(null);
const garages = [
{id: 1, location:{  title: 'תל אביב - מרכז', position: { lat: 32.0853, lng: 34.7818 }}, data:{name:"מוסך ובניו", time:"ראשון עד חמשי: 8:00=12:00", email:"aaa@gmail.com", services:['lhkhklhi','ikk','kkkkkki','ikkkk','i','i','i','i','i','i','i','i','i','i','ichjhcfhc','llli'],phone:"0000000000000000000000", telegram:"", whatsap:"" } },
  {id: 2, location:{  title: 'חיפה - המושבה הגרמנית', position: { lat: 32.8191, lng: 34.9983 }} , data:{name:"מוסך ובניו", time:"", email:"aaa@gmail.com", services:[],phone:"0000000000000000000000000000000000000", telegram:"", whatsap:"" } },
  {id: 3, location:{  title: 'ירושלים - העיר העתיקה', position: { lat: 31.7767, lng: 35.2345 }} , data:{name:"מוסך ובניו", time:"ראשון עד חמשי: 8:00=12:00", email:"aaa@gmail.com", services:[],phone:"000000000000000000000", telegram:"", whatsap:"" }},
  {id: 4, location:{  title: 'באר שבע - מרכז', position: { lat: 31.2530, lng: 34.7915 }} ,  data:{name:"מוסך ובניו", time:"ראשון עד חמשי: 8:00=12:00", email:"aaa@gmail.com", services:[],phone:"", telegram:"", whatsap:"" }}
];

return (
      
    <>
<div className='container fluid vh-100 d-flex flex-column p-0 z-n1'
>
{
("geolocation" in navigator)?

<GoogleMapContainer 
garages={garages} 
selectedLocation={selectedLocation}
  setSelectedLocation={setSelectedLocation}
/>
:<ErrorMessage text={"הדפדפן שלך לא תומך geolocationב"} />
}
{selectedLocation && (
    <div className="position-absolute bottom-0 start-0 w-100 h-45 bg-dark text-white p-3 z-3 shadow-lg overflow-auto">
      <div className="d-flex flex-column justify-content-between align-items-end ">
        <h1 className="m-0">{selectedLocation.data.name&&selectedLocation.data.name}</h1>
       <div className='d-flex flex-column justify-content-between align-items-end mt-2 mb-2'>
        <span>{selectedLocation.data.time&&selectedLocation.data.time}</span>
        <span>{selectedLocation.data.phone&&selectedLocation.data.phone}</span>
</div>

       <div className='d-flex flex-column justify-content-between align-items-end mt-2 mb-2'>

        <h1 className="m-0">שירותי הסוכנות</h1>

       <ul className='container d-flex flex-row list-group justify-content-between align-items-end p-1  mb-2 flex-wrap'>
{
selectedLocation.data.services&&selectedLocation.data.services.map((service, index)=><li key={index} className='list-group-item bg-secondary p-1 m-1 rounded-pill'><span>{service}</span></li>)
}
</ul>
       <ul className='container d-flex flex-column list-group justify-content-between align-items-end p-1  mt-2 flex-wrap align-items-center '>
{
['הזמנת שירות','שינוי סוכנות מועדפת' ].map((text, index)=><li key={index} className='list-group-item rounded-pill bg-dark'><Orange_button text={text} /></li>)
}
</ul>
</div>
      </div>
    </div>
  )}
</div>
<div className='container z-1'>
<h1>khfffffffffffffffffffffffff</h1>
</div>
    </>
  );
};

export default Locations_section;
