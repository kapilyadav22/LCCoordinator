import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';

const columns = [
  { field: 'problemId', headerName: 'Problem ID', width: 80, align: 'center' },
  {
    field: 'problemStatement', 
    headerName: 'Problem Statement',
    width: 350,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
      href={params.row.problemLink}
      target="_blank"
      rel="noopener"
      sx={{
        // color: 'problem.statement', 
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline', 
        },
      }}
    >
      {params.value}
    </Link>
    ),
  },
  // {
  //   field: 'attempted',
  //   headerName: 'Attempted',
  //   type: 'boolean',
  //   width: 100,
  //   editable: true,
  //   // renderCell: (params) => {
  //   //   return params.value ? (
  //   //     <GridCheckIcon
  //   //       style={{
  //   //         color: "green",
  //   //       }}
  //   //     />
  //   //   ) : (
  //   //     <GridCloseIcon
  //   //       style={{
  //   //         color: "red",
  //   //       }}
  //   //     />
  //   //   );
  //   // },
  // },
  {
    field: 'topic', 
    headerName: 'Topic', 
    width: 200,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'revision',
    headerName: 'Revision',
    width: 150,
    renderCell: (params) => (
      <Box>
        <Rating
          value={params.value}
          // onChange={(event, newValue) => 
          //   params.api.setEditCellValue({ id: params.id, field: 'revision', value: newValue }, event)
          // }
          readOnly
          max={5}
          precision={1}
        // onClick={(event) => event.stopPropagation()} 
        />

      </Box>
    ),
    editable: true,
    type: 'number',
  },
];

export default columns;
