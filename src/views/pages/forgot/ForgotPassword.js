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
const Forgot = () => {
  //validation for login
  const { register, handleSubmit, errors} = useForm();
//navigation
const [forgot,SetLogin]=useState({
  email:"",
 
})
const login=()=>{
    histrory.push('/login')
}
const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
     alert(e.target.value)
    }
  }
  let histrory=useHistory()

//login function
  const onSubmit=async(forgetEmail)=>{
    await axios.post(`${BaseUrl}forgatepassword`,forgetEmail,{
      headers: {
        "auth":localStorage.getItem("LMS_Token")
      }

     }).then((reponce)=>{
    //   confirmAlert({
    //     customUI: ({ onClose }) => {
    //       return (
    //         <CModal
    //         show={true}
    //         centered={true}
    //         onClose={onClose}
    //       >
    //  <CModalHeader closeButton> {window.location.host} Says</CModalHeader>
    //         <CModalBody>
    //         Company added sccessfuly
    //         </CModalBody>
    //         <CModalFooter>

    //           <CButton
    //             color="primary"
    //             onClick={onClose}
    //           >Ok</CButton>
    //         </CModalFooter>
    //       </CModal>

    //       );
    //     }
      //});
  
     }).catch((error)=>{
       if (error.response) {
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

   {error.response.data.message}
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

   })


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
                    <h1>Forgot password</h1>
                    <p className="text-muted">Forget password by your registered email</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email" placeholder="Email" autoComplete="username" innerRef={register({ required: true ,pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})} name="email" onKeyDown={handleKeyDown}/>
                    </CInputGroup>
                    {errors.email && errors.email.type === "required" && (
            <p className="errorMsg animate__animated animate__headShake">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg animate__animated animate__headShake">Email is not valid.</p>
          )}
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4 btn btn-lg" onClick={handleSubmit(onSubmit)} ref={node => (this.btn = node)}>Submit</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link"  className="btn btn-lg px-0" onClick={login}>Login</CButton>
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

export default Forgot;
