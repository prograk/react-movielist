import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Search from '../../components/search/Search';
import { useForm } from "react-hook-form";
import { Movies } from '../../modals';
import API_SERVICE from '../../utils/apiService';
import { MOVIE_LIST, MOVIE_SORT, ADD_DEFAULT_SRC } from '../../utils/constants';
import moment from 'moment';

type Inputs = {
    example: string,
    exampleRequired: string,
}

const Home: React.FC = () => {

    const [movies, setMovies] = useState<Movies[]>([]);
    const [formModal, setFormModal] = useState(false);
    const [sorted, setSorted] = useState(false);

    const { register, handleSubmit, trigger, errors } = useForm();

    const onSubmit = (data: Movies) => {
        handleFormSubmit(data);
    }

    useEffect(() => {
        getMovieList();
    }, [])

    const getMovieList = () => {
        API_SERVICE.get(MOVIE_LIST)
            .then((response: Movies[]) => {
                setMovies(response);
            })
    }

    const handleSortClick = (clicked: Boolean) => {
        // if (api) {
        //     API_SERVICE.get(MOVIE_SORT({ sort: 'runtime', order: 'asc' }))
        //         .then((res: Movies[]) => {
        //             setMovies(res);
        //         })
        // } else {
        const moviesDummy = [...movies];
        if (!sorted) {
            moviesDummy.sort((a, b) => parseFloat(a.runtime) - parseFloat(b.runtime));
            setMovies(moviesDummy);
        } else {
            getMovieList();
        }
        setSorted(!sorted)
        // }
    }

    // useEffect(() => {
    //     if (sorted) {
    //         handleSortClick(false);
    //     }
    // }, [movies])

    // const handleOnChange = (event: any) => {
    //     const { name, value } = event.target;
    //     setFormInput({ ...formInput, [name]: value });
    // }

    // const validate = () => {
    //     if (
    //         (Object.keys(formInput).every((fI: any) => formInput[fI] !== "")) &&
    //         (urlValidator(formInput.posterUrl))
    //     ) return false
    //     return true;
    // }

    const handleFormSubmit = (data: Movies | any) => {
        // event.preventDefault();

        const PARAMS: Movies = {
            ...data,
            genres: data.genres.split(',')
        }

        API_SERVICE.post(MOVIE_LIST, JSON.stringify(PARAMS))
            .then((res: Movies) => {
                getMovieList();
                handleFormModal();
            })
    }

    const handleFormModal = () => {
        setFormModal(!formModal)
    }

    return (
        <div className="container-md">

            {/* <button onClick={() => handleSortClick(true)}>Sort runtime API</button> */}
            <button className="btn btn-sm btn-primary mr-2" onClick={() => handleSortClick(true)}>Sort</button>
            <button className="btn btn-sm btn-primary" onClick={handleFormModal}>Add Movie</button>

            <div className="moviecard-wrapper mt-2">
                {movies.length > 0 && (
                    movies.map(mov => (
                        <Link to={`/movie-detail/${mov.id}`} className="card col-12 py-2 mb-2" key={mov.id}>
                            <div className="row px-2 justify-content-between align-items-center flex-sm-row flex-column">
                                <div className="mcw-common mr-2">
                                    <img
                                        height="150px"
                                        src={mov.posterUrl}
                                        onError={ADD_DEFAULT_SRC}
                                        alt={mov.title} className="img-resonsive" />
                                </div>
                                <div className="mcw-common mcw-title m-0 h4 text-left">
                                    {mov.title}
                                </div>
                                <div className="mcw-common mcw-year h5 m-0">
                                    {mov.year}
                                </div>
                                <div className="mcw-common mcw-duration h5 m-0">
                                    {moment.duration(+mov.runtime, "minutes").humanize()}
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>

            <div
                className={`popup ${!formModal ? 'd-none' : ''}`}
            >
                <div className="row">
                    <form
                        className="form-wrapper"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate={true}
                    >
                        <button type="button" className="close" onClick={handleFormModal}>
                            <span aria-hidden="true" className="text-white">&times;</span>
                        </button>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                placeholder="Enter Title"
                                name="title"
                                autoComplete="off"
                                onChange={() => trigger('title')}
                                ref={register({
                                    required: { value: true, message: 'Required' }
                                })}
                            />

                            <p className="text-danger text-left m-0">
                                {errors.title?.message}
                            </p>
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="text"
                                placeholder="Enter year"
                                name="year"
                                autoComplete="off"
                                onChange={() => trigger('year')}
                                ref={
                                    register({
                                        required: { value: true, message: 'Required' },
                                        minLength: { value: 4, message: 'Minimun 4' },
                                        maxLength: { value: 4, message: 'Limit Exceeded' },
                                        validate: value => /[0-9]/gi.test(value) || 'Invalid Input'
                                    })
                                }
                            />

                            <p className="text-danger text-left m-0">
                                {errors.year?.message}
                            </p>
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="text"
                                placeholder="Enter Runtime"
                                name="runtime"
                                autoComplete="off"
                                onChange={() => trigger('runtime')}
                                ref={
                                    register({
                                        required: { value: true, message: 'Required' },
                                        maxLength: { value: 3, message: 'Limit Exceeded' },
                                        validate: value => /[0-9]/gi.test(value) || 'Invalid Input'
                                    })
                                }
                            />

                            <p className="text-danger text-left m-0">
                                {errors.runtime?.message}
                            </p>
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="text"
                                placeholder="Enter Genres"
                                name="genres"
                                autoComplete="off"
                                onChange={() => trigger('genres')}
                                ref={
                                    register({
                                        required: { value: true, message: 'Required' },
                                    })
                                }
                            />

                            <p className="text-danger text-left m-0">
                                {errors.genres?.message}
                            </p>
                        </div>

                        <div className="form-group mb-2">
                            <textarea
                                placeholder="Enter plot"
                                name="plot"
                                autoComplete="off"
                                onChange={() => trigger('plot')}
                                ref={
                                    register({
                                        required: { value: true, message: 'Required' },
                                    })
                                }
                            ></textarea>

                            <p className="text-danger text-left m-0">
                                {errors.plot?.message}
                            </p>
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="text"
                                placeholder="Enter director"
                                name="director"
                                autoComplete="off"
                                onChange={() => trigger('director')}
                                ref={
                                    register({
                                        required: { value: true, message: 'Required' },
                                    })
                                }
                            />

                            <p className="text-danger text-left m-0">
                                {errors.director?.message}
                            </p>
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="text"
                                placeholder="Enter actors"
                                name="actors"
                                autoComplete="off"
                                onChange={() => trigger('actors')}
                                ref={
                                    register({
                                        required: { value: true, message: 'Required' },
                                    })
                                }
                            />

                            <p className="text-danger text-left m-0">
                                {errors.actors?.message}
                            </p>
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="url"
                                placeholder="Enter Image Path"
                                name="posterUrl"
                                onChange={() => trigger('posterUrl')}
                                ref={
                                    register({
                                        required: { value: true, message: 'Required' },
                                        validate: value => /(http(s?)):\/\//gi.test(value) || 'Invalid URL'
                                    })
                                }
                            />

                            <p className="text-danger text-left m-0">
                                {errors.posterUrl?.message}
                            </p>
                        </div>


                        <button className="btn btn-primary btn-md mt-2" type="submit">
                            Submit
                        </button>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default Home;