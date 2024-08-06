import React, { useEffect, useState } from 'react';
import Siderbar from '../components/Siderbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from './Home';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="main-content">
        <Siderbar className="sidebar" />
        <div className="content">
          <Home />
        </div>
      </div>
      <Footer />
    </div>
  );
}


export default Dashboard;
