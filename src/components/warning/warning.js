import "./warning.css"

const Warning = ({setShowMobile, message}) => {

    return (
        <div className='warning-message-div'>
            <span>{message}</span>
            <br/>
            {/*<button onClick={()=>setShowMobile(true)}>Ой та ладно, покажіть криву мобільну версію</button>*/}
        </div>
    )
}

export default Warning;