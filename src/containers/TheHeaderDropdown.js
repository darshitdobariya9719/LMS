import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CButton,CModal,CModalHeader,CModalBody ,CModalFooter,
} from '@coreui/react'
import { useHistory } from "react-router-dom";
import CIcon from '@coreui/icons-react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const TheHeaderDropdown = () => {
  let histrory=useHistory()
  const Profile=()=>{
    histrory.push("/profile")
  }
  const LogOut=()=>{
    localStorage.removeItem("LMS_Token");
    localStorage.removeItem("profile_id");
    histrory.push("/login")
  }
  const ConfirmLogout=()=>{
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CModal
          show={true}
          centered={true}
          onClose={onClose}
        >
          <CModalHeader closeButton>Logout</CModalHeader>
          <CModalBody>
          Are you sure you want to Logout ?
          </CModalBody>
          <CModalFooter>
            <CButton color="primary"  onClick={() => {
                   LogOut();
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
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'https://www.seekpng.com/png/detail/72-729756_how-to-add-a-new-user-to-your.png'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">


        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem onClick={Profile}>
        <CIcon name="cil-user" className="mfe-2" />Edit Profile
        </CDropdownItem>
        <CDropdownItem onClick={Profile}>
          <CIcon name="cil-settings" className="mfe-2"  />
          Change Password
        </CDropdownItem>


        <CDropdownItem divider />
        <CDropdownItem onClick={ConfirmLogout}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
