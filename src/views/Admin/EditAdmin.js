import React, { useState, useRef, useEffect } from 'react'
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
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import BaseUrl from "../BaseUrl/BaseUrl"
import "../Customer/CustomerStyle.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const EditAdmin = () => {
  // State hook for hold Admin data for edit
  const [User, SetUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    status: "",
    image:""
  })
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
  //admin edit image state
  const [preview,SetPreview]=useState("")
  const [image, setimage] = useState(null)
  // form validation library for react
  const { register, handleSubmit, errors, watch } = useForm();
  // for navigationg  hook function in react
  let histrory = useHistory()
  // get Admin id from URL
  const editid = useParams();
  //GET aadmin data
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
  console.log(User)
  useEffect(() => {
    GetAdminData()
  }, [])
  //admin profile edit image onchange methode
  const changeimage = (e) => {
    setimage(e.target.files[0])
    SetPreview(URL.createObjectURL(e.target.files[0]))
  }
  // admin Edit function
  const onSubmit = async (data) => {
    const AdminFormData = new FormData();
    for (var key in data) {
      AdminFormData.append(key, data[key]); // formdata doesn't take objects
    }
if(image.name){
  AdminFormData.append("old_img",User.image);
  AdminFormData.append("demo_profile", image, image.name.split(" ").join(""));
}
    
    AdminFormData.append("id_group", 1);

    await axios.put(`${BaseUrl}users/${editid.id}`, AdminFormData, {
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
                Admin data uploaded successfuly
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
      histrory.push("/admin")
    })


  }
  //password filed input reffences
  const password = useRef({});
  //get current value of password
  password.current = watch("password", "");
  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
            Admin Edit

            </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" >
              <CFormGroup>
                <CLabel htmlFor="nf-email">First Name</CLabel>
                <CInput type="text" id="nf-email" name="first_name" placeholder="Enter First Name.. " onChange={change} value={User.first_name} autoComplete="email" innerRef={register({ required: true })} />
                {errors.first_name && errors.first_name.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">First Name is required.</p>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email">Last Name</CLabel>
                <CInput type="text" id="nf-email" placeholder="Enter Last Name.." autoComplete="email" onChange={change} value={User.last_name} name="last_name" innerRef={register({ required: true })} />
                {errors.last_name && errors.last_name.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Last Name is required.</p>
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
              <CFormGroup>
                <CLabel htmlFor="text-input">Image</CLabel> <CInput type="file" name="profile" onChange={changeimage} accept="image/*" />
                <a  href={preview?preview:User.image} target="_blank"> <img src={preview?preview:User.image} width="100px" height="100px" style={{ display:"block"}} /></a> 

              </CFormGroup>
              {/*for futute use*/}
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

export default EditAdmin;
