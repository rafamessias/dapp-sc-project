import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Config from "./Config";
import Farm from "./Farm";
import History from "./History";
import Product from "./Product";
import Transactions from "./Transactions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
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
            <Tabs value={value} onChange={handleChange} variant="scrollable">
              <Tab label="Product" {...a11yProps(0)} />
              <Tab label="Farm" {...a11yProps(1)} />
              <Tab label="Transactions" {...a11yProps(2)} />
              <Tab label="History" {...a11yProps(3)} />
              <Tab label="Config" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Product />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Farm />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Transactions />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <History />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Config />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
}
