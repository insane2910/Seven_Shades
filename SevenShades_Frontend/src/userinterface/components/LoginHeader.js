import { useNavigate } from 'react-router-dom';


export default function LoginHeader()
{var navigate=useNavigate()

    const handleSignIn=()=>{
        navigate('/signindisplay')
      }

      const handleJoin=()=>{
        navigate('/joinindisplay')
      }
    
      return( 
    <div>
    <div style={{ display: 'flex',alignItems: 'center', justifyContent: 'center' }}>
    <div  onClick={handleJoin} style={{width:200, cursor:'pointer', display: 'flex',flexWrap:'wrap',padding: '2%', color: '#000', fontWeight: 'bold', fontSize:'1vw', textAlign: 'center', justifyContent: 'center' }}>
      Join
    </div>
    <div style={{ borderLeft: '1px solid #ececec', height: '30px', margin: '0 10px' }}></div>
    <div  onClick={handleSignIn}   style={{cursor:'pointer', display: 'flex',flexWrap:'wrap',padding: '2%', color: '#000', fontWeight: 'bold', fontSize:'1vw', textAlign: 'center',justifyContent: 'center',width:200 }}>
      Sign in
    </div>
  </div>
  
  
      <hr style={{ width: '100%', borderTop: '1px solid #ececec', margin: '20px 0' }} />
      </div>
  )
}