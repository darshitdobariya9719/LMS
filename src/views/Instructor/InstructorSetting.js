import React, { useEffect, useState } from "react"
import { CCardBody, CCardHeader, CInputGroupText, CCard, CLabel, CButton, CTextarea, CInputGroup, CInputGroupPrepend, CCol, CRow, CContainer, CFormGroup, CSelect, CInput, CModalFooter, CModal, CModalHeader, CModalBody, } from '@coreui/react'
import BaseUrl from "../BaseUrl/BaseUrl"
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
function InstructorSettingPage() {
  //instructor revenu state
  const [Instructorrevenu, SetInstructorSetting] = useState({
    Instructor_revenue_percentage: "",
    Admin_revenue_percentage: ""
  })
  // public instructot setting state
  const [public_instructor_setting, SetPublic_instructor_setting] = useState({
    allow_public_instructor: "", Instructor_application_note: ""
  })
  //for navigation
  let histrory = useHistory()
  //for value onchange handler
  const change = (e) => {
    const { name, value } = e.target
    SetInstructorSetting((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
    SetPublic_instructor_setting((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  //get instructor revenu data
  const GetInstructorrevenu = async () => {
    await axios.get(`${BaseUrl}listinstructer_revernue`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) { SetInstructorSetting(response.data[0]) });
  }
  //get instructor setting data
  const GetInstructorSetting = async () => {
    await axios.get(`${BaseUrl}showpublicinstructer/1`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) { SetPublic_instructor_setting(response.data) });
  }
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }
    GetInstructorSetting()
    GetInstructorrevenu()
  }, [])
  //public instructor setting edit update function
  const publiclInstructorSetting = async () => {
    await axios.put(`${BaseUrl}updatepublicinstructer/1`, public_instructor_setting, {
      headers: { "auth": localStorage.getItem("LMS_Token") }
    }).then((response) => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <CModal
              show={true}
              centered={true}
              onClose={onClose}
            >
              <CModalHeader closeButton> Public instructor  setting </CModalHeader>
              <CModalBody>
                Public instructor  setting  updated
      </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={() => {
                  onClose();
                }}>yes</CButton>{' '}
                <CButton
                  color="secondary"
                  onClick={onClose}
                >no</CButton>
              </CModalFooter>
            </CModal>

          );
        }
      });
    })
  }
  //instructor revenu update function
  const InstructorRevenuEditing = async () => {
    const instructprCommision = {
      Instructor_revenue_percentage: parseInt(Instructorrevenu.Instructor_revenue_percentage),
      Admin_revenue_percentage: 100 - Instructorrevenu.Instructor_revenue_percentage
    }
    await axios.put(`${BaseUrl}updateinstructer/1`, instructprCommision, {
      headers: { "auth": localStorage.getItem("LMS_Token") }
    }).then((response) => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <CModal
              show={true}
              centered={true}
              onClose={onClose}
            >
              <CModalHeader closeButton> Instructor commisson </CModalHeader>
              <CModalBody>
                Instructor commisson Updated
      </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={() => {
                  onClose();
                }}>yes</CButton>{' '}
                <CButton
                  color="secondary"
                  onClick={onClose}
                >no</CButton>
              </CModalFooter>
            </CModal>

          );
        }
      });
    })
  }
  return (
    <CContainer>
      <CRow>
        <CCol lg="6" >
          <CCard>
            <CCardHeader>
              PUBLIC INSTRUCTOR SETTINGS
          </CCardHeader>
            <CCardBody>
              <CContainer fluid>
                <CRow>
                  <CCol sm="12">

                    <CFormGroup>
                      <CLabel htmlFor="select " className="font-weight-bold">Allow public instructor</CLabel>
                      <CSelect custom name="allow_public_instructor" value={public_instructor_setting.allow_public_instructor} onChange={change}>
                        <option value="">Please select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </CSelect>
                      {/*<CFormText className="help-block">Please enter your email</CFormText>*/}
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="nf-Instructor application note" className="font-weight-bold">Instructor application note</CLabel>
                      <CTextarea
                        name="Instructor_application_note"
                        id="textarea-input"
                        type="text"
                        rows="9"
                        placeholder="Instructor application note..."
                        value={public_instructor_setting.Instructor_application_note}
                        onChange={change}
                      />
                      {/*<CFormText className="help-block">Please enter your password</CFormText>*/}
                    </CFormGroup>
                    <CFormGroup className="d-flex justify-content-center align-items-center"><CButton type="submit" size="sm" className="btn btn-primary btn-lg  pl-5 pr-5 pt-2 pb-2 shadow  rounded font-weight-bolder" onClick={publiclInstructorSetting}> Update Setting</CButton></CFormGroup>
                  </CCol>
                </CRow>
              </CContainer>
            </CCardBody>

          </CCard>
        </CCol>
        <CCol sm="6">
          <CCard>
            <CCardHeader>
              INSTRUCTOR COMMISSION ETTINGS
          </CCardHeader>
            <CCardBody>

              <CFormGroup>
                <CLabel htmlFor="Instructor revenue percentage " className="font-weight-bold">Instructor revenue percentage</CLabel>
                <CInputGroup className="mb-3">


                  <CInput type="number" placeholder="Instructor revenue percentage" name="Instructor_revenue_percentage" value={Instructorrevenu.Instructor_revenue_percentage} onChange={change} />
                  <CInputGroupPrepend>
                    <CInputGroupText className=" font-weight-bold">
                      %
                      </CInputGroupText>
                  </CInputGroupPrepend>

                </CInputGroup>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="Instructor revenue percentage " className="font-weight-bold">Admin revenue percentage</CLabel>
                <CInputGroup className="mb-3">
                  <CInput type="text" placeholder="Admin revenue percentage" autoComplete="username" name="Admin_revenue_percentage" value={100 - Instructorrevenu.Instructor_revenue_percentage} onChange={change} readonly />
                  <CInputGroupPrepend>
                    <CInputGroupText className=" font-weight-bold">
                      %
                      </CInputGroupText>
                  </CInputGroupPrepend>
                </CInputGroup>
              </CFormGroup>
              <CFormGroup className="d-flex justify-content-center align-items-center"><CButton type="submit" size="sm" className="btn btn-primary btn-lg  pl-5 pr-5 pt-2 pb-2 shadow  rounded font-weight-bolder" onClick={InstructorRevenuEditing}> Update Setting</CButton></CFormGroup>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}
export default InstructorSettingPage;