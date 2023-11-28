import {Link, useLocation} from "react-router-dom"

const Breadcrumbs = () => {
    const location = useLocation()

    const crumbs = location.pathname
        .split('/')
        .filter(name => name !== '')
        .map(name => {
            return (<Link to={'/' + name}><span>{name} / </span></Link>)
        })

    return (
        <div>
            {crumbs}
        </div>
    )
}

export default Breadcrumbs
