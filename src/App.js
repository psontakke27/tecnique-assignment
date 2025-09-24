import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Routing */}
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { background: '#363636', color: '#fff' },
            success: { style: { background: '#10B981' } },
            error: { style: { background: '#EF4444' } },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
