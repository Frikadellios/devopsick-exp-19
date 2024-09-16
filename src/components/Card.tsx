export function Card() {
  const [state, setState] = useState(0)
  return (
    <>
      <h1>
        React:
        {state}
      </h1>
      <button className="bg-chiter text-foreground" type="button" onClick={() => setState(state + 1)}>
        Add
      </button>
    </>
  )
}
