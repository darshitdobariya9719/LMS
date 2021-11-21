import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { CCardBody, CCardHeader, CDataTable, CCard, CBadge, CButton, CModal, CModalHeader, CModalBody, CForm, CCol, CRow, CContainer, CFormGroup, CSelect, CInput, CModalFooter, CSpinner } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BaseUrl from "../BaseUrl/BaseUrl"

function Customer() {
  //instruction state
  const [Instructor, SetInstructor] = useState()
  //upfate instruction modal
  const [updatemodal, setupdatemodal] = useState(false);
  // get instruction edit data
  const [geteditdata, setEditdata] = useState({
    id: "",
    upname: "",
    status: ""
  })
  //navigation
  let histrory = useHistory()
  //navigate to intructor edit page by id
  const UserEditById = (id) => {
    histrory.push(`/instructoredit/${id}`)
  }
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
  // for update topic
  const UpdateInstructor = async () => {
    const UpdateId = geteditdata.id
    const updatetopicObj = {
      name: geteditdata.upname,
      status: geteditdata.status
    }
    await axios.put(`${BaseUrl}instructor/${UpdateId}`, updatetopicObj, { headers: { "auth": localStorage.getItem("LMS_Token") } })
    alert("Updated Successfuly")
    editmodaltoggle()
  }
  //for Update model
  const editmodaltoggle = async (id) => {
    setupdatemodal(!updatemodal)
    const UpdateById = await axios.get(`${BaseUrl}instructor/${id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      }

    })
    setEditdata({ upname: UpdateById.data.name, status: UpdateById.data.status, id: UpdateById.data.id })
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
  //badge for status
  const getBadge = status => {
    switch (status) {
      case 1: return 'success'
      case 0: return 'danger'
      default: return 'primary'
    }
  }
     // get instructor data
     const ReciveInstructorData = async () => {
      await axios.get(`${BaseUrl}instructor`, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          "auth": localStorage.getItem("LMS_Token")
        },
      }).then(function (response) { SetInstructor(response.data) });
    }
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }
 
    ReciveInstructorData()
  }, [])
  // delete table data
  const DeleteFetchData = async (id) => {
    await axios.delete(`${BaseUrl}users/${id}`, { headers: { "auth": localStorage.getItem("LMS_Token") } })
    histrory.push(`/user/instructor`)

    ReciveInstructorData()
  }
  //delete confirmation
  const DeleteInstructor = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CModal
            show={true}
            centered={true}
            onClose={onClose}
          >
            <CModalHeader closeButton> Delete instructor?</CModalHeader>
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
        Instructor
               <div className="card-header-actions">
          <Link to="/instructoradd"><CButton color="primary" className="mr-1" >Add</CButton></Link>
        </div>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          items={Instructor}
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
                  <CButton color="danger" variant="outline" shape="square" size="sm" onClick={() => DeleteInstructor(item.id)}>
                    <CIcon size={'sm'} name={'cilTrash'} />
                  </CButton>
                </td>
              )
          }}

        />
      </CCardBody>
    </CCard>



    <CModal show={updatemodal} onClose={editmodaltoggle} >
      <CModalHeader closeButton>Edit Topic</CModalHeader>
      <CModalBody>
        <CContainer fluid>
          <CRow>
            <CCol sm="12">
              <CForm action="" method="post">
                <CFormGroup>
                  <CInput type="text"
                    name="upname"
                    onChange={change}
                    placeholder="Enter Name.."
                    value={geteditdata.upname}
                    required
                  />

                </CFormGroup>
                <CFormGroup>
                  <CSelect value={geteditdata.status} name="select" id="select nf-password" name="status" onChange={change} >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </CSelect>
                </CFormGroup>
                <CRow >
                  <CCol sm="12">
                    <CButton color="info" block onClick={UpdateInstructor}><span>Submit</span></CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCol>
          </CRow>
        </CContainer>
      </CModalBody>

    </CModal>
  </>
  )
}


export default Customer;