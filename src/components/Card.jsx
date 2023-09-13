import { Fragment, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Imndb from "../assets/imndb.svg";
import Pngitem from "../assets/Pngitem.svg";
import Icon from '@mdi/react';
import { mdiHeartOutline } from '@mdi/js';
import { Link } from "react-router-dom";


export default function Card(props) {
        const API_IMG = "https://image.tmdb.org/t/p/w500/";
        const [genres, setGenres] = useState([]);
        const [colorChange, setColorChange] = useState(false);

        useEffect(() => {

                fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=224a0cd182af5ba726408359fec9692e")
                        .then((res) => res.json())
                        .then((data) => {
                                setGenres(data.genres);
                        });
        }, []);

        const formatGenres = (genreIds) => {
                if (!genres.length || !genreIds) return "";
                return genreIds
                        .map((genreId) => {
                                const genre = genres.find((genre) => genre.id === genreId);
                                return genre ? genre.name : "";
                        })
                        .filter(Boolean)
                        .join(", ");
        };

        if (!genres.length || !props.poster_path) {
                return null;
        }

        const imageURL = API_IMG + props.poster_path;

        const toggleLike = () => {
                setColorChange(!colorChange); // Toggle the liked state
        };
        return (
                <Fragment>
                        <div className=" card">
                                <div className="relative">
                                        <Link to={`/movies/${props.id}`}>
                                                <img data-testid="movie-poster" className="w-[100%] rounded-xl" src={imageURL} alt={props.title} />
                                        </Link>
                                        <div className="absolute top-7 left-0">
                                                <span className="bg-white/40 ml-4 mb-[-2px] p-2
                                                text-sm rounded-full text-black/80 cursor-pointer
                                                ">Top Movies</span>
                                        </div>
                                        
                                </div>

                                <div className="flex justify-between">
                                <p className="text-black/50font-bold py-4 text-[11px]">{formatGenres(props.genre_ids)}</p>
                                <div className=" ">
                                                <Icon
                                                        path={mdiHeartOutline}
                                                        size={1.6}
                                                        className={`mt-2 bg-black/30 text-${colorChange ? 'red-700' : 'white/40'} mr-4 mb-[-2px] p-2 text-sm rounded-full text-black/80 cursor-pointer`}
                                                        onClick={toggleLike} // Toggle liked state on click
                                                />
                                        </div>
                                        </div>
                                <Link to={`/movies/${props.id}`}>
                                        <h1 data-testid="movie-title" className="font-bold w-[auto] text-xl pb-6">{props.title}</h1>
                                </Link>
                                <div className="mb-6 flex justify-between w-[auto]">
                                        <div className="flex text-[11px]">
                                                <img src={Imndb} alt="Imndb" className="" />
                                                <span className="pl-6 ">{props.vote_average}</span>
                                        </div>
                                        <div className="flex text-[11px]">
                                                <img src={Pngitem} alt="Strawberry" className="" />
                                                <span className="pl-6 ">97%</span>
                                        </div>
                                </div>
                                <p data-testid="movie-release-date" className="text-black/60 font-bold text-[11px] pb-6"
                                >Release Date (UTC): {props.release_date}</p>

                        </div>
                </Fragment>
        );
}

Card.propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string.isRequired,
        vote_average: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired,
        genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
};
