import React, { useState, useEffect, useRef } from 'react'
import "./chart.css"
import { Player } from 'video-react';
import {CModalFooter,
  CTooltip ,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CFormText,
  CTextarea,
  CInput,
  CLabel,
  CSelect,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
  CModal,
  CModalBody,
  CSpinner,
  CModalHeader,
  CForm, CProgress

} from '@coreui/react'

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import FormData from "form-data"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import CIcon from '@coreui/icons-react'
import BaseUrl from "../BaseUrl/BaseUrl"
import { useHistory } from "react-router-dom";
const lorem = 'You are just one click away'
const CourseAdd = () => {
const canclefileupload=useRef(null)
const [uploadcomplate,setuploadcomplte]=useState(false)
  const [image, setimage] = useState("")
  // check active tabe or not
const [selectedIndex,SetselectedIndex]=useState('basic')
  const [youtubeUrl, SetyoutubeUrl] = useState("")
  const [activetabe, SetActivetab] = useState(1)
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
  // privew image
  const [preview, Setpreview] = useState("")
const[checkrequerment,Setcheckrequerment]=useState(false)
  // navigation page
  let histrory = useHistory()
  // hold requitement value
  const [RequirementsInput, SetRequirementsInput] = useState([{
    requirements: ""
  }])
  // hold outcoms value
  const [OutcomesInput, SetOutcomesInput] = useState([{
    outcomes: ""
  }])
  //lesson video upload state
  //lesson video upload state errror
  const [videoError, SetvideoError] = useState("")
  const [videoUploadbar,SetvideoUploadbar]=useState(0)
  const [htmlfile,SetHtmlfile]=useState()
  console.log(htmlfile)
  //lesson video upload forn input onchange function
  const videoUpload =async (e) => {
    SetvideoError("")
    SetHtmlfile()
    SetvideoUploadbar(0)
    if (e.target.files[0].size > 267386880) {
      SetvideoError("Video size is above 250Mb")
  
    
    }
    else {
      const uploadvideo=new FormData()
  
      
        uploadvideo.append('course_vido',e.target.files[0], e.target.files[0].name.split(" ").join(""))
    
    
      await axios.post(`${BaseUrl}uplodevideo`, uploadvideo, {
        headers: {
          'content-type': 'multipart/form-data',
          "auth": localStorage.getItem("LMS_Token")
        },
        onUploadProgress: progressEvent => {
          //Set the progress value to show the progress bar
let persentge= Math.round( (progressEvent.loaded * 100) / progressEvent.total )
if(persentge<100)
{
  SetvideoUploadbar(persentge)
}
 },
 cancelToken: new axios.CancelToken( cancel => canclefileupload.current  =cancel )   
      }).then((response) => {
        SetvideoUploadbar(100);
        setuploadcomplte(true)
        setTimeout(() => {
          SetvideoUploadbar(0);
        }, 1000);
        SetHtmlfile(response.data.video_url)
        e.target.value = null;
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
                Upload Successfully
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

      }).catch((error) => {
        console.log(error);
        if(canclefileupload.current){
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
                  User has canceled the file upload
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
        SetvideoUploadbar(0);
      });
    }
  }
  //cancle upload file request
  const CancleFileUpladReaquest=()=>{
    if(canclefileupload.current){
      canclefileupload.current('user has canclled the file upload')
    }
  }
  // course add Object
  const [CorurseAdd, SetCourseAdd] = useState({
    requirements: "", outcomes: "", video_url: "",
    title: "", description: "", id_category: null, id_topic: null, id_level: null, id_price: null, id_language: null, id_duration: null,
    id_features: null, id_subtitles: null, price: "",
    discounted_price: "", demo_image: "",section:'', meta_keywords: "", meta_description: "", status: "", section: "",
  })
  // for showing error if filed id null
  const [course_error, Seterror] = useState({
    Requirements_Error: "", description_Error: "", outcomes_Error: "",
    title_Error: "", id_category_Error: null, id_topic_Error: null, id_level_Error: null, id_price_Error: null, id_language_Error: null, id_duration_Error: null,
    id_features_Error: null, id_subtitles_Error: null, price_Error: "",
    discounted_price_Error: "", section: "", demo_image: "", meta_keywords_Error: "", meta_description_Error: "", status_Error: ""
  })
  const onchangeurl = (e) => {
    Seterror({ video_url_Error: "" })
    SetyoutubeUrl("")
    const URL = e.target.value
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const vimeoUrlCheck = /[https://player.vimeo.com/video/]/g;
    if (URL.match(regExp) || URL.match(vimeoUrlCheck)) {
      SetyoutubeUrl(URL)
    }
    else {
      Seterror({ video_url_Error: "Wrong URL please entered valid URL" })
      SetyoutubeUrl(URL)

    }

  }

  // set image value function
  const changeimage = (e) => {
    Seterror({demo_image:''})
    setimage(e.target.files[0])
    Setpreview(URL.createObjectURL(e.target.files[0]))
  }
  // input value set function for requirements
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...RequirementsInput];
    list[index][name] = value;
    SetRequirementsInput(list);
  };
  // input value set function for outcomes
  const handleOutcomeInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...OutcomesInput];
    list[index][name] = value;
    SetOutcomesInput(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...RequirementsInput];
    list.splice(index, 1);
    SetRequirementsInput(list);
  }
  // remove function for outcomes when click
  const handleOutcomeRemoveClick = index => {
    const list = [...OutcomesInput];
    list.splice(index, 1);
    SetOutcomesInput(list);
  }
  // Add requrement function
  const handleAddClick = () => {
    SetRequirementsInput([...RequirementsInput, { requirements: "" }]);
  };
  // add outcomes
  const handleAddOutcomeClick = () => {
    SetOutcomesInput([...OutcomesInput, { outcomes: "" }]);
  };
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

  }, [])

  const change = (e) => {  // for onchange method
    Seterror({
      Requirements_Error: "", description_Error: "", outcomes_Error: "",
      title_Error: "", id_category_Error: null, id_topic_Error: null, id_level_Error: null, id_price_Error: null, id_language_Error: null, id_duration_Error: null,
      id_features_Error: null, id_subtitles_Error: null, price_Error: "",
      discounted_price_Error: "", thumbnail_Error: "", video_url_Error: "", meta_keywords_Error: "", meta_description_Error: "", status_Error: ""
    })
    const { name, value } = e.target
    SetCourseAdd((prev) => {
      return {
        ...prev,
        [name]: value
      }
    });
 
  }
  // Course submit
  const CourseAddSubmit = async () => {
    CorurseAdd.requirements = JSON.stringify(RequirementsInput)
    CorurseAdd.outcomes = JSON.stringify(OutcomesInput)
    const RequiremenyArray = [];
    const OutComesArray = []
    RequirementsInput.map((requireValue) => {
      RequiremenyArray.push(requireValue.requirements)
    })
    OutcomesInput.map((outcomesValue) => {
      OutComesArray.push(outcomesValue.outcomes)
    })
    let Formdata = new FormData();
    CorurseAdd.video_url = youtubeUrl;
    const CourseData = {
      ...CorurseAdd
    }

    const {

      title, description, id_category, id_topic, id_level, id_price, id_language, id_duration,
      id_features, id_subtitles, price,
      discounted_price, thumbnail, video_url, meta_keywords, meta_description, status, section } = CourseData
    if (image.name) {
      const CourseImage=image.name.split(" ").join("")
      Formdata.append('course_img', image, CourseImage)
    }
    Formdata.append('requirements', RequiremenyArray.toString())
    Formdata.append('outcomes', OutComesArray.toString())
    Formdata.append('title', title)
    Formdata.append('description', description || 0)
    Formdata.append('id_category', id_category || 0)
    Formdata.append('id_topic', id_topic || 0)
    Formdata.append('id_level', id_level || 0)
    Formdata.append('id_price', id_price || 0)
    Formdata.append('id_language', id_language || 0)
    Formdata.append('id_duration', id_duration || 0)
    Formdata.append('id_features', id_features || 0)
    Formdata.append('id_subtitles', id_subtitles || 0)
    Formdata.append('price', price || 0)
    Formdata.append('discounted_price', discounted_price || 0)
    Formdata.append('section', section)
   
    if(video_url) {
      Formdata.append('video_url', video_url)
    }
    if (htmlfile) {
   
      Formdata.append('video_url',htmlfile)
    }
   
    Formdata.append('meta_keywords', meta_keywords)
    Formdata.append('meta_description', meta_description)
    Formdata.append('status', status)

    await axios.post(`${BaseUrl}course`, Formdata, {
      headers: {
        'content-type': 'multipart/form-data',
        "auth": localStorage.getItem("LMS_Token")
      },
      onUploadProgress: (processdata) => {
        //Set the progress value to show the progress bar

        confirmAlert({
          customUI: ({ onClose }) => {

            return (
              <CModal
                show={true}
                centered={true}
                style={{backgroundColor:"transparent",border:"none"}}
              >
                <CModalBody>
    
                <div className="d-flex justify-content-center align-items-center"><CSpinner color="primary" style={{ width: '5rem', height: '5rem' }} /></div>
    
                  {onClose}
                </CModalBody>
              </CModal>
    
            );
          }
        });
    
      }
      
    
    }
      )
  

  .then((response) => {
      histrory.push("/courselisting");
      window.location.reload()
    }).catch((error) => {
      console.log(error);
    });

  }
  //reset form function
  const Resetdata = () => {
    SetCourseAdd({
      requirements: "", outcomes: "",
      title: "", description: "", id_category: "", id_topic: "", id_level: "", id_price: "", id_language: "", id_duration: "",
      id_features: "", id_subtitles: "", price: "",
      discounted_price: "", thumbnail: "", video_url: "", meta_keywords: "", meta_description: "", status: ""
    })
  }
  const myfun=()=>{
  if(CorurseAdd.title===""){
    alert("d3f")
  }else{
    SetActivetab("requirements")
  }
   
   
  
}
const removeUpload=async(Remove_Uploaded_vieo)=>{
  
  SetHtmlfile('')
  const delete_uploaded_video={
    'video_url':Remove_Uploaded_vieo
  }
  await axios.post(`${BaseUrl}removevideo`,delete_uploaded_video, {
    headers: {
      "auth": localStorage.getItem("LMS_Token")
    }
 
  })

  

}

