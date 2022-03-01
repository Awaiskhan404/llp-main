import { Typography } from "@material-ui/core";
import React from "react";

const Menu = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: 10 }}>
      <div
        style={{
          borderColor: "#1de9b6",
          borderWidth: 1,
          borderStyle: "solid",
          background: "#4aedc4",
          color: "#fff",
          borderRadius: 7,
          padding: 10,
        }}
      >
        <Typography align="center" style={{ width: "100%" }}>
          All Sections are completed
        </Typography>
      </div>
    </div>
  );
};

export default Menu;
