import * as React from "react";
import { useState,useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Button,Badge} from "@mui/material";
 
import MenuIcon from "@mui/icons-material/Menu";
import { Divider,IconButton,Grid } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchBarComponent from "./SearchBarComponent";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DrawerComponent from "./DrawerComponent";
import { postData,getData, serverURL } from "../../services/FetchDjangoApiService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const theme = useTheme();
  var products=useSelector(state=>state.product)
  var keys=Object.values(products)
  var user=useSelector(state=>state.user)
  var userData={}
  try{
  var userData=Object.values(user)[0]

  }catch(e){}
  var navigate=useNavigate()
  const md_matches = useMediaQuery(theme.breakpoints.down('md'));
  const sm_matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [open,setOpen]=useState(false) 
  const [subCategoryList,setSubCategoryList]=useState([])
  const [brandList,setBrandList]=useState([])
  const [backgroundColor,setBackgroundColor]=useState('')
  const [statusSubMenu,setStatusSubMenu]=useState(false)

  const fetchAllBrands=async(sid)=>{
    var  result=await postData('user_brand_list',{maincategoryid:backgroundColor,subcategoryid:sid})
    setBrandList(result.data) 
    console.log(result.data)
    
}


  const fetchAllSubCategory=async(id)=>{
       var  result=await postData('user_subcategory_list_by_maincategoryid',{maincategoryid:id})
       setSubCategoryList(result.data) 
       setBackgroundColor(id)
  }
  useEffect(function(){
   fetchAllSubCategory(6)

  },[])
  const handleSubMenu=(item)=>{
    fetchAllBrands(item.id)
   setStatusSubMenu(true)
  }
  const showSubMenu=()=>{
    return(<div onMouseLeave={()=>setStatusSubMenu(false)} style={{padding:25,position:'absolute',zIndex:2,left:100,top:125, width:'60%',height:300,background:'#ffff'}}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div style={{fontWeight:'bold',color:'#95a5a6',letterSpacing:1}}>
       SHOP BY PRODUCT
            <Divider/>
          </div>
          
        </Grid>
        <Grid item xs={4}>
          <div style={{fontWeight:'bold',color:'#95a5a6',letterSpacing:1}}>
           SHOP BY BRAND
            <Divider/>
            <div style={{display:'flex',flexDirection:'column'}}>
            {showAllBrands()}
            </div>
          </div>
          
        </Grid>
        <Grid item xs={4}>
          <div style={{fontWeight:'bold',color:'#95a5a6',letterSpacing:1}}>
            SHOP BY FIT
            <Divider/>
          </div>
          
        </Grid>
        </Grid> 
    </div>)
  }

  const showAllBrands=()=>{
    return brandList.map((item)=>{
    return <div  style={{padding:5,display:'flex',justifyContent:'space-between'}}>
      <span><img src={`${serverURL}${item?.icon}`} style={{width:30,height:30,padiing:2}}/></span>
      <span style={{color:'#000'}}>{item?.brandname}</span></div>

    })
  }

  const showAllSubCategory=()=>{
    return subCategoryList.map((item)=>{
    return <div    onMouseOver={()=>handleSubMenu(item)} style={{marginRight:20}}>{item.subcategoryname}</div>

    })
  }
  const handleDrawerOpen=()=>{
    setOpen(true)
  }
  const handleLoginPage=()=>{
    navigate("/signindisplay")
  }
  const handleGotoCartPage=()=>{
    navigate('/mybagdisplay')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: "#2d2d2d" }} position="static">
        <Toolbar>

         {sm_matches?<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon /></IconButton> :<div></div>}

  

          <Typography
            variant="h6"
            component="div"
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "League Gothic",
              fontSize: 36,
              letterSpacing: 1,
              cursor: "pointer",
            }}
          >
            SevenShades
          </Typography>
          {sm_matches?<div></div>:
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: 250,
              justifyContent: "space-evenly",
            }}
          >
            <Button
              style={{
                fontFamily: "Kanit",
                color: "#fff",
                fontWeight: "bold",
                fontSize: 18,
                background:backgroundColor==6?"#485460":"#2d2d2d"
              }}
              color="inherit"
              onMouseOver={()=>fetchAllSubCategory(6)}
            >
              Men
            </Button>
            <Button
              style={{
                fontFamily: "Kanit",
                color: "#fff",
                fontWeight: "bold",
                fontSize: 18,
                background:backgroundColor==7?"#485460":"#2d2d2d"
              }}
              color="inherit"
              onMouseOver={()=>fetchAllSubCategory(7)}
            >
              Women
            </Button>
          </div>}

          {md_matches?<div></div>:<SearchBarComponent />}
          <div style={{ marginLeft: "auto",width:150,display:'flex',alignItems:'center',justifyContent:'space-evenly' }} >
          <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <PersonOutlineOutlinedIcon onClick={handleLoginPage} style={{fontSize:32}}/>
          <div style={{color:'#fff',fontSize:'0.7vw'}}>{userData?.firstname}</div>
          </div>
          <Badge badgeContent={keys.length} color="primary">
          <ShoppingBagOutlinedIcon  onClick={handleGotoCartPage} style={{fontSize:28}}/>
          </Badge>
          </div>
        </Toolbar>
      </AppBar>
      {md_matches?<div></div>:
      <AppBar style={{ background: "#485460"  }}  position="static">
        <Toolbar>
          <div   style={{display:'flex'}}>
              {showAllSubCategory()}   
          </div>
        </Toolbar>
        </AppBar>}     
      <DrawerComponent open={open} setOpen={setOpen}/>
      {statusSubMenu?showSubMenu():<div></div>}
    </Box>
  );
}
