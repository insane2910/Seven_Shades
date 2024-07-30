import {FormHelperText,FormControl,InputLabel,Select,MenuItem, Grid, TextField, Button, Avatar } from "@mui/material";
import { useState,useEffect } from "react";
import { getData } from "../../services/FetchDjangoApiService";
import { useStyles } from "./CategoryCss";
import TitleComponent from "../components/admin/TitleComponent";
import { postData } from "../../services/FetchDjangoApiService";
import Swal from "sweetalert2";
 

import listimage from "../../images/list.png"
export default function SubCategoryForm(props) {
    var classes = useStyles();
    const [mainCategoryId, setMainCategoryId] = useState(''); // Assuming you have a way to get the main category ID
    const [subCategoryName, setSubCategoryName] = useState('');
    const [icon, setIcon] = useState({ file: 'icon.png', bytes: '' });
    const [formError, setFormError] = useState({icon: false });
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

    const handleChange = (event) => {
        setIcon({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] });
        handleError(false, "icon");
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

    return (
        <div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TitleComponent title={'Sub Category'} listicon={listimage} link={'/admindashboard/displayallsubcategory'}  />
                    </Grid>
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
                        <Button variant="contained" component="label">
                            Upload Icon
                            <input type="file" hidden accept="images/*" onChange={handleChange} />
                        </Button>
                        {formError.icon ? (
                            <div style={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif', marginTop: 5, color: '#d32f2f', fontSize: '0.75rem', fontWeight: 400 }}>
                                {formError.icon}
                            </div>
                        ) : (
                            <></>
                        )}
                    </Grid>

                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar alt="Icon" variant="rounded" src={icon.file} sx={{ width: 80, height: 80 }} />
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={handleClick} variant="contained" fullWidth>
                            Submit
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={handleClear} variant="contained" fullWidth>
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
