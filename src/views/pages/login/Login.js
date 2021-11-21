import React,{useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,CModal,CModalHeader,CModalBody,CModalFooter
} from '@coreui/react'
import BaseUrl from "../../BaseUrl/BaseUrl"
import CIcon from '@coreui/icons-react'
import "../register/Register.css"
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const Login = () => {
  //validation for login
  const { register, handleSubmit, errors} = useForm();
//navigation
const [login,SetLogin]=useState({
  email:"",
  password:""
})
const forgot=()=>{
  histrory.push('/forgot_password')
}
const change = (e) => {  // for onchange method
  const { name, value } = e.target
  SetLogin((prev) => {
    return {
      ...prev,
      [name]: value
    }
  })

}
  let histrory=useHistory()
  const handleKeypress =async  e => {
    //it triggers by pressing the enter key
  if (e.code === "Enter" ) {


      await axios.post(`${BaseUrl}users/login`,login).then((reponce)=>{
        if(reponce.data.kind==="user login successfully"){
          localStorage.setItem("LMS_Token",reponce.data.token);
          localStorage.setItem("profile_id",reponce.data.res.id);
          histrory.push("/dashboard")

          }
          if(reponce.data.kind==="Email or Password is wrong"){
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
                  Email or Password is wrong
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

            }
            if(reponce.data.kind==="user not exist"){

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
                    User Not Exist
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
              }); }
    }).catch((error)=>console.log(error))
  }
}
//login function
  const onSubmit=async(LoginUserData)=>{

    await axios.post(`${BaseUrl}users/login`,LoginUserData).then((reponce)=>{
      if(reponce.data.kind==="user login successfully"){
        localStorage.setItem("LMS_Token",reponce.data.token);
        localStorage.setItem("profile_id",reponce.data.res.id);
        histrory.push("/dashboard")

        }
        if(reponce.data.kind==="Email or Password is wrong"){
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
                Email or Password is wrong
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

          }
          if(reponce.data.kind==="user not exist"){

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
                  User Not Exist
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
            }); }
  }).catch((error)=>console.log(error))
      }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email" placeholder="Email" autoComplete="username" innerRef={register({ required: true ,pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})} name="email" onChange={change} value={login.email}/>
                    </CInputGroup>
                    {errors.email && errors.email.type === "required" && (
            <p className="errorMsg animate__animated animate__headShake">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg animate__animated animate__headShake">Email is not valid.</p>
          )}
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" innerRef={register({ required: true })} name="password" onKeyDown={handleKeypress} onChange={change} value={login.password}/>
                    </CInputGroup>
                    <span>{errors.password && errors.password.type === "required" && (
            <p className="errorMsg animate__animated animate__headShake">password is required.</p>
          )}</span>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={handleSubmit(onSubmit)} ref={node => (this.btn = node)}>Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0" onClick={forgot}>Forgot password?</CButton>
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

export default Login
