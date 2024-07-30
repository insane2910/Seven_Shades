import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import { Grid } from "@mui/material";
import PaymentFooterComponent from '../components/PaymentFooterComponent';
import { serverURL } from "../../services/FetchDjangoApiService"
 
import Link from '@mui/material/Link';
 
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postData } from '../../services/FetchDjangoApiService';
import { useNavigate } from 'react-router-dom';
import LoginHeader from "../components/LoginHeader"
import Swal from "sweetalert2"
import { useDispatch } from 'react-redux';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://sevenshades.com/">
        sevenshades.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminLOgin() {
  const [emailid,setEmailid]=useState('') 
  const [mobileno,setMobileno]=useState('') 
  const [firstname,setFirstName]=useState('')  
  const [lastname,setLastName]=useState('')  
  const [password,setPassword]=useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('') 
   const dispatch=useDispatch()
  var navigate=useNavigate()
  const handleSubmit = async() => {
  
    var dob=year+"-"+month+"-"+day
    var body={mobileno,emailid,firstname,lastname,password,dob}
    var result = await postData('user_submit', body);
            console.log(result)

            if (result.status) {
                Swal.fire({
                    title: "The Seven Shades",
                    text: result.message,
                    icon: "success",
                    toast: true,
                });
                dispatch({type:'ADD_USER',payload:[mobileno,body]})
            } else {
                Swal.fire({
                    title: "The Seven Shades",
                    text: result ? result.message : "Unknown error occurred",
                    icon: "error",
                    toast: true,
                });
            }
        
    }
  

  return (<div style={{backgroundColor:'#ececec',justifyContent:'center',padding:'5%'}}>
    <div style={{ display: 'flex', alignItems: 'center',paddingLeft:'25%'}}>
    <Grid container spacing={2} style={{ alignItems: 'center' }}>
      <Grid item xs={12} md={8}>
    <div style={{ padding:'2%',color:'#000',fontWeight:'bold',justifyContent:'center',textAlign:'center',fontSize:'3vw',fontFamily: "League Gothic",letterSpacing: 1 }}>
      
    SevenShades<div style={{fontSize:'1.5vw'}}>CHECK OUT</div></div>
    <div style={{width:'100%',backgroundColor:'white',padding:'2%'}}>
    <ThemeProvider theme={defaultTheme}>
      <Container   maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >  

        <LoginHeader/>
          <Box  sx={{ mt: 1 }}>
          <div style={{color:'black',fontWeight:'bold',textAlign:'center',fontSize:'1.2vw',marginTop:'5%'}}>OR SIGN IN WITH ....</div>
<div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
    <button style={{width: '120px', margin:'4%', backgroundColor:'white', display: 'flex', alignItems: 'center',border:'solid 2px #ddd'}}>
        <img src={`${serverURL}/static/google.webp`} loading="lazy" style={{ width: 30, height: 30 }}/>
        <span style={{marginLeft: '8px'}}>GOOGLE</span>
    </button>
    <button style={{width: '120px', margin:'4%', backgroundColor:'white', display: 'flex', alignItems: 'center',border:'solid 2px #ddd'}}>
        <img src={`${serverURL}/static/apple.png`} loading="lazy" style={{ width: 30, height: 30 }}/>
        <span style={{marginLeft: '8px'}}>APPLE</span>
    </button>
    <button style={{width: '120px', margin:'4%', backgroundColor:'white', display: 'flex', alignItems: 'center',border:'solid 2px #ddd'}}>
        <img src={`${serverURL}/static/facebook.png`} loading="lazy" style={{ width: 30, height: 30 }}/>
        <span style={{marginLeft: '8px'}}>FACEBOOK</span>
    </button>
</div>
       
       
<label style={{ width: '100%', fontWeight:'bold',color:'#999'}}>MOBILE NUMBER :</label>
            <TextField
              margin="normal"
              
              fullWidth
              id="mobileno"
              name="mobileno"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setMobileno(e.target.value)}
            />

       
       
          <label style={{ width: '100%', fontWeight:'bold',color:'#999'}}>EMAIL ADDRESS :</label>
            <TextField
              margin="normal"
              
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setEmailid(e.target.value)}
            />

           <label style={{ width: '100%', fontWeight:'bold',color:'#999'}}>FIRST NAME :</label>
            <TextField
              margin="normal"
              
              fullWidth
              id="firstname"
              name="firstname"
              autoComplete="firstname"
              autoFocus
              onChange={(e)=>setFirstName(e.target.value)}
            />

           <label style={{ width: '100%', fontWeight:'bold',color:'#999'}}>LAST NAME :</label>
            <TextField
              margin="normal"
              
              fullWidth
              id="lastname"
              name="lastname"
              autoComplete="lastname"
              autoFocus
              onChange={(e)=>setLastName(e.target.value)}
            />

            <label style={{ width: '100%', fontWeight:'bold',color:'#999'}}>PASSWORD :</label>
            <TextField
              margin="normal"
              
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setPassword(e.target.value)}
            />

           <label style={{ width: '100%', fontWeight:'bold',color:'#999'}}>DATE OF BIRTH :</label>
           <div style={{display: "flex", gap: "10px"}}>
    <FormControl style={{flex: 1}}>
        <InputLabel>Date</InputLabel>
        <Select
            value={day}
            onChange={(e) => setDay(e.target.value)}
        >
            <MenuItem value="">Day</MenuItem>
            {Array.from({ length: 31 }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
            ))}
        </Select>
    </FormControl>

    <FormControl style={{flex: 1}}>
        <InputLabel>Month</InputLabel>
        <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
        >
            <MenuItem value="">Month</MenuItem>
            <MenuItem value="January">January</MenuItem>
            <MenuItem value="February">February</MenuItem>
            <MenuItem value="February">March</MenuItem>
            <MenuItem value="February">April</MenuItem>
            <MenuItem value="February">May</MenuItem>
            <MenuItem value="February">June</MenuItem>
            <MenuItem value="February">July</MenuItem>
            <MenuItem value="February">August</MenuItem>
            <MenuItem value="February">September</MenuItem>
            <MenuItem value="February">October</MenuItem>
            <MenuItem value="February">November</MenuItem>
            <MenuItem value="February">December</MenuItem>
            
        </Select>
    </FormControl>

    <FormControl style={{flex: 1}}>
        <InputLabel>Year</InputLabel>
        <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
        >
            <MenuItem value="">Year</MenuItem>
            {Array.from({ length: 100 }, (_, i) => (
                <MenuItem key={2024 - i} value={2024 - i}>{2024 - i}</MenuItem>
            ))}
        </Select>
    </FormControl>
</div>       
     




            <Button
              style={{backgroundColor:'black',
              color:'white',
              fontWeight:'bold'}}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              CONTINUE TO CHECKOUT
            </Button>
            


          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        
      </Container>
      

    </ThemeProvider>
    
    </div>
    </Grid>
    </Grid>
    </div>
    <div style={{ display: 'flex', marginTop: 30, width: '100%', display: 'flex', justifyContent: 'center',backgroundColor:'white' }}>
          <PaymentFooterComponent />
        </div>
    
    
        
    
  </div>);
}