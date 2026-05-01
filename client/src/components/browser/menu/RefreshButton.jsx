import Refresh from '../../../assets/refresh.svg?react';
import { useBrowser } from '../../../contexts/BrowserContext';

const RefreshButton = () => {
  const {refresh} = useBrowser();
  return (
    <div>
      <Refresh onClick={refresh} />
    </div>
  )
}

export default RefreshButton
