import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Search from '../search/Search'

interface ChildComponentProps extends RouteComponentProps<any> {
    /* other props for ChildComponent */
}

const Header: React.FC<ChildComponentProps> = (props) => {
    return (
        <div className="container-md py-3">
            <div className="row flex-sm-row flex-column">
                <div className="col d-flex align-items-center">
                    <Link className="h4 green" to="/">
                        LOGO
                    </Link>
                </div>
                <div className="col">
                    <Search />
                </div>
            </div>
        </div>
    )
}


export default withRouter(Header);