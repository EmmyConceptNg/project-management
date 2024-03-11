import React from "react";
import { Skeleton } from "@mui/material";

export default function ProjectLoader({
  w = "100%",
  h = "",
  mBlock = "15px",
  variant = "rectangular",
  ml = "",
  mr = "",
  br = "", sx={}
}) {
  return (
    <Skeleton sx={{ ...sx }}
      variant={variant}
      width={w}
      style={{
        marginBlock: mBlock,
        marginLeft: ml,
        marginRight: mr,
        borderRadius: br,
      }}
      
    />
  );
}
