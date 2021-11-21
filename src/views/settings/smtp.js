import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CModal, CModalHeader, CModalBody, CModalFooter
} from '@coreui/react'

import 'react-tagsinput/react-tagsinput.css'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import BaseUrl from "../BaseUrl/BaseUrl"
import "../Customer/CustomerStyle.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const SmtpSettings = () => {
  //form validation
  const { register, handleSubmit, errors } = useForm();
  //update smtp state
  const [UpdateSmtp, SetUpdateSmtp] = useState({
    protocol: "",
    smtp_host: "",
    smtp_port: "",
    smtp_username: "",
    smtp_password: "",
  })
  //navidation
  let histrory = useHistory()
  //recieve smtp data from id 1
  const Recivedata = async () => {
    await axios.get(`${BaseUrl}showsmtp/1`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) { SetUpdateSmtp(response.data) });
  }
  //form value onchange handler
  const change = (e) => {
    const { name, value } = e.target
    SetUpdateSmtp((prev) => {
      return {
        ...prev,
        [name]: value,

      }
    })
  }
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }
    Recivedata()
  }, [])
  //update smtp setting function
  const onSubmit = async (data) => {
    await axios.put(`${BaseUrl}updatesmtp/1`, data, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      }

    }).then((reponce) => {
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
                Smtp settings update successfuly
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

    }).catch((error) => console.log(error))
  }

  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
            Smtp settings

            </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" >
              <CFormGroup>
                <CLabel htmlFor="nf-email" className="required">Protocol</CLabel>
                <CInput type="text" name="protocol" placeholder="Enter protocol." value={UpdateSmtp.protocol} innerRef={register({ required: true })} onChange={change} />
                {errors.protocol && errors.protocol.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Protocol is required.</p>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email" className="required">Smtp host</CLabel>
                <CInput type="text" name="smtp_host" placeholder="Enter smtp host." value={UpdateSmtp.smtp_host} onChange={change} innerRef={register({ required: true })} />
                {errors.smtp_host && errors.smtp_host.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Smtp host is required.</p>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email" className="required">Smtp port</CLabel>
                <CInput type="text" name="smtp_port" placeholder="Enter smtp port.." value={UpdateSmtp.smtp_port} innerRef={register({ required: true })} onChange={change} />
                {errors.smtp_port && errors.smtp_port.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Smtp port is required.</p>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email" className="required">Smtp username</CLabel>
                <CInput type="text" name="smtp_username" placeholder="Enter smtp username.." value={UpdateSmtp.smtp_username} innerRef={register({ required: true })} onChange={change} />
                {errors.smtp_username && errors.smtp_username.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Smtp username is required.</p>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email" className="required">Smtp password</CLabel>
                <CInput type="text" name="smtp_password" placeholder="Enter smtp password.." value={UpdateSmtp.smtp_password} innerRef={register({ required: true })} onChange={change} />
                {errors.smtp_password && errors.smtp_password.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Smtp password is required.</p>
                )}
              </CFormGroup>
            </CForm>
          </CCardBody>
          <CFormGroup className="d-flex justify-content-center align-items-center"><CButton type="submit" size="sm" className="btn btn-primary btn-lg  pl-5 pr-5 pt-2 pb-2 shadow  rounded font-weight-bolder" onClick={handleSubmit(onSubmit)}> Update Setting</CButton></CFormGroup>
        </CCard>
      </CCol>
      <CCol xs="12" md="6" className="mb-4">
      </CCol>
    </CRow>
  )
}

export default SmtpSettings;
