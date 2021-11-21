import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { CCardBody, CCardHeader, CDataTable, CCard, CBadge, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CSpinner } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BaseUrl from "../BaseUrl/BaseUrl"
function Customer() {
  //customer state
  const [usersData, SetUserData] = useState()
  //navigation
  let histrory = useHistory()
  const UserEditById = (id) => {
    histrory.push(`/user/customeredit/${id}`)
  }
  // for table fields
  const fields = [
    { key: 'id', _style: { width: '5%' } },
    { key: 'first_name', label: "First name", _style: { width: '25%' } },
    { key: 'last_name', label: "Last name", _style: { width: '25%' } },
    { key: 'email', _style: { width: '25%' } },
    { key: 'status', _style: { width: '5%' } },
    { key: 'Action', _style: { width: '15%' } },
  ]
  // active/inactive badge
  const getBadge = status => {
    switch (status) {
      case 1: return 'success'
      case 0: return 'danger'
      default: return 'primary'
    }
  }
  // get customer data
  const Recivedata = async () => {
    const GetLevelData = await axios.get(`${BaseUrl}users`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) { SetUserData(response.data) });

  }
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }
    Recivedata()
  }, [])
  // delete table data
  const DeleteFetchData = async (id) => {
    await axios.delete(`${BaseUrl}users/${id}`, {
      headers: { "auth": localStorage.getItem("LMS_Token") }
    }).then((respponce) => {
      histrory.push(`/user/customer`)
      Recivedata()
    }).catch((error) => console.log(error))
  }
  //delete confirmation
  const DeleteCustomer = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CModal
            show={true}
            centered={true}
            onClose={onClose}
          >
            <CModalHeader closeButton> Delete customer?</CModalHeader>
            <CModalBody>
              Are you sure you want to delete it?
          </CModalBody>
            <CModalFooter>
              <CButton color="primary" onClick={() => {
                DeleteFetchData(id);
                onClose();
              }}>Yes</CButton>{' '}
              <CButton
                color="secondary"
                onClick={onClose}
              >No</CButton>
            </CModalFooter>
          </CModal>

        );
      }
    });

  }
  const spinner = <div className="d-flex justify-content-center align-items-center"><CSpinner color="primary" style={{ width: '5rem', height: '5rem' }} /></div>
  return (<>
    <CCard>
      <CCardHeader>
        Customer managment
               <div className="card-header-actions">
          <Link to="/user/customeradd"><CButton color="primary" className="mr-1" >Add</CButton></Link>
        </div>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          items={usersData}
          noItemsViewSlot={spinner}
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
                  <Link><CButton color="primary" shape="square" size="sm" variant="outline" style={{ marginRight: "10px" }} onClick={() => UserEditById(item.id)} >
                    <CIcon size={'sm'} name={'cilPencil'} />
                  </CButton></Link>
                  <CButton color="danger" variant="outline" shape="square" size="sm" onClick={() => DeleteCustomer(item.id)}>
                    <CIcon size={'sm'} name={'cilTrash'} />
                  </CButton>

                </td>
              )
          }}

        />
      </CCardBody>
    </CCard>
  </>
  )
}


export default Customer;