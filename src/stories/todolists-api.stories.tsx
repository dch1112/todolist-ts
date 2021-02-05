import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
  title: 'API'
}
const api_key = '7227d9f4-40b2-435d-852d-029544fc42e7'
export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.getTodolists()
      .then((res) => {
          setState(res.data)
        }
      )
  }, [])
  return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const title = 'REACT'
    todolistAPI.createTodolist(title)
      .then((res) => {
        setState(res.data.data.item)
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistID = 'f79d1f2d-369e-4c39-a3d4-3964478cf6c5'
    todolistAPI.deleteTodolist(todolistID)
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistID = '002d71ba-70d0-4d3b-91c5-6a2e195873df'
    const title = 'REACT>>'
    todolistAPI.updateTodolist(todolistID, title)
      .then((res) => setState(res.data))
  }, [])

  return <div> {JSON.stringify(state)}</div>
}