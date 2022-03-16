import React, {useState} from 'react';
import './App.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";


const item1 = {
  id: v4(),
  name: "Anand"
}
const item2 = {
  id: v4(),
  name: "Sathish"  
}
const item3 = {
  id: v4(),
  name: "Midun"  
}
const item4 = {
  id: v4(),
  name: "Gokul"  
}
const item5 = {
  id: v4(),
  name: "Jeeva"  
}
const item6 = {
  id: v4(),
  name: "Vasanth"  
}
const item7 = {
  id: v4(),
  name: "Sanjith"  
}
const item8 = {
  id: v4(),
  name: "Krishna" 
}
const item9 = {
  id: v4(),
  name: "Sakthi"  
}
const item10 = {
  id: v4(),
  name: "Ganesh" 
}

function App() {

  const [state, setState] = useState({
    "Applied": {
      title: "Applied",
      items: [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10]
    },
    "Assessment": {
      title: "Assessment",
      items: []
    },
    "HR-Round": {
      title: "HR-Round",
      items: []
    },
    "Selected": {
      title: "Selected",
      items: []
    }
  })

  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    
    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState(prev => {
      prev = {...prev}
      
      prev[source.droppableId].items.splice(source.index, 1)


     
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
  }


  return (
    <div className="App">
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return(
            <div key={key} className={"column"}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      {data.items.map((el, index) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided, snapshot) => {
                              console.log(snapshot)
                              return(
                                <div
                                  className={`item ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el.name}
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
