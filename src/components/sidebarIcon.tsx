import { IconType } from "react-icons";

const SidebarIcon = ({ icon, text }: { icon: JSX.Element; text: string }) => {
  return (
    <div className="relative group cursor-pointer transition-all duration-300">
      <div className="text-2xl text-white">{icon}</div>
      <div className="absolute top-0 left-12 w-auto px-2 py-1 bg-slate-500 text-base text-white rounded transition-all duration-200 group-hover:scale-100 scale-0 origin-left">
        {text}
      </div>
    </div>
  );
};

export default SidebarIcon;
