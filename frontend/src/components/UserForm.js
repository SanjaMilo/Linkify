import {
    Grid2,
    TextField,
    FormControl,
    Card,
    CardContent,
    Button,
    Typography,
  } from "@mui/material";
  
  const UserForm = ({
    submitForm,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
  }) => {
  
    return (
      <Card sx={{ pb: 4, pt: 8, bgcolor: "#0891b2" }}>
        <CardContent>
          <Grid2 container sx={{ justifyContent: "center" }}>
            <Grid2 size={{xs: 10}}>
              <form onSubmit={submitForm}>
                <FormControl onSubmit={submitForm} fullWidth>
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    sx={{ mb: 4 }}
                    variant="standard"
                    label="Email"
                  />
                  <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    sx={{ mb: 4 }}
                    variant="standard"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                  />
                </FormControl>
                <Button
                  disabled={isLoading}
                  sx={{ mt: 3, mb: 2 }}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
              {error && (
                <Typography variant="body1" sx={{ color: "secondary.main" }}>
                  {error}
                </Typography>
              )}
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    );
  };
  
  export default UserForm;
  