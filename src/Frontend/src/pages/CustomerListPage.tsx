import {
  Button,
  CircularProgress,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import exportFromJSON from "export-from-json";
import { useEffect, useState } from "react";

//types
type CustomersListQueryResponseCategory = {
  code: string;
  description: string;
};
type CustomersListQueryResponse = {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  iban: string;
  category?: CustomersListQueryResponseCategory;
};
type Error = {
  error: boolean;
  errorMessage: string;
};
const fileName = "data";
const exportType = "xml";

export default function CustomerListPage() {
  //states
  const [list, setList] = useState<CustomersListQueryResponse[]>([]);
  const [filter, setFilter] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorToDisplay, setErrorToDisplay] = useState<Error>({
    error: false,
    errorMessage: "",
  });

  useEffect(() => {
    fetch(`/api/customers/list?SearchText=${debouncedQuery}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setList(data as CustomersListQueryResponse[]);
        setIsLoading(false);
        setErrorToDisplay({ error: false, errorMessage: "" });
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorToDisplay({ error: true, errorMessage: err });
      });
  }, [debouncedQuery]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(filter);
    }, 500);
    return () => clearTimeout(timer);
  }, [filter]);

  const handleClick = () => {
    exportFromJSON({data: list, fileName, exportType});
  };

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        Customers
      </Typography>

 {/* TODO: fix style for mobile version */}
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      ) : errorToDisplay.error ? (
        <div>{errorToDisplay.errorMessage.toString()}</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <TextField
              sx={{ width: "70%" }}
              label="Filtra per nome e mail"
              variant="outlined"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                console.log(filter);
              }}
              fullWidth
            />
            <Button variant="contained" onClick={() => handleClick()}>
              ESPORTA XML
            </Button>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableHeadCell>Name</StyledTableHeadCell>
                  <StyledTableHeadCell>Address</StyledTableHeadCell>
                  <StyledTableHeadCell>Email</StyledTableHeadCell>
                  <StyledTableHeadCell>Phone</StyledTableHeadCell>
                  <StyledTableHeadCell>Iban</StyledTableHeadCell>
                  <StyledTableHeadCell>Category Code</StyledTableHeadCell>
                  <StyledTableHeadCell>Category Description</StyledTableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.iban}</TableCell> 
                    <TableCell sx={{textAlign: 'center'}}>{row.category?.code ? row.category?.code: '-'}</TableCell>
                    <TableCell>{row.category?.description ? row.category?.description : '-' }</TableCell>
                  
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
}
const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}));
