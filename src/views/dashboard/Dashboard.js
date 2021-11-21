import React, { lazy } from 'react'

const WidgetsDropdown = lazy(() => import('./WidgetsDropdown.js'))
//const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown />



    </>
  )
}

export default Dashboard
