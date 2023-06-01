
const EmptyListMessage = ({ title }) => {
    return (
        <p className="text-center my-5 fs-3 text-secondary">
            <i className="bi bi-exclamation-circle-fill fs-2 me-3"></i>
            No hay {title} en este momento
        </p>
    )
}

export default EmptyListMessage