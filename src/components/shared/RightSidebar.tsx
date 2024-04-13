import React from 'react'

export default function RightSidebar() {
  return (
    <section className='rightsidebar custom-scrollbar'>
      <div className='flex flex-col flex-1 justify-start'>
        <h3 className='text-heading4-medium text-light-1'>Suggested Groups</h3>
      </div>
    <div className='flex flex-col flex-1 justify-start'>
        <h3 className='text-heading4-medium text-light-1'>Suggested Users</h3>
      </div>
    </section>
  )
}
