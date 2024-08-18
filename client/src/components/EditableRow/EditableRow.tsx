type Row = {
    key: string,
    value: string,
}

function EditableRow({item} : any ){
    console.log(item)
    return (
        <div>
            <p>{item[1]}</p>
        </div>
    )
}

export default EditableRow