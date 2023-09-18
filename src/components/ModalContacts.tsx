import { db } from '../firebase'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
// 'use client'
interface Props {
  modeModal: boolean
  modalOn: boolean
  data: {
    name: string
    number: string
    id: string
    email: string
  }
  modalShow: (state: boolean) => void
}

const ModalContacts: React.FC<Props> = (props) => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [number, setNumber] = React.useState('')
  const [textButton, setTextButton] = React.useState('')

  const getName = (name: string) => { setName(name); }
  const getEmail = (email: string) => { 
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(regex.test(email));
    setEmail(email); 
  }
  const getNumber = (number: string) => { setNumber(number); }
  const setData = async () => {
    console.log('Enviar datos')
    props.modalShow(false)

    try {
      if (!props.modeModal) {
        const docRef = await addDoc(collection(db, 'contacts'), {
          name,
          email,
          number
        })
        console.log('Document written with ID: ', docRef.id)
      } else {
        await setDoc(doc(db, 'contacts', props.data.id), {
          name,
          email,
          number
        })
        console.log('Document written with ID: ', props.data.id)
      }
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
  React.useEffect(() => {
    if (!props.modeModal) {
      setTextButton('AGREGAR CONTACTO')
      setName('')
      setNumber('')
      setEmail('')
    } else {
      setTextButton('EDITAR CONTACTO')
      setName(props.data.name)
      setNumber(props.data.number)
      setEmail(props.data.email)
    }
    console.log(props.modeModal)

    props.modalShow(props.modalOn)
  }, [props.modeModal, props.modalOn])

  return (
    <>
      <Modal show={props.modalOn} onHide={() => { props.modalShow(false); }}>
        <Modal.Header closeButton>
          <Modal.Title>{textButton}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <InputGroup size="sm" className="mb-2">
              <InputGroup.Text id="inputGroup-sizing-sm">
                Nombre
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => {
                  getName(e.target.value)
                }}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={name}
              />
            </InputGroup>
            <br />
            <InputGroup size="sm" className="mb-2">
              <InputGroup.Text id="inputGroup-sizing-default">
                Correo
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => {
                  getEmail(e.target.value)
                }}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={email}
              />
            </InputGroup>
            <br />
            <InputGroup size="sm">
              <InputGroup.Text id="inputGroup-sizing-lg">
                Telefono
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => {
                  getNumber(e.target.value)
                }}
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                value={number}
              />
            </InputGroup>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { props.modalShow(false); }}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={setData}>
            {textButton}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalContacts
