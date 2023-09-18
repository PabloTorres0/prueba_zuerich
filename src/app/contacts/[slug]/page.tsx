import ContactCard from '@/components/ContactCard'
import React from 'react'

const Slug: React.FC<{ params: any }> = ({ params }) => {
  const dataArray = params.slug.split('*')
  const arrayEmail = dataArray[1].split('%40')

  const name = dataArray[0]
  const email = `${arrayEmail[0]}@${arrayEmail[1]}`
  const number = dataArray[2]
  return (
    <div>
      <ContactCard name={name} email={email} number={number} />
    </div>
  )
}

export default Slug
