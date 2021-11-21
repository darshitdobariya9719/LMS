import React, { useRef, useState, useEffect } from 'react'
import {
  CSpinner,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
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
import BaseUrl from "../BaseUrl/BaseUrl"
import "./CustomerStyle.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Tabs = () => {
  //to get company option state
  const [companyOption, SetCompanyOption] = useState([])
  //form validation
  const { register, handleSubmit, errors, watch } = useForm();
  //user image edit state
  const [preview,SetPreview]=useState("")
  const [image, setimage] = useState("")
  let histrory = useHistory()
  //get company option in select option
  const GetcompanyOption = async () => {
    await axios.get(`${BaseUrl}company`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) { SetCompanyOption(response.data) });
  }
  //user edit image onchage handler
  const changeimage = (e) => {
    setimage(e.target.files[0])
    
    SetPreview(URL.createObjectURL(e.target.files[0]))
  }
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }
    GetcompanyOption()
  }, [])
  //user add function
  const onSubmit = async (data) => {
    const fd = new FormData();
    for (var key in data) {
      fd.append(key, data[key]); // formdata doesn't take objects
    }
if(image.name){
  fd.append("demo_profile", image, image.name.split(" ").join(""));
}
    
    fd.append("id_group", 2);
    fd.append("is_instructor", 0);

    await axios.post(`${BaseUrl}users`, fd, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      },
      onUploadProgress: data => {
        //Set the progress value to show the progress bar
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <CModal
                show={true}
                centered={true}
                style={{backgroundColor:"transparent",border:"none"}}
              >
                <CModalBody>
    
                <div className="d-flex justify-content-center align-items-center"><CSpinner color="primary" style={{ width: '5rem', height: '5rem' }} /></div>
    
                  {onClose}
                </CModalBody>
              </CModal>
  
            );
          }
        });
  
      },


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
                Coustomer data uploaded successfuly
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
      histrory.push("/user/customer")
    }).catch((error) => {
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
  const password = useRef({});
  password.current = watch("password", "");
  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
            Customer add

            </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" >
              <CFormGroup>
                <CLabel htmlFor="nf-email">First name</CLabel>
                <CInput type="text" id="nf-email" name="first_name" placeholder="Enter first name.." innerRef={register({ required: true })} />
                {errors.first_name && errors.first_name.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">First name is required.</p>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email">Last Name</CLabel>
                <CInput type="email" id="nf-email" placeholder="Enter last name.." name="last_name" innerRef={register({ required: true })} />
                {errors.last_name && errors.last_name.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Last name is required.</p>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email">Email</CLabel>
                <CInput type="email" id="nf-email" placeholder="Enter email.." name="email" innerRef={register({ required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })} />
                {errors.email && errors.email.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Email is required.</p>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <p className="errorMsg animate__animated animate__headShake">Email is not valid.</p>
                )}
              </CFormGroup>
              <CFormGroup >

                <CLabel htmlFor="text-input">Image</CLabel>


                <CInput type="file" name="profile" onChange={changeimage} accept="image/*"/>
                <a  href={preview} target="_blank"> <img src={preview} width="100px" height="100px" style={{ display: preview ? "block" : "none" }} /></a>
                {errors.profile && errors.profile.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Image is required.</p>
                )}

              </CFormGroup>
              {/*<CFormGroup>
                  <CLabel htmlFor="nf-email">Mobile Number</CLabel>
                  <CInput type="email" id="nf-email" name="nf-email" placeholder="Enter Mobile Number.." />
                  <CFormText className="help-block"></CFormText>
                </CFormGroup>*/}
              <CFormGroup>
                <CLabel htmlFor="nf-password">Password</CLabel>
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
                {errors.password && <p className="errorMsg animate__animated animate__headShake">{errors.password.message}</p>}
                <CFormText className="help-block"></CFormText>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Confirm password</CLabel>
                <CInput type="password" id="nf-password" name="confirm_password" placeholder="Enter confirm password.." autoComplete="current-password" innerRef={register({
                  validate: value =>
                    value === password.current || "The passwords do not match"
                })} />
                {errors.confirm_password && <p className="errorMsg animate__animated animate__headShake">{errors.confirm_password.message}</p>}
              </CFormGroup>
              {/*<CFormGroup >

                    <CLabel htmlFor="select">Country</CLabel>
                    <CSelect custom name="select" id="select nf-password">
                      <option value="0">Please select</option>
                      <option value="1">Austalia</option>
                      <option value="2">USA</option>
                      <option value="3">Landon</option>
                    </CSelect>

                </CFormGroup>*/}
              {/*<CFormGroup >

                    <CLabel htmlFor="select">State</CLabel>
                    <CSelect custom name="select" id="select nf-password">
                      <option value="0">Please select</option>
                      <option value="1">PA</option>
                      <option value="2">RJ</option>
                      <option value="3">UK</option>
                    </CSelect>

                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-password">City</CLabel>
                  <CInput type="text" id="nf-password" name="nf-password" placeholder="Enter City " autoComplete="current-password"/>
                  <CFormText className="help-block"></CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-password">Pincode</CLabel>
                  <CInput type="text" id="nf-password" name="nf-password" placeholder="Enter Pincode " autoComplete="current-password"/>
                  <CFormText className="help-block"></CFormText>
                </CFormGroup>*/}
              <CFormGroup >
                <CLabel htmlFor="select">Company</CLabel>
                <CSelect custom name="id_company" innerRef={register({ required: false })}>
                  <option value="0">Select Company</option>
                  {companyOption.map((cv, i) => {
                    return <option value={cv.id} key={i}>{cv.company_name}</option>
                  })}

                </CSelect>

              </CFormGroup>

              <CFormGroup >
                <CLabel htmlFor="select">Status</CLabel>
                <CSelect custom name="status" innerRef={register({ required: true })}>
                  <option value="">Please select</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </CSelect>
                {errors.status && errors.status.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">status is required.</p>
                )}
              </CFormGroup>

            </CForm>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-around">
            <CButton type="submit" size="sm" color="primary" onClick={handleSubmit(onSubmit)}><CIcon name="cil-scrubber" /> Submit</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs="12" md="6" className="mb-4">

      </CCol>
    </CRow>
  )
}

export default Tabs
