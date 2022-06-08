import './Header.css';

export const Notes = ({task}) => {
    return(
        <div className='notes-card'>
            <p className='note-heading'>{task.task}</p>
            <p className='note-description'>{task.description}</p>
            <div className='notes-date'>{new Date(task.createdAt).toLocaleString('en-US')}</div>
        </div>
    )
}