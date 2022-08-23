import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEth } from "../contexts/EthContext";
import ReturnMsg from "./utils/ReturnMsg";

const fields = [
  {
    title: "UPC",
    name: "_upc",
    type: "number",
  },
  {
    title: "Product Notes",
    name: "_productNotes",
    type: "text",
  },
  {
    title: "Product Price",
    name: "_productPrice",
    type: "number",
  },
  {
    title: "Distributor ID",
    name: "distributorID",
    type: "text",
  },
  {
    title: "Retailer ID",
    name: "retailerID",
    type: "text",
  },
  {
    title: "Consumer ID",
    name: "consumerID",
    type: "text",
  },
];

export default function Transactions() {
  //   const contractFields = {
  //     _upc: 0,
  //     _productNotes: "",
  //     _productPrice: 0,
  // distributorID: "",
  //     retailerID: "",
  //     consumerID: ","
  //   };

  const contractFields = {
    _upc: 0,
    _productNotes: "",
    _productPrice: 0,
    distributorID: "",
    retailerID: "",
    consumerID: "",
  };

  const [formFields, setFormFields] = useState(contractFields);
  const [trxResult, setTrxResult] = useState("");
  const [trxError, setTrxError] = useState("");

  //get contract and accounts to perform the transactions
  const {
    connectWallet,
    state: { contract, accounts },
  } = useEth();

  const account = !accounts ? "" : accounts[0];

  const resetForm = () => {
    setFormFields(contractFields);
    setTrxResult("");
    setTrxError("");
  };
  const resetMSG = () => {
    setTrxResult("");
    setTrxError("");
  };

  //   uint256 _upc,
  //   address _ownerID,
  //   address _originFarmerID,
  //   string memory _originFarmName,
  //   string memory _originFarmInformation,
  //   string memory _originFarmLatitude,
  //   string memory _originFarmLongitude,
  //   string memory _productNotes

  const buyItem = async (formFields) => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }
    resetMSG();
    try {
      const transaction = await contract.methods
        .buyItem(formFields._upc)
        .send({ from: account, value: formFields._productPrice });

      setTrxResult(transaction);
    } catch (error) {
      setTrxError(error.message);
    }
  };

  const shipItem = async (formFields) => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }
    resetMSG();
    try {
      const transaction = await contract.methods
        .shipItem(formFields._upc)
        .send({ from: account });

      setTrxResult(transaction);
    } catch (error) {
      setTrxError(error.message);
    }
  };

  const receiveItem = async () => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }
    resetMSG();
    try {
      const transaction = await contract.methods
        .receiveItem(formFields._upc)
        .send({ from: account });

      setTrxResult(transaction);
    } catch (error) {
      setTrxError(error.message);
    }
  };

  const purchaseItem = async () => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }
    resetMSG();
    try {
      const transaction = await contract.methods
        .purchaseItem(formFields._upc)
        .send({ from: account });

      setTrxResult(transaction);
    } catch (error) {
      setTrxError(error.message);
    }
  };

  const methods = [
    {
      title: "Buy Item",
      func: buyItem,
    },
    {
      title: "Ship Item",
      func: shipItem,
    },
    {
      title: "Receive",
      func: receiveItem,
    },
    {
      title: "Purchase",
      func: purchaseItem,
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ color: "white" }}>
          Product Transactions
        </Typography>
        <Grid container spacing={4} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            {fields.map((item) => (
              <TextField
                key={item.name}
                fullWidth
                label={item.title}
                value={formFields[item.name]}
                type={item.type}
                sx={{ my: 2 }}
                onChange={(e) =>
                  setFormFields((prev) => {
                    let newValue = {};
                    newValue[item.name] = e.target.value;
                    return { ...prev, ...newValue };
                  })
                }
              />
            ))}
          </Grid>

          <Grid item xs={12}>
            {methods.map((item) => (
              <Button
                key={item.title}
                variant="contained"
                sx={{ mr: 2, mb: 2 }}
                onClick={() => item.func(formFields)}>
                {item.title}
              </Button>
            ))}

            <Button sx={{ ml: 2, mb: 2 }} onClick={() => resetForm()}>
              Reset
            </Button>
          </Grid>
          <Grid item sx={{ mt: 2, minHeight: "45px" }}>
            <ReturnMsg
              trxError={trxError}
              trxResult={trxResult}
              funcType="call"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
