import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailAnime } from "../store/anime/anime-fetcher";
import { isEmpty } from "../util/helper";
import Card from "./ui/Card";

const DetailAnime = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const animeDetail = useSelector((state) => state.home.anime);

  const animeId = param.animeId;

  useEffect(() => {
    dispatch(fetchDetailAnime(animeId));
  }, [dispatch, animeId]);

  if (isEmpty(animeDetail)) {
    return <p>Loading</p>;
  }
  return (
    <Card>
      <h1>{animeDetail.title.english}</h1>
      {animeDetail.genres.map((genre) => (
        <h6 key={genre}>{genre}</h6>
      ))}
      <p>{animeDetail.description}</p>
    </Card>
  );
};

export default DetailAnime;
