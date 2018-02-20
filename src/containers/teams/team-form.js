import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { FormControl, FormLabel } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';

import { RenderField, RenderRadio } from '../../utilities/fields-cmp';
import ValidateForm from '../../utilities/validators';

import { userFormStyles } from '../users/styles';

const fields = ["color", "name"];

const validate = values => {
    let valiadator = new ValidateForm(fields);
    let errors = valiadator.validate(values);
    return errors
}

class TeamForm extends Component {
    static propType = {
        classes: PropTypes.object.isRequired,
    };

    state = {
        selectedColor: undefined,
    };

    handleChange = (event) => {
        this.setState({ selectedColor: event.target.value });
    }

    render() {
        const { classes, handleSubmit, pristine, reset, submitting } = this.props;
        const colors  = ["#29BF12", "#08BDBD", "#F21B3F", "#FF9914", "#D64933", "#7F2982"];
        return (
            <Grid container justify="center">
                <Grid item xs={8} lg={3}>
                    <Card className={classes.card}>
                        <CardHeader title="Create a new Team" />
                        <form onSubmit={handleSubmit} className={classes.form}>
                        <CardContent className={`${classes.cardContent} ${classes.widthTeamCnt}`} >
                            <Field
                                name="name"
                                component={RenderField}
                                label="fullname"
                            />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Color</FormLabel>
                                <div className={classes.cntFields}>
                                    {colors.map((color, index) => {
                                        let bgColor = {
                                            backgroundColor: color,
                                            display: 'block',
                                            width: '100%',
                                            height: '100%',
                                            cursor: 'pointer'
                                        };
                                        return (
                                            <Paper className={classes.cntColor} key={index}>
                                                <label key={index+1} style={ bgColor }>
                                                    <Field
                                                        name="color"
                                                        component={RenderRadio}
                                                        type="radio"
                                                        style={{ hide: classes.hide, centered: classes.cntCentered }}
                                                        value={color}
                                                    />
                                                </label>
                                            </Paper>
                                        )
                                    })}
                                </div>
                            </FormControl>
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <Button onClick={reset} disabled={ pristine || submitting }>Cancel</Button>
                            <div className={classes.wrapperBtn}>
                                <Button
                                    variant="raised"
                                    color="primary"
                                    disabled={pristine || submitting}
                                    type="submit"
                                >
                                    create team
                                </Button>
                                {submitting &&
                                    <CircularProgress size={24} className={classes.submittingForm} />
                                }
                            </div>
                        </CardActions>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

TeamForm = reduxForm({ form: 'userForm', validate })(TeamForm);

export default withStyles(userFormStyles, { name: 'userForm' })(TeamForm);