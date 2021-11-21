import React, { useState } from "react"
import { CButton, CModal, CModalHeader, CModalBody, CForm,  CFormGroup, CInput, CCardBody, CCardFooter, CModalFooter, CCard, CCardHeader } from '@coreui/react'
import axios from 'axios';
import Select from 'react-select';
import { useForm } from "react-hook-form";
import CIcon from '@coreui/icons-react'
import { useHistory } from "react-router-dom";
import BaseUrl from "../BaseUrl/BaseUrl"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./UserGroups.css"
function AddTopicModal(props) {
  //user name
  const [name, SetName] = useState("")
  const [selectedValue, setSelectedValue] = useState('1');
  //valiation form
  const { register, handleSubmit, errors } = useForm();
  let histrory = useHistory()
  //onchange handler
  const OnChangeHandller = (e) => { SetName(e.target.value) }

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
  //add  user function
  const onSubmit = async () => {

    try {
      const Addname = { name: name, status: selectedValue }
      await axios.post(`${BaseUrl}usergroups`, Addname, {
        headers: {
          "auth": localStorage.getItem("LMS_Token")
        }

      }).then((res) => {
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
      })

      SetName("")
      histrory.push("/user/groups")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

      <CCard>
        <CCardHeader>
          Category add
            </CCardHeader>
        <CCardBody>
          <CForm action="" method="post">
            <CFormGroup>

              <CInput type="text"
                name="name"
                onChange={OnChangeHandller}
                placeholder="Enter groups.."
                value={name}
                innerRef={register({ required: true })}

              />
              {errors.name && errors.name.type === "required" && (
                <p className="errorMsg animate__animated animate__headShake"> Name is required.</p>
              )}

            </CFormGroup>
            <CFormGroup>
              <Select
                placeholder="Select Ootion"
                value={data.find(obj => obj.value === selectedValue)} // set selected value
                options={data} // set list of the data
                onChange={handleChange} // assign onChange function
              />

            </CFormGroup>
          </CForm>
        </CCardBody>
        <CCardFooter className="d-flex justify-content-around">
          <CButton type="submit" size="sm" color="primary" onClick={handleSubmit(onSubmit)}><CIcon name="cil-scrubber" /> Submit</CButton>
        </CCardFooter>
      </CCard>

    </>
  )
}
export default AddTopicModal;