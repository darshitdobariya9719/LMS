import React, { useState, useEffect } from "react"
import { CButton, CModal, CModalHeader, CModalBody, CForm, CCol, CRow, CFormGroup, CInput, CCardBody, CModalFooter, CCard, CCardHeader, CSelect } from '@coreui/react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import BaseUrl from "../BaseUrl/BaseUrl"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
function UserGroupEdit() {
  //EDIT USERGROUP DATA
  const [geteditdata, setEditdata] = useState({
    id: "",
    name: "",
    status: ""
  })
  const editid = useParams();
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
  //getv user groups data
  const Recivedata = async () => {
    await axios.get(`${BaseUrl}usergroups/${editid.id}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) { setEditdata(response.data) });

  }
  // for update user group
  const UpdateUserGroups = async () => {
    const UpdateId = geteditdata.id
    const updatelevelObj = {
      name: geteditdata.name,
      status: geteditdata.status
    }
    await axios.put(`${BaseUrl}usergroups/${UpdateId}`, updatelevelObj, {
      headers: { "auth": localStorage.getItem("LMS_Token") }

    }).then((responce) => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <CModal
              show={true}
              centered={true}
              onClose={onClose}
            >
              <CModalHeader closeButton> {window.location.host} Says</CModalHeader>
              <CModalBody>
                Updated successfuly
        </CModalBody>
              <CModalFooter>

                <CButton
                  color="primary"
                  onClick={onClose}
                >Ok</CButton>
              </CModalFooter>
            </CModal>

          );
        }
      });
      histrory.push("/user/groups")
    })
  }
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }

    Recivedata()

  }, [])
  return (
    <>


      <CCard>
        <CCardHeader>
          Group edit
            </CCardHeader>
        <CCardBody>
          <CForm action="" method="post">
            <CFormGroup>
              <CInput type="text"
                name="name"
                onChange={change}
                placeholder="Enter Name.."
                value={geteditdata.name}
                required
              />

            </CFormGroup>
            <CFormGroup>
              <CSelect value={geteditdata.status} custom name="select" id="select nf-password" name="status" onChange={change} >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </CSelect>
            </CFormGroup>
            <CRow >
              <CCol sm="12">
                <CButton color="info" block onClick={UpdateUserGroups}><span>Submit</span></CButton>
              </CCol>

            </CRow>

          </CForm>
        </CCardBody>

      </CCard>
    </>
  )
}

export default UserGroupEdit;