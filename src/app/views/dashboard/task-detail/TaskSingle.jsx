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
  Checkbox
} from "@mui/material";
import { Span, H4 } from "app/components/Typography";
import { useEffect, useState } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import TaskComments from "./TaskComments";

const TaskSingle = () => {
  const [state, setState] = useState({ date: new Date() });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    'Open',
    'InProgress',
    'Complete',
    'Closed'
  ];

  const [personName, setPersonName] = useState([]);

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={8} md={8} sm={12} xs={12} sx={{ mt: 2 }}>
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

            <Button color="primary" variant="contained" type="submit">
              {/* <Icon>send</Icon> */}
              <Span sx={{ textTransform: "capitalize" }}>Save</Span>
            </Button>

            <Button color="secondary" variant="contained" type="reset">
              <Icon>close</Icon>
            </Button>

            <H4 sx={{ textTransform: "capitalize", marginTop: "30px", marginBottom: "30px" }}>All comments</H4>

            <TaskComments />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 2 }}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">Status</InputLabel>
              <Select
                // labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleSelectChange}
                // input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
              // MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>


      </ValidatorForm>
    </div>
  );
};

export default TaskSingle;