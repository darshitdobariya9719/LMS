import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { CCardBody, CCardHeader, CDataTable, CCard, CBadge, CButton, CModal, CModalHeader, CModalBody, CForm, CCol, CRow, CContainer, CFormGroup, CSelect, CInput, CModalFooter, CSpinner } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import BaseUrl from "../BaseUrl/BaseUrl"
function AdminListing() {
  const [usersData, SetUserData] = useState()
  let histrory = useHistory()
  // for navigate Edit admin page with id
  const EditAdminById = (id) => {
    histrory.push(`/edit-admin/${id}`)
  }
  // for table fields
  const fields = [
    { key: 'id', _style: { width: '5%' } },
    { key: 'first_name',label:"First name", _style: { width: '15%' } },
    { key: 'last_name', label:"Last name",_style: { width: '15%' } },
    { key: 'email', _style: { width: '30%' } },
    { key: 'status', _style: { width: '10%' } },
    { key: 'Action', _style: { width: '15%' } },
  ]
  // for status badge active or inactive
  const getBadge = status => {
    switch (status) {
      case 1: return 'success'
      case 0: return 'danger'
      default: return 'primary'
    }
  }
  // Recive Admin data
  const Recivedata = async () => {
    const GetLevelData = await axios.get(`${BaseUrl}admin`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")

      },
    }).then(function (response) { SetUserData(response.data) });
  }
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }
    Recivedata()
  }, [])
  // delete Admin data with their id
  const DeleteFetchData = async (id) => {
    await axios.delete(`${BaseUrl}users/${id}`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      }
    }).then((response) => {

    }).catch((err) => {
      console.log(err);
    })
    Recivedata()
  }
  //delete confirmation for admin
  const DeleteAdmin = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CModal
            show={true}
            centered={true}
            onClose={onClose}
          >
            <CModalHeader closeButton> Delete Customer?</CModalHeader>
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
        Admin managment
               <div className="card-header-actions">
          <Link to="/add-admin"><CButton color="primary" className="mr-1" >Add</CButton></Link>

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
                  <Link><CButton color="primary" shape="square" size="sm" variant="outline" style={{ marginRight: "10px" }} onClick={() => EditAdminById(item.id)} >
                    <CIcon size={'sm'} name={'cilPencil'} />
                  </CButton></Link>
                  <CButton color="danger" variant="outline" shape="square" size="sm" onClick={() => DeleteAdmin(item.id)}>
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


export default AdminListing;