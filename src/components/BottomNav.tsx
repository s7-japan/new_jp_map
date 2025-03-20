import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import HomeIcon from "../images/home-icon.svg";
import CircuitIcon from "../images/circuit-icon.svg";
import MenuIcon from "../images/menu-icon.svg";
import DriverIcon from "../images/driver-icon.svg";

const BottomNav: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const handleNavigation = (newValue: number, path: string) => {
    setValue(newValue);
    router.push(path);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 3000, // Increased z-index
        width: "100%",
        borderRadius: 0,
        touchAction: "manipulation", // Improves touch responsiveness
      }}
      elevation={0}
    >
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        showLabels
        sx={{
          backgroundColor: "#ff0000",
          color: "white",
          height: "56px",
          "& .Mui-selected": {
            color: "white !important", // Ensure selected state is visible
          },
        }}
      >
        <BottomNavigationAction
          label="HOME"
          icon={<Image src={HomeIcon} alt="Home" width={20} height={20} />}
          onClick={() => handleNavigation(0, "/")}
          onTouchStart={() => handleNavigation(0, "/")} // Add touch support
          sx={{
            color: "white",
            minWidth: "60px",
            padding: "6px 0",
            "& .MuiBottomNavigationAction-label": {
              color: "white",
              fontSize: "0.65rem",
              fontWeight: "bold",
              marginTop: "2px",
            },
            "&:active": {
              opacity: 0.7, // Visual feedback for tap
            },
          }}
        />
        <BottomNavigationAction
          label="DRIVER"
          icon={<Image src={DriverIcon} alt="Driver" width={20} height={20} />}
          onClick={() => handleNavigation(1, "/reactionspeedtest")}
          onTouchStart={() => handleNavigation(1, "/reactionspeedtest")}
          sx={{
            color: "white",
            minWidth: "60px",
            padding: "6px 0",
            "& .MuiBottomNavigationAction-label": {
              color: "white",
              fontSize: "0.65rem",
              fontWeight: "bold",
              marginTop: "2px",
            },
            "&:active": {
              opacity: 0.7,
            },
          }}
        />
        <BottomNavigationAction
          label="CIRCUIT"
          icon={
            <Image src={CircuitIcon} alt="Circuit" width={30} height={30} />
          }
          onClick={() => handleNavigation(2, "/fingercircuit")}
          onTouchStart={() => handleNavigation(2, "/fingercircuit")}
          sx={{
            color: "white",
            minWidth: "60px",
            padding: "6px 0",
            "& .MuiBottomNavigationAction-label": {
              color: "white",
              fontSize: "0.65rem",
              fontWeight: "bold",
              marginTop: "2px",
            },
            "&:active": {
              opacity: 0.7,
            },
          }}
        />
        <BottomNavigationAction
          label="MENU"
          icon={<Image src={MenuIcon} alt="Menu" width={20} height={20} />}
          onClick={() => handleNavigation(3, "#")} // Add your menu route
          onTouchStart={() => handleNavigation(3, "#")}
          sx={{
            color: "white",
            minWidth: "60px",
            padding: "6px 0",
            "& .MuiBottomNavigationAction-label": {
              color: "white",
              fontSize: "0.65rem",
              fontWeight: "bold",
              marginTop: "2px",
            },
            "&:active": {
              opacity: 0.7,
            },
          }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
