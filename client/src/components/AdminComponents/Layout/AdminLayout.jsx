
import React from 'react'
import AllRoutes from "../../../routers/AllRoutes";

const AdminLayout = () => {
  return (
    <div className="layout">
    <div className="main__layout">
      <div className="content">
        <AllRoutes />
      </div>
    </div>
  </div>
  )
}

export default AdminLayout
