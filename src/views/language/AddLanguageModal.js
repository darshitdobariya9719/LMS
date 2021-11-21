import React, { useState } from "react"
import { CButton, CModal, CModalHeader, CModalBody, CForm, CCol, CRow, CContainer, CFormGroup, CInput } from '@coreui/react'
import axios from 'axios';
import Select from 'react-select';
import BaseUrl from "../BaseUrl/BaseUrl"
import { useForm } from "react-hook-form";
import "../UserGroups/UserGroups.css"
function AddLanguageModal(props) {
  //launguge name
  const [name, SetName] = useState("")
  //select value from select tag
  const [selectedValue, setSelectedValue] = useState('1');
  // form validation
  const { register, handleSubmit, errors } = useForm();
  // onchange handler from input form
  const OnChangeHandller = (e) => {
    SetName(e.target.value)
  }

  const handleChange = e => {
    setSelectedValue(e.value);
  }
  //status active/inactive
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
  // launge add function
  const onSubmit = async () => {
    try {
      const Addname = { name: name, status: selectedValue }
      const AddNameResponce = await axios.post(`${BaseUrl}language`, Addname, { headers: { "auth": localStorage.getItem("LMS_Token") } });
      SetName("")
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <CModal show={props.show} onClose={props.onClose} >
        <CModalHeader closeButton>Add language</CModalHeader>
        <CModalBody>
          <CContainer fluid>
            <CRow>
              <CCol sm="12">
                <CForm action="" method="post">
                  <CFormGroup>

                    <CInput type="text"
                      name="name"
                      onChange={OnChangeHandller}
                      placeholder="Enter language.."
                      value={name}
                      innerRef={register({ required: true })}
                    />
                    {errors.name && errors.name.type === "required" && (
                      <p className="errorMsg animate__animated animate__headShake">Language name is required.</p>
                    )}

                  </CFormGroup>
                  <CFormGroup>
                    <Select
                      placeholder="Select Option"
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
export default AddLanguageModal;