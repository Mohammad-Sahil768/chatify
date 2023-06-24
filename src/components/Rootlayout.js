import React from 'react'
import {Outlet} from 'react-router-dom'
import Navigationbar from './navigationbar/Navigationbar'
function Rootlayout() {
  return (
   
        <div>


      <div className="content-container"  style={{height:"90vh" }}>
        <Navigationbar />

        <div className="container  "  >
          <Outlet />
        </div>


      </div>


      
    </div>



  )
}

export default Rootlayout