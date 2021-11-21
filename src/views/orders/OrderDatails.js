import React, { useEffect, useState } from "react"
import { CCardBody, CCardHeader, CListGroup, CCard, CListGroupItem, CCol, CRow, CContainer } from '@coreui/react'
import BaseUrl from "../BaseUrl/BaseUrl"
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
function OrderDetails(){
//order detal state
const [OerderDetails,SetOrderDetals]=useState([])
let histrory = useHistory()
//get id from url
const Orderid  = useParams();
//get order details data
const GetSubtitle = async () => {
		await axios.get(`${BaseUrl}ordersdetail/${Orderid.id}`, {
		  method: 'GET',
		  headers: {
			'Access-Control-Allow-Origin': '*',
			"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
			"Content-Type": "application/x-www-form-urlencoded",
			"auth": localStorage.getItem("LMS_Token")
		  },
		}).then(function (response) { SetOrderDetals(response.data) });
	  }
	  useEffect(() => {
		if (!localStorage.getItem("LMS_Token")) {
		  histrory.push(`/login`)
		}
		GetSubtitle()
	  }, [])
	return (<>
	<CContainer fluid>
    <CRow>

      <CCol sm="12">
        <CCard className="shadow  rounded">
          <CCardHeader className=" font-weight-bolder">
        Order details
          </CCardHeader>

        </CCard>
      </CCol>
    </CRow>
    </CContainer>
		<CContainer>
		  <CRow>
			<CCol lg="8" >
			<CCard>
          <CCardHeader>
            Purched course's
          </CCardHeader>
          <CCardBody>
		  <CListGroup>

	  {OerderDetails.map((cv,i)=>{
		if(i < OerderDetails.length-1){
		  return  <CListGroupItem href="#">

		  <p className="float-left font-weight-bold ">{cv.course_title}</p><p className="float-right font-weight-bolder">${cv.course_price}</p>
		  </CListGroupItem>
		}
	  })}


	  </CListGroup>
          </CCardBody>

        </CCard>
			</CCol>
			<CCol sm="4">
			<CCard>
          <CCardHeader>
            Total
          </CCardHeader>
          <CCardBody>


	  {OerderDetails.map((cv,i)=>{
		if(i === OerderDetails.length-1){
		  return  <>
<div className="d-flex justify-content-between"><p className="font-weight-bold">Original price</p><p  className="font-weight-bold">${cv.Total_price}</p></div>
<hr></hr>
<div className="d-flex justify-content-between"><p  className="font-weight-light">Discounted price</p><p className="font-weight-light">${cv.discount_amount}</p></div>
<hr></hr>
<div className="d-flex justify-content-between"><p  className="font-weight-light">Coupone code</p><p className=" font-weight-light">{cv.couponcode?cv.couponcode:"No Use"}</p></div>
<hr></hr>
<div className="d-flex justify-content-between"> <p className="font-weight-bold" >Total price</p><p className="font-weight-bold">${cv.finalprice}</p></div>

		  </>
		}
	  })}

          </CCardBody>
        </CCard>
			</CCol>
		  </CRow>
		</CContainer>
		</>
	  )
}
export default OrderDetails;