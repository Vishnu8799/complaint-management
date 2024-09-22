import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPanel from './Components/AdminPanel';
import StudentPanel from './Components/StudentPanel';
import Login from './Components/Login';

// Create context to share complaints across components
export const ComplaintContext = createContext();

function App() {
    const [user, setUser] = useState(null); // To hold the logged-in user
    const [complaints, setComplaints] = useState([]); // Centralized complaint state

    const handleLogout = () => {
        setUser(null); // Clear user data on logout
    };  

    return (
      <div style={{width:'100%',height:'100vh'}}>
        <ComplaintContext.Provider value={{ complaints, setComplaints }}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login setUser={setUser} />} />
                    <Route 
                        path="/admin" 
                        element={user?.role === 'admin' ? <AdminPanel onLogout={handleLogout} /> : <Navigate to="/" />} 
                    />
                    <Route 
                        path="/student" 
                        element={user?.role === 'student' ? <StudentPanel onLogout={handleLogout} /> : <Navigate to="/" />} 
                    />
                </Routes>
            </Router>
        </ComplaintContext.Provider>
         </div>
    );
}

export default App;
