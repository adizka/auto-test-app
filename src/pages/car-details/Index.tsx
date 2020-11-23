import React, { useCallback } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { ApiError, Car, Service } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import styles from "./CarDetails.module.scss";
import { CarSplashScreen } from "../cars/CarSplashScreen";
import { FavoriteCar } from "./FavoriteCar";
import { FormattedCar } from "../cars/FormattedCar";

export function Index({ match }: RouteComponentProps<{ carId: string }>) {
  const stockNumber = match.params.carId;
  const fetchCar = useCallback((abort) => Service.getCar(+stockNumber, abort), [
    stockNumber,
  ]);
  const { isLoading, data } = useFetch<{ car?: Car | undefined }>(fetchCar);

  if (data instanceof ApiError) {
    if (data.status === 404) {
      return <Redirect to="/404" />;
    }
    return null;
  }

  return (
    <>
      <div className={styles.carDetailsHeader} />
      <div className={styles.carDetailsWrapper}>
        {isLoading ? (
          <CarSplashScreen />
        ) : (
          data?.car && (
            <>
              <div className={styles.carDetailsInfo}>
                <h1 className={styles.carDetailsTitle}>
                  {data.car.manufacturerName} {data.car.modelName}
                </h1>
                <div className={styles.carDetailsDescription}>
                  <FormattedCar car={data.car} />
                </div>
                <p className={styles.carDetailsText}>
                  This car is currently available and can be delivered as soon
                  as tomorrow morning. Please be aware that delivery times shown
                  in this page are not definitive and may change due to bad
                  weather conditions.
                </p>
              </div>
              <FavoriteCar id={data.car.stockNumber} />
            </>
          )
        )}
      </div>
    </>
  );
}
