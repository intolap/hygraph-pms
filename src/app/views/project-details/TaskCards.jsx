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
import { Span } from 'app/components/Typography';
import { format } from 'date-fns';
import { Fragment } from 'react';
import { CLIENT_URL } from 'config/dev';

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

const taskList = [
  {
    id: 1,
    name: "john doe",
    dueDate: "18 january, 2019",
    assignees: 'Mern 1, Mern 2',
    status: "close",
    company: "Project 1",
  },
  {
    id: 2,
    name: "john doe",
    dueDate: "18 january, 2019",
    assignees: 'Mern 1, Mern 2',
    status: "close",
    company: "Project 1",
  },
  {
    id: 3,
    name: "john doe",
    dueDate: "18 january, 2019",
    assignees: 'Mern 1, Mern 2',
    status: "close",
    company: "Project 1",
  },
  {
    id: 4,
    name: "john doe",
    dueDate: "31 december, 2023",
    assignees: 'Mern 1, Mern 2',
    status: "close",
    company: "Project 1",
  },
  {
    id: 5,
    name: "john doe",
    dueDate: "18 january, 2024",
    assignees: 'Mern 1, Mern 2',
    status: "close",
    company: "Project 1",
  },
];

const handleViewTask = (taskId) => {
  window.location.href = `${CLIENT_URL}/task-detail/${taskId}`;
};

const TaskCards = () => {
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;

  return taskList.map((task) => (
    <Fragment key={task.id}>
      <Card sx={{ py: 1, px: 2 }} className="project-card">
        <Grid container alignItems="center">
          <Grid item md={5} xs={7}>
            <Box display="flex" alignItems="center">
              {/* <Checkbox /> */}
              <Hidden smDown>
                {new Date(task.dueDate) < new Date() ? (
                  // Due date has passed
                  <Icon style={{ color: 'red' }}>av_timer</Icon>
                ) : (new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24) <= 3 ? (
                  // Due date is approaching within 3 days
                  <Icon style={{ color: 'orange' }}>access_time</Icon>
                ) : (
                  // Due date is still in the future
                  <Icon style={{ color: '#1976D2' }}>access_time</Icon>
                )}
              </Hidden>
              <ProjectName>{task.name}</ProjectName>
            </Box>
          </Grid>

          <Grid item md={3} xs={4}>
            <Box color={textMuted}>{format(new Date(task.dueDate).getTime(), 'MM/dd/yyyy hh:mma')}</Box>
          </Grid>

          <Hidden smDown>
            <Grid item xs={3}>
              <Box display="flex" position="relative" marginLeft="-0.875rem !important">
                <StyledAvatar src="/assets/images/face-4.jpg" />
                <StyledAvatar src="/assets/images/face-4.jpg" />
                <StyledAvatar src="/assets/images/face-4.jpg" />
                <StyledAvatar sx={{ fontSize: '14px' }}>+3</StyledAvatar>
              </Box>
            </Grid>
          </Hidden>

          <Grid item xs={1}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={() => handleViewTask(task.id)}>
                <Icon>keyboard_arrow_right</Icon>
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Box py={1} />
    </Fragment>
  ));
};

export default TaskCards;
