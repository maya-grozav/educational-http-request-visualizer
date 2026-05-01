import siteImg from "../../assets/site.svg";

const WebsiteShortcut = ({ url, onClick }) => {
  return (
    <div onClick={onClick} className="flex flex-col text-gray-900 dark:text-gray-100 items-center gap-2 cursor-pointer">
      <img src={siteImg} className="h-15 dark:bg-gray-800 rounded-full w-15 p-0.5" />
      {url}
    </div>
  );
};

export default WebsiteShortcut;
