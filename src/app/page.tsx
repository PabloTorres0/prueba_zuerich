"use client"
import React from 'react'
import Card from 'react-bootstrap/Card'

const Home: React.FC = () => {

  return (
    <div>
      <Card style={{ width: '24rem' }} className="mx-auto mt-3 mb-3">
        <Card.Img
          variant="top"
          src="https://th.bing.com/th/id/OIP.DDGDiaJsE9700U4Byqx_AQHaHa?pid=ImgDet&rs=1"
        />
        <div className="text-center">
          <img
            className="img-fluid rounded-circle"
            style={{ marginTop: '-50px' }}
            height="100px"
            width="100px"
            src="https://th.bing.com/th/id/OIP.DDGDiaJsE9700U4Byqx_AQHaHa?pid=ImgDet&rs=1"
          />
        </div>
        <Card.Body>
          <Card.Title>PABLO JAVIER TORRES MARTÍNEZ</Card.Title>
          <Card.Text>Agenda de Contactos</Card.Text>
        </Card.Body>

        <Card.Body>
          <Card.Link href="/contacts">Contactos</Card.Link>
        </Card.Body>
      </Card>
    </div>
  )
}

export  default Home