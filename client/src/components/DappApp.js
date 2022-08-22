import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import Product from "./Product";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ py: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function DappApp() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        pt: 3,
        display: "flex",
        justifyContent: "center",
      }}>
      <Box sx={{ width: { xs: "340px", sm: "480px" } }}>
        <Box>
          <Box>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Product" {...a11yProps(0)} />
              <Tab label="Farm" {...a11yProps(1)} />
              <Tab label="Detail" {...a11yProps(2)} />
              <Tab label="History" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Product />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Farm Details
          </TabPanel>
          <TabPanel value={value} index={2}>
            Product Details
          </TabPanel>
          <TabPanel value={value} index={3}>
            Transaction History
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
}
