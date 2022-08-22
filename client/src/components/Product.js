import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEth } from "../contexts/EthContext";

export default function Product() {
  const [starName, setStarName] = useState("");
  const [starId, setStarId] = useState(0);
  const [trxResult, setTrxResult] = useState("");
  const [trxError, setTrxError] = useState("");

  //get contract and accounts to perform the transactions
  const {
    connectWallet,
    state: { contract, accounts, web3 },
  } = useEth();

  const account = !accounts ? "" : accounts[0];

  const resetForm = () => {};

  const createStar = async (_starName, _starId) => {
    //if wallet not connected, go and request the connection
    if (!contract) {
      connectWallet();
      return;
    }

    try {
      const starIdEnc = web3.utils.toBN(_starId);
      const transaction = await contract.methods
        .createStar(_starName, starIdEnc.toString())
        .send({ from: account });

      setTrxResult(transaction.transactionHash);
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
              label="Star Name"
              value={starName}
              onChange={(e) => setStarName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Star Id"
              value={starId}
              type="number"
              onChange={(e) => setStarId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => createStar(starName, starId)}>
              Create
            </Button>
            <Button sx={{ ml: 2 }} onClick={() => resetForm()}>
              Reset
            </Button>
          </Grid>
          <Grid item sx={{ mt: 2, minHeight: "45px" }}></Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
