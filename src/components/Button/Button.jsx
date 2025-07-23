import "./Button.css"

function Button({title, className, type="button"}) {
  return (
    <>
        <button className={className} type={type}>{title}</button>
    </>
  )
}

export default Button