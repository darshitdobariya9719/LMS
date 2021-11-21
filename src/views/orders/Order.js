import React, { useEffect, useState } from "react"
import { CCardBody, CCardHeader, CDataTable, CCard, CBadge, CSpinner, CButton } from '@coreui/react'

import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BaseUrl from "../BaseUrl/BaseUrl"
import { useHistory } from "react-router-dom";
function Orders() {
  //order data display in table filed
  const [OrderData, SetOrderData] = useState([])
  let histrory = useHistory()

  // table filed
  const fields = [
    { key: 'id', _style: { width: '10%' } },
    { key: 'customername', label: "Customer name", _style: { width: '20%' } },
    { key: 'total_amount', label: "Total amount", _style: { width: '20%' } },
    { key: 'paid_amount', label: "Paid amount", _style: { width: '20%' } },
    { key: 'discount_amount', label: "Discount amount", _style: { width: '20%' } },
    { key: 'couponcode', _style: { width: '20%' } },
    { key: 'created_at', label: "Created at", _style: { width: '10%' } },
    { key: 'Details', _style: { width: '10%' } },
    { key: 'status', _style: { width: '10%' } },

  ]
  // badge for active or inactive
  const getBadge = status => {
    switch (status) {
      case '1': return 'success'
      case '0': return 'danger'
      default: return 'primary'
    }
  }
  // recive order data function
  const ReciveOrderData = async () => {
    await axios.get(`${BaseUrl}orders`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      SetOrderData(response.data)
    });
  }
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }
    ReciveOrderData()

  }, [])
  //navigate to orderdetail page
  const OrderDetails = (id) => {
    histrory.push(`/orders/orderdetails/${id}`)
  }
  const spinner = <div className="d-flex justify-content-center align-items-center"><CSpinner color="primary" style={{ width: '5rem', height: '5rem' }} /></div>

  return (<>
    <CCard>
      <CCardHeader>
        Orders managment

      </CCardHeader>
      <CCardBody>
        <CDataTable
          noItemsViewSlot={spinner}
          items={OrderData}
          tableFilter
          itemsPerPageSelect
          hover
          sorter
          pagination
          fields={fields}
          scopedSlots={{
            'couponcode':
            (item) => (
              <td >
                
                  {item.couponcode === null ? "-" : item.couponcode}
                
              </td>
            ),
            'status':
              (item) => (
                <td >
                  <CBadge color={getBadge(item.status)}>
                    {item.status === 1 ? "Active" : "Inactive"}
                  </CBadge>
                </td>
              ),
            'Details':
              (item) => (
                <td >
                  <CButton color="primary" shape="square" size="sm" variant="outline" style={{ marginRight: "10px" }} onClick={() => OrderDetails(item.id)} >
                    Details
                  </CButton>
                </td>
              ),

          }}

        />
      </CCardBody>
    </CCard>
  </>
  )
}


export default Orders;