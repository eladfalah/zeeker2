import car_logine from '../assets/image_car_1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import zeekr_logo from '../assets/ZEEKR_full logo white SHKOF.png'
import Input_section from './Input_section'
import Orange_button from './Orange_button'
export const Logine_page = () => {
 return (
      
    <>
<div className='container-fluid'>
<div className='row max-0 header'>
<div className='px-0'><img src={car_logine} className='w-100'/></div>
</div>
<div className='row max-0  baner'>

<div className='col-12 px-0 d-flex justify-content-center  pt-2 '><img src={zeekr_logo} className='w-0'/></div>
<div className='d-flex flex-column p-1 mt-2'>
<Input_section name="p" type="number" text="מספר טלפון נייד" />
<Input_section name="n" type="number" text="מספר רישוי של הרכב" />
<span className='d-flex justify-content-center mt-3 text-end text-secondary'>

ניתן להוסיף רק רכבים שיבאו <br />ע"י ניאו מוביליטי בע"מ</span>
</div>
</div>

<div className='row max-0 footer'>

<Input_section name="q" type="checkbox" text="אישור תנאי שימוש" />
<Orange_button  text="המשך" />
<h6 className='text-center'><a className="text-white" href="#">יצירת קשר</a></h6>
</div>
</div>
    </>
  );
};

export default Logine_page;
