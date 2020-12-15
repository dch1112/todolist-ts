import React, {ChangeEvent, FunctionComponent, KeyboardEvent, useState} from 'react';

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
    <input value={title}
           onChange={onChangeHandler}
           onKeyPress={onKeyPressHandler}
           className={error ? 'error' : ''}/>
    <button onClick={addItem}>+</button>
    {error && <div className='error-message'>{error}</div>}
  </div>);
};

export default AddItemForm;
