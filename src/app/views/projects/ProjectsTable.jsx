import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  useTheme,
  Avatar,
  Hidden,
  Grid
} from "@mui/material";

import { useState } from "react";
import { Paragraph } from 'app/components/Typography';
import { CLIENT_URL } from 'config/dev';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { MD5 } from 'crypto-js';

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: '32px !important',
  height: '32px !important',
  border: '1px solid black'
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

const subscribarList = [
  {
    name: "john doe",
    date: "18 january, 2019",
    amount: 1000,
    status: "close",
    company: "ABC Fintech LTD.",
  },
  {
    name: "kessy bryan",
    date: "10 january, 2019",
    amount: 9000,
    status: "open",
    company: "My Fintech LTD.",
  },
  {
    name: "kessy bryan",
    date: "10 january, 2019",
    amount: 9000,
    status: "open",
    company: "My Fintech LTD.",
  },
  {
    name: "james cassegne",
    date: "8 january, 2019",
    amount: 5000,
    status: "close",
    company: "Collboy Tech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
];

const PaginationTable = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    projectErrorMessage,
    projectSuccessMessage,
    projectList
  } = useSelector((state) => state.Projects);

  console.log(projectList)

  const { myInfo } = useSelector((state) => state.Authors);

  const handleViewDetails = (projectId) => {
    window.location.href = `${CLIENT_URL}/project-details/${projectId}`;
  };

  const handleViewTasks = (projectId) => {
    window.location.href = `${CLIENT_URL}/tasks/${projectId}`;
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Project Title</TableCell>
            <TableCell align="left">Start Date</TableCell>
            <TableCell align="left">Est. End Date</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Members</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectList && projectList.length > 0 ? (
            projectList.map((project, index) => (
              <TableRow key={index}>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <Avatar src={project.coverImage.url} />
                    <Paragraph sx={{ m: 0, ml: 4 }}>{project.title}</Paragraph>
                  </Box>
                </TableCell>
                <TableCell align="left">{project.startedOn}</TableCell>
                <TableCell align="left">{project.completedOn}</TableCell>
                <TableCell align="left">
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
                <TableCell align="left">
                  <Hidden smDown>
                    <Grid item xs={3}>
                      <Box display="flex" position="relative" marginLeft="-0.875rem !important">
                        {project.members && project.members.length > 0 ? (
                          project.members.map((member, index) => (
                            <Tooltip title={member.name} placement="top">
                              <StyledAvatar key={index} src={`https://gravatar.com/avatar/${MD5(member.email).toString()}?s=200&d=mp&r=x`} />
                            </Tooltip>
                          ))
                        ) : (
                          null
                        )}
                        <StyledAvatar sx={{ fontSize: '14px' }}>+3</StyledAvatar>
                      </Box>
                    </Grid>
                  </Hidden>
                </TableCell>

                <TableCell align="center">
                  <Tooltip title="View Details" placement="top">
                    <IconButton onClick={() => { navigate(`/project-details/${project.id}`) }}>
                      <Icon color="primary">keyboard_arrow_right</Icon>
                    </IconButton>
                  </Tooltip>
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
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={subscribarList.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
  );
};

export default PaginationTable;
