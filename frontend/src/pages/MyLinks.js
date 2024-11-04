import { useEffect, useState } from "react";
import useHeaderHeight from "../hooks/useHeaderHeight";
import {
  Container,
  Grid2,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { setAllUrls } from "../redux/slices/urlsSlice";
import { useSelector, useDispatch } from "react-redux";

const MyLinks = () => {
  const headerHeight = useHeaderHeight();

  const [cookies, setCookies] = useCookies(["access_token"]);
  // local state
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Get current global state  (urls array)
  const urls = useSelector((state) => state.urls.urls);

  const dispatch = useDispatch();


  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAllUrls = async () => {
      try {
        const response = await fetch(`/api/shorturls`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        });
        
        const data = await response.json();
        if (response.ok) {
          // Sort them so that the latest created is the first one in the list 
          const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          dispatch(setAllUrls(sortedData));
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    // Only logged in user:
    if (cookies.access_token) fetchAllUrls();
  }, [dispatch, cookies.access_token]);

  const fetchShortLink = async (id) => {
    try {
      const response = await fetch(`/api/shorturls/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.access_token}`,
        },
        body: JSON.stringify({ shortUrlId: id }),
      });

      const { originalUrl } = await response.json();
  
      window.open(originalUrl, '_blank'); // Opens the original URL in a new browser tab

      if (!response.ok) {
        setError(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Grid2
        container
        sx={{
          bgcolor: "#0891b2",
          mt: `${headerHeight + 50}px`,
          justifyContent: "center",
          py: "20px",
        }}
      >
        <Typography variant="h3" sx={{ color: "primary.light" }}>
          My Links:
        </Typography>
        {isLoading ? (
          <Grid2 size={{ xs: 12 }}>
            <Box sx={{ textAlign: "center", pt: "15%", pb: "15%" }}>
              <CircularProgress color="secondary" />
              <Typography color="secondary" variant="h6">
                Wait a moment...
              </Typography>
            </Box>
          </Grid2>
        ) : (
          <>
            {urls?.length > 0 ? (
              urls.map((item, inx) => (
                <Grid2 key={inx} size={{ md: 10, xs: 10 }} sx={{ my: 3 }}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: "start" }}>
                      <Typography
                        gutterBottom
                        sx={{ color: "primary.dark", fontSize: "18px" }}
                      >
                        Original Link (URL):
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "primary.dark",
                          fontSize: "16px",
                          fontWeight: "600",
                          wordWrap: "break-word",
                        }}
                      >
                        {item.originalUrl}
                      </Typography>
                      <Typography
                        gutterBottom
                        sx={{ color: "primary.dark", fontSize: "18px", mt: 3 }}
                      >
                        Short Link (URL):
                      </Typography>
                      <CardActions sx={{ paddingLeft: 0 }}>
                        <Button
                          onClick={() => { fetchShortLink(item.shortUrlId) }}
                          variant="outlined"
                          size="small"
                          sx={{
                            textTransform: "none",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          {item.shortUrl}
                        </Button>
                      </CardActions>
                    </CardContent>
                  </Card>
                </Grid2>
              ))
            ) : (
              <Grid2
                size={{ xs: 12 }}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Box>
                  <Typography
                    gutterBottom
                    variant="h3"
                    component="div"
                    sx={{
                      color: "primary.main",
                      textAlign: "center",
                    }}
                  >
                    There are no urls created, yet!
                  </Typography>
                </Box>
              </Grid2>
            )}
          </>
        )}
      </Grid2>
    </Container>
  );
};

export default MyLinks;
