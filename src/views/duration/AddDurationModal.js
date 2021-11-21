import React, { useState } from "react"
import { CButton, CModal, CModalHeader, CModalBody, CForm, CCol, CRow, CContainer, CFormGroup, CLabel, CInput } from '@coreui/react'
import axios from 'axios';
import Select from 'react-select';
import BaseUrl from "../BaseUrl/BaseUrl"
import { useForm } from "react-hook-form";
import "../UserGroups/UserGroups.css"
function AddDurationModal(props) {
  //duration state
  const [name, SetName] = useState("")
  // selected value from selection
  const [selectedValue, setSelectedValue] = useState('1');
  //validation form
  const { register, handleSubmit, errors } = useForm();
  //onchange set duration
  const OnChangeHandller = (e) => { SetName(e.target.value) }
  const handleChange = e => { setSelectedValue(e.value); }
  //data for active or inactive
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
  // sublit form for duration module
  const onSubmit = async () => {
    try {
      const Addname = { name: name, status: selectedValue }
      const AddNameResponce = await axios.post(`${BaseUrl}duration`, Addname, {
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
        <CModalHeader closeButton>Add duration</CModalHeader>
        <CModalBody>
          <CContainer fluid>
            <CRow>
              <CCol sm="12">
                <CForm action="" method="post">
                  <CFormGroup>

                    <CInput type="text"
                      name="name"
                      onChange={OnChangeHandller}
                      placeholder="Enter duration.."
                      value={name}
                      innerRef={register({ required: true })}
                    />
                    {errors.name && errors.name.type === "required" && (
                      <p className="errorMsg animate__animated animate__headShake">Durationis required.</p>
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
export default AddDurationModal;