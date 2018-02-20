import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import List, {
    ListItem,
    ListItemSecondaryAction
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Save from 'material-ui-icons/Save';

import ValidateForm from '../../utilities/validators';
import { RenderField } from '../../utilities/fields-cmp';

const fields = ["todo"];

const validate = values => {
    let valiadator = new ValidateForm(fields);
    let errors = valiadator.validate(values);
    return errors
}

const TodoForm = (props) => {
    const { handleSubmit, pristine, submitting, team } = props;
    console.log('pristine || submitting', pristine, submitting);
    return (
        <List component="div" disablePadding>
            <ListItem dense button style={{paddingLeft: '4.5em', paddingRight: '4em'}}>
                <form onSubmit={handleSubmit} autoComplete="off" style={{width: '100%'}}>
                    <Field
                        id={team.name}
                        label={`New TODO for ${team.name}`}
                        multiline
                        rowsMax="4"
                        name={`todo_${team.id}`}
                        component={RenderField}
                        style={{width: '100%'}}
                    />
                    <ListItemSecondaryAction>
                        <IconButton type="submit" aria-label="Comments" disabled={pristine || submitting}>
                            <Save />
                        </IconButton>
                    </ListItemSecondaryAction>
                </form>
            </ListItem>
        </List>
    );
}

TodoForm.propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    team: PropTypes.object
};

export default reduxForm({ form: 'TodoForm', validate })(TodoForm);
