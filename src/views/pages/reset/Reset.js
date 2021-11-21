import React, { useRef, useState, useEffect } from 'react'
import {
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CSpinner,
  CButton,
  CCard,
  CCardBody,
  CContainer,
  CCardGroup,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CSelect,
  CRow,
  CModal, CModalHeader, CModalBody, CModalFooter
} from '@coreui/react'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import BaseUrl from "../../BaseUrl/BaseUrl"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useParams} from "react-router-dom";
const Reset = () => {

  const { register, handleSubmit, errors, watch } = useForm();
  
  let histrory = useHistory()
  const password_id  = useParams();
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }

  }, [])
  //user add function
  const onSubmit = async (data) => {
    await axios.post(`${BaseUrl}resatepassword/${password_id.id}`,data,{
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      }
     
    })




  }
     
const password = useRef({});
  password.current = watch("password", "");
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard className="p-4">
              <CCardBody>
         
            <CForm action="" method="post" >
            <h1>Reset password</h1>
                    <p className="text-muted">Reset your password</p>
              <CFormGroup>
              <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                <CInput type="password" id="nf-password" placeholder="Enter password.." autoComplete="current-password" name="password" innerRef={register({
                  required: "You must specify a password",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters"
                  },
                  MaxLength: {
                    value: 14,
                    message: "Password is not more than 14 characters"
                  }
                })} />
                   </CInputGroup>
                {errors.password && <p className="errorMsg animate__animated animate__headShake">{errors.password.message}</p>}
                <CFormText className="help-block"></CFormText>
              </CFormGroup>
              <CFormGroup>
              <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                <CInput type="password" id="nf-password" name="confirm_password" placeholder="Enter confirm password.." autoComplete="current-password" innerRef={register({
                  validate: value =>
                    value === password.current || "The passwords do not match"
                })} />
                </CInputGroup>
                {errors.confirm_password && <p className="errorMsg animate__animated animate__headShake">{errors.confirm_password.message}</p>}
              </CFormGroup>
              <CRow>
                      <CCol xs="12">
                        <CButton color="primary" className="px-4 btn btn-block" onClick={handleSubmit(onSubmit)} ref={node => (this.btn = node)}>Submits</CButton>
                      </CCol>
                      
                    </CRow>
            </CForm>
            </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Reset
