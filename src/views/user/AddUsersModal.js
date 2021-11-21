import React, { useState } from "react"
import { CButton, CModal, CModalHeader, CModalBody, CForm, CCol, CRow, CContainer, CFormGroup, CLabel, CInput } from '@coreui/react'
import axios from 'axios';
import BaseUrl from "../BaseUrl/BaseUrl"
function AddUsersModal(props) {
  //user name
  const [name, SetName] = useState("")
  //onchange method for form input
  const OnChangeHandller = (e) => { SetName(e.target.value); }
  //add user function
  const AddUser = async () => {
    if (name === "") {
      alert("Enter Name..");
    }
    else {
      try {
        const Addname = { name: name }
        await axios.post(`${BaseUrl}Users`, Addname, {
          headers: {
            "auth": localStorage.getItem("LMS_Token")
          }

        });
        alert("Name Entered Successfully");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <>
      <CModal show={props.show} onClose={props.onClose} >
        <CModalHeader closeButton>Add Name</CModalHeader>
        <CModalBody>
          <CContainer fluid>
            <CRow>
              <CCol sm="12">
                <CForm action="" method="post">
                  <CFormGroup>
                    <CLabel htmlFor="nf-email">Name:</CLabel>
                    <CInput type="text"
                      name="name"
                      onChange={OnChangeHandller}
                      placeholder="Enter Name.."

                      value={name}
                      required
                    />

                  </CFormGroup>
                  <CRow >
                    <CCol sm="12">
                      <CButton color="info" block onClick={AddUser}><span>Submit</span></CButton>
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
export default AddUsersModal;