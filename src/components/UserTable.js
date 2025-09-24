import React from 'react';
import './UserTable.css';


const UserTable = ({
  users, loading, onEdit, onDelete, onAdd, searchTerm, onSearchChange,
  currentPage, itemsPerPage, onPageChange, onItemsPerPageChange,
  sortField, sortDirection, onSort
}) => {
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      onDelete(user.id);
    }
  };

  const handleSort = (field) => onSort(field);

  return (
    <div className="user-table-container">
      <div className="table-header">
        <input
          type="text"
          placeholder="Search by name, email..."
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
        />
        <button onClick={onAdd}>Add User</button>
      </div>

      {loading ? <p>Loading...</p> :
        <table>
          <thead>
            <tr>
              <th onClick={()=>handleSort('id')}>ID {sortField==='id' ? (sortDirection==='asc'?'↑':'↓') : ''}</th>
              <th onClick={()=>handleSort('name')}>Name {sortField==='name' ? (sortDirection==='asc'?'↑':'↓') : ''}</th>
              <th onClick={()=>handleSort('email')}>Email {sortField==='email' ? (sortDirection==='asc'?'↑':'↓') : ''}</th>
              <th onClick={()=>handleSort('username')}>Username {sortField==='username' ? (sortDirection==='asc'?'↑':'↓') : ''}</th>
              <th onClick={()=>handleSort('company')}>Company {sortField==='company' ? (sortDirection==='asc'?'↑':'↓') : ''}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.company?.name}</td>
                <td>
                  <button onClick={()=>onEdit(user)}>Edit</button>
                  <button onClick={()=>handleDelete(user)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }

      <div className="pagination">
        <button disabled={currentPage===1} onClick={()=>onPageChange(currentPage-1)}>Prev</button>
        <span>{currentPage}/{totalPages}</span>
        <button disabled={currentPage===totalPages} onClick={()=>onPageChange(currentPage+1)}>Next</button>
        <select value={itemsPerPage} onChange={e=>onItemsPerPageChange(Number(e.target.value))}>
          {[5,10,20].map(n=><option key={n} value={n}>{n}</option>)}
        </select>
      </div>
    </div>
  );
};

export default UserTable;
