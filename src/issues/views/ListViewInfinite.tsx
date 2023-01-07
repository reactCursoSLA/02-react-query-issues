import { useState } from 'react';


import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces';
import { useIssuesInfinite } from '../hooks';



export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>()

  const { issuesQuery } = useIssuesInfinite({ state, labels: selectedLabels });;

  const onLabelChanged = (labelName: string) => {
    (selectedLabels.includes(labelName))
      ? setSelectedLabels(selectedLabels.filter(label => label !== labelName)) // si existe el labelName en el array, lo quitamos
      : setSelectedLabels([...selectedLabels, labelName]); // si no existe el labelName en el array, lo agregamos
  }

  return (
    <div className="row mt-5">

      <div className="col-8">
        {
          issuesQuery.isLoading ?
            <LoadingIcon /> :
            <IssueList
              issues={issuesQuery.data?.pages.flat() || []}
              state={state}
              onStateChanged={setState}
            />
        }

        <button className='btn btn-outline-primary mt-2'
        // disabled={!issuesQuery.hasNextPage}
        // onClick={() => issuesQuery.fetchNextPage()}
        >
          Load More...
        </button>


      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  )
}
