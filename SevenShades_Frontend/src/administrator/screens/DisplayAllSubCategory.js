import MaterialTable from "@material-table/core"
import { useStyles } from "./SubcategoryCss"
import TitleComponent from "../components/admin/TitleComponent"

import { useEffect,useState } from "react"
import { getData, serverURL,postData } from "../../services/FetchDjangoApiService"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2"
import DialogTitle from '@mui/material/DialogTitle';
import {MenuItem,FormControl,InputLabel,FormHelperText,Select, Button,Grid,TextField,Avatar } from "@mui/material"
import { useNavigate } from "react-router-dom"
export default function DisplayAllSubCategory()
{
 var classes=useStyles()
  var navigate=useNavigate()
 const [open,setOpen]=useState(false)
 const [subCategoryList,setSubCategoryList]=useState([])
 const [id,setId]=useState('')
 const [btnStatus,setBtnStatus]=useState(true)
 const [tempIcon,setTempIcon]=useState('')
 const [mainCategoryList,setMainCategoryList]=useState([])
 useEffect(function(){
     fetchAllMainCategory()
    
      },[])
      const fetchAllMainCategory=async()=>{
       var result=await getData('maincategory_list')
       console.log("Result",result.data)
       setMainCategoryList(result.data)
    
    
      }
 const fillMainCategory=()=>{
     return mainCategoryList.map((item)=>{
         return <MenuItem value={item.id}>{item.maincategoryname}</MenuItem>
     })
 }


 /*********************SubCategory.js Actions***********************/
    const [mainCategoryId, setMainCategoryId] = useState(''); // Assuming you have a way to get the main category ID
    const [subCategoryName, setSubCategoryName] = useState('');
    const [icon, setIcon] = useState({ file: 'icon.png', bytes: '' });
    const [formError, setFormError] = useState({icon: false });

    const handleChange = (event) => {
        setIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] });
        handleError(false, "icon");
        setBtnStatus(false)
    };
      
    const handleError = (errormessage, label) => {
        setFormError((prev) => ({ ...prev, [label]: errormessage }));
    };

    const handleClick = async () => {
        var err = false;
        if (mainCategoryId.length === 0) {
            handleError("Please input main category ID", "maincategoryid");
            err = true;
        }
        if (subCategoryName.length === 0) {
            handleError("Please input subcategory", "subcategoryname");
            err = true;
        }
        if (icon.bytes.length === 0) {
            handleError("Please select some icon", "icon");
            err = true;
        }
        if (err === false) {
            var formData = new FormData();
            formData.append('maincategoryid', mainCategoryId);
            formData.append('subcategoryname', subCategoryName);
            formData.append('icon', icon.bytes);

            var result = await postData('subcategory_submit', formData);
            console.log(result)

            if (result.status) {
                Swal.fire({
                    title: "The Seven Shades",
                    text: result.message,
                    icon: "success",
                    toast: true,
                });
            } else {
                Swal.fire({
                    title: "The Seven Shades",
                    text: result ? result.message : "Unknown error occurred",
                    icon: "error",
                    toast: true,
                });
            }
        }
    };

    const handleClear=()=> 
    {
        setMainCategoryId('')
        setSubCategoryName('')
        setIcon({file:'icon.png',bytes:''})
    }
 /******************************************************************/

  useEffect(function(){ 
  fetchAllSubCategory()
  },[])

  const fetchAllSubCategory=async()=>{
   var result=await getData('subcategory_list') 
   setSubCategoryList(result.data) 
  }
  const handleOpenDilaog=(rowData)=>{
    setId(rowData.id) // what's the need of this?
    setSubCategoryName(rowData.subcategoryname)
    setIcon({file:`${serverURL}${rowData.icon}`,bytes:''})
    setTempIcon(`${serverURL}${rowData.icon}`)
    setMainCategoryId(rowData.maincategoryid.id)
    setOpen(true)
   }
   const handleClose=()=>{
    setOpen(false)
  }

 function listAllSubCategory() 
  {
    return (
      <MaterialTable
        title={ <TitleComponent title={'List Sub Category'} listicon='' />} 

        columns={[ 
          { title: 'Id', field: 'id' },
          { title: 'Sub Category', field: 'subcategoryname' },
          { title: 'Main Category', render:(row)=><div>{row.maincategoryid.id}/{row.maincategoryid.maincategoryname}</div> },
          { title: 'icon', render:(row)=><><img src={`${serverURL}${row.icon}`} style={{width:60,height:60,borderRadius:15}}/></>}
        ]}
        data={subCategoryList}    

        actions={[ 
            {
                icon: 'edit',
                tooltip: 'Edit Category',
                onClick: (event, rowData) => handleOpenDilaog(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Remove Category',
                onClick: (event, rowData) => handleDeleteData(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add New SubCategory',
                isFreeAction:true,
                onClick: (event, rowData) =>navigate('/admindashboard/subcategory')
              }
        ]}
      />
    )
  }
  
  const handleCancel=()=>{
    setBtnStatus(true)
    setIcon({file:tempIcon,bytes:''})
  }
  const handleEditIcon=async()=>{
    var formData=new FormData()
     formData.append('id',id)
     formData.append('icon',icon.bytes)
     var result=await postData('editsubcategory_icon',formData)
     if(result.status)
     {
         Swal.fire({
             title: "The  Seven Shades",
             text: result.message,
             icon: "success",
             toast:true
           });

     }
     else
     {
         Swal.fire({
             title: "The  Seven Shades",
             text: result.message,
             icon: "error",
             toast:true
           });


       }
    fetchAllSubCategory() 
    setBtnStatus(true)

  }

  const handleEditData=async()=>{
     var body={id:id,subcategoryname:subCategoryName,maincategoryid:mainCategoryId}

     var result=await postData('editsubcategory_data',body)
     if(result.status)
     {
         Swal.fire({
             title: "The  Seven Shades",
             text: result.message,
             icon: "success",
             toast:true
           });

     }
     else
     {
         Swal.fire({
             title: "The  Seven Shades",
             text: result.message,
             icon: "error",
             toast:true
           });


       }
    fetchAllSubCategory() 
     
  }

  const handleDeleteData=async(rowData)=>{
    Swal.fire({
      title: "Do you want to Delete Sub Category?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then(async(result) => {
      if (result.isConfirmed) {
        var body={id:rowData.id}
        var result=await postData('deletesubcategorydata',body)
        if(result.status)
        {
          Swal.fire("Deleted!", "", "success");
        }
        fetchAllSubCategory() 
        
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    
    }  


  const showCategoryDialog=()=>{

    return(<Dialog open={open} fullWidth={true} maxWidth={"sm"}>
     <DialogTitle>
       <TitleComponent title={'Update Category'} listicon=''/>
     </DialogTitle>
     <DialogContent>
     <div style={{margin:5}}>
      {/**********************************Sub Category Actions********************************/}
      <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <FormControl  fullWidth>
                       <InputLabel>MainCategory Id</InputLabel>
                       <Select onFocus={()=>handleError('','maincategoryid')}  error={formError.maincategoryid} value={mainCategoryId} label={"MainCategory Id"} onChange={(event)=>setMainCategoryId(event.target.value)}>
                        <MenuItem value="Select Category">Select Category</MenuItem>
                        {fillMainCategory()} 
                       </Select>
                       <FormHelperText>{formError.maincategoryid}</FormHelperText>
                       </FormControl>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField error={formError.subcategoryname} helperText={formError.subcategoryname} onFocus={() => handleError(false, 'subcategoryname')} value={subCategoryName} onChange={(event) => setSubCategoryName(event.target.value)} fullWidth label="Sub Category Name" />
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    {btnStatus?
                    <div>
                        <Button variant="contained" component="label">
                            Upload Icon
                            <input type="file" hidden accept="images/*" onChange={handleChange} />
                        </Button>
                        {formError.icon ? (
                            <div style={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif', marginTop: 5, color: '#d32f2f', fontSize: '0.75rem', fontWeight: 400 }}>
                                {formError.icon}
                            </div>
                        ) : ( <></> )}
                    </div>:<div><Button onClick={handleEditIcon}>Save</Button><Button onClick={handleCancel}>Cancel</Button></div>}
                    </Grid>

                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar alt="Icon" variant="rounded" src={icon.file} sx={{ width: 80, height: 80 }} />
                    </Grid>

                </Grid>
      {/***********************************************/}
      </div>

     </DialogContent>
     <DialogActions>
       <Button onClick={handleEditData}>Edit Data</Button>
       <Button onClick={handleClose}>Close</Button>
     </DialogActions>


    </Dialog>)
 }

  return(<div className={classes.display_root}> 
       <div className={classes.display_box}>
        {listAllSubCategory()}
        </div>
        {showCategoryDialog()}
    </div>)
}