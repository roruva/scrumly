import React from 'react';

import Grid from 'material-ui/Grid';
import List, {
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction
} from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import NoteAdd from 'material-ui-icons/NoteAdd';
import Cancel from 'material-ui-icons/Cancel';

import TodoForm from './todoForm';

const TeamsList = ({ teams, toggleTodo, toggleTodoForm, addTodo }) => (
    <List component="nav" style={{ marginTop: '2em' }} >
        {teams.map( (team, index) => 
            <Grid item xs={6} lg={4} key={index} style={{ marginBottom: '1em' }}>
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar
                            style={{
                                backgroundColor: team.color,
                            }}
                            />
                    </ListItemAvatar>
                    <ListItemText inset primary={team.name} />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="AddTodo">
                            {team.showTodoForm ?
                                <Cancel
                                    style={{ fill: 'gray' }}
                                    onClick={() => toggleTodoForm(team)}
                                /> :
                                <NoteAdd
                                    style={{ fill: 'gray' }}
                                    onClick={() => toggleTodoForm(team)}
                                />
                            }
                        </IconButton>
                            
                        {team.toDo.length > 0 ?
                            <IconButton aria-label="Comments">
                                {team.showTodo ?
                                    <ExpandLess onClick={() => toggleTodo(team)}/> :
                                    <ExpandMore onClick={() => toggleTodo(team)}/>
                                }
                            </IconButton> :
                            null
                        }
                    </ListItemSecondaryAction>
                </ListItem>
                {team.showTodo? <Divider /> : null}
                <Collapse in={team.showTodo} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem dense button style={{paddingLeft: '2em'}}>
                            <Checkbox
                                // checked={this.state.checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                            />
                            <ListItemText inset primary="Starred" />
                        </ListItem>
                    </List>
                </Collapse>
                <Divider inset component="li" />
                <Collapse in={team.showTodoForm} timeout="auto" unmountOnExit>
                    <TodoForm onSubmit={addTodo} team={team}/>
                </Collapse>
            </Grid>
        )}
        </List>
)

export default TeamsList;