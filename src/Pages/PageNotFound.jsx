import React from 'react'
import Header from '../Components/HeaderDetails/Header'
export default function PageNotFound() {
  return (
    <div>
        <Header></Header>
     <div className="page-notfound">
        <div className="notfound-box">
          <h1>404</h1>
          <p>Oops! The page you’re looking for doesn’t exist.</p>
          <a href="/" className="back-home-btn">Go Back Home</a>
        </div>
      </div>
    </div>
  )
}
