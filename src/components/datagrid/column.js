import { Link, Box, Checkbox } from '@mui/material';
import { Rating } from '@mui/material';
import { GridCheckIcon, GridCloseIcon } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Index', width: 80 },
  { field: 'problemId', headerName: 'Problem ID', width: 80 },
  {
    field: 'problemStatement', 
    headerName: 'Problem Statement',
    width: 350,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link href={params.row.problemLink} target="_blank" rel="noopener">
        {params.value}
      </Link>
    ),
  },
  {
    field: 'attempted',
    headerName: 'Attempted',
    type: 'boolean',
    width: 100,
    editable: true,
    renderCell: (params) => {
      return params.value ? (
        <GridCheckIcon
          style={{
            color: "green",
          }}
        />
      ) : (
        <GridCloseIcon
          style={{
            color: "red",
          }}
        />
      );
    },
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
  {
    field: 'topic', 
    headerName: 'Topic', 
    width: 200,
    align: 'center',
    headerAlign: 'center',
  },
];

export default columns;
