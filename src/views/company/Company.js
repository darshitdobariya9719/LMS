import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { CCardBody, CCardHeader, CDataTable, CCard, CBadge, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CSpinner } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BaseUrl from "../BaseUrl/BaseUrl"
function Customer() {
  // company data state
  const [usersData, SetUserData] = useState()
  // navigation
  let histrory = useHistory()
  //company edit function
  const CompanyEditById = (id) => {
    histrory.push(`/company/company-edit/${id}`)
  }
  // for table fields
  const fields = [
    { key: 'id', _style: { width: '5%' } },
    { key: 'company_name',label:"Company name", _style: { width: '15%' } },
    { key: 'email', _style: { width: '15%' } },
    { key: 'contact', _style: { width: '15%' } ,default:"no"},
    { key: 'website', _style: { width: '15%' } },
    { key: 'Total_user',label:"Total user", _style: { width: '5%' } },
    { key: 'status', _style: { width: '15%' } },
    { key: 'Action', _style: { width: '15%' } },
  ]
  const getBadge = status => {
    switch (status) {
      case '1': return 'success'
      case '0': return 'danger'
      default: return 'primary'
    }
  }
  // get company data in table
  const ReciveCompanydata = async () => {
    await axios.get(`${BaseUrl}company`, {
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
    ReciveCompanydata()
  }, [])
  // delete table data
  const DeleteFetchData = async (id) => {
    await axios.delete(`${BaseUrl}company/${id}`, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      }

    }).then((respponce) => {
      histrory.push(`/company`)
      ReciveCompanydata()
    }).catch((error) => console.log(error))
  }
  //delete confirmation
  const DeleteCompany = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CModal
            show={true}
            centered={true}
            onClose={onClose}
          >
            <CModalHeader closeButton> Delete Company?</CModalHeader>
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
        Customer Managment<div className="card-header-actions"><Link to="/company/company-add"><CButton color="primary" className="mr-1" >Add</CButton></Link></div>
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
            'contact':
            (item) => (
              <td >
                
                  {item.contact === null ? "-" : item.contact}
                
              </td>
            ),
            'website':
            (item) => (
              <td >
                
                  {item.website === null ? "-" : item.website}
                
              </td>
            ),
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
                  <Link><CButton color="primary" shape="square" size="sm" variant="outline" style={{ marginRight: "10px" }} onClick={() => CompanyEditById(item.id)} >
                    <CIcon size={'sm'} name={'cilPencil'} />
                  </CButton></Link>
                  <CButton color="danger" variant="outline" shape="square" size="sm" onClick={() => DeleteCompany(item.id)}>
                    <CIcon size={'sm'} name={'cilTrash'} />
                  </CButton>

                </td>
              )
          }}

        />
      </CCardBody>
    </CCard>
  </>
  )
}
export default Customer;