import React from 'react'
import SubscribeModal from '../../shared/all-hero/modal/subscribe-modal'

function Subscribe() {
  return (
    <div className='fixed w-full h-screen z-50 overflow-clip top-0 right-0 bg-black'>
      <SubscribeModal isOpen={true} toggle={() => { }} setRefreshData={() => { }} removeCross/>
    </div>
  )
}

export default Subscribe