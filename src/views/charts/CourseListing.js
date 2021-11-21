import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { CCardBody, CCardHeader, CDataTable, CCard, CBadge, CButton, CModal, CModalHeader, CModalBody, CForm, CCol, CRow, CContainer, CFormGroup, CSelect, CInput, CSpinner, CModalFooter, CTooltip,CProgress } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BaseUrl from "../BaseUrl/BaseUrl"
function CourseListing() {
  //show course data in table
  const [usersData, SetUserData] = useState()
  const [Coursedatas, setcoursedata] = useState({
    id: "",
    id_user: "",
    id_category: "",
    id_topic: "",
    id_level: "",
    id_price: "",
    id_language: "",
    id_duration: "",
    id_features: "",
    id_subtitles: "",
    title: "",
    short_description: "",
    description: "",
    outcomes: "",
    section: "",
    requirements: "",
    price: "",
    discount_flag: "",
    discounted_price: "",
    thumbnail: "",
    video_url: "",
    is_top_course: "",
    is_admin: "",
    status: "",
    meta_keywords: "",
    meta_description: "",
    created_at: "",
    modified_at: "",
  })
  //total section state
  const [totalSectin, SetTotalSection] = useState()
  //update modal box
  const [updatemodal, setupdatemodal] = useState(false);
  // edit data state
  const [geteditdata, setEditdata] = useState({
    id: "",
    upname: "",
    status: ""
  })
  // for navigation
  let histrory = useHistory()
  // edit course route
  const UserEditById = (id) => {
    histrory.push(`/course-edit/${id}`)
  }
  const change = (e) => {  // for onchange method
    const { name, value } = e.target
    setEditdata((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
// for update level
  const UpdateCustomer = async () => {
    const UpdateId = geteditdata.id
    const updatelevelObj = {
      name: geteditdata.upname,
      status: geteditdata.status
    }
    await axios.put(`${BaseUrl}users/${UpdateId}`, updatelevelObj, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      }
    }).then((response) => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <CModal
              show={true}
              centered={true}
              onClose={onClose}
            >
              <CModalHeader closeButton> Delete Level?</CModalHeader>
              <CModalBody>
                Updated successfully
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
    Recivedata()
    setupdatemodal(!updatemodal)
  }
 
 
  // for table fields
  const fields = [
    { key: 'id', },
    { key: 'title', },
    { key: 'category_name', label:"Category name",},
    { key: 'Lesson And Section',label:"Lesson and section", },
    { key: 'status', },
    { key: 'Action', },
  ]
  const getBadge = status => {
    switch (status) {
      case '1': return 'success'
      case '0': return 'danger'
      case '2': return 'secondary'
      default: return 'primary'
    }
  }
  // get course data
  const Recivedata = async () => {
    await axios.get(`${BaseUrl}course`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      SetUserData(response.data)
      setcoursedata(response.data)
    });



  }
  //duplicate course functiob
  
  const DublicateCourse=async(coursedata)=>{
    const DublicateCoursedat={...coursedata}
    await axios.post(`${BaseUrl}duplicatcourse`,DublicateCoursedat, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      }, onUploadProgress: data => {
        //Set the progress value to show the progress bar
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <CModal
                show={true}
                centered={true}
              >
                <CModalBody>

                <CProgress animated striped showValue color="success" value={Math.round((100 * data.loaded) / data.total)} className="mb-1 bg-white" />

                  {onClose}
               </CModalBody>
              </CModal>

            );
          }
        });
        
        window.location.reload()
      },
  })
  Recivedata()
}
  // recive total section and lesson
  const ReciveNumberOfSectionAndLesson = async () => {
    await axios.get(`${BaseUrl}numberofsection`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) { SetTotalSection(response.data) });
    console.log("tottal", totalSectin);
  }
  useEffect(async () => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }
    Recivedata()
    ReciveNumberOfSectionAndLesson()
  }, [])
  const editmodaltoggle = async (id) => {  //for Update model

    const UpdateById = await axios.get(`${BaseUrl}course/${id}`)
    setEditdata({ upname: UpdateById.data.name, status: UpdateById.data.status, id: UpdateById.data.id })
    setupdatemodal(!updatemodal)

  }
  const DeleteFetchData = async (id) => {    // delete table data
    await axios.delete(`${BaseUrl}course/${id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      }
    }).then((responce)=>{
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <CModal
              show={true}
              centered={true}
              onClose={onClose}
            >
              <CModalHeader closeButton> {window.location.host} Says</CModalHeader>
              <CModalBody> {responce.data.message}
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
      Recivedata()
    }).catch((error)=>{
      if (error.response) {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <CModal
                show={true}
                centered={true}
                onClose={onClose}
              >
                <CModalHeader closeButton> {window.location.host} Says</CModalHeader>
                <CModalBody> {error.response.data.message}
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
      }
    })

  }

  const DeleteLevel = (id) => {           //delete confirmation
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CModal
            show={true}
            centered={true}
            onClose={onClose}
          >
            <CModalHeader closeButton> Delete Course?</CModalHeader>
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
  const ReuirementsList = (list) => {
    if (list === null) {
      console.log(list);
    }
    else {
      const RequireArray = []
      list.toString().split(',').map((key) => {
        RequireArray.push(key)
      });
      return RequireArray.map((requirelist) => <li>{requirelist}</li>)
    }
  }
  const Outcomeslist = (list) => {
    if (list === null) {
      console.log(list);
    }
    else {
      const OutcomesArray = []
      list.toString().split(',').map((key) => {
        OutcomesArray.push(key)
      });
      return OutcomesArray.map((requirelist) => <li>{requirelist}</li>)
    }
  }
const Check=(status)=>{
  switch (status) {
    case '1': return 'Active'
    case '0': return 'Inactive'
    case '2': return 'Disable'
    default: return 'primary'
  }
}
  return (<>
    <CCard>
      <CCardHeader>
        Course managment<div className="card-header-actions"><Link to="/course-add"><CButton color="primary" className="mr-1" >Add</CButton></Link></div>
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
            'category_name':
            (item) => (
              <td >
                
                  {item.category_name === null ? "-" : item.category_name}
                
              </td>
            ),
            'requirements':
              (item) => (
                <td >{ReuirementsList(item.requirements)}</td>
              ),
            'outcomes':
              (item) => (
                <td>{Outcomeslist(item.outcomes)}</td>
              ),
            'thumbnail':
              (item) => (
                <td > <img src={`${item.thumbnail}`} />
                </td>
              ),
            'status':
              (item) => (
                <td >
                  <CBadge color={getBadge(item.status)}>
                  {Check(item.status)}
                  </CBadge>
                </td>
              ),
            'Lesson And Section':
              (item) => (
                <td >
                  <p>Total Section : {item.Total_section}</p>
                  <p>Total Lesson : {item.Total_lesson}</p>
                </td>
              ),
             
            'Action':
              (item) => (
                <td >
                  <CTooltip content="Edit Course"><CButton color="primary" shape="square" size="sm" variant="outline" style={{ marginRight: "10px" }} onClick={() => UserEditById(item.id)} >
                    <CIcon size={'sm'} name={'cilPencil'} />
                  </CButton></CTooltip>
                  <CTooltip content="Delete Course">
                  <CButton color="danger" variant="outline" shape="square" size="sm" onClick={() => DeleteLevel(item.id)} style={{ marginRight: "10px" }}>
                    <CIcon size={'sm'} name={'cilTrash'} />
                  </CButton>
                  </CTooltip>
                  <CTooltip content="Duplicate course">
                  <CButton color="success" variant="outline" shape="square" size="sm" onClick={() => DublicateCourse(item)}>
                  <i class="fa fa-clone" aria-hidden="true"></i>
                  </CButton>
                  </CTooltip>
                  
                </td>
              )
          }} />
      </CCardBody>
    </CCard>
    <CModal show={updatemodal} onClose={editmodaltoggle} >
      <CModalHeader closeButton>Edit level</CModalHeader>
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
                    required
                  />

                </CFormGroup>
                <CFormGroup>
                  <CSelect value={geteditdata.status} custom name="select" id="select nf-password" name="status" onChange={change} >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </CSelect>
                </CFormGroup>
                <CRow >
                  <CCol sm="12">
                    <CButton color="info" block onClick={UpdateCustomer}><span>Submit</span></CButton>
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


export default CourseListing;
;