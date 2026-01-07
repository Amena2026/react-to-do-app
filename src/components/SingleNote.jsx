const SingleNote = ({id, content}) => {
    return (
        <div>
            <li key={id}>{content}</li>
        </div>
    )
}

export default SingleNote
