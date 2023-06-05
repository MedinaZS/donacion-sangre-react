

const BlockButton = ({ title }) => {
    return (
        <div className="d-grid pt-1 my-4">
            <button type='submit' className="btn btn-danger btn-block fw-bold" >{title}</button>
        </div>
    )
}

export default BlockButton