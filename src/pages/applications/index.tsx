import { Outlet } from 'react-router-dom'
import "./index.css"
export default function Applications() {
  return (

    <div className='application-wrapper'>
      <Outlet/>
    </div>
    
  )
}
