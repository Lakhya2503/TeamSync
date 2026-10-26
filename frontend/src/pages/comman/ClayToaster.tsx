import React from 'react'
import { Toaster } from 'react-hot-toast'

const clayToastStyle: React.CSSProperties = {
  background: '#e0e5ec',
  border: 'none',
  borderRadius: '1rem',
  padding: '14px 18px',
  fontWeight: 600,
  fontSize: '14px',
  boxShadow: '8px 8px 20px #b8bec7, -8px -8px 20px #ffffff',
}

const ClayToaster: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      gutter={12}
      toastOptions={{
        duration: 4000,
        style: {
          ...clayToastStyle,
          color: '#4a5568',
        },
        success: {
          style: {
            ...clayToastStyle,
            color: '#059669',
          },
          iconTheme: {
            primary: '#10b981',
            secondary: '#e0e5ec',
          },
        },
        error: {
          style: {
            ...clayToastStyle,
            color: '#e11d48',
          },
          iconTheme: {
            primary: '#f43f5e',
            secondary: '#e0e5ec',
          },
        },
        loading: {
          style: {
            ...clayToastStyle,
            color: '#4f46e5',
          },
          iconTheme: {
            primary: '#6366f1',
            secondary: '#e0e5ec',
          },
        },
        blank: {
          style: {
            ...clayToastStyle,
            color: '#4a5568',
          },
        },
      }}
    />
  )
}

export default ClayToaster