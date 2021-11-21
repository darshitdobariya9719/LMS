import React, { useRef, useState ,useEffect} from 'react'
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
  CModal,CModalHeader,CModalBody,CModalFooter
} from '@coreui/react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import BaseUrl from "../BaseUrl/BaseUrl"
import "../Customer/CustomerStyle.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useParams} from "react-router-dom";
const CompanyAdd = () => {

  const { register, handleSubmit, errors ,watch} = useForm();
  const [CompanyEditData,SetCompanyEditData]=useState({
company_name:"",
description:"",
email:"",
contact:"",
website:"",
status:""

  })
  let histrory=useHistory()
  const editid  = useParams();

  const change=(e)=>{  // for onchange method
	const {name,value}=e.target
	SetCompanyEditData((prev)=>{
		  return {
	  ...prev,
	  [name]:value
	  }
	 })

   }
   const EditComanydata=async()=>{
	await axios.get(`${BaseUrl}company/${editid.id}`, {
		method: 'GET',
		headers: {
		  'Access-Control-Allow-Origin': '*',
		  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
		  "Content-Type": "application/x-www-form-urlencoded",
		  "auth":localStorage.getItem("LMS_Token")
		},
	  }).then(function (response) { SetCompanyEditData(response.data) });
   }

   useEffect( () => {
    if(!localStorage.getItem("LMS_Token")){
      histrory.push(`/login`)
    }
    EditComanydata()
  }, [])
  const onSubmit= async(data)=>{
  const Userid=localStorage.getItem("profile_id")
  const CompanyAddData={...data,user_id:Userid,description:CompanyEditData.description}
     await axios.put(`${BaseUrl}company/${editid.id}`,CompanyAddData,{
      headers: {
        "auth":localStorage.getItem("LMS_Token")
      }

    }).then((reponce)=>{
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
            Company updated successfuly
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
      histrory.push("/company")
     }).catch((error)=>console.log(error))




  }
  const password = useRef({});
  password.current = watch("password", "");
  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
            <CCardHeader>
          Company edit

            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" >
              <CFormGroup>
                  <CLabel htmlFor="nf-email">Company name</CLabel>
                  <CInput type="text" id="nf-email" name="company_name"  placeholder="Enter first name.."  value={CompanyEditData.company_name} onChange={change}  innerRef={register({ required: true })}/>
                  {errors.company_name && errors.company_name.type === "required" && (
            <p className="errorMsg animate__animated animate__headShake">Company name is required.</p>
          )}
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="textarea-input" className="required"> Description</CLabel>
                    <CKEditor
                    name="description"

				         	value={CompanyEditData.description}
                     type="text"
                    editor={ ClassicEditor }
                    data={CompanyEditData.description}

                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();

                        SetCompanyEditData((prev)=>{
                                return {
                            ...prev,
                            description:data
                            }
                          })
                    } }

                />
                      {errors.description && errors.description.type === "required" && (
            <p className="errorMsg animate__animated animate__headShake">Description is required.</p>
          )}
</CFormGroup>

            <CFormGroup>
                  <CLabel htmlFor="nf-email">email</CLabel>
                  <CInput type="email" id="nf-email" placeholder="Enter email.."  name="email" value={CompanyEditData.email} onChange={change} innerRef={register({ required: true ,pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})}/>
                  {errors.email && errors.email.type === "required" && (
            <p className="errorMsg animate__animated animate__headShake">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="errorMsg animate__animated animate__headShake">Email is not valid.</p>
          )}
                </CFormGroup>
                {/*<CFormGroup>
                  <CLabel htmlFor="nf-email">Mobile Number</CLabel>
                  <CInput type="email" id="nf-email" name="nf-email" placeholder="Enter Mobile Number.." />
                  <CFormText className="help-block"></CFormText>
                </CFormGroup>*/}
                <CFormGroup>
                  <CLabel htmlFor="nf-password">Contact</CLabel>
                  <CInput type="tel" id="nf-password" placeholder="Enter contact number.." autoComplete="current-password" name="contact" value={CompanyEditData.contact} onChange={change} innerRef={register({
          required: "Contact is required",
          minLength: {
            value: 10,
            message: "Contact number must have at least 10 number"
          },
        })}/>
				       {errors.contact && <p className="errorMsg animate__animated animate__headShake">{errors.contact.message}</p>}
                  <CFormText className="help-block"></CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-password">Website</CLabel>
                  <CInput type="text" id="nf-password" name="website" placeholder="Enter website.." autoComplete="current-password"  value={CompanyEditData.website} onChange={change}    innerRef={register({ required: true })} />
				  {errors.website && errors.website.type === "required" && (
            <p className="errorMsg animate__animated animate__headShake">Website is required.</p>
          )}
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

<CLabel htmlFor="select">Status</CLabel>
<CSelect custom name="status" innerRef={register({ required: true })} value={CompanyEditData.status} onChange={change}>
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

export default CompanyAdd;
