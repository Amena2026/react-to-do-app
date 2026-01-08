const Filter = ({filteredInput, onChange}) => {
    return (
        <input value={filteredInput} onChange={onChange} />
    )
}

export default Filter