import React, { useState } from 'react'
import LoginModal from './LoginModal';

export default function NavBar() {
  const [loginOpen, setLoginOpen] = useState(false);

  const openLoginPage = () => setLoginOpen(true);
  const closeLoginPage = () => setLoginOpen(false);

  return (
    <>
      <div className="bg-white shadow-md">
        <div className="container mx-auto">
          <header className="flex flex-wrap items-center justify-between py-4 px-6">
            <div className="flex items-center">
              <a href="/" className="inline-flex items-center text-gray-900 no-underline">
                <svg className="w-10 h-10 mr-2 text-blue-600" role="img" aria-label="Bootstrap" viewBox="0 0 118 94" xmlns="http://www.w3.org/2000/svg">
                  <title>K-Digital 7기</title>
                  <path fill="currentColor" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"></path>
                </svg>
                <span className="text-xl font-bold">K-Digital 7기</span>
              </a>
            </div>

            <ul className="flex space-x-6">
              <li><a href="/" className="text-gray-700 hover:text-blue-600 transition duration-200">Home</a></li>
              <li><a href="/" className="text-gray-700 hover:text-blue-600 transition duration-200">FAQs</a></li>
              <li><a href="/" className="text-gray-700 hover:text-blue-600 transition duration-200">About</a></li>
            </ul>

            <div className="flex items-center space-x-4">
              <button type="button"
                className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200 px-4 py-2 rounded"
                onClick={openLoginPage}>Login</button>
              <button type="button" className="bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-200 px-4 py-2 rounded">Sign-up</button>
            </div>
          </header>
        </div>
      </div>
      <LoginModal isOpen={loginOpen} onClose={closeLoginPage} />
    </>
  )
}
