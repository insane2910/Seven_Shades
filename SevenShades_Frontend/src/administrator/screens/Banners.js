import { Grid,TextField,Button,Avatar } from "@mui/material";
import { useState } from "react";
import { useStyles } from "./SubcategoryCss";
import TitleComponent from "../components/admin/TitleComponent";
import { postData } from "../../services/FetchDjangoApiService";
import Swal from "sweetalert2";

export default function Banners(props)
{ 
    var classes=useStyles()

    const [bannerDescription,setBannerDescription]=useState('') 
    const [icon,setIcon]=useState({file:[],bytes:[]})
    const [formError,setFormError]=useState({icon:false}) 

    const handleChange = (event) => {
        var files = Object.values(event.target.files);
        if (files.length >= 4 && files.length <= 7)
          {setIcon({ file: files, bytes: event.target.files });
          console.log(icon);}
        else alert("Pls Input Min 4 and Max 7 Images");
        handleError(false, "icon");
      };
      const showImages = () => {
        return icon?.file?.map((item) => {
          return (
            <span>
              <img
                src={URL.createObjectURL(item)}
                style={{ width: 40, height: 40, borderRadius: 10, marginRight: 3 }}
              />
            </span>
          );
        });
      };

    const handleError=(errormessage,label)=>{
        setFormError((prev)=>({...prev,[label]:errormessage}))
    }

    const handleClick=async()=>
    {
       var err=false 
       if(bannerDescription.length==0)
       { handleError("Pls input banner description","bannerdescription")
       err=true   
       }
       if(icon.bytes.length==0)
       { handleError("Pls select some icon","icon")
        err=true   
       }
       if(err==false)
       {
        var formData=new FormData()
        formData.append('bannerdescription',bannerDescription)
        icon?.file?.map((item, i) => {
            formData.append("icon", item);
          });
        formData.forEach((value, key) => {
            console.log(key, value);
          });
        var result=await postData('banners_submit',formData)
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
        setBannerDescription('')
        setIcon({file:[],bytes:[]})
    }

    return(<div className={classes.root}>
        <div className={classes.box}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TitleComponent title={'Banners'} listicon={'list.png'}  />
            </Grid>
            <Grid item xs={12}>
                <TextField value={bannerDescription} error={formError.bannerdescription} helperText={formError.bannerdescription} onFocus={()=>handleError(false,'bannerdescription')} onChange={(event)=>setBannerDescription(event.target.value)} fullWidth label="Banner Description" />
            </Grid>
            <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}> 
                <Button  variant="contained" component='label'>
                    Upload Icon
                    <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleChange}
                    multiple
                    />
                </Button>
                {formError.icon?<div style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',marginTop:5,color:'#d32f2f',fontSize:'0.75rem',fontWeight:400,}}>{formError.icon}</div>:<></>} 
            </Grid>

            <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            {showImages()}
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