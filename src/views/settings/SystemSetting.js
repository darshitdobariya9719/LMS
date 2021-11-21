import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CModal,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CSelect,
  CRow,
  CTextarea, CModalHeader, CModalBody, CModalFooter
} from '@coreui/react'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import BaseUrl from "../BaseUrl/BaseUrl"
import "../Customer/CustomerStyle.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const SystemSettings = () => {
  //form validation
  const { register, handleSubmit, errors } = useForm();
  //website keywords
  const [WebsiteKeywords, SetWebsiteKeywords] = useState({
    keywords: []
  })
  //form value onchange handler
  const change = (e) => {
    const { name, value } = e.target
    SetUpdatesystem((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  //website keywords onchange handler
  const web = (keywords) => {
    SetWebsiteKeywords({ keywords })
  }
  //navidation
  let histrory = useHistory()
  //system setting update state
  const [Updatesysytem, SetUpdatesystem] = useState({
    name: "",
    title: "",
    description: "",
    Author: "",
    Slogan: "",
    email: "",
    thaddress: "",
    phone: "",
    youtuyoutube_api_key: "",
    vimvimeo_api_key: "",
    student_email_vestudent_email_verification: "",
    footer_text: "",
    footer_link: "",
  })
  // recive system setting data from id 2
  const Recivedata = async () => {
    await axios.get(`${BaseUrl}system/2`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      SetUpdatesystem(response.data)
      //add data to website keywords
      const wbkey = []
      wbkey.push(response.data.keywords.split(","))
      wbkey.map((cv) => {
        SetWebsiteKeywords({ keywords: cv })
      })

    });

  }

  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }
    Recivedata()
  }, [])
  //system setting update function
  const onSubmit = async (data) => {
    let webkey = ``;
    WebsiteKeywords.keywords.map((cv, i) => {
      webkey = webkey + `${cv},`
    })
    const updateSetting = {
      ...data,
      keywords: webkey,

    }
    await axios.put(`${BaseUrl}updatesystem/2`, updateSetting, {
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
                System settings updated successfuly
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
            System settings

            </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" >
              <CFormGroup>
                <CLabel htmlFor="nf-email" className="required">Website name</CLabel>
                <CInput type="text" name="name" placeholder="Enter website name.." value={Updatesysytem.name} innerRef={register({ required: true })} onChange={change} />
                {errors.company_name && errors.company_name.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Website name is required.</p>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email" className="required">Website title</CLabel>
                <CInput type="text" name="title" placeholder="Enter website title.." value={Updatesysytem.title} innerRef={register({ required: true })} onChange={change} />
                {errors.company_name && errors.company_name.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Website title is required.</p>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email">Website keywords</CLabel>
                <TagsInput name="keywords" value={WebsiteKeywords.keywords} onChange={web} />


              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email">Website description</CLabel>
                <CTextarea
                  onChange={change}
                  name="description"
                  id="textarea-input"
                  type="text"
                  rows="7"
                  placeholder="Website description..."
                  innerRef={register({ required: false })}
                  value={Updatesysytem.description}
                />
                <CFormText className="help-block"></CFormText>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-Author">Author</CLabel>
                <CInput type="text" id="nf-email" placeholder="Enter author name.." name="Author" value={Updatesysytem.Author} onChange={change} innerRef={register({ required: true })} />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-Slogan" className="required">Slogan</CLabel>
                <CInput type="text" id="nf-password" placeholder="Enter slogan.." name="Slogan" innerRef={register({ required: true })} value={Updatesysytem.Slogan} onChange={change} />
                {errors.company_name && errors.company_name.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Slogan is required.</p>
                )}
                <CFormText className="help-block"></CFormText>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email" className="required">System email</CLabel>
                <CInput type="email" id="nf-email" placeholder="Enter system email.." name="email" innerRef={register({ required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })} value={Updatesysytem.email} onChange={change} />
                {errors.email && errors.email.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake"> System email is required.</p>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <p className="errorMsg animate__animated animate__headShake"> System email is not valid.</p>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email">Address</CLabel>
                <CTextarea
                  onChange={change}
                  name="address"
                  id="textarea-input"
                  type="text"
                  rows="7"
                  value={Updatesysytem.address}
                  placeholder=" Enter Address.."
                  innerRef={register({ required: false })}
                />
                <CFormText className="help-block"></CFormText>
              </CFormGroup>
              {/*<CFormGroup>
                  <CLabel htmlFor="nf-email">Mobile Number</CLabel>
                  <CInput type="email" id="nf-email" name="nf-email" placeholder="Enter Mobile Number.." />
                  <CFormText className="help-block"></CFormText>
                </CFormGroup>*/}
              <CFormGroup>
                <CLabel htmlFor="nf-Phone">Phone</CLabel>
                <CInput type="tel" id="nf-password" placeholder="Enter phone number.." onChange={change} autoComplete="current-password" name="phone" value={Updatesysytem.phone} innerRef={register({
                  required: "Phone number  is required",
                  minLength: {
                    value: 10,
                    message: "Phone number must have at least 10 number"
                  },
                })} />
                {errors.contact && <p className="errorMsg animate__animated animate__headShake">{errors.contact.message}</p>}
                <CFormText className="help-block"></CFormText>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password" className="required">Youtube api key</CLabel>
                   &nbsp; &nbsp;<span className="text-secondary">(Get Youtube Api key)</span>
                <CInput type="text" id="nf-password" name="youtube_api_key" value={Updatesysytem.youtube_api_key} placeholder="Enter youtube api key.." autoComplete="current-password" innerRef={register({ required: true })} onChange={change} />
                {errors.website && errors.website.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Youtube api key is required.</p>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password" className="required">Vimeo api key</CLabel>
                  &nbsp; &nbsp;<span className="text-secondary">(Get vimeo Api key)</span>
                <CInput type="text" id="nf-password" name="vimeo_api_key" value={Updatesysytem.vimeo_api_key} placeholder="Enter vimeo api key.." autoComplete="current-password" innerRef={register({ required: true })} onChange={change} />
                {errors.website && errors.website.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Vimeo api key is required.</p>
                )}
              </CFormGroup>
              <CFormGroup >

                <CLabel htmlFor="select">Student email verification</CLabel>
                <CSelect custom name="student_email_verification" value={Updatesysytem.student_email_verification} id="select nf-password" innerRef={register({ required: false })} onChange={change}>
                  <option value="1">Enable</option>
                  <option value="0">Desable</option>
                </CSelect>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Footer text</CLabel>
                <CInput type="text" id="nf-password" name="footer_text" value={Updatesysytem.footer_text} placeholder="Enter footer text.." autoComplete="current-password" innerRef={register({ required: false })} onChange={change} />

              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Footer link</CLabel>
                <CInput type="text" id="nf-password" name="footer_link" value={Updatesysytem.footer_link} placeholder="Enter footer link.." autoComplete="current-password" innerRef={register({ required: false })} onChange={change} />
              </CFormGroup>
            </CForm>
          </CCardBody>
          <CFormGroup className="d-flex justify-content-center align-items-center"><CButton type="submit" size="sm" className="btn btn-primary btn-lg  pl-5 pr-5 pt-2 pb-2 shadow  rounded font-weight-bolder" onClick={handleSubmit(onSubmit)}> Update setting</CButton></CFormGroup>
        </CCard>
      </CCol>
      <CCol xs="12" md="6" className="mb-4">
      </CCol>
    </CRow>
  )
}

export default SystemSettings;
