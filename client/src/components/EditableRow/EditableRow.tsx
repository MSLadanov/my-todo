type Row = {
    key: string,
    value: string,
}

function EditableRow({key, value} : any ){
    console.log(key, value)
    return (
        <div>
            <h1>Item</h1>
        </div>
    )
}

export default EditableRow