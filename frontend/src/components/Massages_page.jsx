import {InfoPanel} from './InfoPanel';
import {Orange_button} from './Orange_button';

export const Massages_page = () => {
let massege={title:"השלמת תהליך המימון", text:"יש להשלים את התהליך עד ל30.3 עברנו לשלב הבא והשמחה מרובהמה שנשאר הוא להכניס והשלים את התהליך"} 
return (
      
    <div className='container-fluid  flex-column px-0'>
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


<InfoPanel  
title={massege.title}
text={[massege.text]}
/>

        <div className="row g-0 footer">
          <button type="submit" className="...">...</button> 

          <h6 className="text-center mt-3">
            <a className="text-white" href="#contact">יצירת קשר</a>
          </h6>
        </div>

</div>
 
);
};

export default Massages_page;
