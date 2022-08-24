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
    title: "Account",
    name: "account",
    type: "text",
  },
];

export default function Config() {
  const contractFields = {
    account: "",
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

  const addFarmerRole = async (formFields) => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }
    resetMSG();
    try {
      const transaction = await contract.methods
        .addFarmer(formFields.account)
        .send({ from: account });

      setTrxResult(transaction);
    } catch (error) {
      setTrxError(error.message);
    }
  };

  const addDistributorRole = async (formFields) => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }
    resetMSG();
    try {
      const transaction = await contract.methods
        .addDistributor(formFields.account)
        .send({ from: account });

      setTrxResult(transaction);
    } catch (error) {
      setTrxError(error.message);
    }
  };

  const addRetailerRole = async (formFields) => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }
    resetMSG();
    try {
      const transaction = await contract.methods
        .addRetailer(formFields.account)
        .send({ from: account });

      setTrxResult(transaction);
    } catch (error) {
      setTrxError(error.message);
    }
  };

  const addConsumerRole = async (formFields) => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }
    resetMSG();
    try {
      const transaction = await contract.methods
        .addConsumer(formFields.account)
        .send({ from: account });

      setTrxResult(transaction);
    } catch (error) {
      setTrxError(error.message);
    }
  };

  const methods = [
    {
      title: "Add Farmer",
      func: addFarmerRole,
    },
    {
      title: "Add Distributor",
      func: addDistributorRole,
    },
    {
      title: "Add Retailer",
      func: addRetailerRole,
    },
    {
      title: "Add Consumer",
      func: addConsumerRole,
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ color: "white" }}>
          Adding Address Roles
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
