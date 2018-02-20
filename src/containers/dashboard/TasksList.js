import React from 'react';

import Grid from 'material-ui/Grid';
import List, {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    ListItemIcon
} from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { MenuList, MenuItem } from 'material-ui/Menu';
import { Manager, Target, Popper } from 'react-popper';
import Grow from 'material-ui/transitions/Grow';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Edit from 'material-ui-icons/Edit';
import Delete from 'material-ui-icons/Delete';
import MoreVert from 'material-ui-icons/MoreVert';

import { formatDate, isDateToday } from '../../utilities/time-oprations';

const TasksList = ({ tasks, users, toggleNotes, toggleTaskOpts, addTodo }) => (
    <List component="div" style={{ marginTop: '2em' }} >
        {tasks.map( (task, index) => {
            let usr = {};
            users.forEach((user, index) => {
                if(user.id === task._teamMember){ usr = user }
            });
            let isNotToday = !isDateToday(task.createdAt);
            let moreInfo = (
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="caption" component="span" >{usr.username}</Typography>
                    {isNotToday &&
                        <Chip
                            component="span"
                            label={formatDate(task.createdAt, 'MM-DD')}
                            style={{
                                height: 'auto',
                                marginLeft: '1em',
                                borderRadius: '3px',
                                color: 'rgba(255, 255, 255, 0.7)',
                            }}
                        />
                    }
                </span>
            )
            return (
                <Grid item xs={6} lg={4} key={index} >
                    <ListItem button >
                        <ListItemText
                            primary={task.description}
                            secondary={moreInfo}
                        />
                        <ListItemSecondaryAction>
                            <Manager>
                                <Target>
                                    <IconButton aria-owns={task._id}>
                                        <MoreVert onClick={() => toggleTaskOpts(task)}/>
                                    </IconButton>
                                </Target>
                            {task.showOpts &&
                                <Popper
                                    placement="bottom-start"
                                    eventsEnabled={task.showOpts}
                                    className={!task.showOpts? {pointerEvents: 'None'} : null }
                                >
                                    <ClickAwayListener onClickAway={() => toggleTaskOpts(task)}>
                                        <Grow in={task.showOpts} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                                            <Paper style={{zIndex: 2}}>
                                                <MenuList id={task._id}>
                                                    <MenuItem onClick={() => toggleTaskOpts(task)}>
                                                        <ListItemIcon >
                                                            <Delete />
                                                        </ListItemIcon>
                                                        <ListItemText inset primary="Delete Note" />
                                                    </MenuItem>
                                                    <MenuItem onClick={() => toggleTaskOpts(task)}>
                                                        <ListItemIcon >
                                                            <Edit />
                                                        </ListItemIcon>
                                                        <ListItemText inset primary="Edit Note" />
                                                    </MenuItem>
                                                </MenuList>
                                            </Paper>
                                        </Grow>
                                    </ClickAwayListener>
                                </Popper>
                            }
                            </Manager>
                            {task.notes && task.notes.length > 0 ?
                                <IconButton aria-label="Comments">
                                    {task.showNotes ?
                                        <ExpandLess onClick={() => toggleNotes(task)}/> :
                                        <ExpandMore onClick={() => toggleNotes(task)}/>
                                    }
                                </IconButton> :
                                null
                            }
                        </ListItemSecondaryAction>
                        
                    </ListItem>
                    {task.showNotes? <Divider inset /> : null}
                    <Collapse inset in={task.showNotes} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {task.notes && task.notes.map((note, index) => (
                                <ListItem key={index} dense button >
                                    <ListItemText inset primary={note} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </Grid>
            );
        })}
    </List>
)

export default TasksList;