import React from 'react';
//module Components
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const User = React.lazy(() => import('./views/user/Users'));
const Level = React.lazy(()=> import("./views/level/Level"));
const Topic =React.lazy(()=> import("./views/topic/Topic"));
const Price =React.lazy(()=> import("./views/price/Price"));
const Language =React.lazy(()=> import("./views/language/Language"));
const Duration =React.lazy(()=> import("./views/duration/Duration"));
const Features =React.lazy(()=> import("./views/features/Features"));
const Subtitles =React.lazy(()=> import("./views/subtitles/Subtitles"));
const Category = React.lazy(()=> import("./views/categories/Category"));
const CategoryEdit = React.lazy(()=> import("./views/categories/CategoryEdit"));
const Instructor=React.lazy(()=> import("./views/Instructor/Instructor"))
const InstructorAdd = React.lazy(() => import('./views/Instructor/InstructorAdd'));
const InstructorEdit=React.lazy(()=> import("./views/Instructor/InstructorEdit"))
const Groups=React.lazy(()=> import("./views/UserGroups/UserGruops"))
const GroupsAdd=React.lazy(()=> import("./views/UserGroups/AddUserGruopsModal"))
const UserGroupEdit=React.lazy(()=> import("./views/UserGroups/UserGroupEdit"))
const Customer=React.lazy(()=> import("./views/Customer/Customer"))
const CustomerEdit=React.lazy(()=> import("./views/Customer/CustomerEdit"))
const CustomerAdd=React.lazy(()=> import("./views/Customer/CustomerAdd"))
const AddCategory=React.lazy(()=> import("./views/categories/AddCategory"))
const CourseListing=React.lazy(()=> import("./views/charts/CourseListing"))
const CourseEdit=React.lazy(()=> import("./views/charts/CourseEdit"))
const Pages=React.lazy(()=> import("./views/CMS/pages/Pages"))
const AddPages=React.lazy(()=> import("./views/CMS/pages/AddPages"))
const EditPages=React.lazy(()=> import("./views/CMS/pages/EditPages"))
const Menu=React.lazy(()=> import("./views/CMS/menu/Menu"))
const AddMenu=React.lazy(()=> import("./views/CMS/menu/AddMenu"))
const EditMenu=React.lazy(()=> import("./views/CMS/menu/EditMenu"))
const MenuItems=React.lazy(()=> import("./views/CMS/menuItems/MenuItems"))
const AddMenuItems=React.lazy(()=> import("./views/CMS/menuItems/AddMenuItems"))
const EditMenuItems=React.lazy(()=> import("./views/CMS/menuItems/EditMenuItems"))
const Coupones=React.lazy(()=> import("./views/CMS/coupones/Coupones"))
const AddCouponse=React.lazy(()=> import("./views/CMS/coupones/AddCouponse"))
const EditCoupones=React.lazy(()=> import("./views/CMS/coupones/EditCoupones"))
const Support=React.lazy(()=> import("./views/CMS/support/Support"))
const AddSupport=React.lazy(()=> import("./views/CMS/support/AddSupport"))
const EditSupport=React.lazy(()=> import("./views/CMS/support/EditSupport"))
const Admin=React.lazy(()=> import("./views/Admin/Admin"))
const AddAdmin=React.lazy(()=> import("./views/Admin/AddAdmin"))
const EditAdmin=React.lazy(()=> import("./views/Admin/EditAdmin"))
const Login=React.lazy(()=> import("./views/pages/login/Login"))
const Profile=React.lazy(()=> import("./views/profile/Profile"))
const Company=React.lazy(()=> import("./views/company/Company"))
const CompanyAdd=React.lazy(()=> import("./views/company/CompanyAdd"))
const CompanyEdit=React.lazy(()=> import("./views/company/CompanyEdit"))
const Order=React.lazy(()=> import("./views/orders/Order"))
const OrderDatails=React.lazy(()=> import("./views/orders/OrderDatails"))
const InstructorSetting=React.lazy(()=> import("./views/Instructor/InstructorSetting"))
const InstructorPayout=React.lazy(()=> import("./views/Instructor/InstructorPayout"))
const SystemSetting=React.lazy(()=> import("./views/settings/SystemSetting"))
const WebsiteSetting=React.lazy(()=> import("./views/settings/WebsiteSetting"))
const SmtpSettings=React.lazy(()=> import("./views/settings/smtp"))
const PaymentSetting=React.lazy(()=> import("./views/settings/PaymentSetting"))
//Modulse routes
const routes = [
  { path: '/', exact: true, name: 'Home'},
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/course-add', name: 'Charts', component: Charts },
  { path: '/user', exact: true,  name: 'User', component: User },
  { path: '/level', exact: true,  name: 'Level', component: Level },
  { path: '/category', exact: true,  name: 'Category', component: Category },
  { path: '/topic', exact: true,  name: 'Topic', component: Topic },
  { path: '/level', exact: true,  name: 'Level', component: Level },
  { path: '/price', exact: true,  name: 'Price', component: Price },
  { path: '/language', exact: true,  name: 'Language', component: Language },
  { path: '/duration', exact: true,  name: 'Duration', component: Duration },
  { path: '/features', exact: true,  name: 'Features', component: Features },
  { path: '/subtitles', exact: true,  name: 'Subtitles', component: Subtitles },
  { path: '/user/instructor', exact: true,  name: 'Instructor', component: Instructor },
  { path: '/instructoradd', exact: true,  name: 'InstructorAdd', component: InstructorAdd },
  { path: '/user/groups', exact: true,  name: 'Groups', component: Groups },
  { path: '/user/customer', exact: true,  name: 'Customer', component: Customer },
  { path: '/user/customeredit/:id', exact: true,  name: 'CustomerEdit', component: CustomerEdit },
  { path: '/user/customeradd', exact: true,  name: 'CustomerAdd', component: CustomerAdd },
  { path: '/instructoredit/:id', exact: true,  name: 'InstructorEdit', component: InstructorEdit },

  { path: '/categories/categoriesadd', exact: true,  name: 'AddCategory', component: AddCategory },
  { path: '/courselisting', exact: true,  name: 'CourseListing', component: CourseListing },
  { path: '/course-edit/:id', exact: true,  name: 'CourseEdit', component: CourseEdit },
  { path: '/category-edit/:id', exact: true,  name: 'CategoryEdit', component: CategoryEdit },
  { path: '/user/group-add', exact: true,  name: 'GroupsAdd', component: GroupsAdd },
  { path: "/user/group-edit/:id", exact: true,  name: 'UserGroupEdit', component: UserGroupEdit },
  { path: "/cms/pages", exact: true,  name: 'Pages', component: Pages },
  { path: "/cms/menu", exact: true,  name: 'Menu', component: Menu },
  { path: "/cms/add-pages", exact: true,  name: 'AddPages', component: AddPages },
  { path: "/cms/pages-edit/:id", exact: true,  name: 'EditPages', component: EditPages },
  { path: "/cms/menu", exact: true,  name: 'Menu', component: Menu },
  { path: "/cms/add-menu", exact: true,  name: 'AddMenu', component: AddMenu },
  { path: "/cms/menu-edit/:id", exact: true,  name: 'EditMenu', component: EditMenu },
  { path: "/cms/menu-items", exact: true,  name: 'MenuItems', component: MenuItems },
  { path: "/cms/add-menuitems", exact: true,  name: 'AddMenuItems', component: AddMenuItems },
  { path: "/cms/menuitems-edit/:id", exact: true,  name: 'EditMenuItems', component: EditMenuItems },
  { path: "/cms/coupones", exact: true,  name: 'Coupones', component: Coupones },
  { path: "/cms/add-couponse", exact: true,  name: 'AddCouponse', component: AddCouponse },
  { path: "/cms/coupones-edit/:id", exact: true,  name: 'AddCouponse', component: EditCoupones },
  { path: "/cms/support", exact: true,  name: 'Support', component: Support },
  { path: "/cms/add-support", exact: true,  name: 'AddSupport', component: AddSupport },
  { path: "/cms/support-edit/:id", exact: true,  name: 'EditSupport', component: EditSupport },
  { path: "/admin", exact: true,  name: 'Admin', component: Admin },
  { path: "/add-admin", exact: true,  name: 'AddAdmin', component: AddAdmin },
  { path: "/edit-admin/:id", exact: true,  name: 'EditAdmin', component: EditAdmin },
  { path: "/profile", exact: true,  name: 'Profile', component: Profile },
  { path: "/company", exact: true,  name: 'Company', component: Company },
  { path: "/company/company-add", exact: true,  name: 'CompanyAdd', component: CompanyAdd },
  { path: "/company/company-edit/:id", exact: true,  name: 'CompanyEdit', component: CompanyEdit },
  { path: "/orders/order", exact: true,  name: 'Order', component: Order },
  { path: "/orders/orderdetails/:id", exact: true,  name: 'OrderDatails', component: OrderDatails },
  { path: "/user/instructor/setting", exact: true,  name: 'InstructorSetting', component: InstructorSetting },
  { path: "/user/instructor/payout", exact: true,  name: 'InstructorPayout', component: InstructorPayout },
  { path: "/settings/system-settings", exact: true,  name: 'SystemSetting', component: SystemSetting },
  { path: "/settings/website-settings", exact: true,  name: 'WebsiteSetting', component: WebsiteSetting },
  { path: "/settings/smtp-settings", exact: true,  name: 'SmtpSettings', component: SmtpSettings },
  { path: "/settings/payment-settings", exact: true,  name: 'PaymentSetting', component: PaymentSetting },
];

export default routes;
