import React, { useState, useEffect } from 'react'
import "../charts/chart.css"
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CFormText,
  CTextarea,
  CInput,
  CLabel,
  CSelect,
  CForm, CRow, CModalHeader, CModalBody, CModalFooter, CModal
} from '@coreui/react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import BaseUrl from "../BaseUrl/BaseUrl"
import "../Customer/CustomerStyle.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useForm } from "react-hook-form";

function WebsiteSettingPage() {
  //website setting cookie,term and condition,privacy policy editor for discription state
  const [WebsiteEditor, SetWebsiteEditor] = useState({
    cookie_policy: "",
    terms_and_condition: "",
    privacy_policy: ""
  })
  //website setting state
  const [webUpdate, setUpdate] = useState({
    recaptcha_sitekey: "",
    recaptcha_secretkey: "",
    cookie_status: "",
    cookie_note: "",
    cookie_policy: "",
    terms_and_condition: "",
    privacy_policy: "",
  })
  //validation library
  const { register, handleSubmit, errors } = useForm();
  // logo image upload
  const [image, setimage] = useState(null)
  // recieve data to edit from id 1
  const Recivedata = async () => {
    await axios.get(`${BaseUrl}websiteshow/1`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) { setUpdate(response.data) });
  }
  //on image change handler
  const changeimage = (e) => {
    setimage(e.target.files[0])
  }
  //form value onchange handler
  const change = (e) => {
    const { name, value } = e.target
    setUpdate((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })

  }
  //for navigation
  let histrory = useHistory()
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }
    Recivedata()
  }, [])
  //update website setting function
  const onSubmit = async (data) => {
    const fd = new FormData();
    for (var key in data) {
      fd.append(key, data[key]); // formdata doesn't take objects
    }

    fd.append("demo_image", image, image.name);
    fd.append("cookie_policy", WebsiteEditor.cookie_policy);
    fd.append("terms_and_condition", WebsiteEditor.terms_and_condition);
    fd.append("privacy_policy", WebsiteEditor.privacy_policy);
    await axios.put(`${BaseUrl}updatewebsite/1`, fd, {
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
                Website settings updated successfuly
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
            Website settings

            </CCardHeader>
          <CCardBody>
            <CForm action="" method="post" >
              <CFormGroup>
                <CLabel htmlFor="nf-email" className="required">Recaptcha sitekey (v3)</CLabel>
                <CInput type="text" name="recaptcha_sitekey" placeholder="Enter recaptcha sitekey.." value={webUpdate.recaptcha_sitekey} innerRef={register({ required: true })} onChange={change} />
                {errors.recaptcha_sitekey && errors.recaptcha_sitekey.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Recaptcha sitekey is required.</p>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email" className="required">Recaptcha secretkey (v3)</CLabel>
                <CInput type="text" name="recaptcha_secretkey" placeholder="Enter recaptcha secretkey.." value={webUpdate.recaptcha_secretkey} innerRef={register({ required: true })} onChange={change} />
                {errors.recaptcha_secretkey && errors.recaptcha_secretkey.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Recaptcha secretkey  is required.</p>
                )}
              </CFormGroup>
              <CFormGroup >

                <CLabel htmlFor="select" className="required">Cookie status</CLabel>
                <CSelect custom name="cookie_status" id="select nf-password" innerRef={register({ required: true })} value={webUpdate.cookie_status} onChange={change} >
                  <option value="1">Active </option>
                  <option value="0">Inactive</option>
                </CSelect>
                {errors.cookie_status && errors.cookie_status.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Cookie status  is required.</p>
                )}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email">Cookie note</CLabel>
                <CTextarea
                  value={webUpdate.cookie_note}
                  name="cookie_note"
                  id="textarea-input"
                  type="text"
                  rows="7"
                  placeholder="Website description..."
                  nChange={change}
                  innerRef={register({ required: false })}
                />
                <CFormText className="help-block"></CFormText>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="text-input">Logo</CLabel>


                <CInput type="file" name="demo_image" onChange={changeimage} />
                {errors.demo_image && errors.demo_image.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Image is required.</p>
                )}

              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="textarea-input" className="required">Cookie policy</CLabel>
                <CKEditor
                  name="cookie_policy"
                  value={WebsiteEditor.cookie_policy}
                  required
                  type="text"
                  editor={ClassicEditor}
                  data={webUpdate.cookie_policy}
                  style={{ minHheight: "400px!important" }}
                  onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();

                    SetWebsiteEditor((prev) => {
                      return {
                        ...prev,
                        cookie_policy: data
                      }
                    })
                  }}
                />


              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="textarea-input" className="required">Terms and condition</CLabel>
                <CKEditor
                  name="terms_and_condition"
                  value={WebsiteEditor.terms_and_condition}
                  required
                  type="text"
                  editor={ClassicEditor}
                  data={webUpdate.terms_and_condition}
                  style={{ minHheight: "400px!important" }}
                  onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();

                    SetWebsiteEditor((prev) => {
                      return {
                        ...prev,
                        terms_and_condition: data
                      }
                    })
                  }}
                />


              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="textarea-input" className="required">Privacy policy</CLabel>
                <CKEditor
                  name="privacy_policy"
                  value={WebsiteEditor.privacy_policy}
                  required
                  type="text"
                  editor={ClassicEditor}
                  data={webUpdate.privacy_policy}
                  style={{ minHheight: "400px!important" }}
                  onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();

                    SetWebsiteEditor((prev) => {
                      return {
                        ...prev,
                        privacy_policy: data
                      }
                    })
                  }}
                />


              </CFormGroup>
            </CForm>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-around">
            <CFormGroup className="d-flex justify-content-center align-items-center"><CButton type="submit" size="sm" className="btn btn-primary btn-lg  pl-5 pr-5 pt-2 pb-2 shadow  rounded font-weight-bolder" onClick={handleSubmit(onSubmit)}> Update setting</CButton></CFormGroup>

          </CCardFooter>
        </CCard>
      </CCol>




      <CCol xs="12" md="6" className="mb-4">

      </CCol>
    </CRow>
  )
}
export default WebsiteSettingPage