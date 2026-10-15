import React from 'react';

export const InfoPanel = ({ title, text = [], buttons = [], imgUrl, imgAlt = 'תמונת פאנל', phone, list=[], note }) => {
  const isPng = typeof imgUrl === 'string' && (
    /\.png(\?.*)?$/i.test(imgUrl) || 
    imgUrl.startsWith('data:image/png')
  );

  const textLines = Array.isArray(text) ? text : [text];
  const buttonList = Array.isArray(buttons) ? buttons : [buttons];

  const hasPhone = Boolean(phone);
  const notchRadius = 14;

const panelMask = hasPhone ? {
  WebkitMaskImage: `
    radial-gradient(circle ${notchRadius}px at 0 0, transparent 98%, black 100%),
    radial-gradient(circle ${notchRadius}px at 0 100%, transparent 98%, black 100%)
  `,
  WebkitMaskPosition: 'top left, bottom left',
  WebkitMaskSize: '100% 50%',
  WebkitMaskRepeat: 'no-repeat',
  // ...
} : {};
  const stubMask = {
    WebkitMaskImage: `
      radial-gradient(circle ${notchRadius}px at 100% 0, transparent 98%, black 100%),
      radial-gradient(circle ${notchRadius}px at 100% 100%, transparent 98%, black 100%)
    `,
    WebkitMaskPosition: 'top right, bottom right',
    WebkitMaskSize: '100% 50%',
    WebkitMaskRepeat: 'no-repeat',
    maskImage: `
      radial-gradient(circle ${notchRadius}px at 100% 0, transparent 98%, black 100%),
      radial-gradient(circle ${notchRadius}px at 100% 100%, transparent 98%, black 100%)
    `,
    maskPosition: 'top right, bottom right',
    maskSize: '100% 50%',
    maskRepeat: 'no-repeat'
  };

  const dashedDividerStyle = {
    width: '2px',
    marginTop: `${notchRadius}px`,
    marginBottom: `${notchRadius}px`,
    backgroundImage: 'repeating-linear-gradient(to bottom, #ffffff, #ffffff 6px, transparent 6px, transparent 12px)',
    zIndex: 2
  };

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-stretch justify-content-center w-100">
        {hasPhone && (
          <>
            <div 
              className="bg-secondary text-white d-flex align-items-center justify-content-center px-2 py-3"
              style={{ 
                width: '45px', 
                writingMode: 'vertical-rl', 
                direction: 'ltr',
                ...stubMask 
              }}
            >
              <span className="fw-bold dir-ltr small" style={{ letterSpacing: '1px' }}>{phone}</span>
            </div>

            <div style={dashedDividerStyle} />
          </>
        )}

        <div 
          className="card flex-grow-1 bg-secondary position-relative border-0 rounded-0" 
          style={{ overflow: 'visible', ...panelMask }}
        >
          {isPng && (
            <div 
              className="position-absolute start-50" 
              style={{ 
                top: 0, 
                transform: 'translate(-50%, -67.5%)',
                zIndex: 10,
                pointerEvents: 'none'
              }}
            >
              <img 
                src={imgUrl} 
                alt={imgAlt} 
                style={{ 
                  maxHeight: '120px',
                  width: 'auto',
                  display: 'block' 
                }} 
              />
            </div>
          )}

          <div className="card-body">
            {title && (
              <h5 className="card-title text-center text-white mb-3">
                {title}
              </h5>
            )}

            {list && (
<ul className="list-unstyled card-title text-center text-white mb-3 align-items-end mr-0 ">
  {list.map((line, i) => (
    <li key={i} className="align-items-center gap-2">
      <span>{line}</span>
      <span>•</span>
    </li>
  ))}
</ul>
)}
            {textLines.length > 0 && (
              <ul className="card-text text-center list-unstyled text-white mb-3">
                {textLines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}

            {buttonList.length > 0 && (
              <div className="d-flex justify-content-center gap-2">
                {buttonList.map((button, i) => (
                  <React.Fragment key={i}>
                    {button}
                  </React.Fragment>
                ))}
              </div>
            )}

            {note && (
              <div className="text-center text-white small mt-4 pt-2">
                {note}*
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
