import React from 'react';
import RoleList from './RoleList';
import RoleForm from './RoleForm';

const Role = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <RoleList />
      
      </div>
    </div>
  );
};

export default Role;