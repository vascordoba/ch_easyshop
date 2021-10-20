import * as React from "react";
// import { styled } from "@mui/material/styles";
//import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Topbar from "@components/Topbar";

const siteTitle = "EasyShop";
/*
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
*/
export default function Layout(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Topbar>{siteTitle}</Topbar>
        </Grid>
        <Grid item xs={12}>
          {props.children}
        </Grid>
      </Grid>
    </Box>
  );
}
