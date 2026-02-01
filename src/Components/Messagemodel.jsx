import React from 'react'
import { useEffect } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
export default function Messagemodel(props) {
 const MySwal = withReactContent(Swal)
 const {show,title}=props;
    useEffect(()=>{
     if (show){
        MySwal.fire({
           title: `<p>${title}</p>`,
           icon: "success",
           draggable: true,
           iconColor: "#198754",
           showConfirmButton: false,
           timer: 2000
})
    }
    })
    
    
  return  null;
}
