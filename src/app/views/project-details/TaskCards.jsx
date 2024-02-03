import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Fab,
  Grid,
  Hidden,
  Icon,
  IconButton,
  styled,
  useTheme,
} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { Span } from 'app/components/Typography';
import { format } from 'date-fns';
import { Fragment, useState, useEffect } from 'react';
import { CLIENT_URL } from 'config/dev';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const ProjectName = styled(Span)(({ theme }) => ({
  marginLeft: 24,
  fontWeight: '500',
  [theme.breakpoints.down('sm')]: { marginLeft: 4 },
}));

const StarOutline = styled(Fab)(() => ({
  marginLeft: 0,
  boxShadow: 'none',
  background: '#08ad6c !important',
  backgroundColor: 'rgba(9, 182, 109, 1) !important',
}));

const DateRange = styled(Fab)(({ theme }) => ({
  marginLeft: 0,
  boxShadow: 'none',
  color: 'white !important',
  background: `${theme.palette.error.main} !important`,
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: '32px !important',
  height: '32px !important',
}));

const TaskCards = () => {
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    taskErrorMessage,
    taskSuccessMessage,
    taskList
  } = useSelector((state) => state.Tasks);
  console.log(taskList)
  const { myInfo } = useSelector((state) => state.Authors);
  const [drawerState, setDrawerState] = useState(false);
  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'taskName',
      headerName: 'Task Name',
      width: 800,
      editable: true
    },
    {
      field: 'assignee',
      headerName: 'Assignee',
      width: 150,
      editable: true,
      renderCell: (params) => (
        <Hidden smDown>
          <Grid item xs={3}>
            <Box display="flex" position="relative" marginLeft="-0.875rem !important">
              <StyledAvatar src="/assets/images/face-4.jpg" />
              <StyledAvatar src="/assets/images/face-4.jpg" />
              <StyledAvatar sx={{ fontSize: '14px' }}>+3</StyledAvatar>
            </Box>
          </Grid>
        </Hidden>
      )
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      sortable: true,
      width: 100
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      width: 50,
      renderCell: (params) => (
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={() => toggleDrawer(1, true)}>
            <Icon>keyboard_arrow_right</Icon>
          </IconButton>
        </Box>
      )
    }
  ];

  const rows = [
    { id: 1, taskName: 'Snow', assignee: 'Jon', dueDate: 14, action: 14 }
  ];

  const toggleDrawer = (taskId, open) => {
    setDrawerState(open);
  };

  return (
    <Box sx={{ minHeight: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
      />

      <Drawer
        anchor={'right'}
        open={drawerState}
        onClose={() => toggleDrawer(null, false)}
      >
        <Box sx={{ height: '100vh', width: 800 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-around' }}>
            <IconButton aria-label="close drawer" color="error">
              <Icon>last_page</Icon>
            </IconButton>
            <IconButton aria-label="link" color="primary">
              <Icon>link</Icon>
            </IconButton>
            <IconButton aria-label="done all" color="success">
              <Icon>done_all</Icon>
            </IconButton>

          </Box>
          <Box sx={{ padding: '20px' }}>
            <h2>Task name</h2>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <h4>Assignee: </h4>
              <Hidden smDown>
                <Grid item xs={3}>
                  <Box display="flex" position="relative" marginLeft="0.5rem !important">
                    <StyledAvatar src="/assets/images/face-4.jpg" />
                    <StyledAvatar src="/assets/images/face-4.jpg" />
                    <StyledAvatar sx={{ fontSize: '14px' }}>+3</StyledAvatar>
                  </Box>
                </Grid>
              </Hidden>
            </Box>

            <h4>Due date: <small>12/12/2023</small></h4>
            <h4>Project: <small>Project name</small></h4>
            <h4>Description:</h4>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Box>
        </Box>
      </Drawer >
    </Box >
  );
};

export default TaskCards;