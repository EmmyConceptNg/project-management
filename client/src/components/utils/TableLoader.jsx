import React from "react";
import { Skeleton } from "@mui/material";

export default function TableLoader({
  w = "100%",
  h = 40,
  mBlock = "15px",
  variant = "rectangular",
  ml = "",
  mr = "",
  br = "",
}) {
  return (
    <Skeleton
      variant={variant}
      width={w}
      style={{
        marginBlock: mBlock,
        marginLeft: ml,
        marginRight: mr,
        borderRadius: br,
      }}
      height={h}
    />
  );
}
