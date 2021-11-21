import React, { useState, useEffect, useRef } from 'react'
import {
  useParams
} from "react-router-dom";
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
  CRow,
  CModal, CModalHeader, CModalBody, CModalFooter,CSpinner
} from '@coreui/react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useForm } from "react-hook-form";
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import BaseUrl from "../BaseUrl/BaseUrl"
import { useHistory } from "react-router-dom";
import "./profile.css"
const Profile = () => {
  //form validation
  const { register, handleSubmit, errors, watch } = useForm();
  //input reffrence for password filed
  const password = useRef({});
  //get current value of password
  password.current = watch("password", "");
  //user profiler data Get And Edit
  const [User, SetUser] = useState({})
  //navidation
  let histrory = useHistory()

  //get profile id @integer value
  const id = localStorage.getItem("profile_id")
  //get profile token  @varchar value
  const token = localStorage.getItem("LMS_Token")
  //recive user by id
  const Recivedata = async () => {
    await axios.get(`${BaseUrl}users/${id}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) { SetUser(response.data) });

  }
  //profile image state initial null
  const [preview,SetPreview]=useState("")
  const [image, setimage] = useState("")
  //profile image onchange input file
  const changeimage = (e) => {
    setimage(e.target.files[0])
    SetPreview(URL.createObjectURL(e.target.files[0]))
  }
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }
    Recivedata()
  }, [])
  // for onchange method
  const change = (e) => {
    const { name, value } = e.target
    SetUser((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  //edit user
  const EditUser = async () => {
    if (User.first_name === "" || User.last_name === "" || User.email === "") {
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
                Please Enter Valid Inputs
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
      })
      histrory.push("/login")
    }
    else {
      //formdata for profile data
      const profileData = new FormData();
      for (var key in User) {
        profileData.append(key, User[key]); // formdata doesn't take objects
      }
      if(image.name){
        profileData.append("old_img",User.image);
        profileData.append("demo_profile", image, image.name.split(" ").join(""));
      }
      await axios.put(`${BaseUrl}users/${id}`, profileData, {
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
                  Updated Successfuly
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
        })
      })
    }
  }

  //change password function
  const onSubmit = async (data) => {
    await axios.put(`${BaseUrl}resateinlogin`, data, {
      headers: { "auth": token },
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
                {reponce.data.kind}
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
      })
    })

  }
  return (
    <>
      <CRow>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            <CCardHeader>
              Profile Edit
            </CCardHeader>
            <CCardBody>
              <CFormGroup className="text-center">
                <form>
                  <label for="fileToUpload">
                    <div className="profile-pic" style={{ backgroundImage: `url(${preview ? preview:User.image })` }}>
                      <span className="fa fa-camera"></span>
      &nbsp;&nbsp;
      <span>Change Image</span>
                    </div>
                  </label>
                  <input type="File" id="fileToUpload" name="profile" onChange={changeimage} accept="image/*" />
                </form>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email">First name</CLabel>
                <CInput type="email" id="nf-email" name="first_name" value={User.first_name} onChange={change} placeholder="Enter first name.." autoComplete="email" />
                <CFormText className="help-block"></CFormText>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email">Last name</CLabel>
                <CInput type="email" id="nf-email" placeholder="Enter last name.." autoComplete="email" name="last_name" value={User.last_name} onChange={change} />
                <CFormText className="help-block"></CFormText>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email">Email</CLabel>
                <CInput type="email" id="nf-email" placeholder="Enter email.." autoComplete="email" name="email" value={User.email} onChange={change} />
                <CFormText className="help-block"></CFormText>
              </CFormGroup>

            </CCardBody>
            <CCardFooter className="d-flex justify-content-around">
              <CButton type="submit" size="sm" color="primary" onClick={EditUser}><CIcon name="cil-scrubber" /> Update profile</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs="12" md="6" className="mb-4"></CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            <CCardHeader>
              Change password
           </CCardHeader>
            <CCardBody>
              <CForm action="" method="post"></CForm>
              <CFormGroup>
                <CLabel htmlFor="nf-password"> Current password</CLabel>
                <CInput type="password" id="nf-password" placeholder="Enter current password.." autoComplete="current-password" name="oldpassword" innerRef={register({ required: true })} />
                {errors.oldpassword && errors.oldpassword.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Current password is required.</p>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password"> New password</CLabel>
                <CInput type="password" id="nf-password" placeholder="Enter new password.." autoComplete="current-password" name="password" innerRef={register({
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
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Confirm password</CLabel>
                <CInput type="password" id="nf-password" name="confirm_password" placeholder="Enter confirm Ppssword.." autoComplete="current-password" innerRef={register({
                  validate: value =>
                    value === password.current || "The passwords do not match"
                })} />
                {errors.confirm_password && <p className="errorMsg animate__animated animate__headShake">{errors.confirm_password.message}</p>}
              </CFormGroup>
            </CCardBody>
            <CCardFooter className="d-flex justify-content-around">
              <CButton type="submit" size="sm" color="primary" onClick={handleSubmit(onSubmit)}><CIcon name="cil-scrubber" />Change password</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard></CCol>
      </CRow>
    </>
  )
}

export default Profile;
