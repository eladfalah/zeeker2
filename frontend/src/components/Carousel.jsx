// Carousel.jsx
// TO-DO (.env): None


export const Carousel = ({ title, slides = [] }) => {
  return (
    <>
      <div className='d-flex justify-content-center'>
        <h6 className='p-0'>{title}</h6>
      </div>
      <div className="container-fluid px-0">
        <div className="d-flex flex-nowrap overflow-x-auto gap-3 py-2 px-1">
          {slides.flat().map((slide, index) => (
            <div key={index} className="flex-shrink-0 col-4 col-sm-3 col-md-2">
              {slide}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
