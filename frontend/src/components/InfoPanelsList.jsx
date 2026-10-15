import React from 'react';
import InfoPanel from './InfoPanel';

export const InfoPanelsList = ({ title, dataObjects = [], followingLine = false }) => {
  const totalItems = dataObjects.length;

  return (
    <>
      <div className="container d-flex flex-column bg-transparent">
        {title && (
          <div className="container d-flex text-center justify-content-center bg-transparent">
            <h4>{title}</h4>
          </div>
        )}

        <div className="list-group d-flex flex-column p-0 bg-transparent">
          {dataObjects.map((dataObject, i) => {
            const isLast = i === totalItems - 1;

            if (!followingLine) {
              return (
                <div key={i} className="list-group-item border-black p-0 m-0 bg-transparent">
                  {dataObject}
                </div>
              );
            }

            return (
              <div key={i} className="d-flex align-items-start bg-transparent">
                <div className="list-group-item border-black p-0 m-0 bg-transparent flex-grow-1">
                  {dataObject}
                </div>

                <div 
                  className="d-flex flex-column align-items-center ms-2" 
                  style={{ alignSelf: 'stretch' }}
                >
                  <div
                    style={{
                      width: '1em',
                      height: '1em',
                      borderRadius: '50%',
                      backgroundColor: isLast ? 'orange' : 'black',
                      border: isLast ? 'none' : '2px solid orange',
                      flexShrink: 0,
                      boxSizing: 'border-box'
                    }}
                  />

                  {!isLast && (
                    <div
                      style={{
                        width: '2px',
                        backgroundColor: '#ccc',
                        flexGrow: 1
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default InfoPanelsList;
