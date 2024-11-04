import useHeaderHeight from "../hooks/useHeaderHeight";
import { Button, Container, Grid2, Typography } from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const headerHeight = useHeaderHeight();
    const viewPortHeight = window.innerHeight - headerHeight - 120;

    const navigate = useNavigate();

  return (
    <Container>
      <Grid2
        container
        spacing={3}
        sx={{
          mt: `${headerHeight}px`,
          pt: '50px',
          justifyContent: "center",
          pb: "70px",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid2 size={{ xs: 8 }} sx={{ textAlign: "center", minHeight: `${viewPortHeight}px`}}>
          <Typography
            variant="h3"
            component="div"
            sx={{
              color: "primary.light",
              mb: "3rem",
            }}
          >
            Oops, no such page. Go back to home page.
          </Typography>
          <Button onClick={() => { navigate(-1) }} size="large" variant="contained">Go back <ArrowRightAltIcon /></Button>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default PageNotFound;
