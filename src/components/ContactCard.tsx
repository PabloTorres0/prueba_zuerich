'use client'
import React from 'react'
interface Props{
    name: string,
    number: string,
    email: string
}
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const ContactCard = (props:Props) => {
    const name= props.name
    const email= props.email
    const number= props.number
  return (
    <div className='mt-3'>
               <Card className="mx-auto" style={{ width: '18rem' }} border="info" bg="info">
      <Card.Img variant="top" src="https://i.blogs.es/2dfb43/contactos-google/1366_2000.jpg" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Datos Registrados...
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item
        variant='primary'
        >Email: {email}</ListGroup.Item>
        <ListGroup.Item
        variant='primary'
        >Telefono: {number}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="/contacts">Back</Card.Link>
      </Card.Body>
    </Card>
    </div>
  )
}

export default ContactCard