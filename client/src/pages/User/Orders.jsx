import React, { useState, useEffect } from 'react';
import config from "../../config";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { Link} from "react-router-dom"

const Orders = () => {
  const [dataFromApi, setDataFromApi] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };

  useEffect(() => {
    getDetailsFromApi();
    console.log("this is",dataFromApi)
  }, []);

  const getDetailsFromApi = async () => {
    const response = await config.get("/api/v1/admin/bookedcars",{headers});
    setDataFromApi(response.data);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(dataFromApi.length / itemsPerPage);

  const handlePaginationClick = (event) => {
    setActivePage(Number(event.target.text));
  };

  const renderTableRows = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return dataFromApi.slice(startIndex, endIndex).map((issue, index) => (
      // <tr key={issue.number}>
      <tr>
                <td>{issue._id}</td>

        <td>{issue.car.name}</td>
        <td>{issue.bookedTimeSlots.from}</td>
<td>{issue.bookedTimeSlots.to}</td>
<td>{issue.totalHours}</td>
<td>{issue.totalAmount}</td>
<td>{issue?.driverRequired ? 'Yes' : 'No'}
</td>
<td>{issue.cancelled ? 'yes':'no'}</td>

       

      </tr>
    ));
  };

  const renderPaginationItems = () => {
    const items = [];

    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item key={i} active={i === activePage} onClick={handlePaginationClick}>
          {i}
        </Pagination.Item>
      );
    }

    return items;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="table-responsive">
      <div className="text-end">
        <button className="btn btn-primary" onClick={handlePrint}>Print to PDF</button>
      </div>
        <Table striped bordered variant="dark">
          
          <thead>
            <tr>
            <th>id</th>

              <th>Car-Name</th>
              <th>from</th>
              <th>To</th>
              <th>Total Hours</th>
              <th>Amount</th>
              <th> Driver</th>
              <th> Cancelled</th>

            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-center">
        <Pagination>{renderPaginationItems()}</Pagination>
      </div>

     
    </>
  );
};

export default Orders;
