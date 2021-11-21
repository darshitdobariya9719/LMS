import React, { useRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import "./Register.css"
import { useHistory } from "react-router-dom";
import CIcon from '@coreui/icons-react'
import { useForm } from "react-hook-form";
const Register = () => {
  const { register, handleSubmit, errors ,watch} = useForm();
  let histrory=useHistory()
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit=(data)=>{
console.log(data);
histrory.push("/login")
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Username" autoComplete="username"  innerRef={register({ required: true })} name="username"/>

                  </CInputGroup>
                  {errors.username && errors.username.type === "required" && (
            <p className="errorMsg animate__animated animate__headShake">Username is required.</p>
          )}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Email" autoComplete="email" name="email"  innerRef={register({ required: true ,pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})}/>


                  </CInputGroup>
                  <span>
                    {errors.email && errors.email.type === "required" && (
            <p className="errorMsg animate__animated animate__headShake">Email is required.</p>
          )}

          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg animate__animated animate__headShake">Email is not valid.</p>
          )}
                    </span>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" name="password"  innerRef={register({
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
                  <span>
        {errors.password && <p className="errorMsg animate__animated animate__headShake">{errors.password.message}</p>}
        </span>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Repeat password" name="confirm_password" autoComplete="new-password"  innerRef={register({
          validate: value =>
            value === password.current || "The passwords do not match"
        })}/>

                  </CInputGroup>
                  <span> {errors.confirm_password && <p className="errorMsg animate__animated animate__headShake">{errors.confirm_password.message}</p>}</span>
                  <CButton color="success" block onClick={handleSubmit(onSubmit)}>Create Account</CButton>
                </CForm>
              </CCardBody>
              {/*<CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter>*/}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
