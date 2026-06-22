import {Orange_button} from "./Orange_button"
import {Carousel} from "./Carousel"
export const Bottom_bar = () => {
let icons=["paper", "grey_car", "flower", "elct"] 
return (
      
    <>
<div className="row d-flex flex-column justify-content-around fixed-bottom">
<Carousel />
<ul className="list-group list-unstyled d-flex flex-row bg-dark justify-content-around">
{icons.map((icon, index)=><li key={index}><img src={`../../public/assets/icons/${icon}.png`} /></li>&&(index==1)&&<li key={"x"}><Orange_button /> </li>)}
</ul>
</div>
    </>
  );
};

export default Bottom_bar;
