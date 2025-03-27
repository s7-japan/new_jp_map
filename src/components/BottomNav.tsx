"use client";

import React, { forwardRef } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMenuStore } from "../store/menuStore";

import HomeIcon from "../images/home-icon.svg";
import CircuitIcon from "../images/circuitIcon.svg";
import MenuIcon from "../images/menu-icon.svg";
import DriverIcon from "../images/driver-icon.svg";

const BottomNav = forwardRef<HTMLButtonElement>((props, ref) => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const { toggleMenu } = useMenuStore();

  const handleNavigation = (newValue: number, path: string) => {
    setValue(newValue);
    if (newValue === 3) {
      toggleMenu(); // Directly toggle the menu
    } else {
      router.push(path);
    }
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 3000,
        width: "100%",
        borderRadius: 0,
        touchAction: "manipulation",
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
          height: "60px",
          "& .Mui-selected": {
            color: "white !important",
          },
        }}
      >
        <BottomNavigationAction
          label="HOME"
          icon={<Image src={HomeIcon} alt="Home" width={20} height={20} />}
          onClick={() => handleNavigation(0, "/")}
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
          label="DRIVER"
          icon={<Image src={DriverIcon} alt="Driver" width={20} height={20} />}
          onClick={() => handleNavigation(1, "/reactiontimetest")}
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
            <Image src={CircuitIcon} alt="Circuit" width={20} height={20} />
          }
          onClick={() => handleNavigation(2, "/fingercircuit")}
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
          ref={ref} // Ref for the MENU button
          label="MENU"
          icon={<Image src={MenuIcon} alt="Menu" width={20} height={20} />}
          onClick={() => handleNavigation(3, "#")}
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
});

BottomNav.displayName = "BottomNav";

export default BottomNav;
