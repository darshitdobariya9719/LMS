import React, { useEffect, useState } from "react"
import { CCardBody, CCardHeader, CDataTable, CCard, CBadge, CButton, CModal, CModalHeader, CModalBody, CForm, CCol, CRow, CContainer, CFormGroup, CSelect, CInput, CModalFooter, CSpinner } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AddTopicModal from "./AddTopicModal"
import BaseUrl from "../BaseUrl/BaseUrl"
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "../UserGroups/UserGroups.css"
function Topic() {
  //topic data
  const [usersData, SetUserData] = useState()
  //add modal
  const [modal, setModal] = useState(false);
  //update module
  const [updatemodal, setupdatemodal] = useState(false);
  //topic edit data
  const [geteditdata, setEditdata] = useState({
    id: "",
    upname: "",
    status: ""
  })
 //form validation
 const { register, handleSubmit, errors } = useForm();
  let histrory = useHistory()
  // for onchange method
  const change = (e) => {
    const { name, value } = e.target
    setEditdata((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  // for update topic
  const onSubmit = async () => {
    const UpdateId = geteditdata.id
    const updatetopicObj = {
      name: geteditdata.upname,
      status: geteditdata.status
    }
    await axios.put(`${BaseUrl}topic/${UpdateId}`, updatetopicObj, {
      headers: { "auth": localStorage.getItem("LMS_Token") }
    }).then((responce) => {
      GetTopic()
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <CModal
              show={true}
              centered={true}
              onClose={onClose}
            >
              <CModalHeader closeButton> Topic</CModalHeader>
              <CModalBody>
              Topic Updated
        </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={() => {
                  onClose();
                }}>yes</CButton>{' '}
                <CButton
                  color="secondary"
                  onClick={onClose}
                >no</CButton>
              </CModalFooter>
            </CModal>

          );
        }
      });

      editmodaltoggle()

    })


  }
  const toggle = () => {
    setModal(!modal);
  }
  //for Update model
  const editmodaltoggle = async (id) => {
    setupdatemodal(!updatemodal)
    const UpdateById = await axios.get(`${BaseUrl}topic/${id}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    })
    setEditdata({ upname: UpdateById.data.name, status: UpdateById.data.status, id: UpdateById.data.id })
  }
  // for table fields
  const fields = [
    { key: 'id', _style: { width: '5%' } },
    { key: 'name', _style: { width: '20%' } },
    { key: 'Total_course',label:"Total course", _style: { width: '10%' } },
    { key: 'created_at',label:"Created at", _style: { width: '20%' } },
    { key: 'modified_at', label:"Modified at",_style: { width: '20%' } },
    { key: 'status', _style: { width: '10%' } },
    { key: 'Action', _style: { width: '15%' } },

  ]
  const getBadge = status => {
    switch (status) {
      case '1': return 'success'
      case '0': return 'danger'
      default: return 'primary'
    }
  }
  const GetTopic = async () => {
    await axios.get(`${BaseUrl}topic`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) { SetUserData(response.data) });
  }
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }
    GetTopic()
  }, [])
  // delete table data
  const DeleteFetchData = async (id) => {
    await axios.delete(`${BaseUrl}topic/${id}`, {
      headers: { "auth": localStorage.getItem("LMS_Token") }
    }).then((response)=>{
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <CModal
              show={true}
              centered={true}
              onClose={onClose}
            >
              <CModalHeader closeButton> Duration delete</CModalHeader>
              <CModalBody>
                {response.data.message}
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={() => {


                  onClose();
                }}>Yes</CButton>{' '}
                <CButton
                  color="secondary"
                  onClick={onClose}
                >No</CButton>
              </CModalFooter>
            </CModal>

          );
        }
      });
    })
    GetTopic()
  }
  //delete confirmation
  const DeleteTopic = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CModal
            show={true}
            centered={true}
            onClose={onClose}
          >
            <CModalHeader closeButton> Delete topic?</CModalHeader>
            <CModalBody>
              Are you sure you want to delete it?
          </CModalBody>
            <CModalFooter>
              <CButton color="primary" onClick={() => {
                DeleteFetchData(id);
                onClose();
              }}>Yes</CButton>{' '}
              <CButton
                color="secondary"
                onClick={onClose}
              >No</CButton>
            </CModalFooter>
          </CModal>

        );
      }
    });

  }
  const spinner = <div className="d-flex justify-content-center align-items-center"><CSpinner color="primary" style={{ width: '5rem', height: '5rem' }} /></div>



  return (<>
    <CCard>
      <CCardHeader>
        Topic managment
               <div className="card-header-actions">
          <CButton color="primary" className="mr-1" onClick={toggle}>Add</CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          items={usersData}
          noItemsViewSlot={spinner}
          tableFilter
          itemsPerPageSelect
          hover
          sorter
          footer
          pagination
          fields={fields}
          scopedSlots={{
            'status':
              (item) => (
                <td >
                  <CBadge color={getBadge(item.status)}>
                    {item.status === '1' ? "Active" : "Inactive"}
                  </CBadge>
                </td>
              ),
            'Action':
              (item) => (
                <td >
                  <CButton color="primary" shape="square" size="sm" variant="outline" onClick={() => editmodaltoggle(item.id)} style={{ marginRight: "10px" }} >
                    <CIcon size={'sm'} name={'cilPencil'} />
                  </CButton>
                  <CButton color="danger" variant="outline" shape="square" size="sm" onClick={() => DeleteTopic(item.id)}>
                    <CIcon size={'sm'} name={'cilTrash'} />
                  </CButton>

                </td>
              )
          }}

        />
      </CCardBody>
    </CCard>
    <AddTopicModal show={modal} onClose={toggle} />


    <CModal show={updatemodal} onClose={editmodaltoggle} >
      <CModalHeader closeButton>Edit Topic</CModalHeader>
      <CModalBody>
        <CContainer fluid>
          <CRow>
            <CCol sm="12">
              <CForm action="" method="post">
                <CFormGroup>
                  <CInput type="text"
                    name="upname"
                    onChange={change}
                    placeholder="Enter Name.."
                    value={geteditdata.upname}
                    innerRef={register({ required: true })}
                    />
                    {errors.upname && errors.upname.type === "required" && (
                      <p className="errorMsg animate__animated animate__headShake">Topic name is required.</p>
                    )}

                </CFormGroup>
                <CFormGroup>
                  <CSelect value={geteditdata.status} custom name="select" id="select nf-password" name="status" onChange={change} >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </CSelect>
                </CFormGroup>
                <CRow >
                  <CCol sm="12">
                    <CButton color="info" block onClick={handleSubmit(onSubmit)}><span>Submit</span></CButton>
                  </CCol></CRow></CForm>
            </CCol>
          </CRow>
        </CContainer>
      </CModalBody>

    </CModal>
  </>
  )
}
export default Topic;