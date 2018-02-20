import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Dashboard from 'material-ui-icons/Dashboard';
import Person from 'material-ui-icons/Person';
import People from 'material-ui-icons/People';

export const routerListItems = (
    <div>
        <Link to="/dashboard">
            <ListItem button>
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
            </ListItem>
        </Link>
        <Link to="/members">
            <ListItem button>
                    <ListItemIcon>
                        <Person />
                    </ListItemIcon>
                    <ListItemText primary="Members" />
            </ListItem>
        </Link>
        <Link to="/teams">
            <ListItem button>
                    <ListItemIcon>
                        <People />
                    </ListItemIcon>
                    <ListItemText primary="Teams" />
            </ListItem>
        </Link>
    </div>
);
