import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Issue } from '../interfaces';
import { State } from '../interfaces/issue';
import { getIssueComments, getIssueInfo } from '../hooks/useIssue';
import { timeSince } from '../../helpers/time-since';


interface Props {
    issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }) => {
    const navigate = useNavigate();

    const queryClient = useQueryClient()

    /**
     * hacer el llamado antes al api
     */
    const prefetchData = () => {
        queryClient.prefetchQuery(
            ['issue', issue.number],
            () => getIssueInfo(issue.number)
        )

        queryClient.prefetchQuery(
            ['issue', issue.number, 'comments'],
            () => getIssueComments(issue.number),
        )
    };

    /**
     * almacenar la data en cache
     */
    const preSetData = () => {
        queryClient.setQueryData(
            ['issue', issue.number],
            () => issue,
            {
                updatedAt: new Date().getTime() + 100000
            }
        )
    }


    return (
        <div className="card mb-2 issue">
            <div className="card-body d-flex align-items-center"
                onClick={() => navigate(`/issues/issue/${issue.number}`)}
                onMouseEnter={preSetData}
            >

                {
                    issue.state === State.Open
                        ? (<FiInfo size={30} color="red" />)
                        : (<FiCheckCircle size={30} color="green" />
                        )
                }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{issue.title}</span>
                    <span className="issue-subinfo">#{issue.number} opened {timeSince(issue.created_at)} ago by <span className='fw-bold'>{issue.user.login}</span></span>
                    <div>
                        {
                            issue.labels.map(label => (
                                <span
                                    key={label.id}
                                    className="badge rounded-pill m-1"
                                    style={{ backgroundColor: `#${label.color}`, color: 'black' }}
                                >
                                    {label.name}
                                </span>
                            ))
                        }
                    </div>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={issue.user.avatar_url} alt="User Avatar" className="avatar" />
                    <span className='px-2'>{issue.comments}</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
