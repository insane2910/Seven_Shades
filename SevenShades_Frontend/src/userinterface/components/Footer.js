import { serverURL } from "../../services/FetchDjangoApiService"
export default function Footer(props)
{
    var socialitems=[{id:'1',icon:'f11.png'},
               {id:'2',icon:'f12.png'},
               {id:'3',icon:'f13.png'}]
    var payitems=[{id:'1',icon:'f21.png'},
               {id:'2',icon:'f22.png'},
               {id:'3',icon:'f23.png'},
               {id:'4',icon:'f24.png'},
               {id:'5',icon:'f25.png'}]
    
    const showAllSocialItems=()=>{
        return socialitems.map((item)=>{
            return <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <div style={{ borderRadius: '50%', overflow: 'hidden', width:30, height:30, marginBottom:1, backgroundColor: '#f2f2f2',margin:5  }}>
                    <img src={`${serverURL}/static/${item.icon}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                    </div> 
                    </div>
        })
    }
    const showAllPayItems=()=>{
        return payitems.map((item)=>{
            return <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <div style={{ width: '30px', height: '20px', marginBottom:1 ,backgroundColor: '#f2f2f2',margin:5}}>
                    <img src={`${serverURL}/static/${item.icon}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                    </div> 
                    </div>
        })
    }    
    return (<div>
    <div style={{display: 'flex',flexWrap:'wrap',height:20}}>
        <div style={{  display: 'flex', alignItems: 'center',justifyContent:'center' ,width:'100%',height:'100%'}}>
                <div style={{ display: 'flex',  alignItems: 'center', justifyContent:'left',width:'100%',marginLeft:200}}>
                {showAllSocialItems()}
                </div>
            <div style={{ borderLeft:'1px solid black', height:20, margin:10, alignItems: 'center' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between',width:'100%',marginRight:100}}>
                {showAllPayItems()}
                </div>
        </div>
        <div style={{ borderTop:'1px solid #ececec', height:20, margin:0.1 }}></div>
        </div>
        </div>
    )
}