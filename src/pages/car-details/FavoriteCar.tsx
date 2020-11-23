import React from "react";
import cl from "clsx";
import { useFavorites } from "src/hooks/useFavorites";
import { Button } from "src/ui/Button";
import styles from "./FavoriteCar.module.scss";

type Props = {
  id: number;
};

const FavoriteCar: React.FC<Props> = ({ id }) => {
  const {
    isFavoriteItem,
    setFavoriteItem,
    removeFavoriteItem,
  } = useFavorites();

  const isFavorite = isFavoriteItem(id);

  return (
    <div className={styles.favoriteCarWrapper}>
      {isFavorite ? (
        <div className={styles.favoriteCar}>
          <p className={styles.favoriteCarInfo}>
            <span>
              If you don't like this car anymore, click the button and remove it
              from your collection of favorite items.
            </span>
          </p>

          <Button
            className={styles.favoriteCarButton}
            isDisabled={false}
            onClick={() => removeFavoriteItem(id)}
          >
            Remove
          </Button>
        </div>
      ) : (
        <div className={cl(styles.favoriteCar, styles.nonFavoriteCar)}>
          <p className={styles.favoriteCarInfo}>
            <span>
              If you like this car, click the button and save it in your
              collection of favoirite items.
            </span>
          </p>

          <Button isDisabled={false} onClick={() => setFavoriteItem(id)}>
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export { FavoriteCar };
