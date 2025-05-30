import { IconButton, Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export default function ShellHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleClose();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{display: {xs: "flex", md:"auto"}, justifyContent: { xs: 'space-between' }}}>
          <HomeButton />
          {/* Desktop version */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <HeaderButton to="/SupplierList">Suppliers</HeaderButton>
            <HeaderButton to="/CustomerList">Customers</HeaderButton>
            <HeaderButton to="/EmployeeList">Employees</HeaderButton>
            <HeaderLinkButton href="/swagger" variant="outlined">
              Swagger UI
            </HeaderLinkButton>
          </Box>
          {/* Mobile version - Hamburger Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={() => handleNavigate("/SupplierList")}>
                Suppliers
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/CustomerList")}>
                Customers
              </MenuItem>
              <MenuItem onClick={() => handleNavigate("/EmployeeList")}>
                Employees
              </MenuItem>
              <MenuItem component="a" href="/swagger" onClick={handleClose}>
                Swagger UI
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function HomeButton() {
  return (
    <Typography
      component={RouterLink}
      to="/"
      variant="h6"
      sx={{ textDecoration: "none", color: "white" }}
    >
      Test Application
    </Typography>
  );
}

interface HeaderButtonProps extends ButtonProps {
  to: string;
}

function HeaderButton(props: HeaderButtonProps) {
  const { to, ...other } = props;

  return (
    <Button
      component={RouterLink}
      to={to}
      {...other}
      sx={{ my: 2, color: "white", display: "block" }}
    ></Button>
  );
}

function HeaderLinkButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      sx={{ my: 2, color: "white", display: "block" }}
    ></Button>
  );
}
