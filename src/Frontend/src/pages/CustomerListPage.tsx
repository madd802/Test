import { CircularProgress, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

//types
type CustomersListQueryResponseCategory = {
code: string;
description: string;
}
type CustomersListQueryResponse = {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  iban: string;
  category?: CustomersListQueryResponseCategory;
}


export default function CustomerListPage() {
  //states
    const [list, setList] = useState<CustomersListQueryResponse[]>([]);
    const [filter, setFilter] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
        fetch(`/api/customers/list?SearchText=${debouncedQuery}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setList(data as CustomersListQueryResponse[]);
            setIsLoading(false);
          });
          //TODO: add catch option to manage error from server
    }, [debouncedQuery]);
  useEffect (()=> {
    const timer = setTimeout(()=>{
      setDebouncedQuery(filter);
    }, 500);
    return ()=> clearTimeout(timer);
  }, [filter])

    return <>
    
        <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        Customers
      </Typography>

      {!isLoading ? <div style={{display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <TextField
      label="Filtra per nome e mail"
      variant="outlined"
      value={filter}
      onChange={(e) => {setFilter(e.target.value);console.log(filter)} }
      fullWidth
    />
   

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>Name</StyledTableHeadCell>
              <StyledTableHeadCell>Address</StyledTableHeadCell>
              <StyledTableHeadCell>Email</StyledTableHeadCell>
              <StyledTableHeadCell>Phone</StyledTableHeadCell>
              <StyledTableHeadCell>Iban</StyledTableHeadCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div> : <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress/></div>}
      
    </>
}
const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}));