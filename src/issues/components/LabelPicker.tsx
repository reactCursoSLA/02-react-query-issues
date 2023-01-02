import { useLabels } from "../hooks/useLabels";




export const LabelPicker = () => {
  const labelsQuery = useLabels();

  if (labelsQuery.isLoading) //! por qué isLoading y no isFetching
    return (<h1>Loading ...</h1>);


  return (
    <>
      {
        labelsQuery.data?.map(label => (
          <span
            key={label.id}
            // className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) ? 'label-active' : ''}`}
            className="badge rounded-pill m-1 label-picker"
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
            // onClick={() => onChange(label.name)}
          >
            {label.name}
          </span>
        ))
      }
    </>
  )
}
