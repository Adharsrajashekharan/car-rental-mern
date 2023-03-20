// import React from 'react'
// import { useEffect,useState } from "react";
// import TopNav from '../../AdminComponents/TopNav/TopNav';
// import { Table,button } from 'antd';
// import axios from 'axios';
// import config from '../../../config'
// import { useRouteLoaderData } from 'react-router-dom';

// const colums =[
//     {
//     title:"Username",
//     dataIndex:"name"
// },
// {
//     title:"Email",
//     dataIndex:"email"
// },

// {
//     title: 'Button',
//     key: 'key',
//     dataIndex: 'key',
//     render: (text, record) => {
//       const isAccessGranted = record.access === false;
//       return (
//         <button onClick={() =>
//           config.post('/api/v1/admin/block',
//         console.log(record))}>

//                   {/* axios.post('/api/v1/admin/block', { userId: user._id })
//           .then(() => setBlockedUsers([...blockedUsers, user._id]))
//           .catch(err => console.error(err)); */}

//           {isAccessGranted ? "Block" : "Unblock"}
//         </button>
//       );
//     },
//   }
// ]
// const Userdetails = () => {
//   const [blockedUsers, setBlockedUsers] = useState([]);
//     const [data, setData] = useState([]);
//     const [access, setAccess] = useState(false);

//     // const [value, setValue] = useState(false);


// // 	useEffect(() => {
// //         fetch("/api/v1/user/getallusers",{
// //       method:"GET"
// //         })
// //         .then((res)=>res.json())
// //         .then((data)=>{
// // console.log("userdata",data)
// // setData(data.data)
// //         })
// // 	}, []);
// useEffect(() => {
  
// config.get("/api/v1/user/getallusers").
// then(res=>{
//   console.log(res.data.data)
//   setData(res.data.data)
// })
 
// }, [])



//   return (
//     <>
//       {/* {data.map(u=>
//       <div>{u._id}</div>
//         )} */}


// {data.map(user => (
//   <div key={user._id}>
//     {user.name}
//     {!blockedUsers.includes(user._id) && (

//       <button onClick={() => {

//         axios.post('/api/v1/admin/block', { userId: user._id })
//           .then(() => setBlockedUsers([...blockedUsers, user._id]))
//           .catch(err => console.error(err));
          
//       }}>
//         block
        
//         </button>
//     )}
//   </div>
// ))}
        







  
//     {/* <div className='dashboard'>
//             <Table columns={colums} dataSource={data}>
//             </Table> */}
//             {/* <button onClick={() => setValue(!value)}>
//       {value ? "Turn Off" : "Turn On"}

//     </button> */}
    
//     {/* </div> */}
//     </>
//   )
// }

// export default Userdetails

import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import config from '../../../config';
import TopNav from '../../AdminComponents/TopNav/TopNav';
const Userdetails = () => {
  const [data, setData] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        const isBlocked = blockedUsers.includes(record._id);
        const buttonText = isBlocked ? 'Unblock' : 'Block';
        const buttonType = isBlocked ? 'primary' : 'danger';
        return (
          <Button
            type={buttonType}
            onClick={() => {
              const url = isBlocked ? '/api/v1/admin/unblock' : '/api/v1/admin/block';
              config
                .post(url, { userId: record._id })
                .then(() =>
                  setBlockedUsers(isBlocked ? blockedUsers.filter(id => id !== record._id) : [...blockedUsers, record._id])
                )
                .catch(err => console.error(err));
            }}
          >
            {buttonText}
          </Button>
        );
      },
    },
  ];

  // useEffect(() => {
  //   config.get('/api/v1/user/getallusers').then(res => {
  //     console.log(res.data.data);
  //     setData(res.data.data);
  //   });
  // }, []);

  useEffect(() => {


    // headers:{
    //   Authorization:"Bearer " + localStorage.getItem("token")
    //       }
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    config.get('/api/v1/user/getallusers', { headers })
      .then(res => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  return (
    <>
<TopNav/>
    <div className="dashboard">
      <Table columns={columns} dataSource={data} rowKey="_id" />
    </div>
    </>
  );
};

export default Userdetails;
