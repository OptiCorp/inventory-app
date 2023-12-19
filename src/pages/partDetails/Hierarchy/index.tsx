import { Item } from '../../../services/apiTypes'

import { FaPen } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { AssemblyList, Container, ListItem, PartList } from './styles'
export const Hierarchy = ({ item }: { item: Item }) => {
    const navigate = useNavigate()

    return (
        <>
            <Container>
                <h4>This assembly is a part of:</h4>
                <PartList>
                    <ListItem
                        onClick={() => {
                            navigate(`/${item?.parent?.id}/${item?.parent?.wpId} `)
                        }}
                    >
                        {' '}
                        {item?.parent?.id ?? 'No known parts'}
                    </ListItem>

                    <FaPen />
                </PartList>
                <h4>This assembly consists of:</h4>
                <AssemblyList>
                    {item?.children && !!item.children ? (
                        <>
                            {item?.children?.map((x) => (
                                <ListItem
                                    onClick={() => {
                                        navigate(`/${x.id}/${x.wpId}`)
                                    }}
                                >
                                    {x?.id ?? ''}
                                </ListItem>
                            ))}
                        </>
                    ) : (
                        <>asdsadsad</>
                    )}
                    <FaPen />
                </AssemblyList>
            </Container>
        </>
    )
}
