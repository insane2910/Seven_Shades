import Header from "../components/Header"
import SliderComponent from "../components/SliderComponent"
import SubcategoryComponent from "../components/SubcategoryComponent"
import TwoComponent from "../components/TwoComponent"
import TrendingBrandsComponent from "../components/TrendingBrandsComponent"
import Footer from "../components/Footer"
import Bottom from "../components/Bottom"
import {useState,useEffect} from "react"
import { getData } from "../../services/FetchDjangoApiService"
export default function Home(props)
{   const [listBanner,setListBanner]=useState([])

    const fetchAllBanners=async()=>{
        var result=await getData("banner_list")
        var images=result.data.icon.split(",")

        
        setListBanner(images)

    }
    useEffect(function(){
        fetchAllBanners()
    },[])
    return(<div style={{position:'relative',width:'100%'}}>
     <Header />    

     <div style={{display:'flex',width:'99%',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
     <div style={{marginTop:20,width:'98%',display:'flex',justifyContent:'center'}}>
     <SliderComponent data={listBanner}/> 
    </div>
    <div style={{marginTop:30,width:'98%',display:'flex',justifyContent:'center'}}>
     <SubcategoryComponent />
    </div>
    <div style={{margin:50,width:'100%',display:'flex',justifyContent:'center'}}>
     <TwoComponent />
    </div>
    <div style={{margin:50,width:'100%',display:'flex',justifyContent:'center'}}>
     <TrendingBrandsComponent />
    </div>
    <div style={{ borderTop:'1px solid #ececec', height:20, margin:0.1 }}></div>
    <div style={{margin:10,width:'100%',display:'flex',justifyContent:'center'}}>
     <Footer />
    </div>
    <div style={{backgroundColor: '#ececec',width:'100%',display:'flex',justifyContent:'space-between',padding:0,marginLeft:0,marginRight:0,}} >
     <Bottom />
    </div>
    </div>
    </div>)    
  
}