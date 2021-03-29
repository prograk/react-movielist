import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Movies } from '../../modals';
import API_SERVICE from '../../utils/apiService';
import { MOVIE_SEARCH } from '../../utils/constants';

interface ChildComponentProps extends RouteComponentProps<any> {
    /* other props for ChildComponent */
}

const Search: React.FC<ChildComponentProps> = (props) => {

    let dropDownClick: any = null;

    const [search, setSearch] = useState("");
    const [movieSearch, setMovieSearch] = useState<Movies[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        dropDownClick = document.querySelector("body");
        if (dropDownClick !== null) {
            dropDownClick.addEventListener("click", handleClickOutside, true);
        }
        return () => {
            if (dropDownClick !== null) {
                dropDownClick.removeEventListener("click", handleClickOutside, true);
            }
        }
    }, []);

    const handleClickOutside = () => {
        let elem = document.querySelector('.search-wrapper ul');
        if (!elem?.classList.contains('d-none')) {
            setShowDropdown(false)
        }
    }

    useEffect(() => {
        API_SERVICE.get(MOVIE_SEARCH({ search }))
            .then((res: Movies[]) => {
                setMovieSearch(res);
            })
    }, [search])

    const handleChange = (event: any) => {
        const { value } = event.target;
        setShowDropdown(true);
        setSearch(value);
    }

    const handleClick = (data: Movies) => {
        setShowDropdown(false);
        setSearch("");
        props.history.push(`/movie-detail/${data.id}`);
    }

    return (
        <div>
            <div className="search-wrapper">
                <input
                    name="search"
                    type="text"
                    autoComplete="off"
                    placeholder="Search Movie Title"
                    value={search}
                    className="form-control"
                    onChange={handleChange}
                />
                <ul
                    className={`list-unstyled ${!showDropdown && 'd-none'}`}>
                    {movieSearch.length > 0 && (
                        movieSearch.map(ms => (
                            <li key={ms.id}
                                className="p-2"
                                onClick={() => handleClick(ms)}>
                                {ms.title}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    )
}

export default withRouter(Search);
