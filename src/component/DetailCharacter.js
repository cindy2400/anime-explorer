import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailCharacter } from "../store/anime/anime-fetcher";
import styles from "./DetailCharacter.module.css";

const DetailCharacter = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const charId = param.animeCharacterId;
  const detailCharacter = useSelector((state) => state.anime.animeCharacter);

  useEffect(() => {
    dispatch(fetchDetailCharacter(charId));
  }, [dispatch, charId]);

  console.log(detailCharacter);

  return (
    <div className={styles["character-container"]}>
      <img
        src={detailCharacter?.image?.large}
        alt="detail character"
        className={styles["character-image"]}
      />
      <div className={styles["character-info-container"]}>
        <div className={styles["title-background"]}>
          <h2 className={styles.title}>{detailCharacter?.name?.full}</h2>
          <p className={styles.title}>{detailCharacter?.name?.native}</p>
        </div>
        <div className={styles["info-background"]}>
          <p className={styles.paragraph}>
            <b>Age : </b>
            {detailCharacter?.age === null ? "-" : detailCharacter?.age}
          </p>
          <p className={styles.paragraph}>
            <b>Gender : </b>
            {detailCharacter?.gender === null ? "-" : detailCharacter?.gender}
          </p>
          <p className={styles.paragraph}>
            <b>BloodType : </b>
            {detailCharacter?.bloodType === null
              ? "-"
              : detailCharacter?.bloodType}
          </p>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: detailCharacter.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailCharacter;