const testnext=()=>{
  if(CorurseAdd.title===''){
       alert('errpr')
  }
  else{
    Setcheckrequerment(!checkrequerment)
  }
}
const nextRequirements=()=>{
  if(CorurseAdd.title==='' && CorurseAdd.description==='' && CorurseAdd.id_category===null){
    Seterror({title_Error:'Title filed is require',description_Error:'Description filed is require',id_category_Error:'category filed is require'})
  }
  else if(CorurseAdd.title===''){
    Seterror({title_Error:'Title filed is require'})
  }
 else if(CorurseAdd.description===''){
    Seterror({description_Error:'Description filed is require'})
  }
 else  if(CorurseAdd.id_category===null){
    Seterror({id_category_Error:'category filed is require'})
  }
  else
  if(CorurseAdd.title!=='' && CorurseAdd.description!=='' && CorurseAdd.id_category!==null){
    SetselectedIndex('requirements')
  
  }
 
}
const nextMedia=()=>{
  if(CorurseAdd.price==='' && CorurseAdd.discounted_price==='' ){
    Seterror({price_Error:'Price filed is require',discounted_price_Error:'Discount filed is require'})
  }
  else if(CorurseAdd.price===''){
    Seterror({price_Error:'Price filed is require'})
  }
 else if(CorurseAdd.discounted_price===''){
    Seterror({discounted_price_Error:'Discount filed is require'})
  }
  else
  if(CorurseAdd.price!=='' && CorurseAdd.discounted_price!==''){
    SetselectedIndex('media')
  
  }
}
const nextSeo=()=>{
  if(CorurseAdd.section==='' && image==='' ){
    Seterror({section:'Section filed is require',discdemo_imageounted_price_Error:'Thubnail  filed is require'})
  }
  else if(CorurseAdd.section===''){
    Seterror({price_Error:'Section filed is require'})
  }
 else if(image===''){
    Seterror({demo_image:'Thubnail filed is require'})
  }
  else if(CorurseAdd.section!=='' && image!=='' ){
    SetselectedIndex('seo')
  
  }
}
const nextFinish=()=>{

  if(CorurseAdd.meta_description==='' && CorurseAdd.meta_keywords==='' ){
    Seterror({meta_description_Error:'meta description  filed is require',meta_keywords_Error:'Meta keywords filed is require'})
  }
  else if(CorurseAdd.meta_description===''){
    Seterror({meta_description_Error:'meta description filed is require'})
  }
 else if(CorurseAdd.meta_keywords===''){
    Seterror({meta_keywords_Error:'Meta keywords filed is require'})
  }
  else
  if(CorurseAdd.meta_description!=='' && CorurseAdd.meta_keywords!==''){
    SetselectedIndex('finish')
  
  }

}
const ontabechange=()=>{
  
}
  return (
    <>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>Course Add</CCardHeader>
          <CCardBody>
            <CTabs activeTab={selectedIndex} onActiveTabChange={ontabechange} >
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink data-tab="basic">
                    Basic
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab='requirements'>
                    Requirements
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="outcomes">
                    Outcomes
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="pricing">
                    Pricing
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="media">
                    Media
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="seo">
                    Seo
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="finish" className="btn btn-primary">
                    Create
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab="basic" >
                  <CForm encType="multipart/form-data">
                    <CFormGroup>
                      <CLabel htmlFor="nf-email" className="required">Course title </CLabel>
                      <CInput type="text" id="nf-email" name="title" value={CorurseAdd.title} onChange={change} placeholder="Enter course title.." />
                      <p className="error_message animate__animated animate__headShake" >{course_error.title_Error}</p>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="textarea-input" className="required">Course description</CLabel>
                      <CKEditor
                        name="description"
                        value={CorurseAdd.description}
                        required
                        type="text"
                        editor={ClassicEditor}
                        data=""
                        style={{ minHheight: "400px!important" }}
                        onReady={editor => {
                          // You can store the "editor" and use when it is needed.
                        }}
                        onChange={(event, editor) => {
                          Seterror({description_Error:''})
                          const data = editor.getData();
                          SetCourseAdd((prev) => {
                            return {
                              ...prev,
                              description: data
                            }
                          })
                        }}
                      />
                      <p className="error_message animate__animated animate__headShake" >{course_error.description_Error}</p>
                    </CFormGroup>
                    <CFormGroup >
 <CLabel htmlFor="select" className="required">Category</CLabel>
                      <CSelect custom id="select nf-password" value={CorurseAdd.id_category} name="id_category" onChange={change} >
                        <option value="">Please select</option>
                        {
                          Categoryops.map((cv, id) => {
                            return (
                              <option value={cv.id} key={id}>{cv.name}</option>
                            )
                          })
                        }
                      </CSelect>
                      <p className="error_message animate__animated animate__headShake" >{course_error.id_category_Error}</p>
                    </CFormGroup>
                    <CFormGroup >
                       <CLabel htmlFor="select" >Topic</CLabel>
                      <CSelect custom name="id_topic" id="select nf-password" value={CorurseAdd.id_topic} onChange={change}>
                        <option value="">Please select</option>
                        {
                          TopicOption.map((cv, id) => {
                            return (
                              <option value={cv.id} key={id}>{cv.name}</option>
                            )
                          })
                        }
                      </CSelect>
                      <p className="error_message animate__animated animate__headShake" >{course_error.id_topic_Error}</p>
                    </CFormGroup>
                      <CFormGroup >
<CLabel htmlFor="select">Level</CLabel>
                      <CSelect custom name="id_level" id="select nf-password" value={CorurseAdd.id_level} onChange={change}>
                        <option value="">Please select</option>
                        {
                          Levelops.map((cv, id) => {
                            return (
                              <option value={cv.id} key={id}>{cv.name}</option>
                            )
                          })
                        }
                      </CSelect>
                      <p className="error_message animate__animated animate__headShake" >{course_error.id_level_Error}</p>
                    </CFormGroup>
                    <CFormGroup >
 <CLabel htmlFor="select">Price</CLabel>
                      <CSelect custom name="id_price" id="select nf-password" value={CorurseAdd.id_price} onChange={change}>
                        <option value="">Please select</option>
                        {
                          PriceOption.map((cv, id) => {
                            return (
                              <option value={cv.id} key={id}>{cv.name}</option>
                            )
                          })
                        }
                      </CSelect>
                      <p className="error_message animate__animated animate__headShake" >{course_error.id_price_Error}</p>
                    </CFormGroup>
                     <CFormGroup > <CLabel htmlFor="select" >Language made in</CLabel>
                      <CSelect custom name="id_language" id="select nf-password" value={CorurseAdd.id_language} onChange={change}>
                        <option value="">Please select</option>
                        {
                          Language.map((cv, id) => {
                            return (
                              <option value={cv.id} key={id}>{cv.name}</option>
                            )
                          })
                        }
                      </CSelect>
                      <p className="error_message animate__animated animate__headShake" >{course_error.id_language_Error}</p>
                    </CFormGroup>
                    <CFormGroup >
                      <CLabel htmlFor="select" >Duration</CLabel>
                      <CSelect custom name="id_duration" id="select nf-password" value={CorurseAdd.id_duration} onChange={change}>
                        <option value="">Please select</option>
                        {
                          Duration.map((cv, id) => {
                            return (
                              <option value={cv.id} key={id}>{cv.name}</option>
                            )
                          })
                        }
                      </CSelect>
                      <p className="error_message animate__animated animate__headShake" >{course_error.id_duration_Error}</p>
                    </CFormGroup>
                    <CFormGroup >
                      <CLabel htmlFor="select" >Features</CLabel>
                      <CSelect custom name="id_features" id="select nf-password" value={CorurseAdd.id_features} onChange={change}>
                        <option value="">Please select</option>
                        {
                          Fetures.map((cv, id) => {
                            return (
                              <option value={cv.id} key={id}>{cv.name}</option>
                            )
                          })
                        }
                      </CSelect>
                      <p className="error_message animate__animated animate__headShake" >{course_error.id_features_Error}</p>
                    </CFormGroup>
                    <CFormGroup >
                      <CLabel htmlFor="select" >Subtitle</CLabel>
                      <CSelect custom name="id_subtitles" id="select nf-password" value={CorurseAdd.id_subtitles} onChange={change}>
                        <option value="">Please select</option>
                        {
                          Subtitle.map((cv, id) => {
                            return (
                              <option value={cv.id} key={id}>{cv.name}</option>
                            )
                          })
                        }
                      </CSelect>
                      <p className="error_message animate__animated animate__headShake" >{course_error.id_subtitles_Error}</p>
                    </CFormGroup>
                    <CNav variant="tabs">
                      <CNavItem>
                      <CButton    onClick={()=>nextRequirements()} className="btn btn-primary">
                        next
                  </CButton>
                      </CNavItem>
                    </CNav>
                  </CForm>
                </CTabPane>
                <CTabPane data-tab={'requirements'} >
                  <br />
                  <CFormGroup row className="d-flex justify-content-center">
                    {/*onclick add input  */}
                     {RequirementsInput.map((x, i) => {
                      return (
                        <>
                          <CCol xs="6" >
                            <CInput
                              name="requirements"
                              type="text"
                              placeholder="Enter Requirements"
                              value={x.requirements}
                              style={{ marginBottom: '10px' }}
                              onChange={e => handleInputChange(e, i)} />
                          </CCol>
                          <CCol md="2">{RequirementsInput.length !== 1 && <CButton
                            color="danger"
                            style={{ marginRight: '10px' }}
                            onClick={() => handleRemoveClick(i)}><span style={{ fontSize: '18px', fontWeight: 'bolder' }}>-</span></CButton>}
                            {RequirementsInput.length - 1 === i && <CButton onClick={handleAddClick} color="success"><span style={{ fontSize: '18px', fontWeight: 'bolder' }}>+</span></CButton>}
                          </CCol></>
                      );
                    })}
                    <p className="error_message animate__animated animate__headShake" >{course_error.Requirements_Error}</p>
                     </CFormGroup>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink data-tab="basic" className="btn btn-primary" style={{ marginRight: '10px' }}>
                        Previous
                  </CNavLink>
                    </CNavItem>
                    <CNavItem>
                    <CNavLink data-tab="outcomes" className="btn btn-primary">
                        next
                  </CNavLink>
                    </CNavItem>
                  </CNav>
                </CTabPane>
                <CTabPane data-tab="outcomes"><br />
                  <CFormGroup row className="d-flex justify-content-center">
                    {/*onclick add input  */}
                     {OutcomesInput.map((x, i) => {
                      return (
                        <>
                          <CCol xs="6" >
                            <CInput
                              name="outcomes"
                              type="text"
                              placeholder="Enter Outcomes"
                              value={x.outcomes}
                              style={{ marginBottom: '10px' }}
                              onChange={e => handleOutcomeInputChange(e, i)}
                            />
                          </CCol>
                          <CCol md="2">{OutcomesInput.length !== 1 && <CButton
                            color="danger"
                            style={{ marginRight: '10px' }}
                            onClick={() => handleOutcomeRemoveClick(i)}><span style={{ fontSize: '18px', fontWeight: 'bolder' }}>-</span></CButton>}
                            {OutcomesInput.length - 1 === i && <CButton onClick={handleAddOutcomeClick} color="success"><span style={{ fontSize: '18px', fontWeight: 'bolder' }}>+</span></CButton>}
                          </CCol>  </>
                      );
                    })}
                    <p className="error_message animate__animated animate__headShake" >{course_error.outcomes_Error}</p>
                  </CFormGroup>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink data-tab="requirements" className="btn btn-primary" style={{ marginRight: '10px' }}>
                        Previous
                  </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="pricing" className="btn btn-primary">
                        next
                  </CNavLink>
                    </CNavItem>
                  </CNav>
                </CTabPane>
                <CTabPane data-tab="pricing">
                  <CFormGroup>
                    <CLabel htmlFor="nf-email" className="required">Price</CLabel>
                    <CInput type="number" id="nf-email" name="price" placeholder="Enter Price.." autoComplete="email" value={CorurseAdd.price} onChange={change} />
                    <CFormText className="help-block"></CFormText>
                    <p className="error_message animate__animated animate__headShake" >{course_error.price_Error}</p>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="nf-email" className="required">Discounted price</CLabel>
                    <CInput type="number" id="nf-email" name="discounted_price" placeholder="Enter Discounted price.." autoComplete="email" value={CorurseAdd.discounted_price} onChange={change} />
                    <CFormText className="help-block"></CFormText>
                    <p className="error_message animate__animated animate__headShake" >{course_error.discounted_price_Error}</p>
                  </CFormGroup>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink data-tab="outcomes" className="btn btn-primary" style={{ marginRight: '10px' }}>
                        Previous
                  </CNavLink>
                    </CNavItem>
                    <CNavItem>
                    <CButton    onClick={()=>nextMedia()} className="btn btn-primary">
                        next
                  </CButton>
                    </CNavItem>
                  </CNav>
                </CTabPane>
                <CTabPane data-tab="media">
                  <CFormGroup >
                    <CLabel htmlFor="select" className="required">Course overview provider</CLabel>
                    <CSelect custom name="section" id="select nf-password" value={CorurseAdd.section} onChange={change}>
                      <option value="0">Please select</option>
                      <option value="Youtube">Youtube</option>
                      <option value="Vimeo">Vimeo</option>
                      <option value="Html5">Html5</option>
                       </CSelect>
                    <p className="error_message animate__animated animate__headShake" >{course_error.section}</p>
                  </CFormGroup>{CorurseAdd.section === 'Html5' ? <CFormGroup>
                      <CLabel htmlFor="nf-email" className="required">Course video</CLabel>
                      <CInput type="file" id="nf-email" name="course_video" placeholder="Enter video URL" onChange={videoUpload} accept="video/*" />
                      <CFormText className="help-block"></CFormText>
                      
                     
                      <p className="videouplpad animate__animated animate__headShake" >{videoUploadbar?`video is uploading ${videoUploadbar} %`:""}</p>
                      <div className="d-flex justify-content-end mt-2 mr-2">{videoUploadbar >1?<CTooltip content="Cancel uploading"><CButton onClick={CancleFileUpladReaquest} color="primary" variant="outline" s>X
      </CButton></CTooltip>:''}{uploadcomplate?<CButton color="danger" variant="outline" s onClick={()=>removeUpload(htmlfile)}><CTooltip content="Remove uploaded video"><CIcon size={'sm'} name={'cilTrash'} /></CTooltip>  </CButton>:''}</div>
                      <p className="error_message animate__animated animate__headShake" >{videoError}</p>
                      <p className="error_message animate__animated animate__headShake" >{course_error.video_url_Error}</p>
                      {htmlfile ? <video controls={true} width="100%" >
                          <source src={htmlfile}
                            type="video/mp4" />
                        </video> : ""}
                 
                    </CFormGroup> : <CFormGroup>
                      <CLabel htmlFor="nf-email" className="required">Course video</CLabel>
                      <CInput type="url" id="nf-email" onChange={onchangeurl} placeholder="Enter video URL" name="video_url" value={youtubeUrl} />
                      <CFormText className="help-block"></CFormText>
                      <p className="error_message animate__animated animate__headShake" >{videoError}</p>
                      <p className="error_message animate__animated animate__headShake" >{course_error.video_url_Error}</p>
                      {youtubeUrl ? <iframe src={youtubeUrl} width="100%" height="300" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe> : ""}
                    </CFormGroup>}<CFormGroup>
                    <CLabel htmlFor="nf-email" className="required">Thumbnail</CLabel>
                    <CInput type="file" id="nf-email" name="demo_image" placeholder="Enter Thumbnail.." value={CorurseAdd.demo_image} onChange={changeimage} accept="image/*" />
                    <CFormText className="help-block"><img src={preview} width="100px" height="100px" style={{ display: preview ? "block" : "none" }} /></CFormText>
                    <p className="error_message animate__animated animate__headShake" >{course_error.demo_image}</p>
                  </CFormGroup>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink data-tab="pricing" className="btn btn-primary" style={{ marginRight: '10px' }}>
                        Previous
                  </CNavLink>
                    </CNavItem>
                    <CNavItem>
                    <CButton    onClick={()=>nextSeo()} className="btn btn-primary">
                        next
                  </CButton>
                    </CNavItem>
                  </CNav>
                </CTabPane>
                <CTabPane data-tab="seo">
                  <CFormGroup>
                    <CLabel htmlFor="nf-email" className="required">Meta keywords</CLabel>
                    <CInput type="text" id="nf-email" name="meta_keywords" placeholder="Enter Meta keywords.." autoComplete="email" value={CorurseAdd.meta_keywords} onChange={change} />
                    <CFormText className="help-block"></CFormText>
                    <p className="error_message animate__animated animate__headShake" >{course_error.meta_keywords_Error}</p>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="textarea-input" className="required">Meta description</CLabel>
                    <CTextarea
                      onChange={change}
                      name="meta_description"
                      id="textarea-input"
                      type="text"
                      rows="9"
                      placeholder="Meta description..."
                      value={CorurseAdd.meta_description}
                    /><p className="error_message animate__animated animate__headShake" >{course_error.meta_description_Error}</p>
                    <br />
                    <CNav variant="tabs">
                      <CNavItem>
                        <CNavLink data-tab="media" className="btn btn-primary" style={{ marginRight: '10px' }}>
                          Previous
                  </CNavLink>
                      </CNavItem>
                      <CNavItem>
                      <CButton    onClick={()=>nextFinish()} className="btn btn-primary">
                        next
                  </CButton>
                      </CNavItem>
                    </CNav>
                  </CFormGroup>
                </CTabPane>
                <CTabPane data-tab="finish">
                  <CFormGroup > <CLabel htmlFor="select">Status</CLabel>
                    <CSelect custom name="status" id="select nf-password" value={CorurseAdd.status} onChange={change}>
                      <option >Please select</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </CSelect>
                  </CFormGroup>
                  {`${lorem}`}
                  <CCardFooter className="d-flex justify-content-around">
                    <CButton type="submit" size="sm" color="primary" onClick={CourseAddSubmit}><CIcon name="cil-scrubber" /> Submit</CButton> <CButton type="reset" size="sm" color="danger" onClick={Resetdata}><CIcon name="cil-ban" /> Reset</CButton>
                  </CCardFooter>
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
       </>
  )
}
export default CourseAdd;