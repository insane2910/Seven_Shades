import { serverURL } from "../../services/FetchDjangoApiService"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef,useRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function SubcategoryComponent(props)
{   const theme = useTheme();
   const md_matches = useMediaQuery(theme.breakpoints.down('md'));
   const sm_matches = useMediaQuery(theme.breakpoints.down('sm'));   
const sldr=useRef()
   var items=props.data
  console.log(props.data)
     
     var settings = {
      dots:false,
      infinite: true,
      
      autoPlay:true,
      autoplaySpeed:3000,
      slidesToShow: sm_matches?1:md_matches?2:4,
      slidesToScroll: 1,
      arrows:false
      
    };

    const handleNext=()=>{
      sldr.current.slickNext()
    }
    const handlePrevious=()=>{
     sldr.current.slickPrev()

    }
    
   const showAllItems=()=>{
    return items.map((item)=>{
       return <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
             <div>
                <img src={`${serverURL}${item.icon}`} loading="lazy" style={{width:'90%',height:'100%'}}/>
             </div>
             <div style={{fontWeight:'bold',fontSize:20,letterSpacing:0.5}} >
                {item.subcategoryname}
             </div>
             
       </div>

    })

   }
   

    return( <div style={{width:'100%',position:'relative'}}>
      <div style={{cursor:'pointer', position:'absolute',left:'-6%',top:'34%',zIndex:3,}} onClick={handlePrevious}><ArrowBackIosIcon style={{color:'grey',fontSize:'6vw'}}/></div>
    <Slider ref={sldr} {...settings}>
     {showAllItems()}
    </Slider> 
    <div style={{cursor:'pointer', position:'absolute',right:'-7%',top:'34%',zIndex:3}}><ArrowForwardIosIcon style={{color:'grey',fontSize:'6vw'}} onClick={handleNext}/></div>
    </div>)
}