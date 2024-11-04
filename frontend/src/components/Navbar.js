import { useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useLogout } from "../hooks/useLogout";
import logo from '../img/logo.png';


const Navbar = () => {
    const [cookies, setCookies, removeCookie] = useCookies(['access_token']);

    const { logout } = useLogout();
    
    // Menu links
    const pages = [
      {
        title: 'Home',
        link: '/'
      },
      {
        title: 'Create Short-Link',
        link: '/create-short-link'
      },
      {
        title: 'My Links',
        link: '/my-links'
      },
    ]
  
    // Menu
    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{ backgroundColor: "#155e75", color: "primary.main" }}
          position="fixed"
        >
          <Toolbar>
          
            <Box sx={{ flexGrow: 1, display: { xs: "flex" }, alignItems: "center" }}>
              <Link to="/">
                <Box
                    component="img"
                    sx={{
                    height: 64,
                    }}
                    alt="logo."
                    src={logo}
                />
                <Typography
                  variant="h2"
                  noWrap
                  className="logo"
                  sx={{
                    display: "inline-block",
                    flexGrow: 1,
                    fontFamily: "Ephesis",
                    textDecoration: "none",
                    color: "primary.main",
                    cursor: "pointer",
                    maxWidth: "fit-content",
                  }}
                >
                Linkyfy
                </Typography>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/">
                <Button sx={{ my: 2, display: "block" }}>Home</Button>
              </Link>
              <Link to="/create-short-link">
                <Button sx={{ my: 2, display: "block" }}>Create Short-Link</Button>
              </Link>
              <Link to="/my-links">
                <Button sx={{ my: 2, display: "block" }}>My Links</Button>
              </Link>
            </Box>
            {!cookies.access_token ? (
              <>
                <Link to="/login">
                  <Button className="user-btn" sx={{ my: 2, display: "block" }}>Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button className="user-btn" sx={{ my: 2, display: "block" }}>Sign Up</Button>
                </Link>
              </>
            ) : (
              (
                <Button className="user-btn" onClick={logout} sx={{ my: 2, display: "block" }}>
                  Log Out
                </Button>
              )
            )}
           
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                    <Link to={page.link}>
                      <Typography sx={{textAlign: 'center', color: 'primary.main'}}>{page.title}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
  
          </Toolbar>
        </AppBar>
      </Box>
    );
  };
  
  export default Navbar;
  






