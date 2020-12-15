import React, {ChangeEvent, FunctionComponent, useState} from 'react';

interface OwnProps {
  value: string
  getNewTitle: (title:string) =>void
}

type Props = OwnProps;

const EditableSpan: FunctionComponent<Props> = (props) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(props.value)
  const onEditMode = () => {
    setEditMode(true)
  }
  const offEditMode = () => {
    setEditMode(false)
    title.trim() && props.getNewTitle(title.trim())
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  return (editMode
      ? <input type="text"
               value={title}
               onBlur={offEditMode}
               onChange={onChangeHandler}
               autoFocus/>
      : <span onClick={onEditMode}>{title}</span>
  );
};

export default EditableSpan;
