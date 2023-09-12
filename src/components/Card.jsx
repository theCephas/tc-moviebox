import { Fragment, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Imndb from "../assets/imndb.svg";
import Pngitem from "../assets/Pngitem.svg";

export default function Card(props) {
        const API_IMG = "https://image.tmdb.org/t/p/w500/";
        const [genres, setGenres] = useState([]);

        useEffect(() => {
                // Fetch movie genres from the API
                fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=224a0cd182af5ba726408359fec9692e")
                        .then((res) => res.json())
                        .then((data) => {
                                setGenres(data.genres);
                        });
        }, []);

        // Create a function to format the genre list
        const formatGenres = (genreIds) => {
                if (!genres.length || !genreIds) return ""; // Check if genres and genreIds are available
                return genreIds
                        .map((genreId) => {
                                const genre = genres.find((genre) => genre.id === genreId);
                                return genre ? genre.name : "";
                        })
                        .filter(Boolean)
                        .join(", ");
        };

   

        // Conditionally render the component when genres are available and poster_path is defined
        if (!genres.length || !props.poster_path) {
                return null; // Return null or a loading component if data is not available
        }

        const imageURL = API_IMG + props.poster_path;

        return (
                <Fragment>
                        <div className=" card">
                                <img className="w-[100%]" src={imageURL} alt={props.title} />
                                <p className="text-black/50font-bold py-4 text-[11px]">{formatGenres(props.genre_ids)}</p>
                                <h1 className="font-bold w-[auto] text-xl pb-6">{props.title}</h1>
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
                                <p className="text-black/60 font-bold text-[11px] pb-6"
                                >Release Date (UTC): {props.release_date}</p>
                        </div>
                </Fragment>
        );
}

Card.propTypes = {
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string.isRequired,
        vote_average: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired,
        genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
};
