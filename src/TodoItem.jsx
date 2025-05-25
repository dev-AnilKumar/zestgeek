import './todoitem.css';

function TodoItem({ todo, editprop, editval, editChange, onUpdate, onEdit, onDelete }) {
  const { id, title, completed, important, archived, isEditing } = todo;


  function handleEditValue(id) {
    return () => {
      onEdit(id);
    }
  };

  function handleEditChange(e) {
    editChange(e.target.value)
  }

  if (isEditing) {

    return <div key={todo.id} className='edit_box'>
      <input type="text" value={editval} onChange={handleEditChange} />
      <button onClick={handleEditValue(todo.id)}>Save</button>
      <button onClick={() => { onUpdate(todo.id, { isEditing: false }); editChange("") }}>Cancel</button>
    </div>

  } else {

    return (
      <div className={`todo-item ${completed ? 'completed' : ''}`}>
        <div className='todo-title'>
          <input type="checkbox" checked={completed} onChange={() => onUpdate(id, { completed: !completed })} />
          <span className={important ? 'important' : ''}>{title}</span>
        </div>
        <br />
        <div className="actions">
          <button className='star' onClick={() => onUpdate(id, { important: !important })}>
            ⭐
          </button>

          <button onClick={() => onUpdate(id, { archived: !archived })}>
            Archive
          </button>

          {!completed && <button onClick={() => editprop(id)}>
            Edit
          </button>}

          <button onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default TodoItem;
