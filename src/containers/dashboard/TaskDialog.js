import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
// import Slide from 'material-ui/transitions/Slide';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import ExpandMore from 'material-ui-icons/ExpandMore';
import IconButton from 'material-ui/IconButton';
import ExpandLess from 'material-ui-icons/ExpandLess';


class TaskDialog extends Component {
  handleClose = () => {
    this.props.onClose();
  }

  render() {
    const { onClose, task, toggleNotes, ...other } = this.props;
    let contenDialog = (
        <Typography noWrap>{task.description}</Typography>
    );
    if (task.notes && task.notes.length) {
        contenDialog = (
            <List>
                <ListItem button >
                    <ListItemText primary={task.description} />
                    <ListItemSecondaryAction>
                        {task.notes && task.notes.length > 0 ?
                            <IconButton onClick={() => toggleNotes(task)}>
                                {task.showNotes ?
                                    <ExpandLess /> :
                                    <ExpandMore />
                                }
                            </IconButton> :
                            null
                        }
                    </ListItemSecondaryAction>
                </ListItem>
                {task.showNotes? <Divider /> : null}
                <Collapse in={task.showNotes} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {task.notes.map((note, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={note} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </List>
        )
    }

    return (
        <Dialog
            onClose={this.handleClose}
            aria-labelledby="taskDialog"
            {...other}
        >
            <DialogTitle id="taskDialog">Task</DialogTitle>
            {task &&
                <DialogContent >
                    {contenDialog}
                </DialogContent>
            }
        </Dialog>
    );
  }
}

TaskDialog.propTypes = {
//   classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  toggleNotes: PropTypes.func,
  task: PropTypes.object,
};

export default TaskDialog;
