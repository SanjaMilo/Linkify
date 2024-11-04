import { useEffect, useState } from "react";
import useHeaderHeight from "../hooks/useHeaderHeight";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid2,
  TextField,
  FormControl,
  Card,
  CardContent,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { createShortUrl } from "../redux/slices/urlsSlice";
import { useDispatch } from "react-redux";

const CreateShortLink = () => {
  const headerHeight = useHeaderHeight();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userID = localStorage.getItem("userID");
  // local state
  const [error, setError] = useState(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [isTooShort, setIsTooShort] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitCreateShortLink = async (e) => {
    e.preventDefault();
    if (originalUrl.length < 100) {
      setIsTooShort(true);
      return;
    }

    try {
      const response = await fetch("/api/shorturls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cookies.access_token}`,
        },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      } else {
        if (data.message) {
          setMessage(`${data.message} - ${data.shortUrl}`);
          return;
        }

        alert("New Short-Link Created!");
        // Update global state at the same time we add new recipe to the Database
        dispatch(createShortUrl(data));
        // After creating a recipe, go to /my-links to see the list 
        navigate("/my-links");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Grid2
        container
        sx={{
          mt: `${headerHeight + 50}px`,
          justifyContent: "center",
          pb: "70px",
        }}
      >
        <Grid2 size={{xs: 12}}>
          {!userID && (
            <Alert sx={{ justifyContent: "center", mb: 2 }} severity="warning">
              To create a short link, you must be logged in!
            </Alert>
          )}
          <Card sx={{ pb: 4, bgcolor: "#0891b2" }}>
            <Grid2 container sx={{ justifyContent: "center" }}>
              <Grid2 size={{xs: 10}} sx={{ pt: 3, pb: 6 }}>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  sx={{
                    color: "primary.light",
                    textAlign: "center",
                    letterSpacing: "2px"
                  }}
                >
                  Create Short-Link
                </Typography>
              </Grid2>
            </Grid2>
            <CardContent>
              <Grid2 container sx={{ justifyContent: "center" }}>
                <Grid2 size={{xs: 10}} >
                  <form onSubmit={submitCreateShortLink}>
                    <FormControl fullWidth>
                      <TextField
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        name="originalUrl"
                        value={originalUrl}
                        sx={{ mb: 4}}
                        variant="standard"
                        label="Original URL"
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      disabled={!userID}
                      sx={{ mt: 3, mb: 2 }}
                      variant="contained"
                    >
                      Create Short-Link
                    </Button>
                  </form>
                  {error && (
                    <Typography
                      variant="body1"
                      sx={{ color: "primary.dark" }}
                    >
                      {error}
                    </Typography>
                  )}
                  {isTooShort && (
                    <Typography variant="body1" sx={{ color: "secondary.main" }}>
                      Link is too short. Try with links that are more than 100 characters long.
                    </Typography>
                  )}
                  {message && (
                    <Typography variant="body1" sx={{ color: "secondary.main" }}>
                      {message}
                    </Typography>
                  )}
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default CreateShortLink;
