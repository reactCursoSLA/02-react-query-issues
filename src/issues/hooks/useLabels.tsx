import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Label } from '../interfaces/label';
import { sleep } from '../../helpers/sleep';

const getLabels = async():Promise<Label[]> => {

    await sleep(2);

    const { data } = await githubApi.get<Label[]>('/labels?per_page=100',{
        headers: {
            Authorization: null
        }
    });
    return data;
}

export const useLabels = () => {

    const labelsQuery = useQuery(
        ['labels'],
        getLabels,
        {
            staleTime: 1000 * 60 * 60, // data hara refresh cada hora
            // initialData: [], //  data que se almanecara en cache y quiere que sea la inical -> sirve antemano que es la data que se va manejar
            // placeholderData: [], // data que se mostrara mientras se hace la peticion, para mostrale al usario en que puede trabjar
            placeholderData: [
                {
                    id: 725156255,
                    node_id: "MDU6TGFiZWw3MjUxNTYyNTU=",
                    url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)",
                    name: "good first issue (taken)",
                    color: "b60205",
                    default: false,
                },
                {
                    id: 717031390,
                    node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
                    url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
                    name: "good first issue",
                    color: "6ce26a",
                    default: true
                }
            ]
        }
    );



    return labelsQuery;
}