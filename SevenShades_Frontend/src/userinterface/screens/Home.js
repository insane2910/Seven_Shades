import Header from "../components/Header"
import SubcategoryComponent from "../components/SubcategoryComponent"
import SliderComponent from "../components/SliderComponent"
import {useState,useEffect} from "react"
import { getData } from "../../services/FetchDjangoApiService"
import TwoComponent from "../components/TwoComponent"
import TrendingBrandsComponent from "../components/TrendingBrandsComponent"
import Footer from "../components/Footer"
import Bottom from "../components/Bottom"

export default function Home(props)
{   const [listBanner,setListBanner]=useState([])
    const [listSubcategory,setSubCategoryList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [listMaincategory,setMainCategoryList]=useState([])

    const fetchAllBanners=async()=>{
        var result=await getData("banner_list")
        var images=result.data.icon.split(",")

        
        setListBanner(images)

    }
    const fetchAllBrands=async()=>{
        var result=await getData("user_brand_list")
          console.log("BBBRRRRAND:",result)        

        
        setBrandList(result.data)

    }
    const fetchAllSubcategoryList=async()=>{
        var result=await getData("user_subcategory_list")
        setSubCategoryList(result.data)

    }
    const fetchAllMainCategoryList=async()=>{
        var result=await getData("user_maincategory_list")
        setMainCategoryList(result.data)

    }
    
    useEffect(function(){
        fetchAllBanners()
        fetchAllSubcategoryList()
        fetchAllBrands()
        fetchAllMainCategoryList()
    },[])


    return(<div style={{position:'relative',width:'100%'}}>
     <Header />    

     <div style={{display:'flex',width:'99%',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
     <div style={{marginTop:20,width:'98%',display:'flex',justifyContent:'center'}}>
     <SliderComponent data={listBanner}/> 
     </div>
     <div style={{marginTop:30,width:'85%',display:'flex',justifyContent:'center'}}>
      <SubcategoryComponent data={listSubcategory} />
     </div>
     <div style={{margin:50,width:'100%',display:'flex',justifyContent:'center'}}>
     <TwoComponent data={listMaincategory}/>   
     
    </div>
    <div style={{marginBottom:50,marginTop:50,width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
     <TrendingBrandsComponent data={brandList} />
    </div>
    <div style={{ borderTop:'1px solid #ececec', height:20, margin:0.1 }}></div>
    <div style={{marginBottom:10,width:'50%', display:'flex',justifyContent:'center'}}>
     <Footer />
    </div>
    <div style={{backgroundColor: '#ececec',width:'100%',display:'flex',justifyContent:'space-between',padding:0,marginLeft:0,marginRight:0,}} >
     <Bottom />
    </div>

 </div>   
    </div>)
}