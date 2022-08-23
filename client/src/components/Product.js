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

export default function Product() {
  const [sku, setSku] = useState(0);
  const [trxResult, setTrxResult] = useState("");
  const [trxError, setTrxError] = useState("");

  //get contract and accounts to perform the transactions
  const {
    connectWallet,
    state: { contract },
  } = useEth();

  const resetForm = () => {
    setSku("");
    setTrxResult("");
    setTrxError("");
  };

  const fetchData1 = async (_sku) => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }

    try {
      const transaction = await contract.methods
        .fetchItemBufferOne(_sku)
        .call();

      setTrxResult(transaction);
    } catch (error) {
      setTrxError(error.message);
    }
  };

  const fetchData2 = async (_sku) => {
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

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ color: "white" }}>
          Product Details
        </Typography>
        <Grid container spacing={4} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="SKU"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ mr: 2, mb: 2 }}
              onClick={() => fetchData1(sku)}>
              Fetch Data 1
            </Button>
            <Button
              variant="contained"
              sx={{ mr: 2, mb: 2 }}
              onClick={() => fetchData2(sku)}>
              Fetch Data 2
            </Button>
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
