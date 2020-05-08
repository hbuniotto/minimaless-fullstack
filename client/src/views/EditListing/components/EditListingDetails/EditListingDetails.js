import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListDetails from './components/ListDetails'
import Pictures from './components/Pictures';
import PriceList from './components/PriceList';
import AlertNotify from './components/AlertNotify';
import { Grid, Stepper, Step, StepLabel, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
  },
  btnGroup: {
    textAlign: 'center',
    marginTop: 50,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  btnCancle: {
    marginLeft: 20,
     color: 'red'
  }
}));

function getSteps() {
  return ['Listing Details', 'Pictures', 'Price & List'];
}

const EditListingDetails = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const [formState, setFormState] = useState({
    isValid: true,
    values: {
      title: '',
      brand: '',
      description: '',
      size: '',
      condition: '',
      category: '',
      occasion: '',
      color: '',
      price: ''
    },
    images: [],
    imagasSuccess: false
  });

  useEffect(() => {
    Axios.get('/api/listings').then(res => {
      res.data.lists.map(list => {
        if(list._id === props.match.params.id) {
          setFormState(formState => ({
            ...formState,
            images: list.images,
            values: {
              ...formState.values,
              title: list.title,
              brand: list.brand,
              description: list.description,
              size: list.size,
              condition: list.condition,
              category: list.category,
              occasion: list.occasion,
              color: list.color,
              price: list.price
            },
          }));
        }
      })
    }).catch(err => {
      console.log(err)
    })
  }, [])

// console.log(formState.images)
   
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = () => {
    const listingData = {
      title: formState.values.title,
      brand: formState.values.brand,
      description: formState.values.description,
      size: formState.values.size,
      condition: formState.values.condition,
      category: formState.values.category,
      occasion: formState.values.occasion,
      color: formState.values.color,
      price: formState.values.price,
      images: formState.images
    }
    Axios.patch(`/api/listings/${props.match.params.id}`, listingData)
      .then(res => {
        setTimeout(() => {
          props.history.push('/Account')
        }, 1000);
      })
      .catch(err => {
        console.log(err)
      })
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isFormValid = (data) => {
    const {title, brand, description, size, condition, category, occasion, color} = data

    if(!title || !brand || !description || !size || !condition || !category || !occasion || !color) {
      return true
    }
    return false
  };

  useEffect(() => {
    const errors = isFormValid(formState.values);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
    }));
  };

  const imagesHandler = (images) => {
    setFormState(formState => ({
      ...formState,
      images
    }));
  }

  const handleUpdateCancle = () => {
    props.history.push('/Account')
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ListDetails handleChange={handleChange} formState={formState} />;
      case 1:
        return <Pictures formState={formState} imagesHandler={images => imagesHandler(images)} reset={formState.imagasSuccess} />;
      case 2:
        return <PriceList handleChange={handleChange} formState={formState} />;
      default:
        return 'What are you trying to do!?';
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <div>
        {activeStep === steps.length ? (
          <AlertNotify  />
        ) : (
          <div>
            <Grid className={classes.instructions}>{getStepContent(activeStep)}</Grid>
            <div className={classes.btnGroup}>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
            {
            activeStep === 0 ? 
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!formState.isValid}
                className={classes.buttonNext}
              >Next</Button>
              <Button onClick={handleUpdateCancle} className={classes.btnCancle}>
              Cancle Update
            </Button>
            </> : ''
            }
            {
            activeStep === 1 ? 
            <>
              <Button
                variant="contained"
                color="primary"
                disabled={formState.images.length !== 5}
                onClick={handleNext}
                className={classes.buttonNext}
              >Next</Button>
              <Button disabled={formState.images.length !== 5} onClick={handleUpdateCancle} className={classes.btnCancle}>
              Cancle Update
            </Button>
            </> : ''
            }
            {
            activeStep === 2 ? 
            <>
              <Button
                variant="contained"
                color="primary"
                disabled={formState.values.price === ''}
                onClick={handleSubmit}
                className={classes.buttonNext}
              >Finish</Button>
              <Button onClick={handleUpdateCancle} className={classes.btnCancle}>
              Cancle Update
            </Button>
            </> : ''
            }
            {/* <Button onClick={handleUpdateCancle} className={classes.btnCancle}>
              Cancle Update
            </Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(EditListingDetails)

// REFACTOR REDIRECT TO LISTINS PAGE