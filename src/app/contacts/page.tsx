"use client"
import ModalContacts from '@/components/ModalContacts'
import React from 'react'
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { db } from '@/firebase';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import SpinnerComponent from '@/components/SpinnerComponent';

interface contactUser {
  name: string,
  email: string,
  number: string,
  id: string
}[]

const contacts = () => {

let contactsVar:contactUser[]= []
const [contactsArray, setContactsArray]= React.useState([{name:"",email:"",number:"",id:""}])
const [spinnerAction,setSpinnerAction] =React.useState(false)
const [modeModal, setModeModal] = React.useState(false)
const [modalOn,setModalOn]= React.useState(false)
const [data,setData] = React.useState({name:"",email:"",number:"",id:""})
const getData = async()=>{
    const querySnapshot = await getDocs(collection(db, "contacts"));
   console.log("leer datos")
    querySnapshot.forEach((doc) => {
      contactsVar=[...contactsVar,{
        name:doc.data().name,
        email:doc.data().email,
        number:doc.data().number,
        id:doc.id
      }] 
  setSpinnerAction(true)
  setContactsArray(contactsVar)
    });
  }

const deleteContact= async(id:string)=>{
           await deleteDoc(doc(db, 'contacts', id));
           getData();
  }
    
const editContact = (item:contactUser) => {
  setModeModal(true)
  setModalOn(true)
  setData(item)

}
const addContact = () => {
  setModeModal(false)
  setModalOn(true)
}


React.useEffect(()=>{
  getData();
},[modalOn])


const modalShow = (state:boolean) => {
  setModalOn(state)
}


  return (
    <div className='w-50 mx-auto'>
    
{
  spinnerAction?(
<table className="table table-striped mt-3">
  <thead>
    <tr>
      <th scope="col">...</th>
      <th scope="col">NOMBRE</th>
      <th scope="col">TELEFONO</th>
      <th scope="col">CONTROLS</th>

    </tr>
  </thead>
  <tbody>
    {
        contactsArray.map((item,index)=>(
            <tr key={index}>
              
                <td>{index}</td>
                <td><Link href={`/contacts/${item.name}*${item.email}*${item.number}`}>{item.name}</Link>  </td>
                <td>{item.number}</td>
                <td>
                <button type="button" className="btn btn-danger"
                onClick={()=>{deleteContact(item.id)}}
                >Eliminar</button>
                <button type="button" className="btn btn-warning m-2"
                onClick={()=>{editContact(item)}}
                >Editar</button>

                </td>
                </tr>
        ))  
}
    
  </tbody>
</table>
  ):(<div>
    <SpinnerComponent/>
  </div>)
}
<div className="d-grid gap-2">
      <Button variant="primary" onClick={addContact}>
        AGREGAR CONTACTO
      </Button>
      </div>
<ModalContacts modeModal={modeModal} data={data} modalOn={modalOn} modalShow={modalShow} />
    </div>
  )
}

export default contacts