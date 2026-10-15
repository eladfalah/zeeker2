import React from 'react';
import Panel from './Panel';

export const PanelsBoard = ({ data = [], title, isGrid = false }) => {  
  return (
    <div className="container py-4">
      {title && (
        <h4 className="text-white text-center fw-bold mb-4">
          {title}
        </h4>
      )}

      <div 
        className={
          isGrid 
            ? "d-flex flex-wrap justify-content-center gap-2" 
            : "row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-2 justify-content-center"
        }
      >
        {data.map((element, i) => (
          <div 
            key={element.id || i} 
            className={isGrid ? "d-flex col-auto" : "col d-flex justify-content-center"}
          >
            <div className="w-100 bg-transparent border-0 shadow-none p-1"> 
              <Panel 
                icon={element.icon}
                top_text={element.top_text}
                bottom_text={element.bottom_text}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelsBoard;
