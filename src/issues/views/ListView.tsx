import { useState } from 'react';

import { useIssues } from '../hooks';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces';


export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>()

  const { issuesQuery , page, nextPage, prevPage } = useIssues({ state, labels: selectedLabels });

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
              issues={issuesQuery.data || []}
              state={state}
              onStateChanged={setState}
            />
        }

        <div className='d-flex mt-2 justify-content-between align-items-center'>
          <button
            className='btn btn-outline-primary'
            disabled={issuesQuery.isFetching}  // si esta cargando, deshabilitamos el boton
            onClick={prevPage}
          >
            Prev
          </button>

          <span>{page}</span>

          <button
            className='btn btn-outline-primary'
            disabled={issuesQuery.isFetching}
            onClick={nextPage}
          >
            Next
          </button>
        </div>


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
