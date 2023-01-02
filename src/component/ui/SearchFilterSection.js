import styles from "./SearchFilterSection.module.css";

const SearchFilterSection = ({
  searchText,
  changeSearchTextHandler,
  filterSeason,
  changeFilterSeasonHandler,
  genreSelected,
  changeFilterGenreHandler,
}) => {
  const seasons = ["WINTER", "SUMMER", "SPRING", "FALL"];
  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Horror",
    "Mahou Shoujo",
    "Mecha",
    "Music",
    "Mystery",
    "Phychological",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sport",
    "Supernatural",
    "Thriller",
  ];

  return (
    <>
      <form className={styles.form}>
        <div className={styles["search-filter-col"]}>
          <p className={styles["search-filter-title"]}>Search</p>
          <input
            type="text"
            placeholder="Search..."
            className={styles.input}
            onChange={changeSearchTextHandler}
            value={searchText}
          />
        </div>

        <div className={`${styles["search-filter-col"]} ${styles.filter}`}>
          <p className={styles["search-filter-title"]}>Season</p>
          <select
            className={styles.select}
            value={filterSeason}
            onChange={changeFilterSeasonHandler}
          >
            <option value="ALL">All</option>
            {seasons.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles["search-filter-col"]} ${styles.filter}`}>
          <p className={styles["search-filter-title"]}>Genre</p>
          <select
            className={styles.select}
            value={genreSelected}
            onChange={changeFilterGenreHandler}
          >
            <option value="all">All</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </form>
    </>
  );
};

export default SearchFilterSection;
