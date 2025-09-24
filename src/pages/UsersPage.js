import React, { useState, useEffect, useMemo } from 'react';
import { userAPI } from '../api/userAPI';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading,setLoading] = useState(true);
  const [userFormOpen,setUserFormOpen] = useState(false);
  const [editingUser,setEditingUser] = useState(null);
  const [searchTerm,setSearchTerm] = useState('');
  const [sortField,setSortField] = useState('name');
  const [sortDirection,setSortDirection] = useState('asc');
  const [currentPage,setCurrentPage] = useState(1);
  const [itemsPerPage,setItemsPerPage] = useState(10);

  useEffect(()=>{ fetchUsers(); }, []);

  const fetchUsers = async ()=>{
    setLoading(true);
    try{ const data = await userAPI.getUsers(); setUsers(data); }
    finally{ setLoading(false); }
  }

  const handleAddUser = ()=>{ setEditingUser(null); setUserFormOpen(true); }
  const handleEditUser = (user)=>{ setEditingUser(user); setUserFormOpen(true); }
  const handleDeleteUser = async (id)=>{ await userAPI.deleteUser(id); setUsers(prev=>prev.filter(u=>u.id!==id)); }
  const handleUserSubmit = async (data)=>{
    if(editingUser){
      const updated = await userAPI.updateUser(editingUser.id,data);
      setUsers(prev=>prev.map(u=>u.id===editingUser.id?updated:u));
    } else {
      const newUser = await userAPI.createUser({...data, id:Math.max(...users.map(u=>u.id),0)+1});
      setUsers(prev=>[...prev,newUser]);
    }
    setUserFormOpen(false); setEditingUser(null);
  }

  const handleSort = (field)=>{
    if(sortField===field) setSortDirection(prev=>prev==='asc'?'desc':'asc');
    else { setSortField(field); setSortDirection('asc'); }
    setCurrentPage(1);
  }

  const filteredAndSortedUsers = useMemo(()=>{
    let filtered = users.filter(u=>!searchTerm || u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || u.email?.toLowerCase().includes(searchTerm.toLowerCase()));
    filtered.sort((a,b)=>{
      const aVal = sortField==='id'?Number(a.id):sortField==='company'?a.company?.name?.toLowerCase()||'':a[sortField]?.toLowerCase()||'';
      const bVal = sortField==='id'?Number(b.id):sortField==='company'?b.company?.name?.toLowerCase()||'':b[sortField]?.toLowerCase()||'';
      if(sortField==='id') return sortDirection==='asc'?aVal-bVal:bVal-aVal;
      return sortDirection==='asc'? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
    return filtered;
  },[users,searchTerm,sortField,sortDirection]);

  return (
    <div className="users-page">
      <UserTable
        users={filteredAndSortedUsers}
        loading={loading}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onAdd={handleAddUser}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
      <UserForm
        isOpen={userFormOpen}
        onClose={()=>{ setUserFormOpen(false); setEditingUser(null); }}
        user={editingUser}
        onSubmit={handleUserSubmit}
        isEditing={!!editingUser}
      />
    </div>
  );
};

export default UsersPage;
