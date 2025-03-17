import {
  HomeIcon,
  WheelIcon,
  CircuitIcon,
  HamburgerIcon,
} from "../icons/footer";
const Footer = () => {
  const icons = [
    {
      name: "Home",
      icon: <HomeIcon />,
    },
    {
      name: "Wheel",
      icon: <WheelIcon />,
    },
    {
      name: "Circuit",
      icon: <CircuitIcon />,
    },
    {
      name: "",
      icon: <HamburgerIcon />,
    },
  ];
  return (
    <div className="fixed bottom-0 z-[50] bg-[#E00400] flex justify-around items-center w-full py-2">
      {icons.map((icon, index) => (
        <div key={index} className="flex flex-col items-center">
          {icon.icon}
          <p className="text-white text-xs text-center">{icon.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Footer;
