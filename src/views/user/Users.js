import React, { useEffect, useState } from "react"
import { CCardBody, CCardHeader, CDataTable, CCard, CBadge, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import AddUsersModal from "./AddUsersModal"
import BaseUrl from "../BaseUrl/BaseUrl"
function Users() {
  //user data
  const [usersData, SetUserData] = useState()
  //add modal
  const [modal, setModal] = useState(false);
  //toggale modal
  const toggle = () => {
    setModal(!modal);
  }
  //table filed
  const fields = [
    { key: 'id', _style: { width: '20%' } },
    { key: 'first_name', _style: { width: '20%' } },
    { key: 'last_name', _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' } },
    { key: 'Action', _style: { width: '20%' } },
  ]
  const getBadge = status => {
    switch (status) {
      case '1': return 'success'
      case '0': return 'danger'
      default: return 'primary'
    }
  }
  //get user data
  useEffect(async () => {
    await axios.get(`${BaseUrl}Users`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) { SetUserData(response.data) });
  }, [])
  return (<>
    <CCard>
      <CCardHeader>
        Users Managment
               <div className="card-header-actions">
          <CButton color="primary" className="mr-1">Add </CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          items={usersData}
          tableFilter
          itemsPerPageSelect
          hover
          sorter
          footer
          pagination
          fields={fields}
          scopedSlots={{
            'status':
              (item) => (
                <td >
                  <CBadge color={getBadge(item.status)}>
                    {item.status === 1 ? "Active" : "Inactive"}
                  </CBadge>
                </td>
              ),
            'Action':
              (item) => (
                <td >
                  <CButton color="danger" variant="outline" shape="square" size="sm" style={{ marginRight: "10px" }}>
                    <CIcon size={'sm'} name={'cilTrash'} />
                  </CButton>
                  <CButton color="primary" shape="square" size="sm" variant="outline">
                    <CIcon size={'sm'} name={'cilPencil'} />
                  </CButton>
                </td>
              )
          }}

        />
      </CCardBody>
    </CCard>
    <AddUsersModal show={modal} onClose={toggle} />
  </>
  )
}


export default Users;