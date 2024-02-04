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
  const { error, successMessage, authenticate, token, myInfo } = useSelector((state) => state.Authors)

  const { taskErrorMessage, taskSuccessMessage, taskList } = useSelector((state) => state.Tasks);

  // console.log(taskList);

  const [drawerState, setDrawerState] = useState(false);
  const [drawerData, setDrawerData] = useState(null);

  const columns = [
    {
      field: 'taskName',
      headerName: 'Task Name',
      width: 700,
      editable: false
    },
    {
      field: 'assignee',
      headerName: 'Assignee',
      width: 200,
      editable: false,
      renderCell: (params) => (
        <>
          {/* {console.log(params.formattedValue)} */}
          <Hidden smDown>
            <Grid item xs={3}>
              <Box display="flex" position="relative" marginLeft="-0.875rem !important">
                {params && params.formattedValue && params.formattedValue.map((assignee, i) => (
                  <StyledAvatar key={i} title={assignee.name} src={assignee.picture.url} />
                ))}
              </Box>
            </Grid>
          </Hidden>
        </>
      )
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      sortable: true,
      editable: false,
      width: 150,
      renderCell: (params) => (
        <>
          {/* console.log(params) */}
          {params && params.formattedValue && (
            new Date(params.formattedValue).toLocaleDateString('en-US')
          )}
        </>
      )
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      editable: false,
      width: 50,
      renderCell: (params) => (
        <>
          {/* console.log(params); */}
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => toggleDrawer(params.row.id, true)}>
              <Icon>keyboard_arrow_right</Icon>
            </IconButton>
          </Box>
        </>
      )
    }
  ];

  const rows = [];

  taskList.map(task => {
    rows.push({ id: task.id, taskName: task.taskName, taskStatus: task.taskStatus, assignee: task.authorsPerTask, dueDate: task.dueDate, action: task.id });
  })

  const toggleDrawer = (taskId, open) => {
    if (taskId) {
      const currentTask = taskList.find(task => task.id === taskId);
      setDrawerData(currentTask);
    } else {
      setDrawerData(null);
    }
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
          {drawerData ?
            <>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-around' }}>
                <IconButton aria-label="close drawer" color="error" onClick={() => { toggleDrawer(null, false) }}>
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
                <h2>{drawerData.taskName}</h2>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <h4>Assignee: </h4>
                  <Hidden smDown>
                    <Grid item xs={3}>
                      <Box display="flex" position="relative" marginLeft="-0.875rem !important">
                        {drawerData && drawerData.authorsPerTask && drawerData.authorsPerTask.map((assignee, i) => (
                          <StyledAvatar key={i} title={assignee.name} src={assignee.picture.url} />
                        ))}
                      </Box>
                    </Grid>
                  </Hidden>
                </Box>

                <h4>Due date: <small>{drawerData.dueDate}</small></h4>
                <h4>Description:</h4>
                <Box dangerouslySetInnerHTML={{ __html: drawerData.taskDescription.html }}></Box>
              </Box>
            </>
            :
            <>
              <Box sx={{ padding: '20px' }}>
                <h2>Invalid task</h2>
              </Box>
            </>
          }
        </Box>
      </Drawer >
    </Box >
  );
};

export default TaskCards;