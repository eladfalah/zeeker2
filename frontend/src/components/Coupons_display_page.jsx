// Coupons_display_page.jsx
import { InfoPanelsList } from './InfoPanelsList';
import { InfoPanel } from './InfoPanel';
import { Orange_button } from './Orange_button';

export const Coupons_display_page = () => {
  return (
    <div className='container d-flex flex-column'>
      <div className='container d-flex flex-row header row-3'>
        <div className='container'>
          <img src='../../public/assets/icons/Icons.png' alt='icon' />
        </div>
        <div className='container text-white'>
          <h2 >ZEEKER X</h2>
        </div>
      </div>

      <div className='container d-flex flex-column row-6 bg-transparent'>
        <InfoPanelsList 
          title={""}
          dataObjects={
            [
              { phone: "0556665382", list:["ששששש", "ששששש", "ששששש", "ששששש"], note:"דייייייי" },
              { phone: "0556665382" }
            ].map((coupon, index) => (
              <InfoPanel key={index} phone={coupon.phone} list={coupon.list} note={coupon.note} />
            ))
          }
        />
      </div>

      <div className='container d-flex flex-column row-3 mt-5'>
        <Orange_button text={'הקפיצו אותי למסך הראשי'} />
      </div>
    </div>
  );
};

export default Coupons_display_page;
