import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Headroom from "react-headroom";
import Card from "./Card";
import Tv from "../assets/tv.svg";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import Menu from "../assets/Menu.svg";
import Imndb from "../assets/imndb.svg";
import Pngitem from "../assets/Pngitem.svg";
import Play from "../assets/Play.svg";
import Facebook from "../assets/facebook.svg";
import Twitter from "../assets/twitter.svg";
import Youtube from "../assets/youtube.svg";
import Instagram from "../assets/instagram.svg";
import GridLoader from "react-spinners/GridLoader";

export default function Home() {
  const API_URL =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=224a0cd182af5ba726408359fec9692e";
  const discover =
    "https://api.themoviedb.org/3/discover/movie?api_key=224a0cd182af5ba726408359fec9692e";
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [displayedMovies, setDisplayedMovies] = useState(10);
  const [showMore, setShowMore] = useState(true);
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const isSearchResultEmpty = searched && movies.length === 0;
  const [seeMoreLabel, setSeeMoreLabel] = useState("See More");

  const fetchRandomMovie = () => {
    fetch(discover)
      .then((res) => res.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        setRandomMovie(data.results[randomIndex]);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
  };

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });

    fetchRandomMovie();

    const interval = setInterval(fetchRandomMovie, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setSeeMoreLabel("See More");
  }, []);

  const handleSeeMore = () => {
    if (showMore) {
      setDisplayedMovies(movies.length);
      setSeeMoreLabel("View Less");
    } else {
      setDisplayedMovies(10);
      setSeeMoreLabel("See More");
    }
    setShowMore(!showMore);
  };
  const searchMovie = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=224a0cd182af5ba726408359fec9692e&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
      setSearched(true);
      setShowMore(false);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  const handleGoBack = () => {
    setLoading(true);
    setQuery("");
    setSearched(false);
    setShowMore(true);

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const formatVoteAverage = (voteAverage) => {
    return `${Math.round(voteAverage * 10)}/100`;
  };

  return (
    <Fragment>
      <Helmet>
        <title>MovieBox - Home</title>
      </Helmet>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <GridLoader color="#FF0000" size={20} />
        </div>
      ) : (
        <>
          <header
            className="text-white pb-12"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/w1280/${randomMovie?.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "90vh",
              backgroundColor: "#000",
            }}
          >
            <Headroom className=" bg-black/40 w-full">
              <div className="flex justify-between items-center sm:mx-20 py-4 mx-4">
                <div className="flex">
                  <img src={Tv} className="w-[40px] md:mr-20" alt="Tv Icon" />
                  <div className="md:mt-2">
                    <p className="text-white font-bold hidden md:contents text-3xl">
                      MovieBox
                    </p>
                  </div>
                </div>
                <form onSubmit={searchMovie}>
                  <div className="relative mx-4">
                    <input
                      type="search"
                      value={query}
                      name="query"
                      onChange={changeHandler}
                      placeholder="Find a movie"
                      className="bg-black/20 sm:w-[25rem] md:w-[28rem] text-white rounded border p-4 text-sm"
                    />
                    <button
                      type="submit"
                      className="absolute inset-y-0 right-0 top-0 mr-3"
                    >
                      <Icon className="text-white" path={mdiMagnify} size={1} />
                    </button>
                  </div>
                </form>

                <div className="flex text-white">
                  <div className="md:mt-2">
                    <p className="text-3xl hidden md:contents font-bold">
                      Sign in
                    </p>
                  </div>
                  <img src={Menu} className="md:ml-20" alt="Menu" />
                </div>
              </div>
            </Headroom>
            <div className="pt-[120px] sm:mx-20 mx-4">
              {randomMovie && (
                <div className="random-movie-info">
                  <h2 className="font-bold text-[20px] sm:text-4xl leading-8 w-[250px]">
                    {randomMovie.title}
                  </h2>
                  <div className="my-8 flex justify-between w-[160px]">
                    <div className="flex mr-10 text-[11px]">
                      <img src={Imndb} alt="Imndb" className="" />
                      <span className="pl-6 pt-1">
                        {formatVoteAverage(randomMovie.vote_average.toString())}
                      </span>
                    </div>
                    <div className="flex text-[11px]">
                      <img src={Pngitem} alt="PngItem" className="" />
                      <span className="pl-6 pt-1">97%</span>
                    </div>
                  </div>
                  <p className="w-[auto] sm:w-[450px] text-[14px] leading-8">
                    {randomMovie.overview}
                  </p>
                  <button className="bg-red-600 cursor-pointer flex p-4 px-6 rounded my-6 text-[14px]">
                    <img src={Play} alt="Play" className="pr-2 pt-[2px]" />
                    Watch Trailer
                  </button>
                </div>
              )}
            </div>
          </header>

          <main className="sm:mx-20 mx-4">
            <div className="flex justify-between my-14">
              <p className="font-bold sm:text-3xl text-[20px]">
                {searched ? "Searched Results" : "Featured Movies"}
              </p>
              {searched ? (
                <button
                  className="text-red-600 pt-[4px] font-bold text-[16px] cursor-pointer"
                  onClick={handleGoBack}
                >
                  Go Back
                </button>
              ) : (
                <button
                  className="text-red-600 pt-[4px] font-bold text-[16px] cursor-pointer"
                  onClick={handleSeeMore}
                >
                  {showMore ? "See More" : "View Less"} &gt;
                </button>
              )}
            </div>
            <div className="flex justify-center">
              {!isSearchResultEmpty ? (
                <div className="font-bodyFont grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                  {movies.slice(0, displayedMovies).map((movieReq) => (
                    <Card
                      key={movieReq.id}
                      id={movieReq.id.toString()}
                      poster_path={movieReq.poster_path}
                      title={movieReq.title}
                      vote_average={formatVoteAverage(
                        movieReq.vote_average.toString()
                      )}
                      release_date={movieReq.release_date}
                      genre_ids={movieReq.genre_ids}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-red-600 font-bold text-[16px]">
                  No Search Results, check your spelling or input a correct
                  movie title.
                </p>
              )}
            </div>
            {!isSearchResultEmpty && (
              <div className="text-center my-10">
                <p
                  className="text-red-600 font-bold text-[16px] cursor-pointer"
                  onClick={handleSeeMore}
                >
                  {seeMoreLabel} &gt;
                </p>
              </div>
            )}
          </main>

          <footer>
            <div className="flex justify-center mt-16">
              <img src={Facebook} alt="Facebook Icon" />
              <img src={Instagram} alt="Instagram Icon" className="mx-6" />
              <img src={Twitter} alt="Twitter Icon" className="mr-6" />
              <img src={Youtube} alt="Youtube Icon" />
            </div>
            <div className="flex justify-center font-bold text-sm sm:text-[16px] my-10">
              <p>Conditions of Use</p>
              <p className="mx-6">Privacy & Policy</p>
              <p>Press Room</p>
            </div>
            <div className="text-center pb-20 font-bold text-sm sm:text-[16px]">
              <p>
                &copy; 2023 MovieBox by
                <a
                  href="https://github.com/theCephas/tc-moviebox"
                  className="text-red-600"
                >
                  {" "}
                  Osho Iseoluwa
                </a>
              </p>
            </div>
          </footer>
        </>
      )}
    </Fragment>
  );
}
