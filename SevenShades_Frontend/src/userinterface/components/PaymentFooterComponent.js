import { serverURL } from "../../services/FetchDjangoApiService";
import { useComponentStyles } from "./ComponentCss";
import { Grid } from "@mui/material";

export default function PaymentFooterComponent(props) {
  const classes = useComponentStyles();


  const payitems = [
    { id: '1', icon: 'f21.png' },
    { id: '2', icon: 'f22.png' },
    { id: '3', icon: 'f23.png' },
    { id: '4', icon: 'f24.png' },
    { id: '5', icon: 'f25.png' }
  ];

  

  const showAllPayItems = () => {
    return payitems.map((item) => (
      <div style={{ width: '100%', height: '20%', marginBottom: 1, backgroundColor: '#f2f2f2', margin: 5 }}>
        <img src={`${serverURL}/static/${item.icon}`} loading="lazy" style={{ width: 65, height: 48 }} />
      </div>
    ));
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',marginLeft:'20%',marginRight:'20%' }}>
       <div style={{display: 'flex',flexWrap:'wrap'}}>
        <div style={{fontWeight:'bold',marginTop:20,marginRight:5,alignItems:'center',color:'#767676'}}>WE ACCEPT:</div>
          <div style={{ display: 'flex', justifyContent: 'center',marginTop:'1%' }}>
            {showAllPayItems()}
          </div>
        </div>
  
    </div>
  );
}
