import { Link } from '@inertiajs/react';
import React from 'react';
import logo from '../../assets/logo_icon.png';

export default function AuthenticationCardLogo() {
  return (
    <Link href="/">
      <img src={logo}/>
    </Link>
  );
}
