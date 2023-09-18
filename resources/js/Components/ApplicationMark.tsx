import React from 'react';
import logoIcon from './../../assets/logo_icon.png';

interface Props {
  className:string
}
export default function ApplicationMark(
  {className}: Props
) {
  return (
    <div className={className}>
      <img height="30px" width='30px' src={logoIcon}/>
    </div>
    
  );
}
