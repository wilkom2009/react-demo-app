import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useParams,
  useLocation,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initValues = {
  email: "kiki@yahoo.fr",
  password: "koko",
  me: 10,
  id: 4,
};
const initValues0 = {
  email: "",
  password: "",
  me: 30,
  id: 4,
};

export default function EditPage() {
  const { id } = useParams();
  const classes = useStyles();
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: initValues0,
  });

  const d = id;
  useEffect(() => {
    const fields = ["id", "email", "password", "me"];
    initValues.me = d;
    fields.forEach((field) => setValue(field, initValues[field]));
  }, []);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit page : {id}
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            as={TextField}
            control={control}
            name="email"
            color="primary"
            defaultValue=""
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
          />

          <Controller
            as={TextField}
            control={control}
            name="password"
            defaultValue=""
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
          />

          <Controller
            name="me"
            control={control}
            color="primary"
            render={(props) => (
              <Select
                fullWidth
                onChange={(e) => props.onChange(e.target.value)}
                value={props.value}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            )} // props contains: onChange, onBlur and value
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
