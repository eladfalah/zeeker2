import {Bottom_bar} from './Bottom_bar'
import {Carousel} from './Carousel'
export const Home_page = () => {
let arr=[];
let data=[
["but.png", "1","1"],
["but.png", "2","1"],
["but.png", "3","1"],
["but.png", "4","1"],
];
//for(let i=0;i<data.length;i++){
//arr.push(<Panel icon={data[i][0]} top_text={data[i][1]} bottom_text={data[i,2]}/>)
//}
 return (
    <>
<div className='container-fluid'>

<div className='container header'> <h1>temperery</h1></div>
<div className='container baner align-middle'>
     <div className='container '> <Bottom_bar /></div>
</div>
</div>
    </>
  );
};

export default Home_page;
