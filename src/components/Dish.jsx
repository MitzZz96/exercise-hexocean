import React from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Button,
  Select,
  MenuItem,
  TextField,
  Box,
  Slider,
  Typography,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import axios from "axios";
import { useForm } from "react-hook-form";

const Dish = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [dish, setDish] = React.useState({
    preparation_time: "01:30:22",
  });
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [time, setTime] = React.useState();

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setDish({ ...dish, [e.target.name]: e.target.value });
  };

  const handleTextFieldChange = (e) => {
    setDish({ ...dish, [e.target.name]: e.target.value });
  };

  // const handleTimeFieldChange = (e) => {
  //   // setDish({ ...dish, [e.target.name]: e.target.value });
  //   console.log("123");
  // };

  const handleSubmitForm = (e) => {
    axios
      .post(
        "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
        dish
      )
      .then((response) => console.log(response) & alert("Success!"))
      .catch((err) => console.log(err) & alert("Error:" + err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={400}
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow="5px 5px 10px #ccc"
        >
          <h1>Dish Form</h1>

          <FormGroup>
            <FormControl required>
              <TextField
                margin="normal"
                id="dish-name"
                label="Dish name"
                variant="outlined"
                name="name"
                onChange={handleTextFieldChange}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                required
              />
            </FormControl>
            <FormControl required>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimeField
                  margin="normal"
                  label="Preparation time *"
                  value={time}
                  format="HH:mm:ss"
                  name="preparation_time"
                  onChange={(newTime) => {
                    setTime(new Date(newTime));
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl required>
              <InputLabel id="dish-type">Dish type</InputLabel>
              <Select
                margin="normal"
                labelId="dish-type"
                id="dish-type"
                name="type"
                value={selectedOption}
                label="Dish type"
                onChange={handleChange}
                required
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"pizza"}>Pizza</MenuItem>
                <MenuItem value={"soup"}>Soup</MenuItem>
                <MenuItem value={"sandwich"}>Sandwich</MenuItem>
              </Select>
            </FormControl>

            {selectedOption === "pizza" && (
              <>
                <FormControl required>
                  <TextField
                    id="no-slices"
                    label="Number of slices"
                    type="number"
                    name="no_of_slices"
                    margin="normal"
                    onChange={handleTextFieldChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </FormControl>
                <FormControl required>
                  <TextField
                    id="diameter"
                    margin="normal"
                    label="Diameter"
                    type="number"
                    name="diameter"
                    onChange={handleTextFieldChange}
                    inputProps={{ step: "0.1", lang: "en-US" }}
                    required
                  />
                </FormControl>
              </>
            )}

            {selectedOption === "soup" && (
              <Box>
                <Typography gutterBottom>Spiciness scale</Typography>
                <Slider
                  aria-label="Spiciness scale"
                  defaultValue={3}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  name="spiciness_scale"
                  min={1}
                  max={10}
                  onChange={handleTextFieldChange}
                  required
                />
              </Box>
            )}

            {selectedOption === "sandwich" && (
              <FormControl required>
                <TextField
                  id="slices-of-bread  "
                  label="Slices of bread "
                  type="number"
                  name="slices_of_bread"
                  margin="normal"
                  onChange={handleTextFieldChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </FormControl>
            )}
          </FormGroup>

          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            Send
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Dish;
