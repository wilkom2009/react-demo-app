import React from "react";
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
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CustomDialog from "./Dialog";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

export default function PublicPage() {
  const classes = useStyles();

  const { age, setAge } = React.useState("");
  const history = useHistory();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedDate1, setSelectedDate1] = React.useState(new Date());

  const initValues = {
    email: "",
    password: "aa",
    me: 10,
    remember: false,
    dat: selectedDate,
    dat1: selectedDate1,
  };
  const { register, handleSubmit, control } = useForm({
    defaultValues: initValues,
  });
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };

  const onSubmit = (data) => {
    data.dat = selectedDate;
    data.dat1 = selectedDate1;
    alert(JSON.stringify(data));
    //history.push("/edit/"+data.me);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <CustomDialog history={history} />
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
            {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register}
          /> */}
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
            {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
          /> */}
            {/* <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="age"
            inputRef={register}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select> */}

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

            <FormControlLabel
              control={
                <Controller
                  name="remember"
                  control={control}
                  defaultValue={false}
                  color="primary"
                  render={(props) => (
                    <Checkbox
                      onChange={(e) => props.onChange(e.target.checked)}
                      checked={props.value}
                    />
                  )} // props contains: onChange, onBlur and value
                />
              }
              label="Remember me"
            />

            <Controller
              id="dat"
              name="dat"
              control={control}
              render={(props) => (
                <KeyboardDatePicker
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              )} // props contains: onChange, onBlur and value
            />
            <Controller
              id="dat1"
              name="dat1"
              control={control}
              render={(props) => (
                <KeyboardDatePicker
                  format="dd/MM/yyyy"
                  value={selectedDate1}
                  onChange={handleDateChange1}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              )} // props contains: onChange, onBlur and value
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </MuiPickersUtilsProvider>
        </form>
      </div>
    </Container>
  );
}
