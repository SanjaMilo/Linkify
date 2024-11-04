import { Container, Button } from '@mui/material';
import useHeaderHeight from "../hooks/useHeaderHeight";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const headerHeight = useHeaderHeight();

    const navigate = useNavigate();

    return (
      <Container>
        <div className="hero-image" style={{ marginTop: headerHeight + 40}} >
            <div className="hero-text">
                <h1 className="hero-title">Linkify</h1>
                <p className="hero-p">Create short links to your destination resources!</p>
                <Button onClick={() => { navigate(`/create-short-link`) }} variant="contained"size="large">Get started</Button>
            </div>
        </div>
      </Container>
    );
  };
  
  export default Home;