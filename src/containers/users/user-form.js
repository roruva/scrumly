import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import { CircularProgress } from 'material-ui/Progress';

import { RenderField, RenderDropzoneInput } from '../../utilities/fields-cmp';
import ValidateForm from '../../utilities/validators';

import { userFormStyles } from './styles';

const fields = ["name", "username", "birthDate"];

const validate = values => {
    let validator = new ValidateForm(fields);
    let errors = validator.validate(values);
    return errors;
}

class UserForm extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func,
        pristine: PropTypes.bool,
        reset: PropTypes.func,
        submitting: PropTypes.bool,
    };

    state = {
        withAvatar: false,
        avatarFinal: null,
    };
    handleDateChange = date => {
        this.setState({ selectedDate: date })
    }

    render() {
        const { classes, handleSubmit, pristine, reset, submitting } = this.props;
        let { withAvatar, avatarFinal } = this.state;
        let widthForm = withAvatar ? 6 : 12;
    
        return (
            <Grid container justify="center">
                <Grid item xs={12} lg={4}>
                    <Card className={classes.card}>
                        <CardHeader title="Create a new Member" />
                        <form onSubmit={handleSubmit} className={classes.form}>
                        <Grid item xs={12} lg={12} className={classes.wrapperForm}>
                            <Grid item xs={widthForm} lg={widthForm} className={classes.wrapperForm}>
                                <CardContent className={classes.cardContent}>
                                    <Field name="name" component={RenderField} label="fullname" />
                                    <Field name="username" component={RenderField} label="username" />
                                    <Field name="bithdate" component={RenderField} label="bithdate" type="date" />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={withAvatar}
                                                onChange={(event, checked) => this.setState({ withAvatar: checked })}
                                            />
                                        }
                                        label="Upload avatar ?"
                                    />
                                </CardContent>
                            </Grid>
                            {withAvatar &&
                                <Grid item xs={widthForm} lg={widthForm} className={classes.wrapperForm}>
                                    <div className={classes.uploadAvatar}>
                                        <Field name="avatar" label="avatar" component={RenderDropzoneInput} styles={classes}/>
                                    </div>
                                </Grid>
                            }
                            {avatarFinal && 
                                <Grid item xs={widthForm} lg={widthForm} className={classes.wrapperForm}>
                                    <CardMedia
                                        className={classes.avatarFinal}
                                        image="https://www.elintra.com.ar/u/fotografias/fotosnoticias/2017/10/31/81758.jpg"
                                        />
                                </Grid>
                            }
                        </Grid>
                        <CardActions className={classes.cardActions}>
                            <Button onClick={reset} disabled={ pristine || submitting }>Cancel</Button>
                            <div className={classes.wrapperBtn}>
                                <Button
                                    variant="raised"
                                    color="primary"
                                    disabled={pristine || submitting}
                                    type="submit"
                                >
                                    create user
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

UserForm = reduxForm({ form: 'userForm', validate })(UserForm);

export default withStyles(userFormStyles, { name: 'UserForm' })(UserForm);