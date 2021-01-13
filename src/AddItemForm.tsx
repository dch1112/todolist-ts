import React, {ChangeEvent, FunctionComponent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

interface OwnProps {
  addItem: (title: string) => void
}

type Props = OwnProps;

const AddItemForm: FunctionComponent<Props> = (props) => {

  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const addItem = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle) {
      props.addItem(trimmedTitle)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(null)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addItem()
  }

  return (<div>
    <TextField
      placeholder={'Title'}
      variant={"outlined"}
      value={title}
      onChange={onChangeHandler}
      onKeyPress={onKeyPressHandler}
      error={!!error}
      helperText={error}
    />
    <IconButton
      color={"primary"}
      onClick={addItem}>
      <AddBox/>
    </IconButton>
  </div>);
};

export default AddItemForm;