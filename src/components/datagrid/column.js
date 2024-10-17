import { Link, Box } from '@mui/material';
import { Rating } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'Index', width: 80 },
  { field: 'problemId', headerName: 'Problem ID', width: 80 },
  { field: 'problemStatement', headerName: 'Problem Statement', width: 250 },
  {
    field: 'problemLink',
    headerName: 'Problem Link',
    width: 250,
    renderCell: (params) => (
      <Link href={params.value} target="_blank" rel="noopener">
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
  { field: 'topic', headerName: 'Topic', width: 130 },
];

export default columns;
