import React, { useState, useEffect } from 'react'
import $ from "jquery";
import {
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CNav,
  CNavItem,
  CNavLink,
  CTabPane,
  
  CForm,
  CListGroup,

} from '@coreui/react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import BaseUrl from "../../BaseUrl/BaseUrl"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useForm } from "react-hook-form";
import CourseAdd from '../Charts';
const BasicComponent = () => {
  
    const { register,errors,handleSubmit } = useForm({
        mode: 'nextrequirment',
       
      })
     
      let histrory = useHistory()
      const [activetabe, SetActivetab] = useState(null)
      //get category option
  const [Categoryops, Setcategoryops] = useState([])
  //get level option
  const [Levelops, Setlevelops] = useState([])
  //get languge option
  const [Language, Setlanguage] = useState([])
  //get topic option
  const [TopicOption, SetTopicOption] = useState([])
  //get price option
  const [PriceOption, SetPriceOption] = useState([])
  //get duration option
  const [Duration, SetDuration] = useState([])
  //get fearture option
  const [Fetures, SetFetures] = useState([])
  //get subtitle option
  const [Subtitle, SetSubtitle] = useState([])
  const [CorurseAdd, SetCourseAdd] = useState({
    requirements: "", outcomes: "",video_url: "",
    title: "", description: "", id_category: null, id_topic: null, id_level: null, id_price: null, id_language: null, id_duration: null,
    id_features: null, id_subtitles: null, price: "",
    discounted_price: "", thumbnail: "", meta_keywords: "", meta_description: "", status: "", section: "",
  })
  const change = (e) => {  // for onchange method
    const { name, value } = e.target
    SetCourseAdd((prev) => {
      return {
        ...prev,
        [name]: value
      }
    });
  
  
  }

  
// recive category option
const ReciveCategoryOptions = async () => {
  await axios.get(`${BaseUrl}category`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Content-Type": "application/x-www-form-urlencoded",
      "auth": localStorage.getItem("LMS_Token")
    },
  }).then(function (response) {
    Setcategoryops(response.data)
  });
}
// recive level option
const ReciveLeveloption = async () => {
  await axios.get(`${BaseUrl}level`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Content-Type": "application/x-www-form-urlencoded",
      "auth": localStorage.getItem("LMS_Token")
    },
  }).then(function (response) { Setlevelops(response.data) });
}
// recive launguge option
const ReciveLanguageoption = async () => {
  await axios.get(`${BaseUrl}language`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Content-Type": "application/x-www-form-urlencoded",
      "auth": localStorage.getItem("LMS_Token")
    },
  }).then(function (response) { Setlanguage(response.data) });
}
// recive topic option
const ReciveTopicoption = async () => {
  const GetTopicData = await axios.get(`${BaseUrl}topic`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Content-Type": "application/x-www-form-urlencoded",
      "auth": localStorage.getItem("LMS_Token")
    },
  }).then(function (response) { SetTopicOption(response.data) });
}
// recive price option
const RecivePriceoption = async () => {
  const GetPriceData = await axios.get(`${BaseUrl}price`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Content-Type": "application/x-www-form-urlencoded",
      "auth": localStorage.getItem("LMS_Token")
    },
  }).then(function (response) { SetPriceOption(response.data) });
}
// recive duration option
const ReciveDuretionoption = async () => {
  await axios.get(`${BaseUrl}duration`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Content-Type": "application/x-www-form-urlencoded",
      "auth": localStorage.getItem("LMS_Token")
    },
  }).then(function (response) { SetDuration(response.data) });
}
// recive feture option
const ReciveFeturesoption = async () => {
  await axios.get(`${BaseUrl}features`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Content-Type": "application/x-www-form-urlencoded",
      "auth": localStorage.getItem("LMS_Token")
    },
  }).then(function (response) { SetFetures(response.data) });
}
// recive subtitle option
const ReciveSubtitleoption = async () => {
  await axios.get(`${BaseUrl}subtitles`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Content-Type": "application/x-www-form-urlencoded",
      "auth": localStorage.getItem("LMS_Token")
    },
  }).then(function (response) { SetSubtitle(response.data) });
}
    useEffect(() => {
      if (!localStorage.getItem("LMS_Token")) {
        histrory.push(`/login`)
      }
      ReciveCategoryOptions()
      ReciveLeveloption()
      ReciveLanguageoption()
      ReciveTopicoption()
      RecivePriceoption()
      ReciveDuretionoption()
      ReciveFeturesoption()
      ReciveSubtitleoption()
  
    }, []);
    const nextrequirment=(data)=>{
      console.log(data)
      SetActivetab("requirements")
      
    }
    return(

<CTabPane data-tab="basic" >
                  <CForm encType="multipart/form-data">
                    <CFormGroup>
                      <CLabel htmlFor="nf-email" className="required">Course title </CLabel>
                      <CInput type="text" id="nf-email" name="title" placeholder="Enter course title.." value={CorurseAdd.title} innerRef={register({ required: true })} onChange={change}/>
                      {errors.title && errors.title.type === "required" && (
            <p className="errorMsg animate__animated animate__headShake">Company name is required.</p>
          )}
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="textarea-input" className="required">Course description</CLabel>
                      <CKEditor
                        name="description"
                        required
                        type="text"
                        editor={ClassicEditor}
                        data=""
                        innerRef={register({ required: true })}
                        style={{minHheight: "400px!important"}}
                        onReady={editor => {
                          // You can store the "editor" and use when it is needed.

                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();

                          SetCourseAdd((prev) => {
                            return {
                              ...prev,
                              description: data
                            }
                          })
                        }}
                      />
                             {errors.description && errors.description.type === "required" && (
            <p className="errorMsg animate__animated animate__headShake">Description is required.</p>
          )}
                    </CFormGroup>
                    <CFormGroup >

                      <CLabel htmlFor="select" className="required">Category</CLabel>
                      <CSelect custom id="select nf-password"  name="id_category" innerRef={register({ required: true })} value={CorurseAdd.id_category} onChange={change}>
                        <option value="">Please select</option>
                        {
                          Categoryops.map((cv, id) => {
                            return (
                              <option value={cv.id} key={id}>{cv.name}</option>
                            )
                          })
                        }
                      </CSelect>
                      {errors.id_category && errors.id_category.type === "required" && (
            <p className="errorMsg animate__animated animate__headShake">Category is required.</p>
          )}
                    </CFormGroup>
                    <CFormGroup >

                      <CLabel htmlFor="select" >Topic</CLabel>
                      <CSelect custom name="id_topic" id="selectmy" >
                        <option value="">Please select</option>
                        {
                          TopicOption.map((cv, id) => {
                            return (
                              <option value={cv.id} key={id}>{cv.name}</option>
                            )
                          })
                        }
                      </CSelect>
                    </CFormGroup>

                    <CFormGroup >

                      <CLabel htmlFor="select">Level</CLabel>
                      <CSelect custom name="id_level" id="select nf-password" >
                        <option value="">Please select</option>
                        {
                          Levelops.map((cv, id) => {
                            return (
                              <option value={cv.id} key={id}>{cv.name}</option>
                            )
                          })
                        }
                      </CSelect>
                     
                    </CFormGroup>
                    <CFormGroup >

                      <CLabel htmlFor="select">Price</CLabel>
                      <CSelect custom name="id_price" id="select nf-password">
                        <option value="">Please select</option>
                        {
                          PriceOption.map((cv, id) => {
                            return (
                              <option value={cv.id} key={id}>{cv.name}</option>
                            )
                          })
                        }
                      </CSelect>
                    </CFormGroup>

                    <CFormGroup >

                      <CLabel htmlFor="select" >Language made in</CLabel>
                      <CSelect custom name="id_language" id="select nf-password" >
                        <option value="">Please select</option>
                        {
                          Language.map((cv, id) => {
                            return (
                              <option value={cv.id} key={id}>{cv.name}</option>
                            )
                          })
                        }
                      </CSelect>
                    </CFormGroup>
                    <CFormGroup >

                      <CLabel htmlFor="select" >Duration</CLabel>
                      <CSelect custom name="id_duration" id="select nf-password">
                        <option value="">Please select</option>
                        {
                          Duration.map((cv, id) => {
                            return (
                              <option value={cv.id} key={id}>{cv.name}</option>
                            )
                          })
                        }
                      </CSelect>
    
                    </CFormGroup>
                    <CFormGroup >

                      <CLabel htmlFor="select" >Features</CLabel>
                      <CSelect custom name="id_features" id="select nf-password" >
                        <option value="">Please select</option>
                        {
                          Fetures.map((cv, id) => {
                            return (
                              <option value={cv.id} key={id}>{cv.name}</option>
                            )
                          })
                        }
                      </CSelect>
                    </CFormGroup>
                    <CFormGroup >

                      <CLabel htmlFor="select" >Subtitle</CLabel>
                      <CSelect custom name="id_subtitles" id="select nf-password" >
                        <option value="">Please select</option>
                        {
                          Subtitle.map((cv, id) => {
                            return (
                              <option value={cv.id} key={id}>{cv.name}</option>
                            )
                          })
                        }
                      </CSelect>
                    </CFormGroup>
                    <CNav variant="tabs">
                      <CNavItem>

                        <CNavLink id="lol" onClick={handleSubmit(nextrequirment)} data-tab={activetabe?activetabe:"basic"} className="btn btn-primary ddd">
                          next
                  </CNavLink>
                      </CNavItem>
                    </CNav>
                  </CForm>
                </CTabPane>
    )
                    }

export default BasicComponent;