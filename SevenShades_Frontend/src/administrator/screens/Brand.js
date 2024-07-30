import { Grid,TextField,Button,Avatar } from "@mui/material";
import { useState } from "react";
import { useStyles } from "./CategoryCss";
import TitleComponent from "../components/admin/TitleComponent";
import { postData } from "../../services/FetchDjangoApiService";
import Swal from "sweetalert2";
import listimage from "../../images/list.png"
export default function Brand(props)
{ 
    var classes=useStyles()

    const [brandName,setBrandName]=useState('') 
    const [icon,setIcon]=useState({file:'icon.png',bytes:''})
    const [formError,setFormError]=useState({icon:false}) 

    const handleChange=(event)=>{
        setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        handleError(false,"icon") 
    }

    const handleError=(errormessage,label)=>{
        setFormError((prev)=>({...prev,[label]:errormessage}))
    }

    const handleClick=async()=>
    {
       var err=false 
       if(brandName.length==0)
       { handleError("Pls input brand","brandname")
       err=true   
       }
       if(icon.bytes.length==0)
       { handleError("Pls select some icon","icon")
        err=true   
       }
       if(err==false)
       {
        var formData=new FormData()
        formData.append('brandname',brandName)
        formData.append('icon',icon.bytes)
        var result=await postData('brand_submit',formData)
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
        }
    }

    const handleClear=()=> 
    {
        setBrandName('')
        setIcon({file:'icon.png',bytes:''})
    }

    return(<div className={classes.root}>
        <div className={classes.box}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TitleComponent title={'Brand'} listicon={listimage} link='/admindashboard/displayallbrand'  />
            </Grid>
            <Grid item xs={12}>
                <TextField value={brandName} error={formError.brandname} helperText={formError.brandname} onFocus={()=>handleError(false,'brandname')} onChange={(event)=>setBrandName(event.target.value)} fullWidth label="Brand Name" />
            </Grid>
            <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}> 
                <Button  variant="contained" component='label'>
                    Upload Icon
                    <input  type='file' hidden accept="images/*"  onChange={handleChange} />
                </Button>
                {formError.icon?<div style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:5,color:'#d32f2f',fontSize:'0.75rem',fontWeight:400,}}>{formError.icon}</div>:<></>} 
            </Grid>

            <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Avatar
            alt="Icon"
            variant='rounded'
            src={icon.file}
            sx={{ width: 80, height: 80 }}/>
            </Grid>

            <Grid item xs={6} >
           <Button onClick={handleClick} variant="contained" fullWidth>Submit</Button>
            </Grid>

            <Grid item xs={6} >
           <Button onClick={handleClear} variant="contained" fullWidth>Reset</Button>
            </Grid>

        </Grid>
            
        </div>

    </div>)
}