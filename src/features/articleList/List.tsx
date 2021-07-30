import { 
    useGetArticlesQuery,
} from 'src/services/article'
import ListItem from "./ListItem"

interface Props {
    onClickListItem ?: (id: string) => void
}

export default function List ({ onClickListItem }: Props):JSX.Element {
    const { isLoading, data } = useGetArticlesQuery()
    return (
        <div className="mt-4">
            {
                isLoading ? 'loading……':
                data?.map(item => <ListItem name={ item.name } key={item.id } id={ item.id } onClick={ onClickListItem }/>)
            }
        </div>
    )
}