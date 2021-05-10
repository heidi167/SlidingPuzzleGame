export default function Tile (props) {
  const v = props.value; 
  return (
    <>
      {v === -1 
      ? <div 
          className="tile" 
          onClick={() => props.onClick(v)}
          >
        </div>
      : <div 
        className="tile"
          onClick={()=> props.onClick(v)} 
        >
      {v}</div>
      }
    </>
  )
}