import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from "react-router-dom";
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
  CInput,
  CLabel,
  CSelect,
  CModal, CModalHeader, CModalBody, CModalFooter
} from '@coreui/react'
import FormData from "form-data"
import "./Category.css"
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useForm } from "react-hook-form";
import BaseUrl from "../BaseUrl/BaseUrl"
import CIcon from '@coreui/icons-react'
import CourseAdd from '../charts/Charts';
const AddCategorys = () => {
  //for Add Category object State
  const [CategoryAdd, SetCategory] = useState({ name: "", parent: 0, slug: "", status: "", code: "",demo_category_image:"" })
  console.log(CategoryAdd)
  // image selection state
  const [preview,SetPreview]=useState("")
  const [image, setimage] = useState("")
  // get category options
  const [options, Setoptions] = useState([])
  // form validition library
  const { register, handleSubmit, errors } = useForm();
  // navigation history hooks
  let histrory = useHistory()
  // onchange method  from form input
  const change = (e) => {
    const { name, value } = e.target
    SetCategory((prev) => {
      return {
        ...prev,
        [name]: value,

      }
    });
   
  }
  // set image value in image variable
  const changeimage = (e) => {
    setimage(e.target.files[0])

    SetPreview(URL.createObjectURL(e.target.files[0]))
  }
  // recive category options
  const ReciveCategoryOptions = async () => {
    await axios.get(`${BaseUrl}category`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      Setoptions(response.data)

    });
  }
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }
    ReciveCategoryOptions()
  }, [])
  // Add Category function
  
  
  const onSubmit = async (data) => {
    CategoryAdd.slug = CategoryAdd.name.replace(/ /g, "-").toLocaleLowerCase()
    const fd = new FormData();
    for (var key in CategoryAdd) {
      fd.append(key, CategoryAdd[key]); // formdata doesn't take objects
    }

    if(image.name){
      const imageName=image.name.split(" ").join("");
      fd.append( "demo_category_image", image,imageName);
    }
    
    await axios.post(`${BaseUrl}category`, fd, {
      headers: {
        'content-type': 'multipart/form-data',
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
    }).then((response) => {
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
                Created successfully
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
      histrory.push(`/Category`)
    }).catch((error) => {
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
                Category allready exist
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
    });
  }
  // form reset function
  const FormReload = () => {
    SetCategory({
      name: "", parent: "", code: "", slug: "", status: ""
    })
  }
  return (
    <>

      <CCard>
        <CCardHeader>
          Category add
            </CCardHeader>
        <CCardBody>
          <CForm className="form-horizontal" encType="multipart/form-data">

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Category name</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="text-input" name="name" placeholder="Name of category" value={CategoryAdd.name} onChange={change} innerRef={register({ required: true })} />
                {errors.name && errors.name.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Category name is required.</p>
                )}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Slug</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="text-input" name="slug" placeholder="Name of slug" value={CategoryAdd.name.replace(/ /g, "-").toLocaleLowerCase()} />

              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Parent category</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect custom name="select" id="select" name="parent" value={CategoryAdd.parent} onChange={change} innerRef={register({ required: false })} >
                  <option value="">Please select</option>
                  {
                    options.map((cv, id) => {
                      return (
                        <option value={cv.id} key={id}>{cv.name}</option>
                      )
                    })
                  }
                </CSelect>
              
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Code</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput type="text" name="code" placeholder="Name of code" value={CategoryAdd.code} onChange={change} innerRef={register({ required: true })} />
                {errors.code && errors.code.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Code is required.</p>
                )}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Image</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput type="file" name="demo_category_image" onChange={changeimage} accept="image/*" innerRef={register({ required: true })} />
                <a  href={preview} target="_blank"> <img src={preview} width="100px" height="100px" style={{ display: preview ? "block" : "none" }} /></a>
                {errors.demo_category_image && errors.demo_category_image.type === "required" && (
                  <p className="errorMsg animate__animated animate__headShake">Image is required.</p>
                )}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Status</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect custom name="select" id="select" name="status" value={CategoryAdd.status} onChange={change} innerRef={register({ required: true })} >
                <option value="">please select</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </CSelect>
              </CCol>
            </CFormGroup>

          </CForm>
        </CCardBody>
        <CCardFooter className="d-flex justify-content-around">
          <CButton type="submit" size="sm" color="primary" onClick={handleSubmit(onSubmit)}><CIcon name="cil-scrubber" /> Submit</CButton>
          <CButton type="reset" size="sm" color="danger" onClick={FormReload}><CIcon name="cil-ban" /> Reset</CButton>
        </CCardFooter>
      </CCard>
      <hr />
      </>
  )
}

export default AddCategorys;
