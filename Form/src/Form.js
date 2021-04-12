import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import WorkIcon from "@material-ui/icons/Work";
import CheckIcon from "@material-ui/icons/Check";
import "./form.css";
import list from "./cities.json";
import { connect } from "react-redux";
import { loadData } from "./actions/index";

import {
  Container,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import GridContainer from "./GridContainer";
import GridItem from "./GridItem";
import GroupIcon from "@material-ui/icons/Group";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PersonIcon style={{ width: "15px", height: "15px" }} />,
    2: <WorkIcon style={{ width: "15px", height: "15px" }} />,
    3: <CheckIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Primary Details", "Official Details", "Final Preview Before Submit"];
}

function CustomizedSteppers(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [orgName, setOrgName] = React.useState("");
  const [exp, setExp] = React.useState();
  const [sal, setSal] = React.useState();
  const [age, setAge] = React.useState();
  const [errors, setErrors] = React.useState({
    firstName: "",
    middleName: "",
    lastName: "",
    orgName: "",
    exp: "",
    sal: "",
    age: "",
  });
  const [formErrors, setFormErrors] = React.useState(false);
  const [buttonActive, setButtonActive] = React.useState(true);

  React.useEffect(() => {
    console.log(props);
    let states = [];
    for (let state in list) {
      states.push(state);
    }
    setStates(states);
  }, []);

  const change = (e) => {
    e.preventDefault();
    let fName = firstName;
    let lName = lastName;
    let mName = middleName;
    let oName = orgName;
    let ex = exp;
    let slry = sal;
    let pAge = age;
    const { name, value } = e.target;
    let err = errors;
    switch (name) {
      case "firstName":
        fName = value;
        err.firstName =
          value.length < 3 || value.match(/[0-9 \W]/)
            ? "First Name should be min 3 characters long and only contain alphabets"
            : null;
        setFirstName(value);
        break;
      case "middleName":
        mName = value;
        err.middleName =
          value.length < 3 || value.match(/[0-9 \W]/)
            ? "First Name should be min 3 characters long and only contain alphabets"
            : null;
        setMiddleName(value);
        break;
      case "lastName":
        lName = value;
        err.lastName =
          value.length < 3 || value.match(/[0-9 \W]/)
            ? "Last name should be min 3 characters long and only contain alphabets"
            : null;
        setLastName(value);
        break;

      case "orgName":
        oName = value;
        err.orgName =
          value.length < 3
            ? "Organization name should be atleast 3 characters long"
            : null;
        setOrgName(value);
        break;

      case "Experience":
        ex = value;
        err.exp =
          String(value).length == 0 ||
          value <= 0 ||
          !String(value).match(/^[1-9][0-9]*$/)
            ? "Experience is required to be filled and should NOT start with zero"
            : null;
        setExp(value);

        break;
      case "Age":
        pAge = value;
        err.age =
          String(value).length == 0 ||
          value <= 0 ||
          !String(value).match(/^[1-9][0-9]*$/)
            ? "Age is required and should be greater than 0 and should NOT start with zero"
            : null;
        setAge(value);

        break;
      case "Salary":
        slry = value;
        err.sal =
          String(value).length == 0 ||
          value <= 0 ||
          !String(value).match(/^[1-9][0-9]*$/)
            ? "Salary field is required and should NOT start with zero"
            : null;
        setSal(value);
      default:
        break;
    }

    if (activeStep == 0) {
      if (
        err.firstName == null &&
        err.lastName == null &&
        err.middleName == null &&
        selectedCity != "" &&
        selectedState != "" &&
        fName != "" &&
        mName != "" &&
        lName != ""
      ) {
        setButtonActive(false);
      } else {
        setButtonActive(true);
      }
    } else if (activeStep == 1) {
      if (
        err.orgName == null &&
        err.exp == null &&
        err.sal == null &&
        err.age == null &&
        oName != "" &&
        ex != "" &&
        slry != "" &&
        pAge != ""
      ) {
        setButtonActive(false);
        setFormErrors(true);
      } else {
        setButtonActive(true);
        setFormErrors(false);
      }
    }

    setErrors(err);
  };
  const handleStateSelect = (e) => {
    let cities = [];

    for (let state in list) {
      if (state == e.target.getAttribute("data-value")) {
        for (let city of list[state]) {
          cities.push(city);
        }
        break;
      }
    }
    setCities(cities);
    setSelectedState(e.target.getAttribute("data-value"));
    if (activeStep == 0) {
      setButtonActive(true);
    }
  };

  const handleCitySelect = (e) => {
    setSelectedCity(e.target.getAttribute("data-value"));
    if (activeStep == 0) {
      if (
        errors.firstName == null &&
        errors.lastName == null &&
        errors.middleName == null &&
        selectedState != "" &&
        firstName != "" &&
        middleName != "" &&
        lastName != ""
      ) {
        setButtonActive(false);
      } else {
        setButtonActive(true);
      }
    }
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <Container maxWidth="sm" style={{ marginBottom: 30 }}>
              <form noValidate autoCapitalize="off">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <span style={{ float: "left" }}>
                      First Name <sup style={{ color: "red" }}>*</sup>
                    </span>
                    <TextField
                      id="firstName"
                      placeholder="Enter First Name.."
                      fullWidth
                      type="text"
                      required
                      name="firstName"
                      size="small"
                      error={errors.firstName}
                      helperText={errors.firstName}
                      autoFocus
                      onChange={(e) => change(e)}
                      value={firstName}
                      variant="outlined"
                      inputProps={{ style: { fontSize: 12 } }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <PermIdentityIcon style={{ color: "#006699" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <span style={{ float: "left" }}>
                      Middle Name <sup style={{ color: "red" }}>*</sup>
                    </span>
                    <TextField
                      id="middleName"
                      placeholder="Enter Middle Name"
                      fullWidth
                      size="small"
                      type="text"
                      name="middleName"
                      error={errors.middleName}
                      helperText={errors.middleName}
                      onChange={(e) => change(e)}
                      value={middleName}
                      variant="outlined"
                      inputProps={{ style: { fontSize: 12 } }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <GroupIcon style={{ color: "#006699" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <span style={{ float: "left" }}>
                      Last Name <sup style={{ color: "red" }}>*</sup>
                    </span>
                    <TextField
                      required
                      id="lastName"
                      placeholder="Enter Last Name"
                      fullWidth
                      size="small"
                      type="text"
                      name="lastName"
                      error={errors.lastName}
                      helperText={errors.lastName}
                      onChange={(e) => change(e)}
                      value={lastName}
                      variant="outlined"
                      inputProps={{ style: { fontSize: 12 } }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <PermIdentityIcon style={{ color: "#006699" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <span style={{ float: "left" }}>
                      State<sup style={{ color: "red" }}>*</sup>
                    </span>

                    <Select
                      id="countriesLabel"
                      variant="outlined"
                      labelId="demo-simple-select-label"
                      size="small"
                      fullWidth
                      value={selectedState}
                      style={{ height: "40px" }}
                    >
                      {states && states ? (
                        states.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              value={item}
                              onClick={(e) => handleStateSelect(e)}
                            >
                              {item}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <span>LOADING..</span>
                      )}
                    </Select>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <span style={{ float: "left" }}>
                      City<sup style={{ color: "red" }}>*</sup>
                    </span>
                    <Select
                      id="citiesLabel"
                      labelId="demo-simple-select-label"
                      size="small"
                      fullWidth
                      variant="outlined"
                      value={selectedCity}
                      style={{ height: "40px" }}
                    >
                      {cities && cities.length ? (
                        cities.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              value={item}
                              onClick={(e) => handleCitySelect(e)}
                            >
                              {item}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <span>Select State First</span>
                      )}
                    </Select>
                  </GridItem>
                </GridContainer>
              </form>
            </Container>
          </div>
        );
      case 1:
        return (
          <div>
            <Container maxWidth="sm" style={{ marginBottom: 50 }}>
              <form noValidate autoCapitalize="off">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <span style={{ float: "left" }}>
                      Organization Name <sup style={{ color: "red" }}>*</sup>
                    </span>

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      autoFocus
                      required
                      placeholder="Enter Organization Name (As per goverment fillings)"
                      id="orgName"
                      name="orgName"
                      error={errors.orgName}
                      helperText={errors.orgName}
                      autoFocus
                      variant="outlined"
                      onChange={(e) => change(e)}
                      value={orgName}
                      inputProps={{ style: { fontSize: 12 } }}
                    />
                  </GridItem>
                </GridContainer>
                <div style={{ height: "10px", display: "block" }}></div>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <span style={{ float: "left" }}>
                      Experience (Years) <sup style={{ color: "red" }}>*</sup>
                    </span>

                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Enter Experience"
                      type="number"
                      required
                      id="Experience"
                      name="Experience"
                      variant="outlined"
                      min="0"
                      error={errors.exp}
                      helperText={errors.exp}
                      onChange={(e) => change(e)}
                      value={exp}
                      inputProps={{ style: { fontSize: 12 } }}
                    />
                  </GridItem>
                </GridContainer>
                <div style={{ height: "10px", display: "block" }}></div>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <span style={{ float: "left" }}>
                      Salary(Rupees)<sup style={{ color: "red" }}>*</sup>
                    </span>

                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Enter your Salary"
                      type="number"
                      required
                      variant="outlined"
                      id="Salary"
                      name="Salary"
                      min="0"
                      error={errors.sal}
                      helperText={errors.sal}
                      onChange={(e) => change(e)}
                      value={sal}
                      inputProps={{ style: { fontSize: 12 } }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <span style={{ float: "left" }}>
                      Age<sup style={{ color: "red" }}>*</sup>
                    </span>

                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Enter Your Age.."
                      type="number"
                      id="Age"
                      name="Age"
                      minimum="0"
                      error={errors.age}
                      helperText={errors.age}
                      variant="outlined"
                      onChange={(e) => change(e)}
                      value={age}
                      inputProps={{ style: { fontSize: 12 } }}
                    />
                  </GridItem>
                </GridContainer>
              </form>
            </Container>
          </div>
        );
      case 2:
        return (
          <>
            <div>
              <Container maxWidth="sm" style={{ marginBottom: 30 }}>
                <form noValidate autoCapitalize="off">
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <span style={{ float: "left" }}>
                        First Name <sup style={{ color: "red" }}>*</sup>
                      </span>
                      <TextField
                        disabled
                        fullWidth
                        type="text"
                        size="small"
                        value={firstName}
                        variant="outlined"
                        inputProps={{ style: { fontSize: 12 } }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <PermIdentityIcon style={{ color: "#006699" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <span style={{ float: "left" }}>
                        Middle Name <sup style={{ color: "red" }}>*</sup>
                      </span>
                      <TextField
                        disabled
                        fullWidth
                        size="small"
                        type="text"
                        name="middleName"
                        value={middleName}
                        variant="outlined"
                        inputProps={{ style: { fontSize: 12 } }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <GroupIcon style={{ color: "#006699" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <span style={{ float: "left" }}>
                        Last Name <sup style={{ color: "red" }}>*</sup>
                      </span>
                      <TextField
                        disabled
                        fullWidth
                        size="small"
                        type="text"
                        value={lastName}
                        variant="outlined"
                        inputProps={{ style: { fontSize: 12 } }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <PermIdentityIcon style={{ color: "#006699" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <span style={{ float: "left" }}>
                        State<sup style={{ color: "red" }}>*</sup>
                      </span>

                      <Select
                        id="countriesLabel"
                        variant="outlined"
                        labelId="demo-simple-select-label"
                        size="small"
                        fullWidth
                        value={selectedState}
                        style={{ height: "40px" }}
                        disabled
                      >
                        <MenuItem
                          value={selectedState}
                          onClick={(e) => handleStateSelect(e)}
                        >
                          {selectedState}
                        </MenuItem>
                      </Select>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <span style={{ float: "left" }}>
                        City<sup style={{ color: "red" }}>*</sup>
                      </span>
                      <Select
                        disabled
                        id="citiesLabel"
                        labelId="demo-simple-select-label"
                        size="small"
                        fullWidth
                        variant="outlined"
                        value={selectedCity}
                        style={{ height: "40px" }}
                      >
                        <MenuItem value={selectedCity}>{selectedCity}</MenuItem>
                      </Select>
                    </GridItem>
                  </GridContainer>
                </form>
              </Container>
            </div>

            <div>
              <Container maxWidth="sm" style={{ marginBottom: 50 }}>
                <form noValidate autoCapitalize="off">
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <span style={{ float: "left" }}>
                        Organization Name <sup style={{ color: "red" }}>*</sup>
                      </span>

                      <TextField
                        fullWidth
                        disabled
                        size="small"
                        type="text"
                        variant="outlined"
                        value={orgName}
                        inputProps={{ style: { fontSize: 12 } }}
                      />
                    </GridItem>
                  </GridContainer>
                  <div style={{ height: "10px", display: "block" }}></div>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <span style={{ float: "left" }}>
                        Experience (Years) <sup style={{ color: "red" }}>*</sup>
                      </span>

                      <TextField
                        disabled
                        fullWidth
                        size="small"
                        type="number"
                        variant="outlined"
                        value={exp}
                        inputProps={{ style: { fontSize: 12 } }}
                      />
                    </GridItem>
                  </GridContainer>
                  <div style={{ height: "10px", display: "block" }}></div>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <span style={{ float: "left" }}>
                        Salary(Rupees)<sup style={{ color: "red" }}>*</sup>
                      </span>

                      <TextField
                        disabled
                        fullWidth
                        size="small"
                        type="number"
                        variant="outlined"
                        value={sal}
                        inputProps={{ style: { fontSize: 12 } }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <span style={{ float: "left" }}>
                        Age<sup style={{ color: "red" }}>*</sup>
                      </span>

                      <TextField
                        disabled
                        fullWidth
                        size="small"
                        variant="outlined"
                        disabled
                        value={age}
                        inputProps={{ style: { fontSize: 12 } }}
                      />
                    </GridItem>
                  </GridContainer>
                </form>
              </Container>
            </div>
          </>
        );
      default:
        return "Unknown step";
    }
  };

  const handleNext = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (!formErrors) {
      setButtonActive(true);
    }
    if (activeStep === steps.length - 1) {
      props.loadData();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setButtonActive(false);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="form_container">
      <div className={classes.root}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <strong>{label}</strong>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div className="form">
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div className="buttons">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  disabled={buttonActive}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = ({ isLoading, success, error }) => ({
  isLoading,
  success,
  error,
});
const mapDispatchToProps = (dispatch) => ({
  loadData: () => dispatch(loadData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedSteppers);
