const Filter = ({valor, alCambiar})=>{
    return(
    <div>filter shown with <input
        value={valor}
        onChange={alCambiar}
    />
    </div>
    )
}

export default Filter