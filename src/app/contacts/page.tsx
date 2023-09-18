'use client'
import ModalContacts from '@/components/ModalContacts'
import React from 'react'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import SpinnerComponent from '@/components/SpinnerComponent'

interface ContactUser {
  name: string
  email: string
  number: string
  id: string
}

const contacts: React.FC = () => {
  let contactsVar: ContactUser[] = []
  const [contactsArray, setContactsArray] = React.useState<ContactUser[]>([
    { name: '', email: '', number: '', id: '' }
  ])
  const [spinnerAction, setSpinnerAction] = React.useState<boolean>(true)
  const [modeModal, setModeModal] = React.useState<boolean>(false)
  const [modalOn, setModalOn] = React.useState<boolean>(false)
  const [data, setData] = React.useState<ContactUser>({
    name: '',
    email: '',
    number: '',
    id: ''
  })

  const [filteredBy, setFilteredBy] = React.useState<ContactUser[]>([
    { name: '', email: '', number: '', id: '' }
  ])

  const getData = async (): Promise<void> => {
    const querySnapshot = await getDocs(collection(db, 'contacts'))
    console.log('leer datos', querySnapshot)
    querySnapshot.forEach((doc) => {
      contactsVar = [
        ...contactsVar,
        {
          name: doc.data().name,
          email: doc.data().email,
          number: doc.data().number,
          id: doc.id
        }
      ]
      setContactsArray(contactsVar)
      setFilteredBy(contactsVar)
    })
    setSpinnerAction(false)
  }

  const deleteContact = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'contacts', id))
    const deletedItem = contactsArray.filter((item) => item.id !== id)
    setContactsArray(deletedItem)
    setFilteredBy(deletedItem)
  }

  const editContact = (item: ContactUser): void => {
    setModeModal(true)
    setModalOn(true)
    setData(item)
  }
  const addContact = (): void => {
    setModeModal(false)
    setModalOn(true)
  }

  const modalShow = (state: boolean): void => {
    setModalOn(state)
  }

  const filterBy = (input: string): void => {
    const newFiltered = contactsArray.filter(
      (item) => item.name.includes(input) || item.number.includes(input)
    )
    setFilteredBy(newFiltered)
  }

  React.useEffect(() => {
    void getData()
  }, [modalOn])

  return (
    <div className="w-50 mx-auto">
      <div className="container my-4">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Nombre o teléfono"
          onChange={(e): void => {
            filterBy(e.target.value)
          }}
        />
      </div>

      {!spinnerAction ? (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th scope="col">...</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">TELÉFONO</th>
              <th scope="col">CONTROLES</th>
            </tr>
          </thead>
          <tbody>
            {filteredBy.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>
                  <Link
                    href={`/contacts/${item.name}*${item.email}*${item.number}`}
                  >
                    {item.name}
                  </Link>{' '}
                </td>
                <td>{item.number}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      void deleteContact(item.id)
                    }}
                  >
                    Eliminar
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning m-2"
                    onClick={() => {
                      editContact(item)
                    }}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <SpinnerComponent />
        </div>
      )}
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={addContact}>
          AGREGAR CONTACTO
        </Button>
      </div>
      <ModalContacts
        modeModal={modeModal}
        data={data}
        modalOn={modalOn}
        modalShow={modalShow}
      />
    </div>
  )
}

export default contacts
