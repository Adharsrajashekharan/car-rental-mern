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






// import React, { useEffect, useState } from "react";
// import { Table } from "antd";
// import Header from "../../components/UserComponents/Header/Header";
// import config from "../../config"
// const Orders = () => {
//   const [data, setOrder] = useState([]);





//   useEffect(() => {
//     config.get('/api/v1/user/orders', {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     })
//       .then(response => {
//         console.log(response.data);
//         setOrder(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);


//   const columns = [
//     {
//       title: "Order ID",
//       dataIndex: "_id",
//       key: "_id",
//     },
//     {
//       title: "Car",
//       dataIndex: "car",
//       key: "car",
//     },
//     {
//       title: "Total Hours",
//       dataIndex: "totalHours",
//       key: "totalHours",
//     },
//     // {
//     //   title: "Transaction ID",
//     //   dataIndex: "transactionId",
//     //   key: "transactionId",
//     // },
//     {
//       title: "Total Amount",
//       dataIndex: "totalAmount",
//       key: "totalAmount",
//     },
//   ];
//   const tableStyle = {
//     background: "red",
//     color: "black", 


// };
//   return (
//     <>
//       <Table dataSource={data} columns={columns} rowKey="_id" style={tableStyle}  />
//     </>
//   );
// };

// export default Orders;



// import React, { useState, useEffect, useRef } from "react";
// import { Table } from "react-bootstrap";
// import config from "../../config";
// import ReactToPdf from "react-to-pdf";

// const Orders = () => {
//   const [bookings, setBookings] = useState([]);
//   const componentRef = useRef(null);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await config.get("/api/v1/admin/bookedcars");
//         const bookingCars = response.data;
//         console.log("this is response", response);
//         setBookings(bookingCars);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchBookings();
//   }, []);

//   return (
//     <>
//       <ReactToPdf targetRef={componentRef} filename="bookings.pdf">
//         {({ toPdf }) => (
//           <button onClick={toPdf}>Generate PDF</button>
//         )}
//       </ReactToPdf>
//       <div ref={componentRef}>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Car Name</th>
//               <th>Total Hours</th>
//               <th>Total Amount</th>
//               <th>Driver Required</th>
//               <th>Booking Cancelled</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking._id}>
//                 <td>{booking.car?.name}</td>
//                 <td>{booking.totalHours}</td>
//                 <td>{booking.totalAmount}</td>
//             <td>{booking.driverRequired ? "Yes" : "No"}</td>
//                 <td>{booking.cancelled ? "Yes" : "No"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </>
//   );
// };

// export default Orders;
import React, { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import config from "../../config";
import ReactToPdf from "react-to-pdf";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  const [bookings, setBookings] = useState([]);
  const componentRef = useRef(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
        const response = await config.get("/api/v1/admin/bookedcars",{headers});
        const bookingCars = response.data;
        console.log("this is response", response);
        setBookings(bookingCars);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, []);

  const getIcon = (value) => {
    return value ? (
      "yes"
      // <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
    ) : (
      "no"
      // <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
    );
  };

  const columns = [
    {
      dataField: "car.name",
      text: "Car Name",
    },
    {
      dataField: "totalHours",
      text: "Total Hours",
    },
    {
      dataField: "totalAmount",
      text: "Total Amount",
    },
    {
      dataField: "driverRequired",
      text: "Driver Required",
      formatter: (cell) => getIcon(cell),
    },
    {
      dataField: "cancelled",
      text: "Booking Cancelled",
      formatter: (cell) => getIcon(cell),
    },
  ];

  return (
    <>
      <ReactToPdf targetRef={componentRef} filename="bookings.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate PDF</button>}
      </ReactToPdf>
      <div ref={componentRef}>
        <BootstrapTable
          keyField="_id"
          data={bookings}
          columns={columns}
          pagination={paginationFactory()}
        />
      </div>
    </>
  );
};

export default Orders;