import {
  Avatar,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { CODECHEF, CODEFORCES, GFG, GITHUB, LEETCODE_QUERY } from "../constants/urlConstants";
import { getData, postData } from "../utils/httpRequestUtils";
import EditProfile from "./EditProfile";
import YearCalendarHeatmap from "./generateHeatmap";

export const Profile = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [lcData, setLCData] = useState({});
  const [ccData, setCCData]  = useState({});
  const [cfData, setCfData]  = useState({});
  const [gfgData, setGFGData]  = useState({});
  const [githubData, setGithubData]  = useState({});

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  useEffect(()=> {
    fetchLeetcodeData();
    fetchCodeforcesData();
    fetchCodeChefData();
    // fetchGFGData();
    fetchGithubData();
  },[]);

  const fetchLeetcodeData = async () => {
        const res = await postData('http://localhost:4000/leetcode', LEETCODE_QUERY("kapilyadav22") );
        if(res.success) {
          setLCData(res.data);
        }
    };

    const fetchCodeforcesData = async () => {
      const res = await getData(CODEFORCES+'kapilyadav22');
      if(res.success) {
        setCfData(res.data);
      }
  };

    const fetchCodeChefData = async () => {
      const res = await getData(CODECHEF+'/kapilyadav22');
      if(res.success) {
        setCCData(res.data);
      }
  };

    const fetchGFGData = async () => {
      const res = await getData(GFG);
      if(res.success) {
        setGFGData(res.data);
      }
  };

  const fetchGithubData = async () => {
    const res = await getData(GITHUB+'/kapilyadav22');
    if(res.success) {
      setGithubData(res.data);
    }
  };



  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {/* Left Profile Bar */}
        <Grid item xs={12} md={4} lg={3}>
          <Box
            sx={{
              p: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
              boxShadow: 1,
              position: "relative",
              minHeight: '50vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box display="flex" justifyContent="center" mb={2} sx={{ position: "relative" }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                }}
                alt="User Avatar"
                src="/path/to/avatar.jpg"
              />
            </Box>
            <Typography variant="h6" align="center">
              Kapil Yadav
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary">
              singhkapil347@gmail.com
            </Typography>
            <List>
              <ListItem button onClick={handleEditProfile}>
                <ListItemText primary="Edit Details" />
              </ListItem>
            </List>
          </Box>
        </Grid>

        <Grid item xs={12} md={8} lg={9}>
            <YearCalendarHeatmap></YearCalendarHeatmap>
          {showEditProfile ? (
            <EditProfile />
          ) : (
            <Typography variant="h5" align="center">
              Welcome to your profile
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
