import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import { CircularProgress } from 'material-ui/Progress';
import { FormControlLabel } from 'material-ui/Form';

import { RenderField, RenderSelect, RenderItemList } from '../../utilities/fields-cmp';
import ValidateForm from '../../utilities/validators';

import { userFormStyles } from '../users/styles';
import { getAllTeams } from '../teams/actions';
import { getAllUsers } from '../users/actions';

const fields = ['description', 'teamId', 'teamMemberId', 'notes'];

const validate = values => {
    let validator = new ValidateForm(fields);
    let errors = validator.validate(values);
    return errors;
}

class TaskForm extends Component {
    state = {
        withNotes: false,
    };

    componentDidMount(){
        this.props.dispatch(getAllUsers());
        this.props.dispatch(getAllTeams());
    }

    handleChange = () => {
        this.setState({ withNotes: !this.state.withNotes });
    }

    render() {
        const { classes, handleSubmit, pristine, reset, invalid, submitting, users, teams } = this.props;
        const { withNotes } = this.state;
        const formWidht = withNotes ? 6 : 3;
    
        return (
            <Grid container justify="center">
                <Grid item xs={8} lg={formWidht}>
                    <Card className={classes.card}>
                        <CardHeader title="Create a new Task" />
                        <form onSubmit={handleSubmit} className={classes.form}>
                        <CardContent className={`${classes.cardContent} ${classes.widthTeamCnt} ${classes.widthTaskCnt}`} >
                            <Grid item xs={12} lg={withNotes ? 6 : 12}>
                                <Field
                                    name="description"
                                    multiline={true}
                                    rowsMax="4"
                                    component={RenderField}
                                    label="description"
                                    style={{width: '100%'}}
                                />
                                <Field
                                    label="team"
                                    name="teamId"
                                    component={RenderSelect}
                                    items={teams}
                                />
                                <Field
                                    label="user"
                                    name="teamMemberId"
                                    component={RenderSelect}
                                    items={users}
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.withNotes}
                                            onChange={this.handleChange}
                                            aria-label="addNotes"
                                        />
                                    }
                                    label="Do you want to add notes?"
                                />
                            </Grid>
                            {withNotes &&
                                <Grid item xs={12} lg={withNotes ? 6 : 12} style={{ padding: '0 1em' }}>
                                    <FieldArray name="notes" component={RenderItemList} itemName="note" />
                                </Grid>
                            }
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <Button onClick={reset} disabled={ pristine || submitting }>Cancel</Button>
                            <div className={classes.wrapperBtn}>
                                <Button
                                    variant="raised"
                                    color="primary"
                                    disabled={pristine || submitting || invalid}
                                    type="submit"
                                >
                                    create Task
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

const mapStateToProps = state => ({
    loading: state.dashboard.loadingTask,
    users: state.user.users,
    teams: state.team.teams,
});

TaskForm = reduxForm({ form: 'taskForm', validate })(TaskForm);

export default compose(
    withStyles(userFormStyles, { name: 'TaskForm' }),
    connect(mapStateToProps)
)(TaskForm);
