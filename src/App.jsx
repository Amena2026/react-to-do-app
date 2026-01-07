import SingleNote from "./components/SingleNote"
// the App component takes the note array as a prop, assignes it to the notes variable, 
// and renders the content of each note to the screen
function App({notes}) {

  // we use the map function to dynamically render each note to the screen 
  // the map function is going to iterate through every note in the note array and create a singleNote component for that
  // note. for the singleNote component were passing the note content and id as props to the component 
  return (
    <div>
      <h1>Notes with the map function</h1>
      <ul>
        {notes.map(note => 
          <SingleNote key={note.id} content={note.content}/>
        )}
      </ul>
    </div>
  )
}

export default App
