import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CRow, CModal, CModalHeader, CModalBody, CModalFooter
} from '@coreui/react'

import 'react-tagsinput/react-tagsinput.css'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import BaseUrl from "../BaseUrl/BaseUrl"
import "../Customer/CustomerStyle.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Select from 'react-select';


const SmtpSettings = () => {
  //form validation
  const { register, handleSubmit } = useForm();
  //system currency options state
  const [SelectSystemCurrency, SetSelectSystemCurrency] = useState({})
  //currency option state
  const [SelectCurrency, SetSelectCurrency] = useState({})
  //curency data
  const options = [
    { label: "AFN ", value: "AFN " },
    { label: "ARS ", value: "ARS " },
    { label: "AWG ", value: "AWG " },
    { label: "AUD ", value: "AUD " },
    { label: "AZN ", value: "AZN " },
    { label: "BSD ", value: "BSD " },
    { label: "BBD ", value: "BBD " },
    { label: "BYR ", value: "BYR " },
    { label: "EUR ", value: "EUR " },
    { label: "BZD ", value: "BZD " },
    { label: "BMD ", value: "BMD " },
    { label: "BOB ", value: "BOB " },
    { label: "BAM ", value: "BAM " },
    { label: "BWP ", value: "BWP " },
    { label: "BGN ", value: "BGN " },
    { label: "BRL ", value: "BRL " },
    { label: "GBP ", value: "GBP " },
    { label: "BND ", value: "BND " },
    { label: "KHR ", value: "KHR " },
    { label: "CAD ", value: "CAD " },
    { label: "KYD ", value: "KYD " },
    { label: "CLP ", value: "CLP " },
    { label: "CNY ", value: "CNY " },
    { label: "COP ", value: "COP " },
    { label: "CRC ", value: "CRC " },
    { label: "HRK ", value: "HRK " },
    { label: "CUP ", value: "CUP " },
    { label: "CZK ", value: "CZK " },
    { label: "DKK ", value: "DKK " },
    { label: "DOP", value: "DOP" },
    { label: "XCD ", value: "XCD " },
    { label: "EGP ", value: "EGP " },
    { label: " SVC", value: " SVC" },
    { label: " FKP", value: " FKP" },
    { label: " FJD", value: " FJD" },
    { label: " GHC", value: " GHC" },
    { label: " GIP", value: " GIP" },
    { label: " GTQ", value: " GTQ" },
    { label: " GGP", value: " GGP" },
    { label: " GYD", value: " GYD" },
    { label: " HNL", value: " HNL" },
    { label: " HKD", value: " HKD" },
    { label: " HUF", value: " HUF" },
    { label: " ISK", value: " ISK" },
    { label: " INR", value: " INR" },
    { label: " IDR", value: " IDR" },
    { label: " IRR", value: " IRR" },
    { label: " IMP", value: " IMP" },
    { label: " ILS", value: " ILS" },
    { label: " JMD", value: " JMD" },
    { label: " JPY", value: " JPY" },
    { label: " JEP", value: " JEP" },
    { label: " KZT", value: " KZT" },
    { label: " KPW", value: " KPW" },
    { label: " KRW", value: " KRW" },
    { label: " KGS", value: " KGS" },
    { label: " LAK", value: " LAK" },
    { label: " LVL", value: " LVL" },
    { label: " LBP", value: " LBP" },
    { label: " LRD", value: " LRD" },
    { label: " CHF", value: " CHF" },
    { label: " LTL", value: " LTL" },
    { label: " MKD", value: " MKD" },
    { label: " MYR", value: " MYR" },
    { label: " MUR", value: " MUR" },
    { label: " MXN", value: " MXN" },
    { label: " MNT", value: " MNT" },
    { label: " MZN", value: " MZN" },
    { label: " NAD", value: " NAD" },
    { label: " NPR", value: " NPR" },
    { label: " ANG", value: " ANG" },
    { label: " NZD", value: " NZD" },
    { label: " NIO", value: " NIO" },
    { label: " NGN", value: " NGN" },
    { label: " NOK", value: " NOK" },
    { label: " OMR", value: " OMR" },
    { label: " PKR", value: " PKR" },
    { label: " PAB", value: " PAB" },
    { label: " PYG", value: " PYG" },
    { label: " PEN", value: " PEN" },
    { label: " PHP", value: " PHP" },
    { label: " PLN", value: " PLN" },
    { label: " QAR", value: " QAR" },
    { label: " RON", value: " RON" },
    { label: " RUB", value: " RUB" },
    { label: " SHP", value: " SHP" },
    { label: " SAR", value: " SAR" },
    { label: " RSD", value: " RSD" },
    { label: " SCR", value: " SCR" },
    { label: " SGD", value: " SGD" },
    { label: " SBD", value: " SBD" },
    { label: " SOS", value: " SOS" },
    { label: " ZAR", value: " ZAR" },
    { label: " LKR", value: " LKR" },
    { label: " SEK", value: " SEK" },
    { label: " SRD", value: " SRD" },
    { label: " SYP", value: " SYP" },
    { label: " TWD", value: " TWD" },
    { label: " THB", value: " THB" },
    { label: " TTD", value: " TTD" },
    { label: " TRY", value: " TRY" },
    { label: " TRL", value: " TRL" },
    { label: " TVD", value: " TVD" },
    { label: " UAH", value: " UAH" },
    { label: " UYU", value: " UYU" },
    { label: " UZS", value: " UZS" },
    { label: " VEF", value: " VEF" },
    { label: " VND", value: " VND" },
    { label: " YER", value: " YER" },
    { label: " ZWD", value: " ZWD" },
  ]
  //system currency object inital value
  const [SystemCurrency, SetSystemCurrency] = useState({
    system_currency: "",
    currency_position: ""
  })
  //payment setting state
  const [PaymentSetting, SetPaymentSetting] = useState({
    active: "",
    mode: "",
    stripe_currency: "",
    test_secret_key: "",
    test_public_key: "",
    live_secret_key: "",
    live_public_key: "",
  })
  //recieve data for paymemt setting from id 1
  const Recivedata = async () => {
    await axios.get(`${BaseUrl}showcurrency/1`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) { SetSystemCurrency(response.data) });
    await axios.get(`${BaseUrl}showstripe/2`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) { SetPaymentSetting(response.data) });

  }

  //navidation
  let histrory = useHistory()
  //form value onchange handler
  const change = (e) => {
    const { name, value } = e.target
    SetSystemCurrency((prev) => {
      return {
        ...prev,
        [name]: value,

      }
    })
    SetPaymentSetting((prev) => {
      return {
        ...prev,
        [name]: value,

      }
    })

  }
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`)
    }
    Recivedata()
  }, [])
  //
  const PaymentSubmit = async () => {
    const Addcurency = {
      system_currency: SelectCurrency.selectValue.value,
      currency_position: SystemCurrency.currency_position
    }

    await axios.put(`${BaseUrl}updatecurrency/1`, Addcurency, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      }

    }).then((reponce) => {
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
                System Currency Update Successfuly
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

    }).catch((error) => console.log(error))

  }
  const onSubmit = async (data) => {

    const AddStripData = {
      ...data,
      stripe_currency: SelectSystemCurrency.selectValue.value

    }

    await axios.put(`${BaseUrl}updatestripe/2`, AddStripData, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      }

    }).then((reponce) => {
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
                Stripe settings updated Successfuly
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

    }).catch((error) => console.log(error))




  }

  return (
    <>
      <CRow>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            <CCardHeader>
              SYSTEM CURRENCY SETTINGS

            </CCardHeader>
            <CCardBody>
              <CForm >
                <CFormGroup >

                  <CLabel htmlFor="select">System currency</CLabel>

                  <Select
                    isSearchable
                    isLoading
                    name="system_currency"
                    className="form-controll"
                    options={options}
                    onChange={(selectValue) => SetSelectCurrency({ selectValue })}
                    value={SelectCurrency.selectValue}

                  />



                </CFormGroup>
                <CFormGroup >

                  <CLabel htmlFor="select">Currency position</CLabel>
                  <CSelect custom name="currency_position" id="select nf-password" value={SystemCurrency.currency_position} onChange={change}  >
                    <option value="Enable">Enable</option>
                    <option value="Desable">Desable</option>
                  </CSelect>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CFormGroup className="d-flex justify-content-center align-items-center"><CButton type="submit" size="sm" className="btn btn-primary btn-lg  pl-5 pr-5 pt-2 pb-2 shadow  rounded font-weight-bolder" onClick={PaymentSubmit}> Update Setting</CButton></CFormGroup>
          </CCard>
        </CCol>
        <CCol xs="12" md="6" className="mb-4">

        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            <CCardHeader>
              SETUP STRIPE SETTINGS

            </CCardHeader>
            <CCardBody>
              <CForm  >
                <CFormGroup >

                  <CLabel htmlFor="select">Stripe currency</CLabel>
                  <Select
                    isSearchable
                    isLoading
                    name="stripe_currency"
                    className="form-controll"
                    options={options}
                    onChange={(selectValue) => SetSelectSystemCurrency({ selectValue })}
                    value={SelectSystemCurrency.selectValue}

                    innerRef={register({ required: false })}
                  />
                </CFormGroup>
                <CFormGroup >

                  <CLabel htmlFor="select">Active</CLabel>
                  <CSelect custom name="active" id="select nf-password" innerRef={register({ required: false })} value={PaymentSetting.active} onChange={change}>
                    <option value="1">YES</option>
                    <option value="0">NO</option>
                  </CSelect>
                </CFormGroup>
                <CFormGroup >

                  <CLabel htmlFor="select">Test mode</CLabel>
                  <CSelect custom name="mode" id="select nf-password" innerRef={register({ required: false })} value={PaymentSetting.mode} onChange={change}>
                    <option value="on">on</option>
                    <option value="off">Off</option>
                  </CSelect>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-password">Test secret key</CLabel>
                  <CInput type="text" id="nf-password" name="test_secret_key" placeholder="Enter Test secret key.." autoComplete="current-password" innerRef={register({ required: false })} value={PaymentSetting.test_secret_key} onChange={change} />

                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-password">Test public key</CLabel>
                  <CInput type="text" id="nf-password" name="test_public_key" placeholder="Enter Test public key.." autoComplete="current-password" innerRef={register({ required: false })} value={PaymentSetting.test_public_key} onChange={change} />

                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-password">Live secret key</CLabel>
                  <CInput type="text" id="nf-password" name="live_secret_key" placeholder="Enter Live secret key.." autoComplete="current-password" innerRef={register({ required: false })} value={PaymentSetting.live_secret_key} onChange={change} />

                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-password">Live public key</CLabel>
                  <CInput type="text" id="nf-password" name="live_public_key" placeholder="Enter Live public key.." autoComplete="current-password" innerRef={register({ required: false })} value={PaymentSetting.live_public_key} onChange={change} />

                </CFormGroup>

              </CForm>
            </CCardBody>
            <CFormGroup className="d-flex justify-content-center align-items-center"><CButton type="submit" size="sm" className="btn btn-primary btn-lg  pl-5 pr-5 pt-2 pb-2 shadow  rounded font-weight-bolder" onClick={handleSubmit(onSubmit)}> Update Setting</CButton></CFormGroup>
          </CCard>
        </CCol>
        <CCol xs="12" md="6" className="mb-4">
        </CCol>
      </CRow>
    </>

  )
}

export default SmtpSettings;
