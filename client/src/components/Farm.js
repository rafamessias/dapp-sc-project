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
    type: "text",
  },
  {
    title: "Farmer ID",
    name: "_originFarmerID",
    type: "text",
  },
  {
    title: "Farm Name",
    name: "_originFarmName",
    type: "text",
  },
  {
    title: "Farm Info",
    name: "_originFarmInformation",
    type: "text",
  },
  {
    title: "Farm Latitude",
    name: "_originFarmLatitude",
    type: "text",
  },
  {
    title: "Farm Longitude",
    name: "_originFarmLongitude",
    type: "text",
  },
  {
    title: "Product Notes",
    name: "_productNotes",
    type: "text",
  },
];

export default function Farm() {
  //   const contractFields = {
  //     _upc: 0,
  //     _originFarmerID: "",
  //     _originFarmName: "",
  //     _originFarmInformation: "",
  //     _originFarmLatitude: 0,
  //     _originFarmLongitude: 0,
  //     _productNotes: "",
  //   };

  const contractFields = {
    _upc: 1,
    _originFarmerID: "0x5f4F160ae4Fb97a3A1d2EebA75427E063EEA9e64",
    _originFarmName: "Rafael Da Silva",
    _originFarmInformation: "Santo Andre",
    _originFarmLatitude: 21.3333,
    _originFarmLongitude: -123.43234,
    _productNotes: "Farm top!",
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

  //   uint256 _upc,
  //   address _ownerID,
  //   address _originFarmerID,
  //   string memory _originFarmName,
  //   string memory _originFarmInformation,
  //   string memory _originFarmLatitude,
  //   string memory _originFarmLongitude,
  //   string memory _productNotes

  const harvest = async (formFields) => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }
    console.log(formFields);
    try {
      const transaction = await contract.methods
        .harvestItem(
          formFields._upc,
          account.toString(),
          formFields._originFarmerID,
          formFields._originFarmName,
          formFields._originFarmInformation,
          formFields._originFarmLatitude,
          formFields._originFarmLongitude,
          formFields._productNotes
        )
        .send({ from: account });

      console.log(transaction);

      setTrxResult(transaction);
    } catch (error) {
      setTrxError(error.message);
    }
  };

  const processMethod = async (_sku) => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }

    try {
      const transaction = await contract.methods
        .fetchItemBufferTwo(_sku)
        .call();

      setTrxResult(transaction);
    } catch (error) {
      setTrxError(error.message);
    }
  };

  const pack = () => {};

  const forSale = () => {};

  const methods = [
    {
      title: "Harvest",
      func: harvest,
    },
    {
      title: "Process",
      func: processMethod,
    },
    {
      title: "Pack",
      func: pack,
    },
    {
      title: "ForSale",
      func: forSale,
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ color: "white" }}>
          Product Details
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
