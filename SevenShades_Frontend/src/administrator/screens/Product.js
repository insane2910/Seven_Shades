import {FormHelperText,FormControl,InputLabel,Select,MenuItem,Grid,TextField,Button,Avatar } from "@mui/material";
import { useEffect,useState } from "react";
import { getData } from "../../services/FetchDjangoApiService";
import {useStyles } from "./CategoryCss";
import TitleComponent from "../components/admin/TitleComponent";
import { postData } from "../../services/FetchDjangoApiService";
import Swal from "sweetalert2";
import listimage from "../../images/list.png"
export default function Product(props)
{
    var classes=useStyles()
    const[mainCategoryId,setMainCategoryId]=useState('')
    const[subCategoryId,setSubCategoryId]=useState('')
    const[brandId,setBrandId]=useState('')
    const[productName,setProductName]=useState('')
    const[productDescription,setProductDescription]=useState('')
    const[icon,setIcon]=useState({file:'icon.png',bytes:''}) //bytes is used to save Image
    const[formError,setFormError]=useState([{icon:false}])
    const[mainCategoryList,setMainCategoryList]=useState([])
    const[subCategoryList,setSubCategoryList]=useState([])
    const[brandList,setBrandList]=useState([])
    useEffect(function(){
        fetchAllMSP()

      },[])
      const fetchAllMSP=async()=>{
        var result=await getData('maincategory_list')
        console.log("Result",result.data)   //for testing 
        setMainCategoryList(result.data)

        

        var result=await getData('brand_list') 
        setBrandList(result.data)

      }

      const fetchAllSubcategory=async(mid)=>{
        
        var result=await postData('product_subcategory_list_by_maincategoryid',{maincategoryid:mid}) 
     
        setSubCategoryList(result.data)

      }
      
      const handleFetchSubcategory=(event)=>
      { setMainCategoryId(event.target.value)
        
       fetchAllSubcategory(event.target.value)

      }
     const fillMainCategory=()=>{
        return mainCategoryList.map((item)=>{
            return <MenuItem  value={item.id}>{item.maincategoryname}</MenuItem>
        })
    }

    const fillSubCategory=()=>{
        
        return subCategoryList.map((item)=>{
            return <MenuItem value={item.id}>{item.subcategoryname}</MenuItem>
        })
    }

    const fillBrand=()=>{
        return brandList.map((item)=>{
            return <MenuItem value={item.id}>{item.brandname}</MenuItem>
        })
    }
    const handleChange=(event)=>{
        setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        handleError(false,"icon")
    }

    const handleError=(errormessage,label)=>{  //prev means previous value of error
        setFormError((prev)=>({...prev,[label]:errormessage}))
    }

    const handleClick=async()=>{
        var err=false

        if(mainCategoryId.length==0)
        {
            handleError("Please input main category id","maincategoryid")
            err=true
        }

        if(subCategoryId.length==0)
        {
            handleError("Please input sub category id","subcategoryid")
            err=true
        }

        if(brandId.length==0)
        {
            handleError("Please input brand id","brandid")
            err=true
        }

        if(productName.length==0)
        {
            handleError("Please input product","productname")
            err=true
        }

        if(productDescription.length==0)
        {
            handleError("Please input product description","productdescription")
            err=true
        }

        if(icon.bytes.length==0) // icon named image is already exist so we have to work on bytes
        {
            handleError("Please select some icon","icon")
            err=true
        }

        if(err==false)
        {
        var formData=new FormData()
        formData.append('maincategoryid',mainCategoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('brandid',brandId)
        formData.append('productname',productName)
        formData.append('productdescription',productDescription)
        formData.append('icon',icon.bytes)
        var result=await postData('product_submit',formData)
        if(result.status)
        {
            Swal.fire({
                title: "The Seven Shades",
                text: result.message,
                icon: "success",
                toast:true
              });
        }
        else
        {
            Swal.fire({
                title: "The Seven Shades",
                text: result.message,
                icon: "error",
                toast:true
              });
        }
      }
    }

    return(<div className={classes.root}>
    <div className={classes.box}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TitleComponent width={120} title={'Product'} listicon={listimage} link='/admindashboard/displayproduct' />
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel>Main Category Id</InputLabel>
                    <Select onChange={handleFetchSubcategory} onFocus={()=>handleError('','maincategoryid')} error={formError.maincategoryid} value={mainCategoryId} label={"Main Cajhgfjktegory Id"} >
                        <MenuItem value="Select Category" >Select Category</MenuItem>
                        {fillMainCategory()}
                    </Select>
                    <FormHelperText>{formError.maincategoryid}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel>Sub Category Id</InputLabel>
                    <Select onFocus={()=>handleError('','subcategoryid')} error={formError.subcategoryid} value={subCategoryId} label={"Sub Category Id"} onChange={(event)=>setSubCategoryId(event.target.value)}>
                        <MenuItem value="Select Category" >Select Category</MenuItem>
                        {fillSubCategory()}
                    </Select>
                    <FormHelperText>{formError.subcategoryid}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel>Brand Id</InputLabel>
                    <Select onFocus={()=>handleError('','brandid')} error={formError.brandid} value={brandId} label={"Brand Id"} onChange={(event)=>setBrandId(event.target.value)}>
                        <MenuItem value="Select Category" >Select Category</MenuItem>
                        {fillBrand()}
                    </Select>
                    <FormHelperText>{formError.brandid}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <TextField error={formError.productname} helperText={formError.productname} onFocus={()=>handleError(false,'productname')} onChange={(event)=>setProductName(event.target.value)} fullWidth label="Product Name"/>
            </Grid> 

            <Grid item xs={12}>
                <TextField error={formError.productdescription} helperText={formError.productdescription} onFocus={()=>handleError(false,'productdescription')} onChange={(event)=>setProductDescription(event.target.value)} fullWidth label="Product Description"/>
            </Grid> 

            <Grid item xs={6} style={{display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Button variant="contained" component='label'>
                    Upload Icon
                    <input type="file" hidden accept="images/*" onChange={handleChange}/>
                </Button>
                {formError.icon?<div style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:3,color:'#d32f2f', fontSize:'0.75rem',fontWeight:400}}>{formError.icon}</div>:<></>}
            </Grid>

            <Grid item xs={6} style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
            <Avatar               //Avatar is used for showing selected image
            alt="Icon"
            variant="rounded"
            src={icon.file}
            sx={{ width: 80, height: 80 }}  //sx=>means 'style'
/>
            </Grid>

            <Grid item xs={6}>
                <Button onClick={handleClick} variant="contained" fullWidth>Submit</Button>
            </Grid>

            <Grid item xs={6}>
                <Button variant="contained" fullWidth>Reset</Button>
            </Grid>
        </Grid>
    </div>
    </div>)
}//balnk icon handelling in line 78