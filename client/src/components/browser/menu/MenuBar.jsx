import React from 'react'
import BackButton from './BackButton'
import ForwardButton from './ForwardButton'
import RefreshButton from './RefreshButton'
import AddressBar from './AddressBar'
import Options from './Options'
import { useBrowser } from '../../../contexts/BrowserContext'

const MenuBar = () => {
  const {state} = useBrowser();
  const {history, currentTabId} = state;
  return (
      <div
        className={'w-full flex gap-2 items-center-safe p-2 bg-white dark:bg-gray-800 '}
      >
        <BackButton style={{fill: 'red'}}/>
        <ForwardButton />
        <AddressBar/>
        <Options />
      </div>
  )
}

export default MenuBar
