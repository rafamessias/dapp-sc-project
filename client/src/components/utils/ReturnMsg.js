import { Box, Link, Tooltip, Typography } from "@mui/material";

export default function ReturnMsg(props) {
  const { trxError, trxResult, funcType } = props;

  const decodedResult =
    Object.keys(trxResult).length > 0
      ? JSON.stringify(trxResult, undefined, 2)
      : trxResult;

  return (
    <>
      {trxError !== "" && (
        <Tooltip title={trxError} placement="top">
          <Typography
            color="error.main"
            sx={{
              width: { xs: "280px", sm: "330px" },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
            {trxError}
          </Typography>
        </Tooltip>
      )}
      {decodedResult !== "" && (
        <Tooltip title={decodedResult} placement="top">
          <Box
            sx={{
              width: "100%",
            }}>
            {funcType === "send" ? (
              <>
                TRX Hash:{" "}
                <Link
                  href={`https://rinkeby.etherscan.io/tx/${decodedResult}`}
                  rel="noreferrer"
                  target="_blank">
                  <Typography
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                    {decodedResult}
                  </Typography>
                </Link>
              </>
            ) : (
              <Box
                sx={{
                  maxWidth: "440px",
                  overflowX: "scroll",
                }}>
                <pre>{decodedResult}</pre>{" "}
              </Box>
            )}
          </Box>
        </Tooltip>
      )}
    </>
  );
}
