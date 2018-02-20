import React from 'react';
import Dropzone from 'react-dropzone';
import { DatePicker } from 'material-ui-pickers';
import { Field } from 'redux-form';

import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Face from 'material-ui-icons/Face';
import Check from 'material-ui-icons/Check';
import List, {
    ListItem,
    ListItemSecondaryAction,
    ListSubheader,
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui-icons/Delete';
import NoteAdd from 'material-ui-icons/NoteAdd';

export const RenderField = ({
    id,
    name,
    placeholder,
    input,
    label,
    type,
    meta: { touched, error, warning },
    style,
    ...custom
  }) => {
    if (!id) id = name;
    const isTypeDate = (type === 'date' && type !== undefined) ? true : false;

    return (
        <FormControl error={error && touched ? true : false} aria-describedby={`${id}-error`} style={{ marginBottom: '1em', width: '100%' }}>
            {isTypeDate ?
                <InputLabel htmlFor={id} shrink={true}>{label}</InputLabel> :
                <InputLabel htmlFor={id}>{label}</InputLabel>
            }
            <Input id={id} type={type} placeholder={placeholder} {...input} {...custom}/>
            {
                touched && 
                (
                    (error && <FormHelperText id={`${id}-error`} >{error}</FormHelperText> ) ||
                    (warning && <FormHelperText id={`${id}-warning`} >{warning}</FormHelperText> )
                )
            }
        </FormControl>
    );
}
// <TextField
export const RenderDatePicker = ({ input, label, ...custom }) => 
    <DatePicker
        value={input.value}
        onChange={(event, value) => input.onChange(value)}
        {...input}
        {...custom}
    />

export const RenderRadio = ({ input, style }) => 
    <FormControl className={style.centered}>
        <Input type="radio" className={style.hide} {...input} />
        { input.checked && 
            <Check
                style={{
                    fill: "white",
                    width: 25,
                    height: 25,
                }}
            /> 
        }
    </FormControl>

export const RenderSelect = ({ input,
    name,
    label,
    items,
    style,
    meta: { touched, error, warning },
}) => 
    <FormControl error={error && touched ? true : false} aria-describedby={`${name}-error`} style={{ marginBottom: '1em', width: '100%' }}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Select
            value={input.value}
            onChange={(event, value) => input.onChange(value)}
            inputProps={{
                name: name,
                id: name,
                ...input
            }}
        >
            <MenuItem key={0}></MenuItem>
            {items.map((item, index) => <MenuItem key={index+1} value={item.id}>{item.name}</MenuItem>)}
        </Select>
        {
            touched && 
            (
                (error && <FormHelperText id={`${name}-error`} >{error}</FormHelperText> ) ||
                (warning && <FormHelperText id={`${name}-warning`} >{warning}</FormHelperText> )
            )
        }
    </FormControl>


export const RenderTextarea = ({
    input,
    placeholder,
    label,
    id,
    className,
    rows,
    meta: { touched, error, warning }
  }) =>
      <div className={ (touched && error)? "form-group is-invalid" : "form-group"}>
          <label htmlFor={id}>{label}</label>
          <textarea {...input} placeholder={placeholder} className={className} rows={rows} />
          { touched && ( (error && <span className="invalid-feedback">{error}</span>) || (warning && <span>{warning}</span>) ) }
      </div>

export const RenderDropzoneInput = ({
    input,
    label,
    meta: { touched, error, warning },
    styles
}) => {
    const files = input.value;
    // (touched && error)? "form-group is-invalid" : "form-group"
    return (
        <div className={styles.cntDropzone}>
            <Dropzone
                name={label}
                accept="image/jpeg, image/png, image/gif"
                className={styles.avatarDropzone}
                activeClassName={styles.avatarDropzone}
                acceptClassName={styles.fileAccepted}
                rejectClassName={styles.fileRejected}
                onDrop={( filesToUpload, e ) => input.onChange(filesToUpload)} >
                {
                    files.length > 0 ?
                    <img src={files[0].preview} alt="avatar" className={styles.avatarPreview}/> :
                    (
                        <div>
                            <Face className={styles.icon}/>
                            <Typography variant="display1" component="p" className={styles.instructions}>Drop image here!</Typography>
                        </div>
                    )
                }
            </Dropzone>
            {touched && error && <span className={styles.invalidFeedback}>{error}</span>}
        </div>
    );
}

export const RenderItemList = ({ itemName, fields, meta: { error } })=> (
    <List
        component="div"
        disablePadding
        subheader={
            <ListSubheader style={{ display: 'flex', alignItems: 'center'}}>
                <Typography>Notes</Typography>
                <IconButton style={{ marginLeft: '1em' }}>
                    <NoteAdd onClick={() => {
                        let numEmptyField = 0;
                        fields.forEach((note, index) => {
                            if (fields.get(index) === undefined || fields.get(index) === '')
                                numEmptyField++;
                        });
                        if(numEmptyField === 0) fields.push()
                    }}
                    />
                </IconButton>
            </ListSubheader>
        }
    >   
        { fields.map((item, index) => (
            <ListItem dense button style={{ paddingRight: '3em' }} key={index}>
                <Field
                    id={`item_${index}`}
                    label={`add a new ${itemName}`}
                    multiline
                    rowsMax="4"
                    name={item}
                    component={RenderField}
                    style={{ width: '100%' }}
                />
                <ListItemSecondaryAction>
                    <IconButton disabled={!fields.get(index)}>
                        <Delete onClick={() => fields.remove(index)}/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ))}
        {error && <FormHelperText id="note-error" >{error}</FormHelperText>}
    </List>
)