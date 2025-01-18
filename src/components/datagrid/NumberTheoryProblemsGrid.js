import React, { useEffect, useRef, useState } from 'react';

import { backtracking_LLMSEARCH, BLOGSURL, NUMBERTHEORY } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';
import { Grid2, Paper, Typography } from '@mui/material';
import { Button, TextField, Box } from '@mui/material';
import { getData } from '../../utils/httpRequestUtils';
const NumberTheoryProblemsGrid = () => {
  const [search, setSearch] = useState('');
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatDialogOpen, setChatDialogOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messageEndRef = useRef(null);

    // useEffect(() => {
    //   const interval = setInterval(async () => {
    //     const message = await handleSearchClick();
    //     if (message) {
    //       setMessages((prevMessages) => [
    //         ...prevMessages,
    //         { type: 'bot', text: message },
    //       ]);
    //     }
    //   }, 3000); 
  
    //   return () => clearInterval(interval);
    // }, [searchButtonClicked]);

  // useEffect(() => { 
  //   if(chatData.length > 0) {
  //     setChatDialogOpen(true);
  //   }
  // }, [search]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSearch = (e) => {
    // setSearchButtonClicked(false);
    setSearch(e.target.value);
  }

  const handleSearchClick = async () => {
    // setSearchButtonClicked(true);
    // setChatData([]);
    console.log("hii");
    console.log(search);
    const res = await getData(backtracking_LLMSEARCH + search);
        // if(res.success) {
          // setChatData(res.data);
          return res;
        // }
        
        setLoading(false);
  }

  return (
    <Grid2 container direction="column">
    <Grid2 item xs={12} sx={{display: 'flex', alignItems: 'center',justifyContent: 'center' }}>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60%' }}>
        <TextField
          size="small"
          placeholder="Search problems..."
          variant="outlined"
          sx={{ mr: 1 }}
          fullWidth
          value={search}
          onChange={handleSearch}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </Box>

 {messages &&  
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          marginBottom: 2,
        }}
      >
        {messages.map((msg, index) => (
          <Paper
            key={index}
            sx={{
              padding: 1.5,
              maxWidth: '70%',
              marginLeft: msg.type === 'bot' ? 'auto' : 0,
              backgroundColor: msg.type === 'bot' ? '#f1f1f1' : '#d1e7dd',
            }}
          >
            <Typography variant="body1">{msg.text}</Typography>
          </Paper>
        ))}
        <div ref={messageEndRef} />
      </Box>
} 
      {/* <ChatDialog open={chatDialogOpen} onClose={() => setChatDialogOpen(false)} /> */}
      </Grid2>
      <Grid2 item xs={12}>
      <CommonDataGrid
        title="NumberTheory Problems"
        dataFetchUrl={NUMBERTHEORY}
      />
    </Grid2>
  </Grid2>
);
}


export default NumberTheoryProblemsGrid;
