import { Typography } from "@mui/material";

export default function Text({
  fs,
  fw,
  color = "#606060",
  lh = "normal",
  p,
  mt = "0px",
  mb = "0px",
  mx,
  my,
  mr,
  ml,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  bg,
  cursor = "context-menu",
  children,
  onClick = null,
  className = "",
  id = "",
  style = {},
  sx = {},
}) {
  const mergedStyles = {
    fontSize: fs,
    fontWeight: fw,
    color: color,
    lineHeight: lh,
    padding: p,
    marginTop: mt,
    marginBottom: mb,
    marginInline: mx,
    marginBlock: my,
    marginRight: mr,
    marginLeft: ml,
    paddingInline: px,
    paddingBlock: py,
    paddingBottom: pb,
    paddingLeft: pl,
    paddingRight: pr,
    background: bg,
    cursor: cursor,
    ...sx,
  };
  return (
    <Typography style={mergedStyles} id={id} onClick={onClick} className={className}>
      {children}
    </Typography>
  );
}
