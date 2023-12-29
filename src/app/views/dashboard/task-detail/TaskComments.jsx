import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  TextField,
  Avatar,
  Card
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";

const TaskComment = () => {
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
    comment
  } = state;

  const textField = {
    width: '100%',
    marginBottom: '15px'
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <>
          <Box style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
            <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" style={{ marginRight: '15px' }} />
            <TextField
              type="text"
              name="comment"
              placeholder="Add a comment"
              onChange={handleChange}
              value={comment || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
              style={textField}
            />
          </Box>
          <Box style={{ display: 'flex', flexDirection: 'row', flex: 1, paddingLeft: '55px' }}>
            <Button color="primary" variant="contained" type="submit">
              <Span sx={{ textTransform: "capitalize" }}>Save</Span>
            </Button>
            <Button color="secondary" variant="contained" type="reset">
              <Icon>close</Icon>
            </Button>
          </Box>

          <Box style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
            <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" style={{ marginRight: '15px' }} />

            <div>
              <p><strong>Jane Doe</strong> <i>3 hours ago</i></p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              <p><strong>Edit</strong> <strong>Delete</strong></p>
            </div>
          </Box>
        </>
      </ValidatorForm>


    </div>
  );
};

export default TaskComment;