type Row = {
    field: string,
    value: string,
}

function EditableRow({field, value} : Row ){
    return (
        <div>
            <p>{value}</p>
        </div>
    )
}

export default EditableRow