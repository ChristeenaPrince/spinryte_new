import Login from 'mdi-material-ui/Login';
import Table from 'mdi-material-ui/Table';
import CubeOutline from 'mdi-material-ui/CubeOutline';
import HomeOutline from 'mdi-material-ui/HomeOutline';

import AccountCogOutline from 'mdi-material-ui/AccountCogOutline';
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline';
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline';
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline';
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended';

const navigation = () => {
  return [
    {
      sectionTitle: 'User Interface',
    },
    
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/',
    },
    {
      title: 'Admininstration',
      icon: GoogleCirclesExtended,
      children:[
        {
          title: 'Admin Hierarchy',
          icon: CubeOutline,
          path: '/admin-hierarchy',
        },
        {
         title: 'Administrator List',
         path: 'administrator-list',
         icon: CubeOutline,
       },
       {
         title: 'Create Administrator',
         path: 'create-administrator',
         icon: CubeOutline,
       },
      /* {
         title: 'Group List',
         path: 'group-list',
         icon: CubeOutline,
       },*/
       {
         title: 'Create Group',
         path: 'create-group',
         icon: CubeOutline,
       },
      ]
    },
     
    {
      title: 'Management List',
      icon: GoogleCirclesExtended,
      children:[
        /*{
          title: 'Employee Management',
          path: '/employee-management',
          icon: CubeOutline,
        },
        {
          title: 'Employer Management',
          path: '/employer-management',
          icon: CubeOutline,
        },
        {
          title: 'Agency Management',
          path: '/agency-management',
          icon: CubeOutline,
        },*/
        {
          title: 'Category Management',
          path: '/category-management',
          icon: CubeOutline,
        },
        {
          title: 'Product Management',
          path: '/product-management',
          icon: CubeOutline,
        },
        {
          title:'External Link Management',
          path:'/external-management',
          icon: CubeOutline,
        },
        {
          title:'Attribute Management',
          path:'/attribute-management',
          icon: CubeOutline,
        },
        {
          title:' New Attribute Management',
          path:'/new-attributelist',
          icon: CubeOutline,
        }
        /*{
          title: 'Finance Management',
          path: '/finance-management',
          icon: CreditCardOutline,
        },
        {
          title: 'Feedback Management',
          path: '/feedback-management',
          icon: CubeOutline,
        },
        {
          title: 'Package Management',
          path: '/package-management',
          icon: CubeOutline,
        },*/
      ]
    },
   /* {
      title: 'Templates',
      icon: GoogleCirclesExtended,
      children : [
         {
          title: 'Email',
          path: '/Email-templetes',
          icon: CubeOutline,
        },
        {
          title: 'Rusumi',
          path: '/Rusumi-templetes',
          icon: CubeOutline,
        },
        {
          title: 'Social Media',
          path: '/social-media',
          icon: CubeOutline,
        }
      ]
    },
    {
      title: 'Forum',
      icon: GoogleCirclesExtended,
      children : [
        {
         title: 'Posts',
         path: '/posts',
         icon: CubeOutline,
       },
       {
        title: 'Reported Comments',
        path: '/comments',
        icon: CubeOutline,
      },
      ]
    },
    {
      title: 'Home Page Customization',
      path: '/home-page-customization',
      icon: GoogleCirclesExtended,
    },
    {
      sectionTitle: 'Pages',
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings',
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true,
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true,
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true,
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    },
    {
      title: 'DashBoard',
      icon: GoogleCirclesExtended,
      path: '/dashboard',
    },*/
  ];
};

export default navigation;
   