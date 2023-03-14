// import React, { useEffect, useState } from "react";
// import Header from "../../components/UserComponents/Header/Header";

// const Orders = () => {
// const [data, setOrder] = useState([]);


// useEffect(() => {
//     fetch("/api/v1/user/orders",{
//   method:"GET"
//     })
//     .then((res)=>res.json())
//     .then((data)=>{
// console.log("userdata",data)
// setOrder(data)
// })
// }, []);
//     return(
//         <>
// <Header/>
// {data.map(user => (
//     <div key={user._id}>
//         <h1>iiih</h1>
//         <h2>{user.car}</h2>
//       {user._id}
//       {user.totalHours}
//       {user.transactionId}
//       <h1>{user.totalAmount}</h1>


//     </div>
//   ))}
//   </>
// )}
// export default Orders
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Header from "../../components/UserComponents/Header/Header";
import config from "../../config"
const Orders = () => {
  const [data, setOrder] = useState([]);





  useEffect(() => {
    config.get('/api/v1/user/orders', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        console.log(response.data);
        setOrder(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Car",
      dataIndex: "car",
      key: "car",
    },
    {
      title: "Total Hours",
      dataIndex: "totalHours",
      key: "totalHours",
    },
    // {
    //   title: "Transaction ID",
    //   dataIndex: "transactionId",
    //   key: "transactionId",
    // },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
  ];
  const tableStyle = {
    background: "red",
    color: "black", 


};
  return (
    <>
      <Table dataSource={data} columns={columns} rowKey="_id" style={tableStyle}  />
    </>
  );
};

export default Orders;