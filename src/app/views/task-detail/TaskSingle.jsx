import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  TextField,
  Autocomplete,
  OutlinedInput,
  InputLabel,
  MenuItem,
  ListItemText,
  Select,
  Checkbox,
  styled
} from "@mui/material";

import { Span, H4 } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from 'app/components';
import { useEffect, useState } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import TaskComments from "./TaskComments";

import { createFilterOptions } from '@mui/material/Autocomplete';

const AutoComplete = styled(Autocomplete)(() => ({
  width: 300,
  marginBottom: '16px',
}));

const suggestions = [
  { label: 'Open' },
  { label: 'InProgress' },
  { label: 'Complete' },
  { label: 'Closed' }
];

const filter = createFilterOptions();

const TaskSingle = () => {
  const [state, setState] = useState({ date: new Date() });

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const {
    taskName,
    taskDescription,
    gender,
  } = state;

  const textField = {
    width: '100%',
    marginBottom: '15px'
  };

  // All assignees
  const assignees = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 }
  ];


  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={8} md={8} sm={12} xs={12} sx={{ mt: 2 }}>
            <SimpleCard title="Task Detail">
              <TextField
                type="text"
                name="taskName"
                placeholder="Task Name"
                onChange={handleChange}
                value={taskName || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
                style={textField}
              />

              <TextField
                type="text"
                name="taskDescription"
                placeholder="Task Description"
                onChange={handleChange}
                value={taskDescription || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
                style={textField}
              />

              <Button color="primary" variant="contained" type="submit" sx={{ marginRight: '15px' }}>
                <Span >Save</Span>
              </Button>

              <Button color="inherit" type="reset">
                <Span >Cancel</Span>
              </Button>

              <H4 sx={{ textTransform: "capitalize", marginTop: "30px", marginBottom: "30px" }}>All comments</H4>

              <TaskComments />
            </SimpleCard>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 2 }}>
            <SimpleCard title="Other Details">
              <h3>Due Date: <span style={{ fontWeight: 'normal' }}>01/18/2019 12:00AM</span></h3>

              <h3>Priority: <span style={{ fontWeight: 'normal' }}>Medium</span></h3>

              <AutoComplete
                options={suggestions}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Status" variant="outlined" fullWidth />
                )}
                style={{ width: '100%' }}
              />

              <Autocomplete
                multiple
                id="tags-standard"
                options={assignees}
                getOptionLabel={(option) => option.title}
                defaultValue={[assignees[1]]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Assignee"
                    fullWidth
                  />
                )}
              />

              <h3>Time Tracking</h3>
              <Button color="primary" variant="contained" type="button" sx={{ marginRight: '15px', pl: 1, pr: 1 }}>
                <Icon color="">play_circle_field</Icon> <Span >Start timer</Span>
              </Button>

              <Button color="error" variant="contained" type="button" sx={{ pl: 1, pr: 1 }}>
                <Icon color="red">stop_circle_field</Icon> <Span >Stop timer</Span>
              </Button>

              <h3>Time Spent: <span style={{ fontWeight: 'normal' }}>2 hours</span></h3>
            </SimpleCard>
          </Grid>
        </Grid>


      </ValidatorForm>
    </div>
  );
};

export default TaskSingle;