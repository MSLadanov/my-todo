type Row = {
    field: string,
    value: string,
}

function ReadableRow({field, value} : Row ){
    return (
        <div>
            <p>{value}</p>
        </div>
    )
}

export default ReadableRow