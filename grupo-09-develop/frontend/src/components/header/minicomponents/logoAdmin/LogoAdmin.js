import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserEdit } from 'react-icons/fa'
import {LogoAdminStyle} from './LogoAdminStyle'

export default function LogoAdmin() {
  return (
    <LogoAdminStyle>
    <Link to="/administracion">
    <FaUserEdit className="iconAdm"/>
    </Link>
    </LogoAdminStyle>
  )
}
