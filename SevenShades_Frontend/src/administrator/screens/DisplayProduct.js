import MaterialTable from "@material-table/core";
import { useStyles } from "./CategoryCss";
import TitleComponent  from "../components/admin/TitleComponent";
import { useEffect,useState } from "react";
import { getData, postData, serverURL } from "../../services/FetchDjangoApiService";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";
import { FormHelperText,FormControl,InputLabel,Select,MenuItem,Button,Grid,TextField,Avatar } from "@mui/material";
import Swal from "sweetalert2";

export default function DisplayProduct()
{
    var classes=useStyles()
    const [open,setOpen]=useState(false)
    const [productList,setProductList]=useState([])
     var navigate=useNavigate()
    useEffect(function(){
        fetchAllProduct()

      },[])
      const fetchAllProduct=async()=>{
        var result=await getData('product_list')
        setProductList(result.data)

      }
//LIST CATEGORY****************************************************************************************************************************
    function listProduct() {
        return (
          <MaterialTable
            title={<TitleComponent width={160} title={'List Product'} listicon=''/>}
            columns={[
              { title: 'Id', field: 'id' }, //title depend on field which is also a column name in MySQL database
              { title: 'Main Category Id', render:(rowData)=><div>{rowData.maincategoryid.id}/{rowData.maincategoryid.maincategoryname}</div> },//or render:(row)=> <>{row.maincategoryid.id}</>
              { title: 'Sub Category Id', render:(rowData)=><div>{rowData.subcategoryid.id}/{rowData.subcategoryid.subcategoryname}</div> },
              { title: 'Brand Id', render:(rowData)=><div>{rowData.brandid.id}/{rowData.brandid.brandname}</div> },
              //render fetch each record one by one  record
              { title: 'Products', field: 'productname' },
              { title: 'Product Description', field: 'productdescription' },
              { title: 'Icon',render:(row)=><><img src={` ${serverURL}${row.icon}`} style={{width:60,height:60,borderRadius:15}}/></>}
            ]}
            data={productList}  //fetch all products     
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Product',
                onClick: (event, rowData) => handleOpenDialog(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Remove  Product',
                onClick: (event, rowData) => handleDeleteData(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add New Product',
                isFreeAction:true,
                onClick: (event, rowData) =>navigate('/admindashboard/product')
              }
            ]}
          />
        )
      }
//******************************************************************************************************************************************      
//LIST CATEGORY ACTIONS*********************************************************************************************************************
    const handleOpenDialog=(rowData)=>{
    //specify database fields
    setId(rowData.id)
    setMainCategoryId(rowData.maincategoryid.id)
    setSubCategoryId(rowData.subcategoryid.id)
    setBrandId(rowData.brandid.id)
    setProductName(rowData.productname)
    setProductDescription(rowData.productdescription)
    setIcon({file:`${serverURL}${rowData.icon}`,bytes:''})
    setTempIcon(`${serverURL}${rowData.icon}`)
    setOpen(true)
  }

    const handleDeleteData=async(rowData)=>{
    Swal.fire({
      title: "Do you want to Delete Product?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var body={id:rowData.id}
        var result=await postData('deleteproductdata',body)
        if(result.status)
        {
          Swal.fire("Deleted!", "", "success");
        }
        fetchAllProduct() 
        
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }    
//******************************************************************************************************************************************
//SHOW CATEGORY DIALOG ACTIONS**************************************************************************************************************

    const[id,setId]=useState('')
    const[mainCategoryId,setMainCategoryId]=useState('')
    const[subCategoryId,setSubCategoryId]=useState('')
    const[brandId,setBrandId]=useState('')
    const[productName,setProductName]=useState('')
    const[productDescription,setProductDescription]=useState('')
    const[icon,setIcon]=useState({file:'icon.png',bytes:''}) //bytes is used to save Image
    const[tempIcon,setTempIcon]=useState('')
    const[formError,setFormError]=useState([{icon:false}])
    const[btnStatus,setBtnStatus]=useState(true)
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

        var result=await getData('subcategory_list') 
        setSubCategoryList(result.data)

        var result=await getData('brand_list') 
        setBrandList(result.data)

      }
     const fillMainCategory=()=>{
        return mainCategoryList.map((item)=>{
            return <MenuItem value={item.id}>{item.maincategoryname}</MenuItem>
        })
    }
    const handleFetchSubcategory=(event)=>
    { setMainCategoryId(event.target.value)
      
     fetchAllSubcategory(event.target.value)

    }
    const fetchAllSubcategory=async(mid)=>{
        
      var result=await postData('product_subcategory_list_by_maincategoryid',{maincategoryid:mid}) 
   
      setSubCategoryList(result.data)

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
        setBtnStatus(false)
  }

    const handleError=(errormessage,label)=>{  //prev means previous value of error
    setFormError((prev)=>({...prev,[label]:errormessage}))
  }

    const handleCancel=()=>{
    setBtnStatus(true)
    setIcon({file:tempIcon,bytes:''})
  }
    const handleEditIcon=async()=>{
    var formData=new FormData()
    formData.append('id',id)
    formData.append('icon',icon.bytes)
    var result=await postData('editproduct_icon',formData)
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
    fetchAllProduct()
    setBtnStatus(true)
  }

    const handleEditData=async()=>{

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

    if(err==false)
    {
        var body={id:id,maincategoryid:mainCategoryId,subcategoryid:subCategoryId,brandid:brandId,productname:productName,productdescription:productDescription}
        var result=await postData('editproduct_data',body)
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
  fetchAllProduct()
  }

  const handleClose=()=>{
    setOpen(false)
  }
    const showCategoryDialog=()=>{

    return(<Dialog open={open} fullWidth={true} maxWidth="sm">
      <DialogTitle>
        <TitleComponent width={205} title={'Update  Product'} listicon=''/>
      </DialogTitle>
      <DialogContent>
        <div style={{margin:5 }}>
            <Grid container spacing={2}>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel>Main Category Id</InputLabel>
                    <Select onFocus={()=>handleError('','maincategoryid')} error={formError.maincategoryid} value={mainCategoryId} label={"Main Cajhgfjktegory Id"} onChange={handleFetchSubcategory}>
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
                <TextField value={productName} error={formError.productname} helperText={formError.productname} onFocus={()=>handleError(false,'productname')} onChange={(event)=>setProductName(event.target.value)} fullWidth label="Product Name"/>
            </Grid> 

            <Grid item xs={12}>
                <TextField value={productDescription} error={formError.productdescription} helperText={formError.productdescription} onFocus={()=>handleError(false,'productdescription')} onChange={(event)=>setProductDescription(event.target.value)} fullWidth label="Product Description"/>
            </Grid> 

            <Grid item xs={6} style={{display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
              {btnStatus?
              <div>
                <Button variant="contained" component='label'>
                    Upload Icon
                    <input type="file" hidden accept="images/*" onChange={handleChange}/>
                </Button>
                </div>:<div><Button onClick={handleEditIcon}>Save</Button><Button onClick={handleCancel}>Cancel</Button></div>}
            </Grid>

            <Grid item xs={6} style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
            <Avatar               //Avatar is used for showing selected image
            alt="Icon"
            variant="rounded"
            src={icon.file}
            sx={{ width: 80, height: 80 }}  //sx=>means 'style'
            />
            </Grid>


            </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditData}>Edit Data</Button>
        <Button onClick={handleClose }>Close</Button>
      </DialogActions>
    </Dialog>)
  }
    return(<div className={classes.display_root}>
        <div className={classes.display_box}>
        {listProduct()}
        </div>
        {showCategoryDialog()}
        </div>)
}