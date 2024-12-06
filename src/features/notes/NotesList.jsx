import { useGetNotesQuery } from './notesApiSlice';
import Note from './Note';
import useAuth from '../../hooks/useAuth'

const NotesList = () => {

  const { username, isManager, isAdmin } = useAuth()

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery(
    'notesList',
    {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true
    }
  )

  let content

  if(isLoading) {
    content = <p>Loading...</p>
  }

  if(isError) {
    content = <p className="error-msg">{error?.data?.messae}</p>
  }

  if (isSuccess) {
    const { ids, entities } = notes

    let filteredIds
    if(isManager || isAdmin) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter(noteId => entities[noteId].username === username)
    }

    const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)

    content = (
      <table className="table table-notes">
        <thead className="table-thead">
          <tr>
            <th scope="col" className="table-th note-status">Username</th>
            <th scope="col" className="table-th note-created">Created</th>
            <th scope="col" className="table-th note-updated">Updated</th>
            <th scope="col" className="table-th note-title">Title</th>
            <th scope="col" className="table-th note-username">Owner</th>
            <th scope="col" className="table-th note-edit">Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }
  return content

}

export default NotesList