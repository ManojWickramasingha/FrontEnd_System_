import React from 'react';
import AdminSettings from '../../../components/SettingComponenets/adminsetting/AdminSetting';

const AdminSettingPage = () => {
    return (
        <div className="pageTemplate2">
          <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Settings</h1>
          <div className="settingpage">
            <AdminSettings />
          </div>
        </div>
    )
}

export default AdminSettingPage;