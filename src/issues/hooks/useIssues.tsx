import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Issue, State } from '../interfaces';
import { sleep } from '../../helpers/sleep';
import { useEffect, useState } from 'react';


interface Props {
    state?: State;
    labels: string[];
    page?: number;
}

const getIssues = async ({ labels = [], state, page = 1 }: Props): Promise<Issue[]> => {

    // await sleep(2);

    const params = new URLSearchParams();

    if (state) params.append('state', state);

    //busqueda por label
    if (labels.length > 0) {
        const labelString = labels.join(',');
        params.append('labels', labelString);
    }

    //limitar 5
    params.append('page', page.toString());
    params.append('per_page', '5');

    const { data } = await githubApi.get<Issue[]>('/issues', { params });
    return data;

}


export const useIssues = ({ state, labels }: Props) => {

    const [page, setPage] = useState(1);

    //efecto si el estado o el label cambia reiniciar la pagina q
    useEffect(() => {
        setPage(1);
    }, [state, labels])


    const issuesQuery = useQuery(
        ['issues', { state, labels, page }],
        () => getIssues({ labels, state, page }),
    );
    //recorddar que se puede pasar dependencia onsucces en caso si deseamos capturar la data exitosa o la mala


    const nextPage = () => {
        if (issuesQuery.data?.length === 0) return;

        setPage(page + 1);

        // si quiero re disparar la peticion
        // issuesQuery.refetch();
    }

    const prevPage = () => {
        if (page > 1) setPage(page - 1);
    }



    return {
        // Properties
        issuesQuery,

        // Getter
        page: issuesQuery.isFetching ? 'Loading' : page,  // si esta cargando, mostramos 'Loading'

        // Methods
        nextPage,
        prevPage,
    }
}
