import React from 'react'
import {
  CDropdown,
  CDropdownToggle,

} from '@coreui/react'


const TheHeaderDropdownMssg = () => {
  const itemsCount = 4
  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>

      </CDropdownToggle>

    </CDropdown>
  )
}

export default TheHeaderDropdownMssg