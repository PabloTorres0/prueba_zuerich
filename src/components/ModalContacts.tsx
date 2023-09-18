/* eslint-disable @typescript-eslint/no-misused-promises */
import { db } from '../firebase'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import Alert from 'react-bootstrap/Alert'

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
  const [emailValidation, setEmailValidation] = React.useState(false)
  const [nameValidation, setNameValidation] = React.useState(false)
  const [numberValidation, setNumberValidation] = React.useState(false)

  const getName = (name: string): void => {
    setName(name)
    const regex = /^[a-zñ]+[a-zñ\s]+[a-zñ]$/
    setNameValidation(regex.test(name.toLowerCase()))
  }
  const getEmail = (email: string): void => {
    const regex =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    setEmailValidation(regex.test(email))

    setEmail(email)
  }
  const getNumber = (number: string): void => {
    setNumber(number)
    const regex = /^\d{10}$/
    setNumberValidation(regex.test(number))
  }
  const setData = async (): Promise<void> => {
    resetValidations()
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
      resetValidations()
    } else {
      setTextButton('EDITAR CONTACTO')
      setName(props.data.name)
      setNumber(props.data.number)
      setEmail(props.data.email)

      setEmailValidation(true)
      setNumberValidation(true)
      setNameValidation(true)
    }
    console.log(props.modeModal)

    props.modalShow(props.modalOn)
  }, [props.modeModal, props.modalOn])

  const resetValidations = (): void => {
    setEmailValidation(false)
    setNumberValidation(false)
    setNameValidation(false)
  }

  return (
    <>
      <Modal
        show={props.modalOn}
        onHide={() => {
          props.modalShow(false)
          resetValidations()
        }}
      >
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
            {!nameValidation && (
              <Alert variant="danger">Ingresa Nombre Válido</Alert>
            )}
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
            {!emailValidation && (
              <Alert variant="danger">Ingresa Email Válido</Alert>
            )}
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
            {!numberValidation && (
              <Alert variant="danger">Ingresa Teléfono Válido</Alert>
            )}
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.modalShow(false)
              resetValidations()
            }}
          >
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={setData}
            disabled={!(emailValidation && nameValidation && numberValidation)}
          >
            {textButton}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalContacts
