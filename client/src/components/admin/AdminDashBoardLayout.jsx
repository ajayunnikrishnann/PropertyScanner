import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import AdminDashBoard from './AdminDashBoard'
import Layout from './Layout'
import UserManagement from './UserManagement'
import BannerManagement from '../../pages/admin/BannerManagement'


function AdminDashBoardLayout() {
  return (
    <Layout>
        <Routes>
            <Route path='/' element={<Navigate to="/adminDashBoard/dashboard"/> }/>
            <Route path="dashboard" element={<AdminDashBoard/>}/>
            <Route path='usermanagement' element={<UserManagement />}/>
            <Route path='banner' element={<BannerManagement />}/>
        </Routes>
    </Layout>
  )
}

export default AdminDashBoardLayout