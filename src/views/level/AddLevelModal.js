import React, { useState } from "react"
import { CButton, CModal, CModalHeader, CModalBody, CForm, CCol, CRow, CContainer, CFormGroup,  CInput } from '@coreui/react'
import axios from 'axios';
import Select from 'react-select';
import BaseUrl from "../BaseUrl/BaseUrl"
import { useForm } from "react-hook-form";
import "../UserGroups/UserGroups.css"

function AddLevelModal(props) {
  // level name
  const [name, SetName] = useState("")
  const [selectedValue, setSelectedValue] = useState('1');
  // form validation
  const { register, handleSubmit, errors } = useForm();
  const OnChangeHandller = (e) => {
    SetName(e.target.value)
  }
  // onchange form handler
  const handleChange = e => {
    setSelectedValue(e.value);
  }
  //starts Active/inactive
  const data = [
    {
      value: '1',
      label: "Active"
    },
    {
      value: '0',
      label: "Inactive"
    },

  ];
  // level Add function
  const onSubmit = async () => {
    try {
      const Addname = { name: name, status: selectedValue }
      await axios.post(`${BaseUrl}level`, Addname, {
        headers: { "auth": localStorage.getItem("LMS_Token") }
      });
      SetName("")
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <CModal show={props.show} onClose={props.onClose} >
        <CModalHeader closeButton>Add level</CModalHeader>
        <CModalBody>
          <CContainer fluid>
            <CRow>
              <CCol sm="12">
                <CForm action="" method="post">
                  <CFormGroup>
                    <CInput type="text"
                      name="name"
                      onChange={OnChangeHandller}
                      placeholder="Enter Level.."
                      value={name}
                      innerRef={register({ required: true })}
                    />
                    {errors.name && errors.name.type === "required" && (
                      <p className="errorMsg animate__animated animate__headShake">Level name is required.</p>
                    )}
                  </CFormGroup>
                  <CFormGroup>
                    <Select
                      placeholder="Select option"
                      value={data.find(obj => obj.value === selectedValue)} // set selected value
                      options={data} // set list of the data
                      onChange={handleChange} // assign onChange function
                    />
                  </CFormGroup>
                  <CRow >
                    <CCol sm="12">
                      <CButton color="info" type="submt" block onClick={handleSubmit(onSubmit)}><span>Submit</span></CButton>
                    </CCol>

                  </CRow>

                </CForm>
              </CCol>
            </CRow>
          </CContainer>
        </CModalBody>
      </CModal>
    </>
  )
}
export default AddLevelModal;