import React, { useEffect, useState } from "react"
import { CCardBody, CCardHeader, CDataTable, CCard, CBadge, CButton, CModal, CModalHeader, CModalBody, CForm, CCol, CRow, CContainer, CFormGroup, CSelect, CInput, CModalFooter, CSpinner } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BaseUrl from "../BaseUrl/BaseUrl"
import { Link } from 'react-router-dom'
function Level() {
  //user geoup data
  const [usersData, SetUserData] = useState()
  const [modal, setModal] = useState(false);
  //user group update modal
  const [updatemodal, setupdatemodal] = useState(false);
  //user grouip edit modal
  const [geteditdata, setEditdata] = useState({
    id: "",
    upname: "",
    status: ""
  })
  let histrory = useHistory()
  // for onchange method
  const change = (e) => {
    const { name, value } = e.target
    setEditdata((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  // for update level
  const UpdateUserGroups = async () => {
    const UpdateId = geteditdata.id
    const updatelevelObj = {
      name: geteditdata.upname,
      status: geteditdata.status
    }
    await axios.put(`${BaseUrl}usergroups/${UpdateId}`, updatelevelObj)
    alert("Updated Successfuly")
    Recivedata()
    setupdatemodal(!updatemodal)



  }
  const toggle = () => {
    setModal(!modal);
  }
  // for table fields
  const fields = [
    { key: 'id', _style: { width: '20%' } },
    { key: 'name', _style: { width: '20%' } },
    //{ key: 'Total_course',label:"Total course", _style: { width: '20%' } },
    { key: 'created_at',label:"Created at", _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' } },
    { key: 'Action', _style: { width: '25%' } },
  ]
  const getBadge = status => {
    switch (status) {
      case '1': return 'success'
      case '0': return 'danger'
      default: return 'primary'
    }
  }
  //get user group data
  const Recivedata = async () => {
    await axios.get(`${BaseUrl}usergroups`, {
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
  // delete table data
  const DeleteFetchData = async (id) => {
    await axios.delete(`${BaseUrl}usergroups/${id}`, {
      headers: {

        "auth": localStorage.getItem("LMS_Token")
      }

    }).then((response)=>{
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <CModal
              show={true}
              centered={true}
              onClose={onClose}
            >
              <CModalHeader closeButton>User Groups delete</CModalHeader>
              <CModalBody>
                {response.data.message}
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={() => {


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
    })
    Recivedata()

  }
  //delete confirmation
  const DeleteUserGroups = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CModal
            show={true}
            centered={true}
            onClose={onClose}
          >
            <CModalHeader closeButton> Delete group?</CModalHeader>
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
  const edituser = (id) => {
    histrory.push(`/user/group-edit/${id}`)
  }
  const spinner = <div className="d-flex justify-content-center align-items-center"><CSpinner color="primary" style={{ width: '5rem', height: '5rem' }} /></div>
  return (<>
    <CCard>
      <CCardHeader>
        Group managment
               <div className="card-header-actions">
          <Link to="/user/group-add">  <CButton color="primary" className="mr-1" onClick={toggle}>Add</CButton></Link>
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
                  <CButton color="primary" shape="square" size="sm" variant="outline" style={{ marginRight: "10px" }} onClick={() => edituser(item.id)}>
                    <CIcon size={'sm'} name={'cilPencil'} />
                  </CButton>
                  <CButton color="danger" variant="outline" shape="square" size="sm" onClick={() => DeleteUserGroups(item.id)}>
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


export default Level;