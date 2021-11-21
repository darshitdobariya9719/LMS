import React, { useState, useRef, useEffect } from 'react'
import {
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
  CModal, CModalHeader, CModalBody, CModalFooter,CSpinner
} from '@coreui/react'
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import sha1 from 'sha1';
import { useHistory } from "react-router-dom";
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import BaseUrl from "../BaseUrl/BaseUrl"
import "../Customer/CustomerStyle.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const CustomerEdit = () => {
  // customer edit state
  const [User, SetUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    status: "",

  })
  //user image state
  const [preview,SetPreview]=useState("")
  const [image, setimage] = useState("")
  // for onchange method form input
  const change = (e) => {
    const { name, value } = e.target
    SetUser((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  // validation library
  const { register, handleSubmit, errors, watch } = useForm();
  let histrory = useHistory()
  // get id from url
  const editid = useParams();
  // get Admin data
  const GetAdminData = async () => {
    await axios.get(`${BaseUrl}users/${editid.id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      }
    }).then((responce) => SetUser(responce.data))
  }
  //user imaage onchange handler
  const changeimage = (e) => {
    setimage(e.target.files[0])
    SetPreview(URL.createObjectURL(e.target.files[0]))
  }
  useEffect(() => {
    GetAdminData()
  }, [])
  // edit customer value
    const onSubmit = async (data) => {
    const fd = new FormData();
    for (var key in data) {
      fd.append(key, data[key]); // formdata doesn't take objects
    }
    if(image.name){
      fd.append("old_img",User.image);
      fd.append("demo_profile", image, image.name.split(" ").join(""));
    }
  
    fd.append("id_group", 2);
    fd.append("is_instructor", 0);
    await axios.put(`${BaseUrl}users/${editid.id}`, fd, {
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
                Customer data uploaded successfuly
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
    })
  }
  const password = useRef({});
  password.current = watch("password", "");
  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
            Customer edit
             </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" >
              <CFormGroup>
                <CLabel htmlFor="nf-email">First name</CLabel>
                <CInput type="text" id="nf-email" name="first_name" placeholder="Enter first name.. " onChange={change} value={User.first_name} autoComplete="email" innerRef={register({ required: true })} />
                {errors.first_name && errors.first_name.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">First name is required.</p>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email">Last name</CLabel>
                <CInput type="text" id="nf-email" placeholder="Enter last name.." autoComplete="email" onChange={change} value={User.last_name} name="last_name" innerRef={register({ required: true })} />
                {errors.last_name && errors.last_name.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Last name is required.</p>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email">Email</CLabel>
                <CInput type="email" id="nf-email" placeholder="Enter email.." autoComplete="email" name="email" onChange={change} value={User.email} innerRef={register({ required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })} />
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
                <a  href={preview?preview:User.image
                } target="_blank"> <img src={preview?preview:User.image} width="100px" height="100px" style={{ display:"block"}} /></a> 
                {errors.profile && errors.profile.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Image is required.</p>
                )}

              </CFormGroup>
              {/*<CFormGroup>
                  <CLabel htmlFor="nf-email">Mobile Number</CLabel>
                  <CInput type="email" id="nf-email" name="nf-email" placeholder="Enter Mobile Number.." autoComplete="email"/>
                  <CFormText className="help-block"></CFormText>
                </CFormGroup>*/}
              <CFormGroup>
                <CLabel htmlFor="nf-password">Password</CLabel>
                <CInput type="password" id="nf-password" placeholder="Enter password.." autoComplete="current-password" onChange={change} value={User.password} name="password" innerRef={register({
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
                <CInput type="password" id="nf-password" name="confirm_password" placeholder="Enter confirm password.." onChange={change} autoComplete="current-password" value={User.password} innerRef={register({
                  validate: value =>
                    value === password.current || "The passwords do not match"
                })} />
                {errors.confirm_password && <p className="errorMsg animate__animated animate__headShake">{errors.confirm_password.message}</p>}
              </CFormGroup>
              <CFormGroup >
                <CLabel htmlFor="select">Status</CLabel>
                <CSelect custom name="status" innerRef={register({ required: true })} value={User.status} onChange={change}>
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

export default CustomerEdit;
