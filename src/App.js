import React, { useState } from 'react';
import { Row, Col, Checkbox } from 'antd';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('todo')))
  const [edit, setEdit] = useState({})
  const [inputValue, setinputValue] = useState('')
  const onAdd = () => {
    if (inputValue !== '') {
      const nowData = [
        {
          id: uuidv4(),
          value: inputValue,
          success: false
        }, ...data]
      setinputValue('')
      setData(nowData)
    }
    localStorage.setItem('todo', JSON.stringify(data))
  }
  const updateInputValue = (event) => {
    setinputValue(event.target.value)
  }
  const onEnter = (event) => { if (event.key === 'Enter') { onAdd() } }
  const onCheck = (id) => {
    let mockData = [...data]
    for (let i = 0; i < data.length; i++) {
      if (mockData[i].id === id) {
        mockData[i] = { ...mockData[i], success: !mockData[i].success }
      }
    }
    setData(mockData)
    localStorage.setItem('todo', JSON.stringify(mockData))
  }

  const updateInputValueEdit = (event) => {
    setEdit({ ...edit, value: event.target.value })
  }
  const onEdit = (id) => {
    setEdit({ id: id, value: data.find(item => { return item.id === id }).value })
  }
  const onCancel = (id) => {
    if (edit.id === id) { setEdit('') }
  }
  const onSave = () => {
    let mockData = [...data]

    for (let i = 0; i < data.length; i++) {
      if (mockData[i].id === edit.id) {
        mockData[i] = { ...mockData[i], value: edit.value }
      }
    }
    setEdit('')
    setData(mockData)
    localStorage.setItem('todo', JSON.stringify(mockData))
  }

  const onDelete = (id) => {
    const newData = data.filter(item => { return item.id !== id })
    setData(newData)
    localStorage.setItem('todo', JSON.stringify(newData))
  }

  return (
    <div className="App">
      <h1>TO DO LIST</h1>
      <input value={inputValue} onChange={updateInputValue} onKeyDown={onEnter}></input>
      <button className="Add" onClick={onAdd}>Add</button>
      {data.map((item, index) => (
        <div className="item" key={index}>
          <Row justify='space-between' align='middle'>
            <Col>
              <Row gutter={8} align='middle'>
                <Col><Checkbox checked={item.success} onChange={() => { onCheck(item.id) }}></Checkbox></Col>
                <Col>{item.id === edit.id ?
                  <Row align='middle' gutter={8}>
                    <Col>
                      <input value={edit.value} className="inputOnly" onChange={updateInputValueEdit}></input>
                    </Col>
                    <Col><div className="btn-item" onClick={onSave}>Save</div></Col>
                    <Col><div className="btn-item" onClick={() => { onCancel(item.id) }}>Cancel</div></Col>
                  </Row>
                  : <div className="txtvalue" >{item.value}</div>}
                </Col>
              </Row>
            </Col>
            {edit.id !== item.id &&
              < Col >
                <Row gutter={8}>
                  <Col>
                    <div className="btn-item" onClick={() => { onEdit(item.id) }}>edit</div>
                  </Col>
                  <Col>
                    <div className="btn-item" onClick={() => { onDelete(item.id) }}>x</div>
                  </Col>
                </Row>
              </Col>
            }
          </Row>
        </div>
      ))
      }

    </div >
  );
}

export default App;
