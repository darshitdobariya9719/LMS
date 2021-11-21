import React, { useEffect, useState } from "react"
import {
	CButton,
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CDataTable,
	CNav,
	CNavItem,
	CNavLink,
	CTabContent,
	CTabPane,
	CTabs,
	CSpinner,
} from '@coreui/react'

function InstructorPayourpage() {
	//instuctor complate payout table filed
	const Completepayout = [
		{ key: 'Instructor', _style: { width: '20%' } },
		{ key: 'Payment Amount', _style: { width: '20%' } },
		{ key: 'Payment type', _style: { width: '20%' } },
		{ key: 'Payment date', _style: { width: '20%' } },
		{ key: 'Action', _style: { width: '20%' } }
	]
	//instructor pending payour table field
	const PendingPayout = [
		{ key: 'Instructor', _style: { width: '20%' } },
		{ key: 'Payment Amount', _style: { width: '20%' } },
		{ key: 'Payment type', _style: { width: '20%' } },
		{ key: 'Payment date', _style: { width: '20%' } },
		{ key: 'option', _style: { width: '20%' } }
	]
	const spinner = <div className="d-flex justify-content-center align-items-center"><CSpinner color="primary" style={{ width: '5rem', height: '5rem' }} /></div>
	return (
		<CCol xs="12" md="12" className="mb-4">
			<CCard>
				<CCardHeader>
					Instructor payouts
          </CCardHeader>
				<CCardBody>
					<CTabs activeTab="Completed">
						<CNav variant="tabs">
							<CNavItem>
								<CNavLink data-tab="Completed">
									Completed payouts
			  </CNavLink>
							</CNavItem>
							<CNavItem>
								<CNavLink data-tab="Pending">
									Pending payouts
			  </CNavLink>
							</CNavItem>
						</CNav>
						<CTabContent>
							<CTabPane data-tab="Completed">
								<CDataTable
									items=""
									noItemsViewSlot={spinner}
									fields={Completepayout}
									tableFilter
									itemsPerPageSelect
									itemsPerPage={5}
									hover
									sorter
									pagination
									scopedSlots={{
										'Action':
											(item) => (
												<td>
													<CButton>Action</CButton>
												</td>
											),


									}}
								/>
							</CTabPane>
							<CTabPane data-tab="Pending">
								<CDataTable
									items=""
									noItemsViewSlot={spinner}
									fields={Completepayout}
									tableFilter
									itemsPerPageSelect
									itemsPerPage={5}
									hover
									sorter
									pagination
									scopedSlots={{
										'Action':
											(item) => (
												<td>
													<CButton>Action</CButton>
												</td>
											),


									}}
								/>
							</CTabPane>
						</CTabContent>
					</CTabs>
				</CCardBody>
			</CCard>
		</CCol>


	)

}


export default InstructorPayourpage;