import { url } from 'node:inspector';
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router';
import Search from '../../components/search/Search';
import { Movies } from '../../modals';
import API_SERVICE from '../../utils/apiService';
import { ADD_DEFAULT_SRC, MOVIE_DETAIL } from '../../utils/constants';

interface ChildComponentProps extends RouteComponentProps<any> {
    /* other props for ChildComponent */
}

const Detail: React.FC<ChildComponentProps> = (props) => {

    const [dataLoaded, setDataLoaded] = useState(false);
    const [movie, setMovie] = useState<Movies | null>(null);

    useEffect(() => {
        const { params: { id } } = props.match;

        API_SERVICE.get(MOVIE_DETAIL({ id }))
            .then((res: Movies) => {
                setMovie(res);
                setDataLoaded(true);
            })
    }, [props.match])

    return (
        <div>
            {dataLoaded && (
                movie !== null && (
                    <>
                        <div className="detail-page pt-5">
                            <img className="detail-bgimg" src={movie.posterUrl} onError={ADD_DEFAULT_SRC} alt="Background Image" />
                            <div className="container-lg">
                                <div className="detail-wrapper d-flex flex-sm-row flex-column">
                                    <div className="dw-common dw-left col-sm-4 col-12 p-0">
                                        <img
                                            src={movie.posterUrl}
                                            onError={ADD_DEFAULT_SRC}
                                            alt={movie.title}
                                            className="img-resonsive w-100" />
                                    </div>
                                    <div className="dw-common dw-right text-white col-sm-8 col-12">
                                        {/* <Search page={'detail'} /> */}
                                        <h1 className="green mt-4">{movie.title}</h1>
                                        <p>{movie.plot}</p>
                                        {/* <p>{movie.id}</p> */}
                                        <ul className="list-unstyled movie-gen mb-1">
                                            {movie.genres?.map((gen, idx) => <li key={idx}>{gen}<span>, </span></li>)}
                                        </ul>
                                        <ul className="list-unstyled d-flex flex-column">
                                            <li className="flex-grow-1 mb-2">
                                                <h6>Directors</h6>
                                                {movie.director}
                                            </li>
                                            <li className="flex-grow-1">
                                                <h6>Actors</h6>
                                                {movie.actors}
                                            </li>
                                        </ul>

                                        <ul className="list-unstyled d-flex">
                                            <li className="flex-grow-1">
                                                <h6>Release Year</h6>
                                                <p className="green h4">
                                                    {movie.year}
                                                </p>
                                            </li>
                                            <li className="flex-grow-1">
                                                <h6>Movie Runtime</h6>
                                                <p className="green h4">
                                                    {movie.runtime + ' '} minutes
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            )}
        </div>
    )
}

export default Detail
