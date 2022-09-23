import Router from 'next/router'
import React, { useEffect } from 'react'

const Myaccount = () => {

    useEffect(() => {
        if(!localStorage.getItem('token')){
          Router.push('/')
        }
      }, [])

  return (
    <div>Myaccount</div>
  )
}

export default Myaccount