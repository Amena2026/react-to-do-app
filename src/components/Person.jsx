const Person = ({name, number, deleteUser}) => {
    return (
        <div>
            {name} : {number} <button onClick={deleteUser}>delete</button>
        </div>
    )
}

export default Person