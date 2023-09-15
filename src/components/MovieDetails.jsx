import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Play from "../assets/Play.svg";
import Tv from "../assets/tv.svg";
import { Link } from "react-router-dom";
import Headroom from "react-headroom";
import Facebook from "../assets/facebook.svg";
import Twitter from "../assets/twitter.svg";
import Youtube from "../assets/youtube.svg";
import Instagram from "../assets/instagram.svg";
import GridLoader from "react-spinners/GridLoader";

export default function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=224a0cd182af5ba726408359fec9692e`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieDetails(data);
        setLoading(false);
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      });
  }, [id]);

  const formatDateToUTC = (dateString) => {
    if (!dateString) {
      return ""; 
    }

    const localDate = new Date(dateString);
    const utcDate = new Date(
      Date.UTC(
        localDate.getUTCFullYear(),
        localDate.getUTCMonth(),
        localDate.getUTCDate(),
        localDate.getUTCHours(),
        localDate.getUTCMinutes(),
        localDate.getUTCSeconds(),
        localDate.getUTCMilliseconds()
      )
    );

    // Format the UTC date to the desired string format, e.g., "YYYY-MM-DDTHH:mm:ssZ"
    const formattedDate = utcDate.toUTCString();
    return formattedDate;
  };

  const formattedReleaseDate = formatDateToUTC(movieDetails?.release_date);

  return (
    <Fragment>
      <Helmet>
        <title>MovieBox - Movie Details</title>
      </Helmet>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <GridLoader color="#FF0000" size={20} />
        </div>
      ) : (
        <>
          <div className="font-bodyFont">
            <header
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movieDetails?.poster_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "90vh",
                backgroundColor: "#000",
              }}
            >
              <Headroom className="bg-black/50">
                <Link to="/" className="flex justify-center py-3">
                  <img src={Tv} alt="Tv" className="w-[40px]" />
                  <span className="pt-2 pl-3 text-white font-bold text-2xl">
                    MovieBox
                  </span>
                </Link>
              </Headroom>
              <div className="flex flex-col justify-center items-center pt-[230px] cursor-pointer ">
                <img src={Play} alt="Play" className="w-[70px]" />
                <p className="text-white text-xl font-bold">Watch Trailer</p>
              </div>
            </header>

            <div className="flex sm:mx-10 mx-4 pt-6 font-bold">
              <p
                data-testid="movie-title"
                className="text-red-700 pr-4 text-[14px]"
              >
                {movieDetails.title}
              </p>
              <p>•</p>
              <span
                data-testid="movie-release-date"
                className="pl-4 text-[14px]"
              >
                {formattedReleaseDate}
              </span>
            </div>
            <p className="py-6 sm:mx-10 mx-4 font-bold text-[14px]">
              Runtime:
              <span data-testid="movie-runtime"> {movieDetails?.runtime}</span>
              <span className="ml-1 bg-red-500 text-white rounded text-sm p-1">
                minutes
              </span>
            </p>
            <p
              data-testid="movie-overview"
              className="sm:mx-10 mx-4 text-[12px] leading-8 w-auto sm:w-[600px]"
            >
              {movieDetails?.overview}
            </p>
          </div>

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
