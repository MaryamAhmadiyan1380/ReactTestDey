import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Components/Style/Navbar.css';
import LoginIcon from '@mui/icons-material/Login';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import AvatarPic from '../Assets/AboutPic.jpg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import RoofingIcon from '@mui/icons-material/Roofing';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const NavbarPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    
    navigate("/login");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  return (
    <Navbar bg="light" expand="lg sticky-top">
      <Container>
        <Stack direction="row" spacing={2} >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar alt="User Avatar" src={AvatarPic} />
            </IconButton>
          </StyledBadge>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{ fontSize: "20px" }}
          >
            <MenuItem onClick={handleClose}>
              <span style={{ fontSize: "15px" }}>Maryam Ahmadiyan Shiyadeh</span>
            </MenuItem>
            <MenuItem onClick={handleClose}>Setting</MenuItem>
            <MenuItem onClick={handleClose}>
              <span style={{ fontSize: "15px" }}>Share With Friend</span>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <span style={{ fontSize: "15px" }}>Exit</span>
            </MenuItem>
          </Menu>
        </Stack>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
  {/* فاصله بین آواتار و لینک‌ها */}
  <div style={{ marginLeft: "20px", display: "flex", alignItems: "center", gap: "30px" }}>
    <Nav className="justify-content-start nav">
      <Nav.Link
        onClick={() => navigate("/")}
        className={location.pathname === "/" ? "active-link" : ""}
      >
        <RoofingIcon />
        Home
        <ChevronRightIcon style={{ transform: "rotate(90deg)" }} />
      </Nav.Link>
      <Nav.Link
        onClick={() => navigate("/products")}
        className={location.pathname === "/products" ? "active-link" : ""}
      >
        <ProductionQuantityLimitsIcon />
        Products
        <ChevronRightIcon style={{ transform: "rotate(90deg)" }} />
      </Nav.Link>
      <Nav.Link
        onClick={() => navigate("/categories")}
        className={location.pathname === "/categories" ? "active-link" : ""}
      >
        <CategoryIcon />
        Categories
        <ChevronRightIcon style={{ transform: "rotate(90deg)" }} />
      </Nav.Link>
      <Nav.Link
        onClick={() => navigate("/user")}
        className={location.pathname === "/user" ? "active-link" : ""}
      >
        <PeopleIcon />
        Users
        <ChevronRightIcon style={{ transform: "rotate(90deg)" }} />
      </Nav.Link>
      <Nav.Link
        onClick={() => navigate("/about")}
        className={location.pathname === "/about" ? "active-link" : ""}
      >
        <InfoIcon />
        About me
        <ChevronRightIcon style={{ transform: "rotate(90deg)" }} />
      </Nav.Link>
    </Nav>
  </div>
</Navbar.Collapse>

        <Navbar.Brand>
          Tongre
          <LoginIcon
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={handleLogout}
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarPage;
