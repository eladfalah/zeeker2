export const Panel = ({ icon, top_text, bottom_text }) => {
  return (
    <div className="col-4"> 
      <div className="card bg-dark text-center p-0" aria-hidden="true" >
        
        
          <img 
            className="card-img-top mx-auto" 
            src={icon?`../../public/assets/icons/${icon}`:"..."} 
             
            style={{ width: '50%', height: 'auto' }}
          />
        
        
        <div className="card-body p-0 mt-2">
          <p className="card-text text-wrap mb-0 text-truncate" style={{ height: "70px" }}>
            <span className="d-block text-secondary small">{top_text}</span>
            <span className="d-block text-white fw-bold">{bottom_text}</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Panel;
