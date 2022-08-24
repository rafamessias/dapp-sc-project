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
];

const contractEvents =
  "Harvested,Processed,Packed,ForSale,Sold,Shipped,Received,Purchased";

export default function History() {
  const contractFields = {
    _upc: 0,
  };

  const [formFields, setFormFields] = useState(contractFields);
  const [trxResult, setTrxResult] = useState("");
  const [trxError, setTrxError] = useState("");

  //get contract and accounts to perform the transactions
  const {
    connectWallet,
    state: { contract },
  } = useEth();

  const resetForm = () => {
    setFormFields(contractFields);
    setTrxResult("");
    setTrxError("");
  };
  const resetMSG = () => {
    setTrxResult("");
    setTrxError("");
  };

  const getLogs = async (formFields) => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }
    resetMSG();
    try {
      const transaction = await contract.getPastEvents("allEvents", {
        filter: { upc: formFields._upc },
        fromBlock: 0,
        toBlock: "latest",
      });

      const onlyEvents = transaction
        .filter((event) =>
          contractEvents.includes(event?.event) ? event : null
        )
        .map((event) => ({ event: event?.event, address: event?.address }));

      setTrxResult(onlyEvents);
    } catch (error) {
      setTrxError(error.message);
    }
  };

  const methods = [
    {
      title: "Get History",
      func: getLogs,
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
