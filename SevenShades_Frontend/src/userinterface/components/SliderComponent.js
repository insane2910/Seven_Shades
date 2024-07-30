
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchDjangoApiService";

export default function SliderComponent(props) {
  var settings = {
    dots: true,
    infinite: true,
    
    autoPlay:true,
    autoplaySpeed:3000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  var data=props.data 
  const showSlider=()=>{
   return data.map((item)=>{
    return <div><img src={`${serverURL}/static/${item}`} style={{width:'98%',height:'46%'}}/></div>
   })

  }
  return (
    <div style={{width:'100%'}}>
    <Slider {...settings}>
       {showSlider()}
    </Slider>
    </div>
  );
}