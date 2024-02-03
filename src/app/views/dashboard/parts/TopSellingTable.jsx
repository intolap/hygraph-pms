import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  Tooltip
} from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import { CLIENT_URL } from 'config/dev';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const TopSellingTable = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    projectErrorMessage,
    projectSuccessMessage,
    projectList
  } = useSelector((state) => state.Projects);
  // console.log(projectList)
  const { myInfo } = useSelector((state) => state.Authors);

  const handleViewDetails = (projectId) => {
    window.location.href = `${CLIENT_URL}/project-details/${projectId}`;
  };

  const handleViewTasks = (projectId) => {
    window.location.href = `${CLIENT_URL}/tasks/${projectId}`;
  };

  // console.log(projectList);

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Projects</Title>
        {/* <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select> */}
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }} colSpan={4}>
                Project Title
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Start Date
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Status
              </TableCell>
              <TableCell sx={{ px: 0, textAlign: 'center' }} colSpan={1}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {projectList && projectList.length > 0 ? (
              projectList.map((project, index) => (
                <TableRow key={index} hover >
                  <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                    <Box display="flex" alignItems="center">
                      <Avatar src={project.coverImage.url} />
                      <Paragraph sx={{ m: 0, ml: 4 }}>{project.title}</Paragraph>
                    </Box>
                  </TableCell>

                  <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                    {project.startedOn}
                  </TableCell>

                  <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                    {project.projectStatus === 'OnHold' ? (
                      <Small bgcolor={bgSecondary}>On Hold</Small>
                    ) : (
                      project.projectStatus === 'OnTrack' ? (
                        <Small bgcolor={bgPrimary}>On Track</Small>
                      ) : (
                        project.projectStatus === 'OffTrack' ? (
                          <Small bgcolor={bgError}>Off Track</Small>
                        ) : (
                          <Small bgcolor={bgPrimary}>Complete</Small>
                        )
                      )
                    )}
                  </TableCell>

                  <TableCell sx={{ px: 0 }} colSpan={1}>
                    <Tooltip title="View Details" placement="top">
                      {/* <IconButton onClick={() => handleViewDetails(project.id)}> */}
                      <IconButton onClick={() => { navigate(`/project-details/${project.id}`) }}>
                        <Icon color="primary">keyboard_arrow_right</Icon>
                      </IconButton>
                    </Tooltip>

                    {/* <Tooltip title="View Tasks" placement="top">
                      <IconButton onClick={() => navigate(`../tasks/${project.id}`)}>
                        <Icon color="primary">format_list_bulleted</Icon>
                      </IconButton>
                    </Tooltip> */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow hover >
                <TableCell colSpan={9} align="center" sx={{ px: 0 }}>
                  <Box display="flex" alignItems="center">
                    No projects assigned to you yet.
                  </Box>
                </TableCell>
              </TableRow>
            )
            }
          </TableBody>
        </ProductTable>
      </Box>
    </Card >
  );
};

export default TopSellingTable;
