
type ButtonType={
    CallBack:()=>void
    name:string
    style?: string
}

export const Button = ({CallBack,name,...props}:ButtonType)=>{
    const onClickHandler = ()=>CallBack()
    return(
        <button className={props.style} onClick={onClickHandler}>{name}</button>
    )
}