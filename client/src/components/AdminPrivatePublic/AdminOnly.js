
// import React from 'react'
// import { Navigate } from 'react-router-dom'
// const User =localStorage.getItem("User")
// export default function AdminOnly({children}) {
//     if(User.isAdmin == true ){
//         return children
//     }else{
//         return <Navigate to='/login'/>
//     }
   
// }

import React from 'react';
import { Navigate } from 'react-router-dom';

const userToken = localStorage.getItem('User');
const user = userToken ? JSON.parse(userToken) : null;

const AdminOnly = ({ children }) => {
  if (user && user.isAdmin === true) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
};

export default AdminOnly;





