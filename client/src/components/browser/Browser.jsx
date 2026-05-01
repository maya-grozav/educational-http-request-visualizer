import React from 'react'
import Header from './Header';
import Page from './Page';

const Browser = () => {
  return (
    <div className='w-[90vw] lg:w-[50vw] min-w-[50vw] rounded-md overflow-hidden '>
      <Header />
      <Page />
    </div>
  )
}

export default Browser;
