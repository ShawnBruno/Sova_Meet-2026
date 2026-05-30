import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { useDispatch, useSelector } from "react-redux";
import { getActiveTheme, selectTheme } from "@/redux/reducers/themeReducer";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { toggleTheme } from "@/redux/reducers/themeReducer";


export default function MyAppBar() {

  const dispatch = useDispatch(); // Hook to access the Redux dispatch function
  const currentTheme = useSelector(selectTheme).activeTheme; // Access the current theme from the Redux store

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SovaMeet
            <Link href="/">
              <Button color="inherit">
                Home
              </Button>
            </Link>
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => dispatch(toggleTheme())}
          >
            {currentTheme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <Link href="/contact">
            <Button sx={{ ml: 1 }} color="inherit" variant="outlined" startIcon={<ContactSupportIcon />}>
              Contact Us
            </Button>
          </Link>
          <Link href="/login">
            <Button sx={{ ml: 1 }} color="inherit" variant="outlined" startIcon={<LoginIcon />}>
              Login
            </Button>
          </Link>
          <Link href="/logout">
            <Button sx={{ ml: 1 }} color="inherit" variant="outlined" startIcon={<LogoutIcon />}>
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
