import React, { useState, useEffect, useRef } from "react";
import "./chart.css";
import { useParams } from "react-router-dom";
import {
  CTooltip,
  CSpinner,
  CRow,
  CContainer,
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
  CModalFooter,
  CModalHeader,
  CForm,
  CProgress,
} from "@coreui/react";
import "./chart.css";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import FormData from "form-data";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import BaseUrl from "../BaseUrl/BaseUrl";
import SectionLession from "./SectionLession";
import { useForm } from "react-hook-form";
import CourseAdd from "./Charts";
const lorem = "You are just one click away";
const Charts = () => {
  const canclefileupload = useRef(null);
  const meterialuploadcancle = useRef(null);
  const LessonFilecanclefileupload = useRef(null);
  const [uploadcomplate, setuploadcomplte] = useState(false);
  const [uploaPDF, SetUpladPDF] = useState();
  const [uploaPPT, SetUpladPPT] = useState();
  const [Instructor, SetInstructor] = useState([]);
  const [oldCourseData, SetOldCourseData] = useState({});
  // hold image value in state
  const [youtubeUrl, SetyoutubeUrl] = useState("");
  const [image, setimage] = useState("");
  // check active tabe or not
  const [activetabe, SetActivetab] = useState("");
  //get category option
  const [Categoryops, Setcategoryops] = useState([]);
  //get level option
  const [Levelops, Setlevelops] = useState([]);
  //get launguge option
  const [Language, Setlanguage] = useState([]);
  //get topic option
  const [TopicOption, SetTopicOption] = useState([]);
  //get price option
  const [PriceOption, SetPriceOption] = useState([]);
  //get durations option
  const [Duration, SetDuration] = useState([]);
  //get fearure option
  const [Fetures, SetFetures] = useState([]);
  //get subtitle option
  const [Subtitle, SetSubtitle] = useState([]);
  //preview ofimage
  const [preview, Setpreview] = useState("");
  const [SectionId, SetSectionid] = useState(null);
  // order inceatent stare
  const [orserIncrement, SetorderIncrement] = useState(0);
  //navigation page
  let histrory = useHistory();
  const [onrequirement, Setonrequrement] = useState(true);
  //course edit video upload state
  const [video, setvideo] = useState("");
  const [videoPreview, SetvideoPreview] = useState("");
  //course edit upload state errror
  const [videoError, SetvideoError] = useState("");
  //course edit upload forn input onchange function
  const [pffppturl, SetPfPpturl] = useState();
  const [pptturl, SetPPTturl] = useState();
  const [courseUpload, SetCourseUpload] = useState(0);
  const videoUpload = async (e) => {
    oldCourseData.video_url = "";
    SetvideoError("");
    SetvideoPreview("");
    SetCourseUpload(0);
    if (e.target.files[0].size > 267386880) {
      SetvideoError("Video size is above 100Mb");
    } else {
      const uploadvideo = new FormData();

      uploadvideo.append(
        "course_vido",
        e.target.files[0],
        e.target.files[0].name.split(" ").join("")
      );

      await axios
        .post(`${BaseUrl}uplodevideo`, uploadvideo, {
          headers: {
            "content-type": "multipart/form-data",
            auth: localStorage.getItem("LMS_Token"),
          },
          onUploadProgress: (progressEvent) => {
            //Set the progress value to show the progress bar
            let persentge = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            if (persentge < 100) {
              SetCourseUpload(persentge);
            }
          },
          cancelToken: new axios.CancelToken(
            (cancel) => (canclefileupload.current = cancel)
          ),
        })
        .then((response) => {
          SetvideoPreview(response.data.video_url);
          SetCourseUpload(100);
          setuploadcomplte(!uploadcomplate);
          setTimeout(() => {
            SetCourseUpload(0);
          }, 1000);
          e.target.value = null;

          confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <CModal show={true} centered={true} onClose={onClose}>
                  <CModalHeader closeButton>
                    {" "}
                    {window.location.host} Says
                  </CModalHeader>
                  <CModalBody>uploade Successfully</CModalBody>
                  <CModalFooter>
                    <CButton color="primary" onClick={onClose}>
                      Ok
                    </CButton>
                  </CModalFooter>
                </CModal>
              );
            },
          });
        })
        .catch((error) => {
          console.log(error);
          if (canclefileupload.current) {
            confirmAlert({
              customUI: ({ onClose }) => {
                return (
                  <CModal show={true} centered={true} onClose={onClose}>
                    <CModalHeader closeButton>
                      {" "}
                      {window.location.host} Says
                    </CModalHeader>
                    <CModalBody>User has canceled the file upload</CModalBody>
                    <CModalFooter>
                      <CButton color="primary" onClick={onClose}>
                        Ok
                      </CButton>
                    </CModalFooter>
                  </CModal>
                );
              },
            });
          }
          SetCourseUpload(0);
        });
    }
  };
  //cancle upload file request
  const CancleFileUpladReaquest = () => {
    if (canclefileupload.current) {
      canclefileupload.current("user has canclled the file upload");
    }
  };
  //course edit video upload state
  const [lessonvideo, setlessonvideo] = useState();
  const [videoUploadbar, SetvideoUploadbar] = useState();
  const [videoEditUploadbar, SetvideoEditUploadbar] = useState();
  const [pdfuploadbar, Setpdfuploadbar] = useState();
  const [PPTuploadbar, SetPPtuploadbar] = useState();
  const [meterialuploadbar, Setmeterialuploadbar] = useState();
  const [materialArray, SetmaterialArray] = useState([]);
  const [meterialpreview, SetMeterialpreview] = useState([]);
  const [material, Setmaterial] = useState();
  const [lessonvideomp4, setlessonvideomp4] = useState({
    mp4_url: "",
  });
  const [metadata, setMetadata] = React.useState({
    duration: 0,
  });
  //course edit upload state errror
  const [LessonVideoError, SetLessonVideoError] = useState("");
  const [videoduration, Setvimeoduration] = useState({
    duration: 0,
  });

  //course edit upload forn input onchange function
  const LessonvideoURL = (e) => {
    const { name, value } = e.target;
    setlessonvideomp4((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const [vimeovideo, SetVimeovideo] = useState({
    vimeo_url: "",
  });
  const [htmlfile, SetHtmlfile] = useState();
  const [videoVideocheck, SetvideoVideocheck] = useState(false);
  const vimeovideourl = async (e) => {
    const { name, value } = e.target;
    SetVimeovideo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    try {
      const vimeoid = e.target.value.substr(31);
      await axios
        .get(`https://vimeo.com/api/v2/video/${vimeoid}.json`)
        .then(function (response) {
          Setvimeoduration(response.data[0]);
        });
      SetvideoVideocheck(true);
    } catch (error) {}
  };
  const LessonvideoUpload = async (e) => {
    try {
      SetLessonVideoError("");
      SetvideoUploadbar(0);
      if (e.target.files[0].size > 267386880) {
        SetLessonVideoError("Video size is above 250Mb");
      } else {
        const uploadvideo = new FormData();

        uploadvideo.append(
          "course_vido",
          e.target.files[0],
          e.target.files[0].name.split(" ").join("")
        );

        await axios
          .post(`${BaseUrl}uplodevideo`, uploadvideo, {
            headers: {
              "content-type": "multipart/form-data",
              auth: localStorage.getItem("LMS_Token"),
            },
            onUploadProgress: (progressEvent) => {
              //Set the progress value to show the progress bar
              let persentge = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              if (persentge < 100) {
                SetvideoUploadbar(persentge);
              }
            },
            cancelToken: new axios.CancelToken(
              (cancel) => (LessonFilecanclefileupload.current = cancel)
            ),
          })
          .then((response) => {
            SetvideoUploadbar(100);
            setuploadcomplte(!uploadcomplate);
            setTimeout(() => {
              SetvideoUploadbar(0);
            }, 1000);
            setlessonvideo(response.data.video_url);
            e.target.value = null;
          })
          .catch((error) => {
            console.log(error);
            if (LessonFilecanclefileupload.current) {
              console.log("user has cancle request");
            }
            SetvideoUploadbar(0);
          });
      }
    } catch (error) {
      console.log("can not upoad file");
    }
  };

  //cancle upload file request
  const LessonCancleFileUpladReaquest = () => {
    if (LessonFilecanclefileupload.current) {
      LessonFilecanclefileupload.current("user has canclled the file upload");
    }
  };

  // requirement hold stare
  const [RequirementsInput, SetRequirementsInput] = useState([
    {
      requirements: "",
    },
  ]);
  // outcome hold state
  const [OutcomesInput, SetOutcomesInput] = useState([
    {
      outcomes: "",
    },
  ]);

  const [onoucomes, Setonoutcome] = useState(true);
  //course add object for insert course add data
  const [CorurseAdd, SetCourseAdd] = useState({
    requirements: "",
    outcomes: "",
    instructor_id: "",
    title: "",
    description: "",
    id_category: "",
    id_topic: "",
    id_level: "",
    id_price: "",
    id_language: "",
    id_duration: "",
    id_features: "",
    id_subtitles: "",
    price: "",
    discounted_price: "",
    thumbnail: "",
    video_url: "",
    meta_keywords: "",
    meta_description: "",
    status: "",
    section: "",
    demo_image: "",
  });
  // showing error if field is null
  const [course_error, Seterror] = useState({
    Requirements_Error: "",
    description_Error: "",
    outcomes_Error: "",
    title_Error: "",
    id_category_Error: null,
    id_topic_Error: null,
    id_level_Error: null,
    id_price_Error: null,
    id_language_Error: null,
    id_duration_Error: null,
    id_features_Error: null,
    id_subtitles_Error: null,
    price_Error: "",
    discounted_price_Error: "",
    section: "",
    demo_image: "",
    meta_keywords_Error: "",
    meta_description_Error: "",
    status_Error: "",
  });
  const [materialError, SetmaterialError] = useState("");
  // section modal
  const [SectionModal, setSectionModal] = useState(false);
  // lesson modal box
  const [LessonModal, setLessonModal] = useState(false);
  // get edit value from url
  const [selectedIndex, SetselectedIndex] = useState("curriculum");
  const editid = useParams();
  //section ttile
  const [SectionTitle, SetSectionTitle] = useState({
    title: "",
    sortorder: 1,
    course_id: editid.id,
  });
  const [Lesson_Type_Option, SetLessonTypeOption] = useState({
    lesson_type: "",
  });
  const onlessonchange = (e) => {
    setlessonvideo();

    SetPPTturl();
    SetPfPpturl();
    setlessonvideomp4({
      mp4_url: "",
    });
    SetVimeovideo({
      vimeo_url: "",
    });
    SetYoutubeurl({
      youtube_url: "",
    });
    SetLessonTypeOption({
      lesson_type: "",
    });
    SetmaterialArray([]);

    SetvideoVideocheck(false);
    const { name, value } = e.target;
    SetLessonTypeOption((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const onchangeurl = (e) => {
    Seterror({ video_url_Error: "" });
    SetyoutubeUrl("");
    const URL = e.target.value;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const vimeoUrlCheck =
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    if (URL.match(regExp) || URL.match(vimeoUrlCheck)) {
      SetyoutubeUrl(URL);
    } else {
      Seterror({ video_url_Error: "Wrong URL please entered valid URL" });
      SetyoutubeUrl(URL);
    }
  };
  // section error
  const [sectionerror, SetSectioError] = useState("");
  //showing sesion modal onclick
  const SectionModalToggle = () => {
    setSectionModal(!SectionModal);
  };
  // onclick lesson modal show
  const LessonModalToggle = (e) => {
    reset();
    setlessonvideo();
    SetPPTturl();
    SetPfPpturl();
    setlessonvideomp4({
      mp4_url: "",
    });
    SetVimeovideo({
      vimeo_url: "",
    });
    SetYoutubeurl({
      youtube_url: "",
    });
    SetLessonTypeOption({
      lesson_type: "",
    });
    SetmaterialArray([]);
    setLessonModal(!LessonModal);
  };
  const [SectionData, SetSectionData] = useState([{}]);
  //validation form
  const { register, handleSubmit, errors, reset } = useForm();
  //get sesction data by id
  const GetSectionData = async () => {
    await axios
      .get(`${BaseUrl}section/all/${editid.id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        SetSectionData(response.data);
      });
  };
  //for rename folder get old title
  const oldTitle = oldCourseData.title;
  // lesson value submit

  const onSubmit = async (data) => {
    SetorderIncrement(orserIncrement + 1);
    const LessonAddData = new FormData();

    if (lessonvideo) {
      LessonAddData.append("video_url", lessonvideo);
      LessonAddData.append("meterial_url", materialArray.toString());
    }
    if (pffppturl) {
      LessonAddData.append("video_url", pffppturl.split(" ").join(""));
      LessonAddData.append("meterial_url", materialArray.toString());
    }
    if (pptturl) {
      LessonAddData.append("video_url", pptturl.split(" ").join(""));
      LessonAddData.append("meterial_url", materialArray.toString());
    }

    if (lessonvideomp4.mp4_url) {
      LessonAddData.append("video_url", lessonvideomp4.mp4_url);
      LessonAddData.append("meterial_url", materialArray.toString());
    }
    if (vimeovideo.vimeo_url) {
      LessonAddData.append("video_url", vimeovideo.vimeo_url);
      LessonAddData.append("meterial_url", materialArray.toString());
    }
    if (youtuveUrl.youtube_url) {
      LessonAddData.append("video_url", youtuveUrl.youtube_url);
      LessonAddData.append("meterial_url", materialArray.toString());
    }
    LessonAddData.append(
      "duration",
      data.duration_for_mobile_application || null
    );
    LessonAddData.append("order", 1);
    LessonAddData.append("id_group", 1);
    LessonAddData.append("course_id", editid.id);

    LessonAddData.append("summary", data.summary);
    LessonAddData.append("lesson_type", data.lesson_type);
    LessonAddData.append("title", data.title);
    LessonAddData.append("section_id", data.section_id);
    await axios
      .post(`${BaseUrl}lesson`, LessonAddData, {
        headers: {
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then((responce) => {
        setLessonModal(!LessonModal);
        window.location.reload();
      })
      .catch((error) => {});
  };

  //session value submir
  const SubmitSection = async () => {
    if (SectionTitle.title === "") {
      SetSectioError("Title is Required");
    } else {
      await axios
        .post(`${BaseUrl}section`, SectionTitle, {
          headers: {
            auth: localStorage.getItem("LMS_Token"),
          },
        })
        .then((responce) => {
          setSectionModal(!SectionModal);
          GetSectionData();
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };
  //set image value
  const changeimage = (e) => {
    Seterror({ demo_image: "" });
    setimage(e.target.files[0]);
    Setpreview(URL.createObjectURL(e.target.files[0]));
  };
  //set requirement value
  const handleInputChange = (e, index) => {
    Setonrequrement(false);
    const { name, value } = e.target;
    const list = [...RequirementsInput];
    list[index][name] = value;
    SetRequirementsInput(list);
  };
  //set oucomes value
  const handleOutcomeInputChange = (e, index) => {
    Setonoutcome(false);
    const { name, value } = e.target;
    const list = [...OutcomesInput];
    list[index][name] = value;
    SetOutcomesInput(list);
  };

  // handle click event of the requirement Remove button
  const handleRemoveClick = (index) => {
    const list = [...RequirementsInput];
    list.splice(index, 1);
    SetRequirementsInput(list);
  };
  // handle click event of the outcomes Remove button
  const handleOutcomeRemoveClick = (index) => {
    const list = [...OutcomesInput];
    list.splice(index, 1);
    SetOutcomesInput(list);
  };
  // add requirement
  const handleAddClick = () => {
    SetRequirementsInput([...RequirementsInput, { requirements: "" }]);
  };
  // add outcomes
  const handleAddOutcomeClick = () => {
    SetOutcomesInput([...OutcomesInput, { outcomes: "" }]);
  };
  // get category option
  const ReciveCategoryOptions = async () => {
    await axios
      .get(`${BaseUrl}category`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        Setcategoryops(response.data);
      });
  };
  // get level option
  const ReciveLeveloption = async () => {
    await axios
      .get(`${BaseUrl}level`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        Setlevelops(response.data);
      });
  };
  // get languge option
  const ReciveLanguageoption = async () => {
    await axios
      .get(`${BaseUrl}language`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        Setlanguage(response.data);
      });
  };
  // get topic option
  const ReciveTopicoption = async () => {
    await axios
      .get(`${BaseUrl}topic`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        SetTopicOption(response.data);
      });
  };
  const RecivePriceoption = async () => {
    await axios
      .get(`${BaseUrl}price`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        SetPriceOption(response.data);
      });
  };
  // get duration option
  const ReciveDuretionoption = async () => {
    await axios
      .get(`${BaseUrl}duration`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        SetDuration(response.data);
      });
  };
  // get feature option
  const ReciveFeturesoption = async () => {
    await axios
      .get(`${BaseUrl}features`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        SetFetures(response.data);
      });
  };
  // get subtitle option
  const ReciveSubtitleoption = async () => {
    await axios
      .get(`${BaseUrl}subtitles`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        SetSubtitle(response.data);
      });
  };
  // get course data
  const GetCourseData = async () => {
    await axios
      .get(`${BaseUrl}course/${editid.id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        SetCourseAdd(response.data);
        SetyoutubeUrl(response.data.video_url);
        SetOldCourseData(response.data);
      });
  };
  // get instructor data
  const ReciveInstructorData = async () => {
    await axios
      .get(`${BaseUrl}instructor`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then(function (response) {
        SetInstructor(response.data);
      });
  };
  useEffect(() => {
    if (!localStorage.getItem("LMS_Token")) {
      histrory.push(`/login`);
    }

    GetSectionData();
    GetCourseData();
    ReciveCategoryOptions();
    ReciveLeveloption();
    ReciveLanguageoption();
    ReciveTopicoption();
    RecivePriceoption();
    ReciveDuretionoption();
    ReciveFeturesoption();
    ReciveSubtitleoption();
    ReciveInstructorData();
    deletemeterial();
  }, []);
  // for onchange method
  const change = (e) => {
    Seterror({
      Requirements_Error: "",
      description_Error: "",
      outcomes_Error: "",
      title_Error: "",
      id_category_Error: null,
      id_topic_Error: null,
      id_level_Error: null,
      id_price_Error: null,
      id_language_Error: null,
      id_duration_Error: null,
      id_features_Error: null,
      id_subtitles_Error: null,
      price_Error: "",
      discounted_price_Error: "",
      thumbnail_Error: "",
      video_url_Error: "",
      meta_keywords_Error: "",
      meta_description_Error: "",
      status_Error: "",
    });
    const { name, value } = e.target;
    SetCourseAdd((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    SetSectionTitle((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const [youtuveUrl, SetYoutubeurl] = useState({
    youtube_url: "",
  });

  const onchangeYoutubevideo = (e) => {
    const { name, value } = e.target;
    SetYoutubeurl((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const [instrucorID, SetInstructorId] = useState({
    instructer_id: "",
  });
  const OnInstructorChange = (e) => {
    const { name, value } = e.target;
    SetInstructorId((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const removeUpload = async (Remove_Uploaded_vieo) => {
    setlessonvideo();
    Setpreview("");
    SetvideoPreview("");
    setuploadcomplte(!uploadcomplate);
    const delete_uploaded_video = {
      video_url: Remove_Uploaded_vieo,
    };
    await axios.post(`${BaseUrl}removevideo`, delete_uploaded_video, {
      headers: {
        auth: localStorage.getItem("LMS_Token"),
      },
    });
  };
  const CourseAddSubmit = async () => {
    await axios
      .put(`${BaseUrl}assigncourse/${editid.id}`, instrucorID, {
        headers: {
          auth: localStorage.getItem("LMS_Token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    CorurseAdd.requirements = JSON.stringify(RequirementsInput);
    CorurseAdd.outcomes = JSON.stringify(OutcomesInput);
    //convert requrement object to array
    const RequiremenyArray = [];
    //convert outcomes object to array
    const OutComesArray = [];
    RequirementsInput.map((requireValue) => {
      RequiremenyArray.push(requireValue.requirements);
    });
    OutcomesInput.map((outcomesValue) => {
      OutComesArray.push(outcomesValue.outcomes);
    });

    let Formdata = new FormData();

    Formdata.append("a_course", title);
    CorurseAdd.video_url = youtubeUrl;
    const CourseData = {
      ...CorurseAdd,
    };

    const {
      title,
      description,
      id_category,
      id_topic,
      id_level,
      id_price,
      id_language,
      id_duration,
      id_features,
      id_subtitles,
      price,
      discounted_price,
      thumbnail,
      video_url,
      meta_keywords,
      meta_description,
      status,
      section,
    } = CourseData;
    Formdata.append("section", section);
    if (videoPreview) {
      Formdata.append("old_video", oldCourseData.video_url);

      Formdata.append("video_url", videoPreview);
    } else {
      Formdata.append("video_url", video_url);
    }
    if (image.name) {
      Formdata.append("old_img", oldCourseData.thumbnail);
      Formdata.append("course_img", image, image.name.split(" ").join(""));
    }

    Formdata.append("requirements", RequiremenyArray.toString());
    Formdata.append("outcomes", OutComesArray.toString());
    Formdata.append("title", title);
    Formdata.append("description", description);
    Formdata.append("id_category", id_category || 0);
    Formdata.append("id_topic", id_topic || 0);
    Formdata.append("id_level", id_level || 0);
    Formdata.append("id_price", id_price || 0);
    Formdata.append("id_language", id_language || 0);
    Formdata.append("id_duration", id_duration || 0);
    Formdata.append("id_features", id_features || 0);
    Formdata.append("id_subtitles", id_subtitles || 0);
    Formdata.append("price", price);
    Formdata.append("discounted_price", discounted_price);
    Formdata.append("meta_keywords", meta_keywords);
    Formdata.append("meta_description", meta_description);
    Formdata.append("status", status);

    await axios
      .put(`${BaseUrl}updatecourse/${editid.id}/`, Formdata, {
        headers: {
          "content-type": "multipart/form-data",
          auth: localStorage.getItem("LMS_Token"),
        },
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <CModal
                  show={true}
                  centered={true}
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  <CModalBody>
                    <div className="d-flex justify-content-center align-items-center">
                      <CSpinner
                        color="primary"
                        style={{ width: "5rem", height: "5rem" }}
                      />
                    </div>

                    {onClose}
                  </CModalBody>
                </CModal>
              );
            },
          });
        },
      })
      .then((response) => {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <CModal show={true} centered={true} onClose={onClose}>
                <CModalHeader closeButton>
                  {" "}
                  {window.location.host} Says
                </CModalHeader>
                <CModalBody>Updated Successfully</CModalBody>
                <CModalFooter>
                  <CButton color="primary" onClick={onClose}>
                    Ok
                  </CButton>
                </CModalFooter>
              </CModal>
            );
          },
        });
        histrory.push("/courselisting");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //resert form data
  const Resetdata = () => {
    SetCourseAdd({
      requirements: "",
      outcomes: "",
      title: "",
      description: "",
      id_category: "",
      id_topic: "",
      id_level: "",
      id_price: "",
      id_language: "",
      id_duration: "",
      id_features: "",
      id_subtitles: "",
      price: "",
      discounted_price: "",
      thumbnail: "",
      video_url: "",
      meta_keywords: "",
      meta_description: "",
      status: "",
    });
  };
  const nextRequirements = () => {
    if (
      CorurseAdd.title === "" &&
      CorurseAdd.description === "" &&
      CorurseAdd.id_category === ""
    ) {
      Seterror({
        title_Error: "Title filed is require",
        description_Error: "Description filed is require",
        id_category_Error: "category filed is require",
      });
    } else if (CorurseAdd.title === "") {
      Seterror({ title_Error: "Title filed is require" });
    } else if (CorurseAdd.description === "") {
      Seterror({ description_Error: "Description filed is require" });
    } else if (CorurseAdd.id_category === "") {
      Seterror({ id_category_Error: "category filed is require" });
    } else if (
      CorurseAdd.title !== "" &&
      CorurseAdd.description !== "" &&
      CorurseAdd.id_category !== ""
    ) {
      SetselectedIndex("requirements");
    }
  };
  const nextMedia = () => {
    if (CorurseAdd.price === "" && CorurseAdd.discounted_price === "") {
      Seterror({
        price_Error: "Price filed is require",
        discounted_price_Error: "Discount filed is require",
      });
    } else if (CorurseAdd.price === "") {
      Seterror({ price_Error: "Price filed is require" });
    } else if (CorurseAdd.discounted_price === "") {
      Seterror({ discounted_price_Error: "Discount filed is require" });
    } else if (CorurseAdd.price !== "" && CorurseAdd.discounted_price !== "") {
      SetselectedIndex("media");
    }
  };
  const nextSeo = () => {
    if (CorurseAdd.section === "" && image === "") {
      Seterror({
        section: "Section filed is require",
        discdemo_imageounted_price_Error: "Thubnail  filed is require",
      });
    } else if (CorurseAdd.section === "") {
      Seterror({ price_Error: "Section filed is require" });
    } else if (image === "") {
      Seterror({ demo_image: "Thubnail filed is require" });
    } else if (CorurseAdd.section !== "" && image !== "") {
      SetselectedIndex("seo");
    }
  };
  const nextFinish = () => {
    if (CorurseAdd.meta_description === "" && CorurseAdd.meta_keywords === "") {
      Seterror({
        meta_description_Error: "meta description  filed is require",
        meta_keywords_Error: "Meta keywords filed is require",
      });
    } else if (CorurseAdd.meta_description === "") {
      Seterror({ meta_description_Error: "meta description filed is require" });
    } else if (CorurseAdd.meta_keywords === "") {
      Seterror({ meta_keywords_Error: "Meta keywords filed is require" });
    } else if (
      CorurseAdd.meta_description !== "" &&
      CorurseAdd.meta_keywords !== ""
    ) {
      SetselectedIndex("finish");
    }
  };
  const ontabechange = () => {};

  const OnMeterilChange = async (e) => {
    try {
      SetmaterialError("");
      if (e.target.files[0].size > 10485760) {
        SetmaterialError("Meterial size is above 10Mb");
      } else {
        Setmeterialuploadbar(0);
        Setmaterial(e.target.files[0]);

        const Meterialformdata = new FormData();

        Meterialformdata.append(
          "course_vido",
          e.target.files[0],
          e.target.files[0].name.split(" ").join("")
        );
        await axios
          .post(`${BaseUrl}uplodevideo`, Meterialformdata, {
            headers: {
              "content-type": "multipart/form-data",
              auth: localStorage.getItem("LMS_Token"),
            },
            onUploadProgress: (progressEvent) => {
              //Set the progress value to show the progress bar

              let persentge = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              if (persentge < 100) {
                Setmeterialuploadbar(persentge);
              }
            },
            cancelToken: new axios.CancelToken(
              (cancle) => (meterialuploadcancle.current = cancle)
            ),
          })
          .then((response) => {
            SetmaterialArray((prev) => [...prev, response.data.video_url]);
            SetMeterialpreview((prev) => [...prev, response.data.video_url]);
            Setmeterialuploadbar(100);

            setTimeout(() => {
              Setmeterialuploadbar(0);
            }, 1000);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const MaterialRequestCancle = () => {
    if (meterialuploadcancle.current) {
      meterialuploadcancle.current("material upload request is cancled");
      Setmeterialuploadbar(0);
    }
  };
  const onPPTchange = async (e) => {
    SetUpladPPT(e.target.files[0]);
    const PPTformdata = new FormData();

    PPTformdata.append(
      "course_vido",
      e.target.files[0],
      e.target.files[0].name.split(" ").join("")
    );
    await axios
      .post(`${BaseUrl}uplodevideo`, PPTformdata, {
        headers: {
          "content-type": "multipart/form-data",
          auth: localStorage.getItem("LMS_Token"),
        },
        onUploadProgress: (progressEvent) => {
          //Set the progress value to show the progress bar
          let persentge = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          if (persentge < 100) {
            SetPPtuploadbar(persentge);
          }
        },
      })
      .then((response) => {
        SetPPTturl(response.data.video_url);
        SetPPtuploadbar(100);

        setTimeout(() => {
          SetPPtuploadbar(0);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const OnPdfChange = async (e) => {
    SetUpladPDF(e.target.files[0]);
    const PDFformdata = new FormData();

    PDFformdata.append(
      "course_vido",
      e.target.files[0],
      e.target.files[0].name.split(" ").join("")
    );
    await axios
      .post(`${BaseUrl}uplodevideo`, PDFformdata, {
        headers: {
          "content-type": "multipart/form-data",
          auth: localStorage.getItem("LMS_Token"),
        },
        onUploadProgress: (progressEvent) => {
          //Set the progress value to show the progress bar

          let persentge = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          if (persentge < 100) {
            Setpdfuploadbar(persentge);
          }
        },
      })
      .then((response) => {
        SetPfPpturl(response.data.video_url);
        Setpdfuploadbar(100);

        setTimeout(() => {
          Setpdfuploadbar(0);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deletemeterial = async (metrial_url, index) => {
    const delete_mererial_url = {
      video_url: metrial_url,
    };
    materialArray.splice(index, 1);
    const items = materialArray.filter((item) => item !== index);
    SetmaterialArray(items);

    await axios.post(`${BaseUrl}removevideo`, delete_mererial_url, {
      headers: {
        auth: localStorage.getItem("LMS_Token"),
      },
    });
  };
  const PDF_delete = async (document_url) => {
    const delete_document_url = {
      video_url: document_url,
    };
    Setpdfuploadbar(0);
    SetPfPpturl("");
    await axios.post(`${BaseUrl}removevideo`, delete_document_url, {
      headers: {
        auth: localStorage.getItem("LMS_Token"),
      },
    });
  };
  const PPT_delete = async (ppt_url) => {
    const delete_document_url = {
      video_url: ppt_url,
    };
    SetPPtuploadbar(0);
    SetPPTturl("");
    await axios.post(`${BaseUrl}removevideo`, delete_document_url, {
      headers: {
        auth: localStorage.getItem("LMS_Token"),
      },
    });
  };
  const UserUploadFile = () => {
    if (Lesson_Type_Option.lesson_type === "YouTube_Video") {
      return (
        <CFormGroup>
          <CLabel>Video</CLabel>
          <CInput
            type="text"
            placeholder="Enter Youtube URL."
            name="youtube_url"
            value={youtuveUrl.youtube_url}
            onChange={onchangeYoutubevideo}
          />

          <p className="error_message animate__animated animate__headShake">
            {LessonVideoError}
          </p>
          <CLabel>Add material</CLabel>
          <CInput
            type="file"
            name="youtube_url"
            onChange={OnMeterilChange}
            accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          {meterialuploadbar > 1 ? (
            <div className="d-flex justify-content-end mt-2 mr-2">
              <CTooltip content="Cancel uploading">
                <CButton
                  onClick={MaterialRequestCancle}
                  color="primary"
                  variant="outline"
                >
                  X
                </CButton>
              </CTooltip>
            </div>
          ) : (
            ""
          )}
          <p className="error_message animate__animated animate__headShake">
            {materialError}
          </p>
          <p className="videouplpad">
            {meterialuploadbar
              ? `File is uploading ${meterialuploadbar} %`
              : ""}
          </p>
          {materialArray.map((cv, i) => {
            return (
              <div className="d-flex" key={i}>
                <p className="p-2 w-100 bg-light">
                  {i + 1}
                  {"."} {cv.slice(57)}
                </p>{" "}
                <CButton
                  color="danger"
                  onClick={() => deletemeterial(cv, i)}
                  className="p-2 flex-shrink-2 bg-light mb-3 border-0"
                  variant="outline"
                  shape="square"
                  size="sm"
                >
                  {" "}
                  <CIcon size={"sm"} name={"cilTrash"} />
                </CButton>
              </div>
            );
          })}
        </CFormGroup>
      );
    }
    if (Lesson_Type_Option.lesson_type === "PDF") {
      return (
        <CFormGroup>
          <CLabel>PDF</CLabel>
          <CInput
            type="file"
            name="pdf"
            onChange={OnPdfChange}
            accept="application/pdf"
          />
          <p className="videouplpad">
            {pdfuploadbar ? `File is uploading ${pdfuploadbar} %` : ""}
          </p>
          <div className="d-flex">
            <p className="p-2 w-100 bg-light">
              {pffppturl ? pffppturl.slice(57) : "choose pdf file."}
            </p>{" "}
            <CButton
              color="danger"
              onClick={() => PDF_delete(pffppturl)}
              variant="outline"
              className="p-2 flex-shrink-2 bg-light mb-3 border-0"
              shape="square"
              size="sm"
            >
              {" "}
              <CIcon size={"sm"} name={"cilTrash"} />
            </CButton>
          </div>

          <p className="error_message animate__animated animate__headShake">
            {LessonVideoError}
          </p>
          <CLabel>Add material</CLabel>
          <CInput
            type="file"
            name="youtube_url"
            onChange={OnMeterilChange}
            accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          {meterialuploadbar > 1 ? (
            <div className="d-flex justify-content-end mt-2 mr-2">
              <CTooltip content="Cancel uploading">
                <CButton
                  onClick={MaterialRequestCancle}
                  color="primary"
                  variant="outline"
                >
                  X
                </CButton>
              </CTooltip>
            </div>
          ) : (
            ""
          )}
          <p className="error_message animate__animated animate__headShake">
            {materialError}
          </p>
          <p className="videouplpad">
            {meterialuploadbar
              ? `File is uploading ${meterialuploadbar} %`
              : ""}
          </p>
          {materialArray.map((cv, i) => {
            return (
              <div className="d-flex" key={i}>
                <p className="p-2 w-100 bg-light">
                  {i + 1}
                  {"."} {cv.slice(57)}
                </p>{" "}
                <CButton
                  color="danger"
                  onClick={() => deletemeterial(cv, i)}
                  className="p-2 flex-shrink-2 bg-light mb-3 border-0"
                  variant="outline"
                  shape="square"
                  size="sm"
                >
                  {" "}
                  <CIcon size={"sm"} name={"cilTrash"} />
                </CButton>
              </div>
            );
          })}
        </CFormGroup>
      );
    }
    if (Lesson_Type_Option.lesson_type === "PPT") {
      return (
        <CFormGroup>
          <CLabel>PPT</CLabel>
          <CInput
            type="file"
            name="pdf"
            onChange={onPPTchange}
            accept="application/vnd.ms-powerpoint"
          />
          <p className="videouplpad">
            {PPTuploadbar ? `File is uploading ${PPTuploadbar} %` : ""}
          </p>
          <div className="d-flex mt-2">
            <p className="p-2 w-100 bg-light">
              {pptturl ? pptturl.slice(57) : "chosse pptx file."}
            </p>{" "}
            <CButton
              color="danger"
              onClick={() => PPT_delete(pptturl)}
              className="p-2 flex-shrink-2 bg-light mb-3 border-0"
              variant="outline"
              shape="square"
              size="sm"
            >
              {" "}
              <CIcon size={"sm"} name={"cilTrash"} />
            </CButton>
          </div>

          <p className="error_message animate__animated animate__headShake">
            {LessonVideoError}
          </p>
          <CLabel>Add material</CLabel>
          <CInput
            type="file"
            name="youtube_url"
            onChange={OnMeterilChange}
            accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          {meterialuploadbar > 1 ? (
            <div className="d-flex justify-content-end mt-2 mr-2">
              <CTooltip content="Cancel uploading">
                <CButton
                  onClick={MaterialRequestCancle}
                  color="primary"
                  variant="outline"
                >
                  X
                </CButton>
              </CTooltip>
            </div>
          ) : (
            ""
          )}
          <p className="error_message animate__animated animate__headShake">
            {materialError}
          </p>
          <p className="videouplpad">
            {meterialuploadbar
              ? `File is uploading ${meterialuploadbar} %`
              : ""}
          </p>
          {materialArray.map((cv, i) => {
            return (
              <div className="d-flex" key={i}>
                <p className="p-2 w-100 bg-light">
                  {i + 1}
                  {"."} {cv.slice(57)}
                </p>{" "}
                <CButton
                  color="danger"
                  onClick={() => deletemeterial(cv, i)}
                  className="p-2 flex-shrink-2 bg-light mb-3 border-0"
                  variant="outline"
                  shape="square"
                  size="sm"
                >
                  {" "}
                  <CIcon size={"sm"} name={"cilTrash"} />
                </CButton>
              </div>
            );
          })}
        </CFormGroup>
      );
    }
    if (Lesson_Type_Option.lesson_type === "Video_url[.mp4]") {
      return (
        <CFormGroup>
          <CLabel>Video</CLabel>
          <CInput
            type="text"
            onChange={LessonvideoURL}
            placeholder="Enter video .mp4 URL."
            name="mp4_url"
            value={lessonvideomp4.mp4_url}
          />

          <CLabel>Add material</CLabel>
          <CInput
            type="file"
            name="youtube_url"
            onChange={OnMeterilChange}
            accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          {meterialuploadbar > 1 ? (
            <div className="d-flex justify-content-end mt-2 mr-2">
              <CTooltip content="Cancel uploading">
                <CButton
                  onClick={MaterialRequestCancle}
                  color="primary"
                  variant="outline"
                >
                  X
                </CButton>
              </CTooltip>
            </div>
          ) : (
            ""
          )}
          <p className="error_message animate__animated animate__headShake">
            {materialError}
          </p>
          <p className="videouplpad">
            {meterialuploadbar
              ? `File is uploading ${meterialuploadbar} %`
              : ""}
          </p>
          {materialArray.map((cv, i) => {
            return (
              <div className="d-flex" key={i}>
                <p className="p-2 w-100 bg-light">
                  {i + 1}
                  {"."} {cv.slice(57)}
                </p>{" "}
                <CButton
                  color="danger"
                  onClick={() => deletemeterial(cv, i)}
                  className="p-2 flex-shrink-2 bg-light mb-3 border-0"
                  variant="outline"
                  shape="square"
                  size="sm"
                >
                  {" "}
                  <CIcon size={"sm"} name={"cilTrash"} />
                </CButton>
              </div>
            );
          })}
        </CFormGroup>
      );
    }
    if (Lesson_Type_Option.lesson_type === "Vimeo_Video") {
      return (
        <CFormGroup>
          <CLabel>Video</CLabel>
          <CInput
            type="text"
            placeholder="Enter vimoe video URL."
            onChange={vimeovideourl}
            name="vimeo_url"
            value={vimeovideo.vimeo_url}
          />

          <CLabel>Add material</CLabel>
          <CInput
            type="file"
            name="youtube_url"
            onChange={OnMeterilChange}
            accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          {meterialuploadbar > 1 ? (
            <div className="d-flex justify-content-end mt-2 mr-2">
              <CTooltip content="Cancel uploading">
                <CButton
                  onClick={MaterialRequestCancle}
                  color="primary"
                  variant="outline"
                >
                  X
                </CButton>
              </CTooltip>
            </div>
          ) : (
            ""
          )}
          <p className="error_message animate__animated animate__headShake">
            {materialError}
          </p>
          <p className="videouplpad">
            {meterialuploadbar
              ? `File is uploading ${meterialuploadbar} %`
              : ""}
          </p>
          {materialArray.map((cv, i) => {
            return (
              <div className="d-flex" key={i}>
                <p className="p-2 w-100 bg-light">
                  {i + 1}
                  {"."} {cv.slice(57)}
                </p>{" "}
                <CButton
                  color="danger"
                  onClick={() => deletemeterial(cv, i)}
                  className="p-2 flex-shrink-2 bg-light mb-3 border-0"
                  variant="outline"
                  shape="square"
                  size="sm"
                >
                  {" "}
                  <CIcon size={"sm"} name={"cilTrash"} />
                </CButton>
              </div>
            );
          })}
        </CFormGroup>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>Course Edit</CCardHeader>
          <CCardBody>
            <CTabs activeTab={selectedIndex}>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink data-tab="curriculum">Curriculum</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="basic">Basic</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="requirements">Requirements</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="outcomes">Outcomes</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="pricing">Pricing</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="media">Media</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="seo">Seo</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="finish" className="btn btn-primary">
                    Create
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab="curriculum">
                  <CRow className="d-flex justify-content-around">
                    <CButton
                      color="primary"
                      variant="outline"
                      className="m-2"
                      onClick={SectionModalToggle}
                    >
                      Add Section
                    </CButton>
                    <CButton
                      color="primary"
                      variant="outline"
                      className="m-2"
                      onClick={LessonModalToggle}
                    >
                      Add Lesson
                    </CButton>
                    {SectionData.map((cv, i) => (
                      <SectionLession
                        title={cv.title}
                        id={cv.id}
                        index={i}
                        CourseId={cv.course_id}
                        reloadSection={GetSectionData}
                      />
                    ))}
                    <CModal show={LessonModal} onClose={LessonModalToggle}>
                      <CModalHeader closeButton>Lesson add</CModalHeader>
                      <CModalBody>
                        <CContainer fluid>
                          <CRow>
                            <CCol sm="12">
                              <CForm method="post" className="editform">
                                <CFormGroup>
                                  <CLabel htmlFor="lesson type">
                                    Select lesson type
                                  </CLabel>
                                  <CSelect
                                    custom
                                    name="lesson_type"
                                    id="select nf-password"
                                    value={Lesson_Type_Option.lesson_type}
                                    onChange={onlessonchange}
                                    innerRef={register({ required: true })}
                                  >
                                    <option value="0">please select</option>
                                    <option value="YouTube_Video">
                                      YouTube Video
                                    </option>
                                    <option value="Video_url[.mp4]">
                                      Video url [ .mp4 ]
                                    </option>
                                    <option value="Vimeo_Video">
                                      Vimeo Video
                                    </option>
                                    <option value="Video_file">
                                      Video file
                                    </option>
                                    <option value="PDF">PDF</option>
                                    <option value="PPT">PPT</option>
                                  </CSelect>
                                  {errors.lesson_type &&
                                    errors.lesson_type.type === "required" && (
                                      <p className="errorMsg animate__animated animate__headShake">
                                        Select Lesson Type is required.
                                      </p>
                                    )}
                                </CFormGroup>
                                <CFormGroup>
                                  <CLabel>Title</CLabel>
                                  <CInput
                                    type="text"
                                    name="title"
                                    placeholder="Enter Title.."
                                    innerRef={register({ required: true })}
                                  />
                                  {errors.title &&
                                    errors.title.type === "required" && (
                                      <p className="errorMsg animate__animated animate__headShake">
                                        Title is required.
                                      </p>
                                    )}
                                </CFormGroup>
                                <CFormGroup>
                                  <CLabel htmlFor="section ">
                                    Select Section
                                  </CLabel>
                                  <CSelect
                                    custom
                                    name="section_id"
                                    id="select nf-password"
                                    innerRef={register({ required: true })}
                                  >
                                    {SectionData.map((cv, i) => (
                                      <option key={i} value={cv.id}>
                                        {cv.title}
                                      </option>
                                    ))}
                                  </CSelect>
                                  {errors.section_id &&
                                    errors.section_id.type === "required" && (
                                      <p className="errorMsg animate__animated animate__headShake">
                                        Section is required.
                                      </p>
                                    )}
                                </CFormGroup>
                                {Lesson_Type_Option.lesson_type ===
                                "Video_file" ? (
                                  <>
                                    {" "}
                                    <CFormGroup>
                                      <CLabel>Video</CLabel>
                                      <CInput
                                        type="file"
                                        onChange={LessonvideoUpload}
                                        name="course_video"
                                        accept="video/*"
                                      />
                                      {errors.video_url_for_mobile_application &&
                                        errors.video_url_for_mobile_application
                                          .type === "required" && (
                                          <p className="errorMsg animate__animated animate__headShake">
                                            Video url( For web application ) is
                                            required.
                                          </p>
                                        )}
                                      <div className="d-flex justify-content-end mt-2 mr-2">
                                        {videoUploadbar > 1 ? (
                                          <CTooltip content="Cancel uploading">
                                            <CButton
                                              onClick={
                                                LessonCancleFileUpladReaquest
                                              }
                                              color="primary"
                                              variant="outline"
                                            >
                                              X
                                            </CButton>
                                          </CTooltip>
                                        ) : (
                                          ""
                                        )}
                                        {uploadcomplate ? (
                                          <CTooltip content="Remove uploaded video">
                                            <CButton
                                              color="danger"
                                              variant="outline"
                                              s
                                              onClick={() =>
                                                removeUpload(videoPreview)
                                              }
                                            >
                                              <CIcon
                                                size={"sm"}
                                                name={"cilTrash"}
                                              />{" "}
                                            </CButton>
                                          </CTooltip>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <p className="error_message animate__animated animate__headShake">
                                        {LessonVideoError}
                                      </p>
                                      <p className="videouplpad animate__animated animate__headShake">
                                        {videoUploadbar
                                          ? `video is uploading ${videoUploadbar} %`
                                          : ""}
                                      </p>
                                    </CFormGroup>
                                    {lessonvideo && (
                                      <video
                                        controls={true}
                                        width="100%"
                                        onLoadedMetadata={(e) => {
                                          setMetadata({
                                            videoHeight: e.target.videoHeight,
                                            videoWidth: e.target.videoWidth,
                                            duration: e.target.duration,
                                          });
                                        }}
                                      >
                                        <source
                                          src={lessonvideo}
                                          type="video/mp4"
                                        />
                                      </video>
                                    )}{" "}
                                    <CFormGroup>
                                      <CLabel>Duration</CLabel>
                                      <CInput
                                        type="text"
                                        value={
                                          metadata.duration
                                            ? new Date(metadata.duration * 1000)
                                                .toISOString()
                                                .substr(11, 8)
                                            : "00:00:00"
                                        }
                                        name="duration_for_mobile_application"
                                        placeholder="Enter duration.."
                                        innerRef={register({ required: true })}
                                        className="without_ampm"
                                      />
                                      {errors.duration_for_mobile_application &&
                                        errors.duration_for_mobile_application
                                          .type === "required" && (
                                          <p className="errorMsg animate__animated animate__headShake">
                                            Duration is required.
                                          </p>
                                        )}
                                      <CLabel>Add material</CLabel>
                                      <CInput
                                        type="file"
                                        name="youtube_url"
                                        onChange={OnMeterilChange}
                                        accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                      />
                                      {meterialuploadbar > 1 ? (
                                        <div className="d-flex justify-content-end mt-2 mr-2">
                                          <CTooltip content="Cancel uploading">
                                            <CButton
                                              onClick={MaterialRequestCancle}
                                              color="primary"
                                              variant="outline"
                                            >
                                              X
                                            </CButton>
                                          </CTooltip>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      <p className="error_message animate__animated animate__headShake">
                                        {materialError}
                                      </p>
                                      <p className="videouplpad">
                                        {meterialuploadbar
                                          ? `File is uploading ${meterialuploadbar} %`
                                          : ""}
                                      </p>
                                      {materialArray.map((cv, i) => {
                                        return (
                                          <div className="d-flex" key={i}>
                                            <p className="p-2 w-100 bg-light">
                                              {i + 1}
                                              {"."} {cv.slice(57)}
                                            </p>{" "}
                                            <CButton
                                              color="danger"
                                              onClick={() =>
                                                deletemeterial(cv, i)
                                              }
                                              className="p-2 flex-shrink-2 bg-light mb-3 border-0"
                                              variant="outline"
                                              shape="square"
                                              size="sm"
                                            >
                                              {" "}
                                              <CIcon
                                                size={"sm"}
                                                name={"cilTrash"}
                                              />
                                            </CButton>
                                          </div>
                                        );
                                      })}
                                    </CFormGroup>
                                  </>
                                ) : (
                                  <UserUploadFile />
                                )}

                                {lessonvideomp4.mp4_url && (
                                  <>
                                    <video
                                      id="video_player"
                                      controls={true}
                                      width="100%"
                                      onLoadedMetadata={(e) => {
                                        setMetadata({
                                          duration: e.target.duration,
                                        });
                                      }}
                                    >
                                      <source
                                        src={lessonvideomp4.mp4_url}
                                        type="video/mp4"
                                      />
                                    </video>{" "}
                                    <CFormGroup>
                                      <CLabel>Duration</CLabel>
                                      <CInput
                                        type="text"
                                        value={
                                          metadata.duration
                                            ? new Date(metadata.duration * 1000)
                                                .toISOString()
                                                .substr(11, 8)
                                            : "00:00:00"
                                        }
                                        name="duration_for_mobile_application"
                                        placeholder="Enter duration.."
                                        innerRef={register({ required: true })}
                                        className="without_ampm"
                                      />
                                      {errors.duration_for_mobile_application &&
                                        errors.duration_for_mobile_application
                                          .type === "required" && (
                                          <p className="errorMsg animate__animated animate__headShake">
                                            Duration is required.
                                          </p>
                                        )}
                                    </CFormGroup>
                                  </>
                                )}
                                {/* <iframe src="https://player.vimeo.com/video/23374724" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
<p><a href="https://vimeo.com/23374724">Primary 1 - Never Know</a> from <a href="https://vimeo.com/timandjoe">Tim &amp; Joe</a> on <a href="https://vimeo.com">Vimeo</a>.</p>            */}

                                {videoVideocheck && (
                                  <>
                                    <iframe
                                      src={vimeovideo.vimeo_url}
                                      width="420"
                                      height="360"
                                      frameborder="0"
                                      allow="autoplay; fullscreen; picture-in-picture"
                                      allowfullscreen
                                    ></iframe>{" "}
                                    <CFormGroup>
                                      <CLabel>Duration</CLabel>
                                      <CInput
                                        type="text"
                                        value={
                                          vimeovideo.vimeo_url
                                            ? new Date(
                                                videoduration.duration * 1000
                                              )
                                                .toISOString()
                                                .substr(11, 8)
                                            : "00:00:00"
                                        }
                                        name="duration_for_mobile_application"
                                        placeholder="Enter duration.."
                                        innerRef={register({ required: true })}
                                        className="without_ampm"
                                      />
                                      {errors.duration_for_mobile_application &&
                                        errors.duration_for_mobile_application
                                          .type === "required" && (
                                          <p className="errorMsg animate__animated animate__headShake">
                                            Duration is required.
                                          </p>
                                        )}
                                    </CFormGroup>
                                  </>
                                )}
                                {youtuveUrl.youtube_url && (
                                  <>
                                    <iframe
                                      src={youtuveUrl.youtube_url}
                                      width="420"
                                      height="360"
                                      frameborder="0"
                                      allow="autoplay; fullscreen; picture-in-picture"
                                      allowfullscreen
                                    ></iframe>{" "}
                                    <CFormGroup>
                                      <CLabel>Duration</CLabel>
                                      <CInput
                                        type="text"
                                        name="duration_for_mobile_application"
                                        placeholder="00:00:00"
                                        innerRef={register({ required: true })}
                                        className="without_ampm"
                                      />
                                      {errors.duration_for_mobile_application &&
                                        errors.duration_for_mobile_application
                                          .type === "required" && (
                                          <p className="errorMsg animate__animated animate__headShake">
                                            Duration is required.
                                          </p>
                                        )}
                                    </CFormGroup>
                                  </>
                                )}
                                <CFormGroup>
                                  <CLabel>Summary</CLabel>
                                  <CTextarea
                                    name="summary"
                                    id="textarea-input"
                                    rows="9"
                                    placeholder="Summary..."
                                    innerRef={register({ required: true })}
                                  />
                                  {errors.summary &&
                                    errors.summary.type === "required" && (
                                      <p className="errorMsg animate__animated animate__headShake">
                                        Summary is required.
                                      </p>
                                    )}
                                </CFormGroup>

                                <CButton
                                  color="primary"
                                  onClick={handleSubmit(onSubmit)}
                                >
                                  Submit
                                </CButton>
                              </CForm>
                            </CCol>
                          </CRow>
                        </CContainer>
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={LessonModalToggle}>
                          close
                        </CButton>
                      </CModalFooter>
                    </CModal>
                    <CModal show={SectionModal}>
                      <CModalHeader closeButton>Section Add</CModalHeader>
                      <CModalBody>
                        <CContainer fluid>
                          <CRow>
                            <CCol sm="12">
                              <CForm action="" method="post">
                                <CFormGroup>
                                  <CLabel>Title</CLabel>
                                  <CInput
                                    type="text"
                                    name="title"
                                    placeholder="Enter Title.."
                                    value={SectionTitle.title}
                                    onChange={change}
                                  />
                                  <p className="errorMsg animate__animated animate__headShake">
                                    {" "}
                                    {sectionerror}
                                  </p>
                                </CFormGroup>
                                <CButton
                                  color="primary"
                                  onClick={SubmitSection}
                                >
                                  Submit
                                </CButton>
                              </CForm>
                            </CCol>
                          </CRow>
                        </CContainer>
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={SectionModalToggle}>
                          close
                        </CButton>
                      </CModalFooter>
                    </CModal>
                  </CRow>
                </CTabPane>
              </CTabContent>
              <CTabContent>
                <CTabPane data-tab="basic">
                  <CForm encType="multipart/form-data">
                    <CFormGroup>
                      <CLabel htmlFor="nf-email" className="required">
                        Course Title{" "}
                      </CLabel>
                      <CInput
                        type="text"
                        id="nf-email"
                        name="title"
                        value={CorurseAdd.title}
                        onChange={change}
                        placeholder="Enter Course Title.."
                        autoComplete="email"
                      />

                      <p className="error_message animate__animated animate__headShake">
                        {course_error.title_Error}
                      </p>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="textarea-input" className="required">
                        Course Description
                      </CLabel>
                      <CKEditor
                        name="description"
                        value={CorurseAdd.description}
                        required
                        type="text"
                        editor={ClassicEditor}
                        data={
                          CorurseAdd.description ? CorurseAdd.description : ""
                        }
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();

                          SetCourseAdd((prev) => {
                            return {
                              ...prev,
                              description: data,
                            };
                          });
                        }}
                      />

                      <p className="error_message animate__animated animate__headShake">
                        {course_error.description_Error}
                      </p>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="select" className="required">
                        Category
                      </CLabel>
                      <CSelect
                        custom
                        id="select nf-password"
                        value={CorurseAdd.id_category}
                        name="id_category"
                        onChange={change}
                      >
                        <option value="">Please select</option>
                        {Categoryops.map((cv, id) => {
                          return (
                            <option value={cv.id} key={id}>
                              {cv.name}
                            </option>
                          );
                        })}
                      </CSelect>
                      <p className="error_message animate__animated animate__headShake">
                        {course_error.id_category_Error}
                      </p>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="select">Topic</CLabel>
                      <CSelect
                        custom
                        name="id_topic"
                        id="select nf-password"
                        value={CorurseAdd.id_topic}
                        onChange={change}
                      >
                        <option value="">Please select</option>
                        {TopicOption.map((cv, id) => {
                          return (
                            <option value={cv.id} key={id}>
                              {cv.name}
                            </option>
                          );
                        })}
                      </CSelect>
                      <p className="error_message animate__animated animate__headShake">
                        {course_error.id_topic_Error}
                      </p>
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel htmlFor="select">Level</CLabel>
                      <CSelect
                        custom
                        name="id_level"
                        id="select nf-password"
                        value={CorurseAdd.id_level}
                        onChange={change}
                      >
                        <option value="">Please select</option>
                        {Levelops.map((cv, id) => {
                          return (
                            <option value={cv.id} key={id}>
                              {cv.name}
                            </option>
                          );
                        })}
                      </CSelect>
                      <p className="error_message animate__animated animate__headShake">
                        {course_error.id_level_Error}
                      </p>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="select">Price</CLabel>
                      <CSelect
                        custom
                        name="id_price"
                        id="select nf-password"
                        value={CorurseAdd.id_price}
                        onChange={change}
                      >
                        <option value="">Please select</option>
                        {PriceOption.map((cv, id) => {
                          return (
                            <option value={cv.id} key={id}>
                              {cv.name}
                            </option>
                          );
                        })}
                      </CSelect>
                      <p className="error_message animate__animated animate__headShake">
                        {course_error.id_price_Error}
                      </p>
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel htmlFor="select">Language made in</CLabel>
                      <CSelect
                        custom
                        name="id_language"
                        id="select nf-password"
                        value={CorurseAdd.id_language}
                        onChange={change}
                      >
                        <option value="">Please select</option>
                        {Language.map((cv, id) => {
                          return (
                            <option value={cv.id} key={id}>
                              {cv.name}
                            </option>
                          );
                        })}
                      </CSelect>
                      <p className="error_message animate__animated animate__headShake">
                        {course_error.id_language_Error}
                      </p>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="select">Duration</CLabel>
                      <CSelect
                        custom
                        name="id_duration"
                        id="select nf-password"
                        value={CorurseAdd.id_duration}
                        onChange={change}
                      >
                        <option value="">Please select</option>
                        {Duration.map((cv, id) => {
                          return (
                            <option value={cv.id} key={id}>
                              {cv.name}
                            </option>
                          );
                        })}
                      </CSelect>
                      <p className="error_message animate__animated animate__headShake">
                        {course_error.id_duration_Error}
                      </p>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="select">Features</CLabel>
                      <CSelect
                        custom
                        name="id_features"
                        id="select nf-password"
                        value={CorurseAdd.id_features}
                        onChange={change}
                      >
                        <option value="">Please select</option>
                        {Fetures.map((cv, id) => {
                          return (
                            <option value={cv.id} key={id}>
                              {cv.name}
                            </option>
                          );
                        })}
                      </CSelect>
                      <p className="error_message animate__animated animate__headShake">
                        {course_error.id_features_Error}
                      </p>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="select">Subtitle</CLabel>
                      <CSelect
                        custom
                        name="id_subtitles"
                        id="select nf-password"
                        value={CorurseAdd.id_subtitles}
                        onChange={change}
                      >
                        <option value="">Please select</option>
                        {Subtitle.map((cv, id) => {
                          return (
                            <option value={cv.id} key={id}>
                              {cv.name}
                            </option>
                          );
                        })}
                      </CSelect>
                      <p className="error_message animate__animated animate__headShake">
                        {course_error.id_subtitles_Error}
                      </p>
                    </CFormGroup>
                    <CNav variant="tabs">
                      <CNavItem>
                        <CButton
                          onClick={() => nextRequirements()}
                          className="btn btn-primary"
                        >
                          next
                        </CButton>
                      </CNavItem>
                    </CNav>
                  </CForm>
                </CTabPane>

                <CTabPane data-tab="requirements">
                  <br />
                  <CFormGroup row className="d-flex justify-content-center">
                    {/*onclick add input  */}

                    {RequirementsInput.map((x, i) => {
                      return (
                        <>
                          <CCol xs="6">
                            <CInput
                              name="requirements"
                              type="text"
                              placeholder="Enter Requirements"
                              value={
                                onrequirement
                                  ? CorurseAdd.requirements
                                  : x.requirements
                              }
                              style={{ marginBottom: "10px" }}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </CCol>
                          <CCol md="2">
                            {RequirementsInput.length !== 1 && (
                              <CButton
                                color="danger"
                                style={{ marginRight: "10px" }}
                                onClick={() => handleRemoveClick(i)}
                              >
                                <span
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "bolder",
                                  }}
                                >
                                  -
                                </span>
                              </CButton>
                            )}
                            {RequirementsInput.length - 1 === i && (
                              <CButton onClick={handleAddClick} color="success">
                                <span
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "bolder",
                                  }}
                                >
                                  +
                                </span>
                              </CButton>
                            )}
                          </CCol>
                        </>
                      );
                    })}
                    <p className="error_message animate__animated animate__headShake">
                      {course_error.Requirements_Error}
                    </p>
                  </CFormGroup>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink
                        data-tab="basic"
                        className="btn btn-primary"
                        style={{ marginRight: "10px" }}
                      >
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
                <CTabPane data-tab="outcomes">
                  <br />
                  <CFormGroup row className="d-flex justify-content-center">
                    {/*onclick add input  */}
                    {OutcomesInput.map((x, i) => {
                      return (
                        <>
                          <CCol xs="6">
                            <CInput
                              name="outcomes"
                              type="text"
                              placeholder="Enter Outcomes"
                              value={
                                onoucomes
                                  ? CorurseAdd.requirements
                                  : x.requirements
                              }
                              style={{ marginBottom: "10px" }}
                              onChange={(e) => handleOutcomeInputChange(e, i)}
                            />
                          </CCol>
                          <CCol md="2">
                            {OutcomesInput.length !== 1 && (
                              <CButton
                                color="danger"
                                style={{ marginRight: "10px" }}
                                onClick={() => handleOutcomeRemoveClick(i)}
                              >
                                <span
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "bolder",
                                  }}
                                >
                                  -
                                </span>
                              </CButton>
                            )}
                            {OutcomesInput.length - 1 === i && (
                              <CButton
                                onClick={handleAddOutcomeClick}
                                color="success"
                              >
                                <span
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "bolder",
                                  }}
                                >
                                  +
                                </span>
                              </CButton>
                            )}
                          </CCol>
                        </>
                      );
                    })}
                    <p className="error_message animate__animated animate__headShake">
                      {course_error.outcomes_Error}
                    </p>
                  </CFormGroup>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink
                        data-tab="requirements"
                        className="btn btn-primary"
                        style={{ marginRight: "10px" }}
                      >
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
                    <CLabel htmlFor="nf-email">Price</CLabel>
                    <CInput
                      type="number"
                      id="nf-email"
                      name="price"
                      placeholder="Enter Price.."
                      autoComplete="email"
                      value={CorurseAdd.price}
                      onChange={change}
                    />
                    <CFormText className="help-block"></CFormText>
                    <p className="error_message animate__animated animate__headShake">
                      {course_error.price_Error}
                    </p>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="nf-email">Discounted price</CLabel>
                    <CInput
                      type="number"
                      id="nf-email"
                      name="discounted_price"
                      placeholder="Enter Discounted price.."
                      autoComplete="email"
                      value={CorurseAdd.discounted_price}
                      onChange={change}
                    />
                    <CFormText className="help-block"></CFormText>
                    <p className="error_message animate__animated animate__headShake">
                      {course_error.discounted_price_Error}
                    </p>
                  </CFormGroup>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink
                        data-tab="outcomes"
                        className="btn btn-primary"
                        style={{ marginRight: "10px" }}
                      >
                        Previous
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CButton
                        onClick={() => nextMedia()}
                        className="btn btn-primary"
                      >
                        next
                      </CButton>
                    </CNavItem>
                  </CNav>
                </CTabPane>
                <CTabPane data-tab="media">
                  <CFormGroup>
                    <CLabel htmlFor="select">Course overview provider</CLabel>
                    <CSelect
                      name="section"
                      id="select nf-password"
                      value={CorurseAdd.section}
                      onChange={change}
                    >
                      <option value="0">Please select</option>
                      <option value="Youtube">Youtube</option>
                      <option value="Vimeo">Vimeo</option>
                      <option value="Html5">Html5</option>
                    </CSelect>
                    <p className="error_message animate__animated animate__headShake">
                      {course_error.section}
                    </p>
                  </CFormGroup>

                  {CorurseAdd.section === "Html5" ? (
                    <CFormGroup>
                      <CLabel htmlFor="nf-email" className="required">
                        Course video
                      </CLabel>
                      <CInput
                        type="file"
                        id="nf-email"
                        name="course_video"
                        placeholder="Enter video URL"
                        onChange={videoUpload}
                        accept="video/*"
                      />
                      <CFormText className="help-block"></CFormText>
                      <div className="d-flex justify-content-end mt-2 mr-2">
                        {courseUpload > 1 ? (
                          <CTooltip content="Cancel uploading">
                            <CButton
                              onClick={CancleFileUpladReaquest}
                              color="primary"
                              variant="outline"
                            >
                              X
                            </CButton>
                          </CTooltip>
                        ) : (
                          ""
                        )}
                        {uploadcomplate ? (
                          <CTooltip content="Remove uploaded video">
                            <CButton
                              color="danger"
                              variant="outline"
                              s
                              onClick={() => removeUpload(videoPreview)}
                            >
                              <CIcon size={"sm"} name={"cilTrash"} />{" "}
                            </CButton>
                          </CTooltip>
                        ) : (
                          ""
                        )}
                      </div>
                      <p className="error_message animate__animated animate__headShake">
                        {videoError}
                      </p>
                      <p className="videouplpad animate__animated animate__headShake">
                        {courseUpload
                          ? `video is uploading ${courseUpload} %`
                          : ""}
                      </p>
                      <p className="error_message animate__animated animate__headShake">
                        {course_error.video_url_Error}
                      </p>
                      {oldCourseData.video_url ? (
                        <div className="d-flex mt-2">
                          <p className="p-2 w-100 bg-light">
                            <a href={oldCourseData.video_url} target="_blank">
                              {oldCourseData.video_url.slice(57)}
                            </a>
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      {videoPreview ? (
                        <video controls={true} width="100%">
                          <source src={videoPreview} type="video/mp4" />
                        </video>
                      ) : (
                        ""
                      )}
                    </CFormGroup>
                  ) : (
                    <CFormGroup>
                      <CLabel htmlFor="nf-email" className="required">
                        Course video
                      </CLabel>
                      <CInput
                        type="url"
                        id="nf-email"
                        onChange={onchangeurl}
                        placeholder="Enter video URL"
                        name="video_url"
                        value={youtubeUrl}
                      />
                      <CFormText className="help-block"></CFormText>
                      <p className="error_message animate__animated animate__headShake">
                        {videoError}
                      </p>
                      <p className="error_message animate__animated animate__headShake">
                        {course_error.video_url_Error}
                      </p>
                      {youtubeUrl ? (
                        <iframe
                          src={youtubeUrl}
                          width="100%"
                          height="300"
                          frameborder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      ) : (
                        ""
                      )}
                    </CFormGroup>
                  )}

                  <CFormGroup>
                    <CLabel htmlFor="nf-email">Thumbnail</CLabel>
                    <CInput
                      type="file"
                      id="nf-email"
                      name="demo_image"
                      placeholder="Enter URL.."
                      value={CorurseAdd.demo_image}
                      onChange={changeimage}
                      accept="image/*"
                    />
                    <CFormText className="help-block">
                      <img
                        src={preview ? preview : oldCourseData.thumbnail}
                        width="100px"
                        height="100px"
                      />
                    </CFormText>
                    <p className="error_message animate__animated animate__headShake">
                      {course_error.demo_image}
                    </p>
                  </CFormGroup>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink
                        data-tab="pricing"
                        className="btn btn-primary"
                        style={{ marginRight: "10px" }}
                      >
                        Previous
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CButton
                        onClick={() => nextSeo()}
                        className="btn btn-primary"
                      >
                        next
                      </CButton>
                    </CNavItem>
                  </CNav>
                </CTabPane>
                <CTabPane data-tab="seo">
                  <CFormGroup>
                    <CLabel htmlFor="nf-email">Meta keywords</CLabel>
                    <CInput
                      type="text"
                      id="nf-email"
                      name="meta_keywords"
                      placeholder="Enter Meta keywords.."
                      autoComplete="email"
                      value={CorurseAdd.meta_keywords}
                      onChange={change}
                    />
                    <CFormText className="help-block"></CFormText>
                    <p className="error_message animate__animated animate__headShake">
                      {course_error.meta_keywords_Error}
                    </p>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="textarea-input">Meta description</CLabel>
                    <CTextarea
                      onChange={change}
                      name="meta_description"
                      id="textarea-input"
                      type="text"
                      rows="9"
                      placeholder="Meta description..."
                      value={CorurseAdd.meta_description}
                    />
                    <p className="error_message animate__animated animate__headShake">
                      {course_error.meta_description_Error}
                    </p>
                    <br />
                    <CNav variant="tabs">
                      <CNavItem>
                        <CNavLink
                          data-tab="media"
                          className="btn btn-primary"
                          style={{ marginRight: "10px" }}
                        >
                          Previous
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CButton
                          onClick={() => nextFinish()}
                          className="btn btn-primary"
                        >
                          next
                        </CButton>
                      </CNavItem>
                    </CNav>
                  </CFormGroup>
                </CTabPane>
                <CTabPane data-tab="finish">
                  {CorurseAdd.is_admin === "1" ? (
                    <>
                      <CFormGroup>
                        <CLabel htmlFor="select">
                          Course assign to instructor
                        </CLabel>
                        <CSelect
                          custom
                          name="instructer_id"
                          id="select nf-password"
                          value={
                            instrucorID.instructer_id
                              ? instrucorID.instructer_id
                              : CorurseAdd.id_user
                          }
                          onChange={OnInstructorChange}
                        >
                          <option>Please select</option>
                          {Instructor.map((cv, i) => {
                            return (
                              <option value={cv.id} key={i}>
                                {cv.first_name} {cv.last_name}
                              </option>
                            );
                          })}
                        </CSelect>
                      </CFormGroup>{" "}
                    </>
                  ) : (
                    <></>
                  )}

                  <CFormGroup>
                    <CLabel htmlFor="select">Status</CLabel>
                    <CSelect
                      custom
                      name="status"
                      id="select nf-password"
                      value={CorurseAdd.status}
                      onChange={change}
                    >
                      <option>Please select</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </CSelect>
                  </CFormGroup>
                  {`${lorem}`}
                  <CCardFooter className="d-flex justify-content-around">
                    <CButton
                      type="submit"
                      size="sm"
                      color="primary"
                      onClick={CourseAddSubmit}
                    >
                      <CIcon name="cil-scrubber" /> Submit
                    </CButton>{" "}
                    <CButton
                      type="reset"
                      size="sm"
                      color="danger"
                      onClick={Resetdata}
                    >
                      <CIcon name="cil-ban" /> Reset
                    </CButton>
                  </CCardFooter>
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
};

export default Charts;
