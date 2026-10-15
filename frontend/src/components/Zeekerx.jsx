import React, { useRef, useState } from 'react';
import Locations_section, {} from './map/Locations_section';
import Services_page,{}  from './vehicles/Service_Page';
export const Zeekerx = () => {
  const navItems = [
    { title: 'הרכב', link: '#' },
    { title: 'סוללה', link: '#' },
    { title: 'דשבורד', link: '#' },
    { title: 'הסטורית טיפולים', link: '#' },
    { title: 'סוכנות הרכב', link: '#' },
  ];

  const navRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - navRef.current.offsetLeft);
    setScrollLeft(navRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - navRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    navRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <div className="container-fluid bg-secondary text-white m-0 p-3 w-100">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <div>
            <img className="m-0 p-0" src="/assets/arrow.png" alt="Back" />
          </div>
          <div>
            <h2 className="m-0">ZEEKER X</h2>
          </div>
          <div>
            <button type="button" className="btn p-0 m-0 border-0">
              <img className="m-0" src="/assets/arr_left.png" alt="Next" />
            </button>
          </div>
        </div>
      </div>

      <div className="container-fluid text-white m-0 p-3 w-100 position-absolute start-0 end-0 z-3">
        <div className="header">
          <div
            ref={navRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            style={{
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              cursor: isDown ? 'grabbing' : 'grab',
              userSelect: 'none',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <ul className="d-inline-flex flex-row list-unstyled m-0 p-0">
              {navItems.map((page, index) => (
                <li key={index} className="m-2 border-0 bg-transparent">
                  <a
                    className="link-opacity-10 text-white text-decoration-none"
                    href={page.link}
                    draggable="false"
                  >
                    {page.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        
          <div className="col-12">
<Locations_section />
</div>
      
      </div>
    </>
  );
};

export default Zeekerx;
