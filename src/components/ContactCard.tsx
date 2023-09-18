'use client'
import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
interface Props {
  name: string
  number: string
  email: string
}

const ContactCard: React.FC<Props> = (props) => {
  const name = props.name
  const email = props.email
  const number = props.number
  return (
      <div className="mt-3">
      <Card
        className="mx-auto"
        style={{ width: '18rem' }}
        border="info"
        bg="info"
      >
        <Card.Img
          variant="top"
          src="https://i.blogs.es/2dfb43/contactos-google/1366_2000.jpg"
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Datos Registrados...</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item variant="primary">Email: {email}</ListGroup.Item>
          <ListGroup.Item variant="primary">Teléfono: {number}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href="/contacts">Atrás</Card.Link>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ContactCard
