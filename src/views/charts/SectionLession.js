import React, { useState, useEffect,useRef} from 'react'
import {CTooltip, CContainer, CButton, CCard, CSelect, CCardBody, CCardHeader, CCol, CRow, CModal, CModalHeader, CModalBody, CFormGroup, CModalFooter, CForm, CLabel, CInput, CTextarea } from '@coreui/react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import CIcon from '@coreui/icons-react'
import BaseUrl from "../BaseUrl/BaseUrl"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useForm } from "react-hook-form";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
function SectionLession(props) {
  const meterialuploadcancle=useRef(null)
  const [metadata, setMetadata] = React.useState({
    duration: 0
  });
  const[UrlPrevie,SetUrlPrevie]=useState('')
  const [Lessonuploadcomplate,setLessonuploadcomplte]=useState(false)
  const LessonEditFilecanclefileupload=useRef(null)
  const [LessonvideoUploadbar,SetLessonvideoUploadbar]=useState()
  const [uploaPDF,SetUpladPDF]=useState('')
  const [uploaPPT,SetUpladPPT]=useState()
  const [pdfuploadbar,Setpdfuploadbar]=useState()
  const [PPTuploadbar,SetPPtuploadbar]=useState()
  const [meterialuploadbar,Setmeterialuploadbar]=useState()
  const [materialArray,SetmaterialArray]=useState([])
  const [meterialpreview,SetMeterialpreview]=useState([])
  const [material,Setmaterial]=useState()
  const [pffppturl,SetPfPpturl]=useState()
  const [pptturl,SetPPTturl]=useState()
  //course data
  const [course, setcourse] = useState({})

  //section data state
  const [SectionData, SetSectionData] = useState([{}])
  //action for show section adit and deleet
  const [Action, SetAction] = useState(false)
  //action for show lesson adit and deleet
  const [LessonAction, SetLessonAction] = useState(false)
  // for section  modal
  const [modal, setModal] = useState(false);
  // for lesson edit modal
  const [LessonEditModal, SetLessonEditModal] = useState(false);
  // lesson edit data
  const [LessonEdit, SetLessonEdit] = useState([{ lesson_type: "",meterial_url:'', title: "", section_id: null, video_url: "", duration: "", summary: "" }]);
  const [EditSection, SetEditSection] = useState({ title: "", sortorder: 1, })
  //lesson edit id
  const [editlessonid, seteditlesonid] = useState()
  //leson data
  const [LessonGetData, SetLessonData] = useState([{ lesson_type: "", title: "", section_id: "", video_url_for_mobile_application: "", duration_for_mobile_application: "", summary: "" }])
  //form validation data
  const { register, handleSubmit, errors ,reset} = useForm();
  //for showning lessonn data in section
  const [arrayofIndex, SetarrayofIndex] = useState([])

  const [arrayofId, SetarrayofId] = useState([])
  const [course_error, Seterror] = useState({
    Requirements_Error: "", description_Error: "", outcomes_Error: "",
    title_Error: "", id_category_Error: "", id_topic_Error: "", id_level_Error: "", id_price_Error: "", id_language_Error: "", id_duration_Error: "",
    id_features_Error: "", id_subtitles_Error: "", price_Error: "",
    discounted_price_Error: "", thumbnail_Error: "", video_url_Error: "", meta_keywords_Error: "", meta_description_Error: "", status_Error: ""
  })
  const [lessonvideo, setlessonvideo] = useState()
  const LessonvideoUpload = async(e) => {
    LessonEdit.video_url='';
    SetLessonVideoError("")
    setlessonvideo()
    SetLessonvideoUploadbar(0)
    if (e.target.files[0].size > 267386880) {
      SetLessonVideoError("Video size is above 250Mb")
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
        SetLessonvideoUploadbar(persentge)
      }
       },
       cancelToken: new axios.CancelToken( cancel => LessonEditFilecanclefileupload.current  =cancel )   
    }).then((response) => {
      setlessonvideo(response.data.video_url) 
      SetLessonvideoUploadbar(100);
      setLessonuploadcomplte(!Lessonuploadcomplate)
        setTimeout(() => {
          SetLessonvideoUploadbar(0);
        }, 1000);
        e.target.value = null;

    }).catch((error) => {
      console.log(error);
      if(LessonEditFilecanclefileupload.current){
       console.log('user hase cancled request')
      }
      SetLessonvideoUploadbar(0);
    
    });
  }
      
      
  
  }


 //cancle upload file request
 const LessonEditCancleFileUpladReaquest=()=>{
  if(LessonEditFilecanclefileupload.current){
    LessonEditFilecanclefileupload.current('user has canclled the file upload')
  }
}

  const [youtuveUrl, SetYoutubeurl] = useState({
    video_url: ""
  })

  const onchangeYoutubevideo = (e) => {
    const { name, value } = e.target
    SetYoutubeurl((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  
  const [lessonvideomp4, setlessonvideomp4] = useState({
    video_url: ""
  })


  //course edit upload state errror
  const [LessonVideoError, SetLessonVideoError] = useState("")
  const [videoduration, Setvimeoduration] = useState({
    duration: 0
  })

  //course edit upload forn input onchange function
  const LessonvideoURL = (e) => {
    const { name, value } = e.target
    setlessonvideomp4((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })

  }
  const [vimeovideo, SetVimeovideo] = useState({
    video_url: ""
  })
  const [videoVideocheck, SetvideoVideocheck] = useState(false)
  const vimeovideourl = async (e) => {
    const { name, value } = e.target
    SetVimeovideo((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })


    try {

      const vimeoid = e.target.value.substr(31);
      await axios.get(`https://vimeo.com/api/v2/video/${vimeoid}.json`).then(function (response) {
        Setvimeoduration(response.data[0]);
      });
      SetvideoVideocheck(true)
    } catch (error) {

    }


  }
  //lesson edit video upload state
  const [sectionerror, SetSectioError] = useState("")
  const [video, setvideo] = useState(null)
  //lesson edit upload state errror
  const [materialError, SetmaterialError] = useState("")
  const [Lesson_Type_Option, SetLessonTypeOption] = useState({
    lesson_type: ""
  })
  const Lessonchange=(e)=>{
  
    const { name, value } = e.target
    SetLessonEdit((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const onlessonchange = (e) => {
    setlessonvideo()
    SetPPTturl ()
    SetPfPpturl()
    setlessonvideomp4({
      video_url:''
    })
    SetVimeovideo({
      video_url:''
    })
    SetYoutubeurl({
      video_url:''
    })
    SetLessonTypeOption({
      lesson_type:''
    })
    SetmaterialArray([])
   


    const { name, value } = e.target
    SetLessonTypeOption((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  //get if from url
  const editid = useParams();
  //for input method for onchange
  const change = (e) => {
    const { name, value } = e.target
    SetEditSection((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
    SetLessonEdit((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  // drag function for lesson
  const ondragstop = (param) => {
    {
      const srcI = param.source.index;
      const desI = param.destination?.index;
      if (desI) {
        list.splice(desI, 0, list.splice(srcI, 1)[0]);
      }
      list.map((cv, i) => {
        arrayofId.push(cv.id)
        arrayofIndex.push(i + 1)
      })
    }
  }
  // sorting function for lesson
  const OnsortingLesson = async () => {
    const sortingData = {
      arrayofIndex: arrayofIndex.toString(),
      arrayofID: arrayofId.toString()
    }
    await axios.post(`${BaseUrl}sortlesson`, sortingData, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      }
    }).then((response) => {
      GetLessonData()
    })
    SetarrayofIndex([])
    SetarrayofId([])

  }
  // section get data
  const GetSectionData = async () => {
    await axios.get(`${BaseUrl}section/all/${editid.id}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) { SetSectionData(response.data); });
  }
  // edit secttion by id
  const EditSectionById = async (id) => {

    await axios.get(`${BaseUrl}section/${id}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      SetEditSection(response.data)
      setModal(!modal)
    });
  }
  const GetcourseData = async () => {

    await axios.get(`${BaseUrl}course/${editid.id}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      setcourse(response.data)

    });
  }
  // get lesson data
  const GetLessonData = async (id) => {

    await axios.get(`${BaseUrl}lesson`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      SetLessonData(response.data)

    });
  }
  useEffect(() => {
    GetcourseData()
    GetLessonData()
    GetSectionData()
    
  }, [])
  // edit section value
  const EditSectionValue = async (id) => {
    if (EditSection.title=== "") {
      SetSectioError("Title is Required")
    }
    else{
      await axios.put(`${BaseUrl}sectionupdate/${id}`, EditSection, {
        headers: {
  
          "auth": localStorage.getItem("LMS_Token")
        }
      }).then((responce) => {
  
        setModal(!modal)
      })
    }
  }
  const SectionOver = () => {
    SetAction(true)
  }
  const SectionLeave = () => {
    SetAction(false)
  }
  const LessonOver = () => {
    SetLessonAction(true)
  }
  const LessonLeave = () => {
    SetLessonAction(false)
  }
  // delete section
  const DeleteSection = async (delID, Course) => {
    await axios.delete(`${BaseUrl}section/${delID}/${Course}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      }
    }
    ).then((responce) => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <CModal
              show={true}
              centered={true}
              onClose={onClose}
            >
              <CModalHeader closeButton> Section</CModalHeader>
              <CModalBody>
                {responce.data.message}
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
if(responce.data.message!=="plese first delate all lesson"){
  window.location.reload()
}
     
    }).catch((err) => {
      console.log(err);
    })
  }
  // delete lesson
  const DeleteLesson = async (lessonid_id) => {

    await axios.delete(`${BaseUrl}lesson/${lessonid_id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      }
    })
    GetLessonData()
  }
  //edit lesson by id
  const EditLesson = async (id) => {
    SetLessonEditModal(!LessonEditModal)
    seteditlesonid(id)
    await axios.get(`${BaseUrl}lesson/${id}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Content-Type": "application/x-www-form-urlencoded",
        "auth": localStorage.getItem("LMS_Token")
      },
    }).then(function (response) {
      SetLessonEdit(response.data)
      SetLessonTypeOption(response.data)
      SetmaterialArray(response.data.meterial_url)

      if(response.data.lesson_type==='YouTube_Video'){
        SetYoutubeurl({
          video_url:response.data.video_url
        })
      }
      if(response.data.lesson_type==='Vimeo_Video'){
        SetVimeovideo({
          video_url:response.data.video_url
        })
      }
      if(response.data.lesson_type==='Video_url[.mp4]'){
        
      setlessonvideomp4({
        video_url:response.data.video_url
      })
      }
      

    });

  }

  //edit lesson modal
  const editmodal = () => {
    reset()
    setlessonvideo()
    SetPPTturl ()
    SetPfPpturl()
    setlessonvideomp4({
      video_url:''
    })
    SetVimeovideo({
      video_url:''
    })
    SetYoutubeurl({
      video_url:''
    })
    SetLessonTypeOption({
      lesson_type:''
    })
    SetmaterialArray([])
    
    SetLessonEditModal(!LessonEditModal)
  }
  //delete lessson confirmation
  const DeleteLessonBYId = (id) => {
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
                DeleteLesson(id);
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
  const DeleteSectionBYId = (id, courde_id) => {
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
                DeleteSection(id, courde_id);
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
  const OnMeterilChange=async(e)=>{
    try {
      SetmaterialError('')
      if (e.target.files[0].size > 10485760) {
        SetmaterialError("Meterial size is above 10Mb")
    
      
      }
      else{
        Setmeterialuploadbar(0)
        Setmaterial(e.target.files[0])
        
        const Meterialformdata=new FormData()
      
          
        Meterialformdata.append('course_vido',e.target.files[0], e.target.files[0].name.split(" ").join(""))
        await axios.post(`${BaseUrl}uplodevideo`, Meterialformdata, {
          headers: {
            'content-type': 'multipart/form-data',
            "auth": localStorage.getItem("LMS_Token")
          },
          onUploadProgress: progressEvent => {
            //Set the progress value to show the progress bar
            Setmeterialuploadbar(Math.round( (progressEvent.loaded * 100) / progressEvent.total ))
         
          }, cancelToken:new axios.CancelToken(cancle=>meterialuploadcancle.current=cancle)
        }).then((response) => {
          SetmaterialArray((prev)=>[...prev,response.data.video_url])
          SetMeterialpreview((prev)=>[...prev,response.data.video_url])
      
      
        }).catch((error) => {
          console.log(error);
        });
     }
    } catch (error) {
      console.log(error)
    }
    
  }
  const MaterialRequestCancle=()=>{
    if(meterialuploadcancle.current){
      meterialuploadcancle.current('material upload request is cancled');
      Setmeterialuploadbar(0)
    }
  }
  const deletemeterial=async(metrial_url,index)=>{
    const delete_mererial_url={
      'video_url':metrial_url
    }
    materialArray.splice(index,1)
    const items = materialArray.filter(item => item !== index)
    SetmaterialArray(items)
     await axios.post(`${BaseUrl}removevideo`,{delete_mererial_url}, {
       headers: {
         "auth": localStorage.getItem("LMS_Token")
       }
 
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
 
   }
   
  //lesson value insert fnction
  const onPPTchange=async(e)=>{
    SetPPTturl('')
    SetUpladPPT(e.target.files[0])
    const PPTformdata=new FormData()
      
          
    PPTformdata.append('course_vido',e.target.files[0], e.target.files[0].name.split(" ").join(""))
      await axios.post(`${BaseUrl}uplodevideo`, PPTformdata, {
        headers: {
          'content-type': 'multipart/form-data',
          "auth": localStorage.getItem("LMS_Token")
        },
        onUploadProgress: progressEvent => {
          //Set the progress value to show the progress bar
    
          let persentge= Math.round( (progressEvent.loaded * 100) / progressEvent.total )
          if(persentge<100)
          {
            SetPPtuploadbar(persentge)
          }
        },
      }).then((response) => {
        SetPPTturl(response.data.video_url)
        SetPPtuploadbar(100);
        setTimeout(() => {
          SetPPtuploadbar(0);
        }, 1000);
      
    
      }).catch((error) => {
        console.log(error);
      });
    
      
    
      }
      const OnPdfChange=async(e)=>{
        SetUpladPDF(e.target.files[0])
      const PDFformdata=new FormData()
      
          
      PDFformdata.append('course_vido',e.target.files[0], e.target.files[0].name.split(" ").join(""))
      await axios.post(`${BaseUrl}uplodevideo`, PDFformdata, {
        headers: {
          'content-type': 'multipart/form-data',
          "auth": localStorage.getItem("LMS_Token")
        },
        onUploadProgress: progressEvent => {
          //Set the progress value to show the progress bar
    
          Setpdfuploadbar(Math.round( (progressEvent.loaded * 100) / progressEvent.total ))
       
        },
      }).then((response) => {
        SetPfPpturl(response.data.video_url)
      
    
      }).catch((error) => {
        console.log(error);
      });
    
      
    
      }
      console.log('444f4f5f5f5g6h6j7j',lessonvideo)
  const onSubmit = async (data) => {

    const LessonUpdataFormData = new FormData();
    LessonUpdataFormData.append('title', data.title)
    LessonUpdataFormData.append('section_id', data.section_id)
    LessonUpdataFormData.append('summary', data.summary)
    LessonUpdataFormData.append('lesson_type', data.lesson_type)
    if (lessonvideo) {
      LessonUpdataFormData.append('video_url', lessonvideo)
    
    }
   else if (lessonvideomp4.video_url) {
      LessonUpdataFormData.append('video_url', lessonvideomp4.video_url)
    }
  else  if (vimeovideo.video_url) {
      LessonUpdataFormData.append('video_url', vimeovideo.video_url)
    }
  else  if (youtuveUrl.video_url) {
      LessonUpdataFormData.append('video_url', youtuveUrl.video_url)
    }
   else if(uploaPDF ){
      LessonUpdataFormData.append('video_url', pffppturl.split(" ").join(""))
  
    }
    else if(uploaPPT){
      LessonUpdataFormData.append('video_url',pptturl.split(" ").join(""))
    }
    else{
      LessonUpdataFormData.append('video_url', LessonEdit.video_url)

    }
   
    if(material){
      LessonUpdataFormData.append('meterial_url', materialArray.toString())
    }
    else{
      LessonUpdataFormData.append('meterial_url', LessonEdit.meterial_url)
    }
    LessonUpdataFormData.append("duration", data.duration_for_mobile_application||LessonEdit.duration);
    LessonUpdataFormData.append("order", 1);
    LessonUpdataFormData.append("id_group", 1);
    LessonUpdataFormData.append("course_id", editid.id);
    LessonUpdataFormData.append("course_title", course.title);


    await axios.put(`${BaseUrl}lessonupdate/${editlessonid}`, LessonUpdataFormData, {
      headers: {

        "auth": localStorage.getItem("LMS_Token")
      },
    })

    SetLessonEditModal(!LessonEditModal)
  window.location.reload()

  }
  const removeLessonEditVide=async(lessonEditVide)=>{

    setlessonvideo()
    setLessonuploadcomplte(!Lessonuploadcomplate)
    const delete_uploaded_video={
      'video_url':lessonEditVide
    }
    await axios.post(`${BaseUrl}removevideo`,delete_uploaded_video, {
      headers: {
        "auth": localStorage.getItem("LMS_Token")
      }
   
    })
    SetLessonvideoUploadbar(0)
  
  }
  const list = LessonGetData;
  const PDF_delete=async(document_url)=>{
    const delete_document_url={
      'video_url':document_url
    }
    Setpdfuploadbar(0)
    SetPfPpturl('')
     await axios.post(`${BaseUrl}removevideo`,delete_document_url, {
       headers: {
         "auth": localStorage.getItem("LMS_Token")
       }
    
     })
      }
      const PPT_delete=async(ppt_url)=>{
        const delete_document_url={
          'video_url':ppt_url
        }
        SetPPTturl('')
         await axios.post(`${BaseUrl}removevideo`,delete_document_url, {
           headers: {
             "auth": localStorage.getItem("LMS_Token")
           }
        
         })
      }
  const UserUploadFile = () => {
    if (Lesson_Type_Option.lesson_type === "YouTube_Video") {
      return <CFormGroup>
        <CLabel >Video</CLabel>
        <CInput type="text" placeholder="Enter Youtube URL." name="video_url" value={youtuveUrl.video_url ? youtuveUrl.video_url : LessonEdit.video_url} onChange={onchangeYoutubevideo} innerRef={register({ required: true })} />

        <p className="error_message animate__animated animate__headShake" >{LessonVideoError}</p>
        
        
        <CLabel >Add material</CLabel>
        <CInput type="file"  name="youtube_url" onChange={OnMeterilChange}  accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>   
  {meterialuploadbar >1?<div className="d-flex justify-content-end mt-2 mr-2"><CTooltip content="Cancel uploading">
  <CButton onClick={MaterialRequestCancle} color="primary" variant="outline" >X
      </CButton></CTooltip></div>:''}
  <p className="error_message animate__animated animate__headShake" >{materialError}</p>  
           <p className="videouplpad" >{meterialuploadbar?`File is uploading ${meterialuploadbar} %`:""}</p>
           {
  materialArray.map((cv,i)=>{
    return <div className="d-flex" key={i}><p className="p-2 w-100 bg-light meterial"><a href={cv} target='_blank'>{i+1}{"."}  {" "} {cv.slice(57,)}</a></p>  <CButton color="danger" onClick={()=>deletemeterial(cv,i)} className="p-2 flex-shrink-2 bg-light mb-3 border-0" variant="outline" shape="square" size="sm" > <CIcon size={'sm'} name={'cilTrash'} /></CButton></div>
  })
}
      </CFormGroup>
    }
    if (Lesson_Type_Option.lesson_type === "Video_url[.mp4]") {
      return <CFormGroup>
        <CLabel >Video</CLabel>
        <CInput type="text" onChange={LessonvideoURL} placeholder="Enter video .mp4 URL." name="video_url" value={lessonvideomp4.video_url ? lessonvideomp4.video_url : LessonEdit.video_url} innerRef={register({ required: true })} />


        <CLabel >Add material</CLabel>
        <CInput type="file"  name="youtube_url" onChange={OnMeterilChange}  accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"/> 
  {meterialuploadbar >1?<div className="d-flex justify-content-end mt-2 mr-2"><CTooltip content="Cancel uploading">
  <CButton onClick={MaterialRequestCancle} color="primary" variant="outline" >X
      </CButton></CTooltip></div>:''}  
  <p className="error_message animate__animated animate__headShake" >{materialError}</p>  
           <p className="videouplpad" >{meterialuploadbar?`File is uploading ${meterialuploadbar} %`:""}</p>
           {
  materialArray.map((cv,i)=>{
    return <div className="d-flex" key={i}><p className="p-2 w-100 bg-light meterial"><a href={cv} target='_blank'>{i+1}{"."}  {" "} {cv.slice(57,)}</a></p>  <CButton color="danger" onClick={()=>deletemeterial(cv,i)} className="p-2 flex-shrink-2 bg-light mb-3 border-0" variant="outline" shape="square" size="sm" > <CIcon size={'sm'} name={'cilTrash'} /></CButton></div>
  })
}
      </CFormGroup>
    }
    if (Lesson_Type_Option.lesson_type === "Vimeo_Video") {
      return <CFormGroup>
        <CLabel >Video</CLabel>
        <CInput type="text" placeholder="Enter vimoe video URL." onChange={vimeovideourl} name="video_url" value={vimeovideo.video_url ? vimeovideo.video_url : LessonEdit.video_url} innerRef={register({ required: true })} />


        <CLabel >Add material</CLabel>
        <CInput type="file"  name="youtube_url" onChange={OnMeterilChange}  accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"/> 
  {meterialuploadbar >1?<div className="d-flex justify-content-end mt-2 mr-2"><CTooltip content="Cancel uploading">
  <CButton onClick={MaterialRequestCancle} color="primary" variant="outline" >X
      </CButton></CTooltip></div>:''}    
  <p className="error_message animate__animated animate__headShake" >{materialError}</p>
           <p className="videouplpad" >{meterialuploadbar?`File is uploading ${meterialuploadbar} %`:""}</p>
           {
  materialArray.map((cv,i)=>{
    return <div className="d-flex" key={i}><p className="p-2 w-100 bg-light meterial"><a href={cv} target='_blank'>{i+1}{"."}  {" "} {cv.slice(57,)}</a></p>  <CButton color="danger" onClick={()=>deletemeterial(cv,i)} className="p-2 flex-shrink-2 bg-light mb-3 border-0" variant="outline" shape="square" size="sm" > <CIcon size={'sm'} name={'cilTrash'} /></CButton></div>
  })
}

      </CFormGroup>
    }
    if (Lesson_Type_Option.lesson_type === "PDF") {
      return <CFormGroup>
        <CLabel >PDF</CLabel>
        <CInput type="file" name="pdf" onChange={OnPdfChange} accept="application/pdf"/>
        <p className="videouplpad" >{pdfuploadbar?`File is uploading ${pdfuploadbar} %`:""}</p>
<div className="d-flex mt-2"><p className="p-2 w-100 bg-light"><a href={pffppturl?pffppturl:LessonEdit.video_url}>{pffppturl?pffppturl.slice(57,):LessonEdit.video_url.slice(57,)}</a></p>  </div>
        <p className="error_message animate__animated animate__headShake" >{LessonVideoError}</p>
        <CLabel >Add material</CLabel>
        <CInput type="file"  name="youtube_url" onChange={OnMeterilChange}  accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>   
  {meterialuploadbar >1?<div className="d-flex justify-content-end mt-2 mr-2"><CTooltip content="Cancel uploading">
  <CButton onClick={MaterialRequestCancle} color="primary" variant="outline" >X
      </CButton></CTooltip></div>:''}
  <p className="error_message animate__animated animate__headShake" >{materialError}</p>  
           <p className="videouplpad" >{meterialuploadbar?`File is uploading ${meterialuploadbar} %`:""}</p>
           {
  materialArray.map((cv,i)=>{
    return <div className="d-flex" key={i}><p className="p-2 w-100 bg-light meterial"><a href={cv} target='_blank'>{i+1}{"."}  {" "} {cv.slice(57,)}</a></p>  <CButton color="danger" onClick={()=>deletemeterial(cv,i)} className="p-2 flex-shrink-2 bg-light mb-3 border-0" variant="outline" shape="square" size="sm" > <CIcon size={'sm'} name={'cilTrash'} /></CButton></div>
  })
}


      </CFormGroup>
    }
    if (Lesson_Type_Option.lesson_type === "PPT") {
      return <CFormGroup>
        <CLabel >PPT</CLabel>
        <CInput type="file" name="pdf" onChange={onPPTchange} accept="application/vnd.ms-powerpoint"/>
        <p className="videouplpad" >{PPTuploadbar?`File is uploading ${PPTuploadbar} %`:""}</p>
<div className="d-flex mt-2"><p className="p-2 w-100 bg-light meterial"><a href={pptturl?pptturl:LessonEdit.video_url} target='_blank'>{pptturl?pptturl.slice(57,):LessonEdit.video_url.slice(57,)}</a></p>  </div>

        <p className="error_message animate__animated animate__headShake" >{LessonVideoError}</p>
        <CLabel >Add material</CLabel>
        <CInput type="file"  name="youtube_url" onChange={OnMeterilChange}  accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>   
  {meterialuploadbar >1?<div className="d-flex justify-content-end mt-2 mr-2"><CTooltip content="Cancel uploading">
  <CButton onClick={MaterialRequestCancle} color="primary" variant="outline" >X
      </CButton></CTooltip></div>:''} 
  <p className="error_message animate__animated animate__headShake" >{materialError}</p> 
           <p className="videouplpad" >{meterialuploadbar?`File is uploading ${meterialuploadbar} %`:""}</p>
           {
  materialArray.map((cv,i)=>{
    return <div className="d-flex" key={i}><p className="p-2 w-100 bg-light meterial"><a href={cv} target='_blank'>{i+1}{"."}  {" "} {cv.slice(57,)}</a></p>  <CButton color="danger" onClick={()=>deletemeterial(cv,i)} className="p-2 flex-shrink-2 bg-light mb-3 border-0" variant="outline" shape="square" size="sm" > <CIcon size={'sm'} name={'cilTrash'} /></CButton></div>
  })
}


      </CFormGroup>
    }
  


    else {
      return (
        <>

        </>
      )
    }
  }
 
  return (
    <>

      <CContainer fluid className="mt-lg-5 d-flex justify-content-center"  >
        {props.title ? <CRow>
          <CCol >
            {/*{props.===0?<div className="mt-5 d-flex justify-content-center ">
      <CAlert color="primary">No Section Added</CAlert>

    </div>:*/}
            <CCard style={{ width: "550px", border: "none" }} className="shadow-sm p-3 mb-1 bg-secondary rounded ">
              <CCardHeader onMouseEnter={SectionOver} onMouseLeave={SectionLeave}>
                <p className="float-left  font-weight-bolder">Section {props.index + 1} : {props.title}</p>

                <div className="float-right d-flex justify-content-around align-top" >
                  <CButton color="primary" shape="square" size="sm" variant="outline" style={{ display: Action ? "block" : 'none', marginRight: "20px" }} onClick={() => EditSectionById(props.id)}>
                    <CIcon size={'sm'} name={'cilPencil'} />
                  </CButton>
                  <CButton color="danger" variant="outline" shape="square" size="sm" style={{ display: Action ? "block" : 'none' }} onClick={() => DeleteSectionBYId(props.id, props.CourseId)}>
                    <CIcon size={'sm'} name={'cilTrash'} />
                  </CButton>
                </div>
              </CCardHeader>

              <DragDropContext
                onDragEnd={(param) => ondragstop(param)}
              >
                <div>
                  <CButton color="success" variant="outline" shape="square" size="md" style={{ marginTop: "10px", marginRight: "10px" }} className="float-right" onClick={() => OnsortingLesson()}>
                    Sort Lesson
                  </CButton>
                </div>
                <CCardBody>

                  <Droppable droppableId="droppable-1">
                    {(provided, _) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {

                          LessonGetData.map((cv, i) => {

                            if (props.id === cv.section_id) {

                              return <Draggable
                                key={cv.id}
                                draggableId={"draggable-" + cv.id}
                                index={i}
                              >
                                {(provided, snapshot) => (
                                  <div className="shadow-lg p-3 mb-1 bg-white rounded d-flex justify-content-between " onMouseEnter={LessonOver} onMouseLeave={LessonLeave} ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      boxShadow: snapshot.isDragging
                                        ? "0 0 .4rem #666"
                                        : "none",
                                    }}>
                                    <div className="float-left  font-weight-bolder"  ><span {...provided.dragHandleProps}>Lesson  : {cv.title}</span></div>
                                    <div className="float-right d-flex justify-content-around " >
                                      <CButton color="primary" variant="outline" style={{ display: LessonAction ? "block" : 'block', marginRight: "15px" }} size="sm" onClick={() => EditLesson(cv.id)}>

                                        <CIcon size={'sm'} name={'cilPencil'} />
                                      </CButton>
                                      <CButton color="danger" variant="outline" style={{ display: LessonAction ? "block" : 'block' }} size="sm" onClick={() => DeleteLessonBYId(cv.id)}>
                                        <CIcon size={'sm'} name={'cilTrash'} />
                                      </CButton>
                                    </div>


                                  </div>
                                )}
                              </Draggable>
                            }
                            else {

                            }

                          })
                        }
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CCardBody>
              </DragDropContext>
            </CCard>
            {/*}*/}
          </CCol>
        </CRow> : ""}
        <CModal
          show={modal}
          onClose={() => EditSectionById(props.id)}
        >
          <CModalHeader closeButton>Edit  Section</CModalHeader>
          <CModalBody>
            <CContainer fluid>
              <CRow>
                <CCol sm="12">
                  <CForm action="" method="post">
                    <CFormGroup>
                      <CLabel htmlFor="nf-email">Title</CLabel>
                      <CInput
                        type="text"
                        onChange={change}
                        name="title"
                        placeholder="Enter Title.."
                        value={EditSection.title}

                      />
 <p className="errorMsg animate__animated animate__headShake"> {sectionerror}</p>
                    </CFormGroup>
                    <CFormGroup>
                      <CButton color="primary" className="btn btn-block" onClick={() => EditSectionValue(props.id)}>Submit</CButton>
                    </CFormGroup>
                  </CForm>
                </CCol>
              </CRow>
            </CContainer>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => EditSectionById(props.id)}
            >Cancel</CButton>
          </CModalFooter>
        </CModal>


        <CModal
          show={LessonEditModal}
          onClose={() => editmodal()}
        >
          <CModalHeader closeButton>Edit  Lesson</CModalHeader>
          <CModalBody>
            <CContainer fluid>
              <CRow>
                <CCol sm="12">
                  <CForm method="post" className="editform">
                    <CFormGroup>
                      <CLabel htmlFor="lesson type">Select lesson type</CLabel>
                      <CSelect custom name="lesson_type" id="select nf-password" value={Lesson_Type_Option.lesson_type} onChange={onlessonchange} innerRef={register({ required: true })}>
                        <option value="0">please select</option>
                        <option value="YouTube_Video">YouTube Video</option>
                        <option value="Video_url[.mp4]">Video url [ .mp4 ]</option>
                        <option value="Vimeo_Video">Vimeo Video</option>
                        <option value="Video_file">Video file</option>
                        <option value="PDF">PDF</option>
                         <option value="PPT">PPT</option>
                      </CSelect>
                      {errors.lesson_type && errors.lesson_type.type === "required" && (
                        <p className="errorMsg animate__animated animate__headShake">Select Lesson Type is required.</p>
                      )}
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel >Title</CLabel>
                      <CInput type="text" name="title" placeholder="Enter Title.." value={LessonEdit.title} innerRef={register({ required: true })} onChange={change} />
                      {errors.title && errors.title.type === "required" && (
                        <p className="errorMsg animate__animated animate__headShake">Title is required.</p>
                      )}
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="section ">Select Section</CLabel>
                      <CSelect custom name="section_id" id="select nf-password" innerRef={register({ required: true })} value={LessonEdit.section_id} onChange={change}>
                        {
                          SectionData.map((cv, i) => <option key={i} value={cv.id}>{cv.title}</option>)
                        }
                      </CSelect>
                      {errors.section_id && errors.section_id.type === "required" && (
                        <p className="errorMsg animate__animated animate__headShake">Section is required.</p>
                      )}
                    </CFormGroup>
                    {  Lesson_Type_Option.lesson_type === "Video_file" ? <>  <CFormGroup>
                      <CLabel >Video</CLabel>
                      <CInput type="file" onChange={LessonvideoUpload} placeholder="Select video.." name="course_video" accept="video/*" />
                      {errors.video_url_for_mobile_application && errors.video_url_for_mobile_application.type === "required" && (
                        <p className="errorMsg animate__animated animate__headShake">Video url( For web application ) is required.</p>
                      )}
                       <p className="videouplpad" >{LessonvideoUploadbar?`File is uploading ${LessonvideoUploadbar} %`:""}</p>
                       <div className="d-flex justify-content-end mt-2 mr-2">{LessonvideoUploadbar >1?<CTooltip content="Cancel uploading">
  <CButton onClick={LessonEditCancleFileUpladReaquest} color="primary" variant="outline" >X
      </CButton></CTooltip>:''}{Lessonuploadcomplate?<CTooltip content="Remove uploaded video"><CButton color="danger" onClick={()=>removeLessonEditVide(lessonvideo)} variant="outline" ><CIcon size={'sm'} name={'cilTrash'} /> </CButton></CTooltip> :''}</div>
                      <p className="error_message animate__animated animate__headShake" >{LessonVideoError}</p>
                    </CFormGroup>
               {LessonEdit.video_url?<div className="d-flex mt-2"><p className="p-2 w-100 bg-light"><a href={LessonEdit.video_url} target='_blank'>{LessonEdit.video_url.slice(57,)}</a></p></div>:''}     
                  
                    {lessonvideo && (
                                    <video
                                      controls={true}
                                      width="100%"
                                      onLoadedMetadata={e => {
                                        setMetadata({
                                          videoHeight: e.target.videoHeight,
                                          videoWidth: e.target.videoWidth,
                                          duration: e.target.duration
                                        });
                                      }}
                                    >
                                      <source src={lessonvideo}
                                        type="video/mp4" />
                                    </video>
                                  )} <CFormGroup>
                                    <CLabel >Duration</CLabel>
                                    <CInput type="text" name="duration"  onChange={Lessonchange}  value={metadata.duration ? new Date(metadata.duration * 1000).toISOString().substr(11, 8) : "00:00:00"} name="duration_for_mobile_application" placeholder="Enter duration.." innerRef={register({ required: true })} className="without_ampm" />
                                    {errors.duration_for_mobile_application && errors.duration_for_mobile_application.type === "required" && (
                                      <p className="errorMsg animate__animated animate__headShake">Duration is required.</p>
                                    )}
                                   <CLabel >Add material</CLabel>
        <CInput type="file"  name="youtube_url" onChange={OnMeterilChange}  accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>     
  {meterialuploadbar >1?<div className="d-flex justify-content-end mt-2 mr-2"><CTooltip content="Cancel uploading">
  <CButton onClick={MaterialRequestCancle} color="primary" variant="outline" >X
      </CButton></CTooltip></div>:''}
  <p className="error_message animate__animated animate__headShake" >{materialError}</p>
           <p className="videouplpad" >{meterialuploadbar?`File is uploading ${meterialuploadbar} %`:""}</p>
           {
  materialArray.map((cv,i)=>{
    return <div className="d-flex" key={i}><p className="p-2 w-100 bg-light meterial"><a href={cv} target='_blank'>{i+1}{"."}  {" "} {cv.slice(57,)}</a></p>  <CButton color="danger" onClick={()=>deletemeterial(cv,i)} className="p-2 flex-shrink-2 bg-light mb-3 border-0" variant="outline" shape="square" size="sm" > <CIcon size={'sm'} name={'cilTrash'} /></CButton></div>
  })
}
                      </CFormGroup>
                    </> : <UserUploadFile />}


                    {lessonvideomp4.video_url && (<><video
                      id="video_player"
                      controls={true}
                      width="100%"
                      onLoadedMetadata={e => {
                        setMetadata({
                          duration: e.target.duration
                        });
                      }}
                      
                    >
                      <source src={lessonvideomp4.video_url?lessonvideomp4.video_url:LessonEdit.video_url}
                        type="video/mp4" />
                    </video>     <CFormGroup>
                        <CLabel >Duration</CLabel>
                        <CInput type="text" name="duration"  onChange={Lessonchange}  value={metadata.duration ? new Date(metadata.duration * 1000).toISOString().substr(11, 8) : LessonEdit.duration} name="duration" placeholder="Enter duration.." innerRef={register({ required: true })} className="without_ampm" />
                        {errors.duration && errors.duration.type === "required" && (
                          <p className="errorMsg animate__animated animate__headShake">Duration is required.</p>
                        )}
                      </CFormGroup></>)
                    }
                    {/* <iframe src="https://player.vimeo.com/video/23374724" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
<p><a href="https://vimeo.com/23374724">Primary 1 - Never Know</a> from <a href="https://vimeo.com/timandjoe">Tim &amp; Joe</a> on <a href="https://vimeo.com">Vimeo</a>.</p>            */}

                    {vimeovideo.video_url && (<><iframe src={vimeovideo.video_url} width="420" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>    <CFormGroup>
                      <CLabel >Duration</CLabel>
                      <CInput type="text" name="duration"  onChange={Lessonchange} value={vimeovideo.video_url ? new Date(videoduration.duration * 1000).toISOString().substr(11, 8) : metadata.duration} name="duration" placeholder="Enter duration.." innerRef={register({ required: true })} className="without_ampm" />
                      {errors.duration_for_mobile_application && errors.duration_for_mobile_application.type === "required" && (
                        <p className="errorMsg animate__animated animate__headShake">Duration is required.</p>
                      )}
                    </CFormGroup></>)}
                    <><iframe src={youtuveUrl.video_url} width="420" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>    <CFormGroup>
                      <CLabel >Duration</CLabel>
                      <CInput type="text" name="duration" value={LessonEdit.duration} onChange={Lessonchange} placeholder="00:00:00" innerRef={register({ required: true })} className="without_ampm" />
                      {errors.duration_for_mobile_application && errors.duration_for_mobile_application.type === "required" && (
                        <p className="errorMsg animate__animated animate__headShake">Duration is required.</p>
                      )}
                    </CFormGroup></>
                    <CFormGroup>
                      <CLabel >Summary</CLabel>
                      <CTextarea
                        name="summary"
                        id="textarea-input"
                        rows="9"
                        value={LessonEdit.summary}
                        onChange={change}
                        placeholder="Summary..."
                        innerRef={register({ required: true })}
                      />
                      {errors.summary && errors.summary.type === "required" && (
                        <p className="errorMsg animate__animated animate__headShake">Summary is required.</p>
                      )}
                    </CFormGroup>

                    <CButton color="primary" onClick={handleSubmit(onSubmit)}>Submit</CButton>
                  </CForm>


                </CCol>
              </CRow>
            </CContainer>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => editmodal()}
            >Cancel</CButton>
          </CModalFooter>
        </CModal>
      </CContainer>
    </>
  )
}
export default SectionLession;