import React, { useEffect, useState } from "react"
import {
  CCardBody, CCardHeader, CDataTable, CCard, CBadge, CButton,
  CModal, CModalHeader, CModalBody, CSpinner, CModalFooter, CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BaseUrl from "../BaseUrl/BaseUrl"
import { useHistory } from "react-router-dom";
function Category() {
  //category data display in table filed
  const [usersData, SetUserData] = useState([])
  const [GetCategoryEditData, SetGetCategoryEditData] = useState({
    id: "", name: "", parent: "", code: "", slug: "", status: ""
  })
  let histrory = useHistory()
  //for Update model
  const EditCategoryById = async (id) => {
    histrory.push(`/category-edit/${id}`)
  }
  // for onchange method for form input
  const change = (e) => {
    const { name, value } = e.target
    SetGetCategoryEditData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }
  // table filed
  const fields = [
    { key: 'id', _style: { width: '5%' } },
    { key: 'name', _style: { width: '15%' } },
    { key: 'Total_course',label:"Total course", _style: { width: '15%' } },
    { key: 'code', _style: { width: '15%' } },
    //{ key: 'thumbnail', _style: { width: '10%' } },
    { key: 'created_at',label:"Created at", _style: { width: '15%' } },
    { key: 'status', _style: { width: '5%' } },
    { key: 'Action', _style: { width: '20%' } },
  ]
  // badge for active or inactive
  const getBadge = status => {
    switch (status) {
      case "1": return 'success'
      case "0": return 'danger'
      default: return 'primary'
    }
  }
  // recive category data function
  const ReciveCategoryData = async () => {
    await axios.get(`${BaseUrl}category`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      SetUserData(response.data)
    });
  }
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }
    ReciveCategoryData()

  }, [])
  // delete category data using id
  const DeleteCategory = async (id) => {
    await axios.delete(`${BaseUrl}category/${id}`, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      }
    }
    ).then((response)=>{
     
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <CModal
                show={true}
                centered={true}
                onClose={onClose}
              >
                <CModalHeader closeButton> Category delete</CModalHeader>
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
    ReciveCategoryData()
  }
  // delete confirmation modal
  const DeleteConfirm = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CModal
            show={true}
            centered={true}
            onClose={onClose}
          >
            <CModalHeader closeButton> Delete Features?</CModalHeader>
            <CModalBody>
              Are you sure you want to delete it?
                </CModalBody>
            <CModalFooter>
              <CButton color="primary" onClick={() => {
                DeleteCategory(id);
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
        Category Managment
               <div className="card-header-actions">
          <Link to="/categories/categoriesadd">
            <CButton color="primary" className="mr-1" >Add</CButton>
          </Link>

        </div>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          noItemsViewSlot={spinner}
          items={usersData}
          tableFilter
          itemsPerPageSelect
          hover
          sorter
          //footer
          pagination
          fields={fields}
          scopedSlots={{
            'thumbnail':
              (item) => (

                <td >
                  <img src={`${item.thumbnail?item.thumbnail:<>"C:\Users\Hi\Downloads\lms-backend\lmsapi\uploads\image.jpg"</>}`} />
                </td>
              ),

            'Action':
              (item) => (
                <td >
                  <CButton color="primary" shape="square" size="sm" variant="outline" onClick={() => EditCategoryById(item.id)} style={{ marginRight: "10px" }}>
                    <CIcon size={'sm'} name={'cilPencil'} />
                  </CButton>
                  <CButton color="danger" variant="outline" shape="square" size="sm" onClick={() => DeleteConfirm(item.id)}>
                    <CIcon size={'sm'} name={'cilTrash'} />
                  </CButton>
                </td>
              ),
              'status':
              (item) => (
                <td >
                  <CBadge color={getBadge(item.status)}>
                    {item.status ==="1"? "Active" : "Inactive"}
                  </CBadge>
                </td>
              ),
          }}

        />
      </CCardBody>
    </CCard>
  </>
  )
}


export default Category;