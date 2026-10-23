import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../common/Sidebar';
import { Header } from '../common/Header';
import { ToastContainer } from '../common/ToastContainer';
import { ProductDetailDrawer } from '../common/ProductDetailDrawer';

export const WorkspaceLayout: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#F8F8F4'
    }}>
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        overflowX: 'hidden'
      }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>

      {/* Persistent Components */}
      <ToastContainer />
      <ProductDetailDrawer />
    </div>
  );
};
