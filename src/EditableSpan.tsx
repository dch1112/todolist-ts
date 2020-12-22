import React, {ChangeEvent, FunctionComponent, useState} from 'react';
import {TextField} from "@material-ui/core";

interface OwnProps {
  value: string
  getNewTitle: (title: string) => void
}

type Props = OwnProps;

const EditableSpan: FunctionComponent<Props> = (props) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(props.value)
  const onEditMode = () => {
    setEditMode(true)
  }
  const offEditMode = () => {
    if (title.trim()) {
      props.getNewTitle(title.trim())
    } else setTitle(props.value.trim())
    setEditMode(false)
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  return (editMode
      ? <TextField
        // variant={"outlined"}
        value={title}
        onBlur={offEditMode}
        onChange={onChangeHandler}
        autoFocus/>
      : <span onClick={onEditMode}>{title}</span>
  );
};

export default EditableSpan;
