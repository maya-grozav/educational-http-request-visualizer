import menuImg from "../../../assets/account.svg";
import { useBrowser } from "../../../contexts/BrowserContext";

const Options = () => {
  const { navigate } = useBrowser();
  return (
    <div>
      <img onClick={()=>navigate("https://webpeek.com/account")} src={menuImg} alt="" />
    </div>
  );
};

export default Options;
