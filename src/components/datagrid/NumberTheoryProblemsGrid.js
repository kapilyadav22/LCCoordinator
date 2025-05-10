import { useEffect, useRef, useState } from 'react';

import { Grid } from '@mui/material';
import { backtracking_LLMSEARCH, NUMBERTHEORY } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';
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
    const res = await getData(backtracking_LLMSEARCH + search);
        // if(res.success) {
          // setChatData(res.data);
          return res;
        // }
        
        setLoading(false);
  }

  return (
    <Grid container direction="column">
        
      <Grid item xs={12}>
      <CommonDataGrid
        title="NumberTheory Problems"
        dataFetchUrl={NUMBERTHEORY}
      />
    </Grid>
  </Grid>
);
}


export default NumberTheoryProblemsGrid;
