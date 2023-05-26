import React from "react";
import styles from "./spinner.module.css";

import { LogosProps } from "components/atoms/logos/index";

const Spinner = (props: LogosProps): JSX.Element => {
  return (
    <div className={styles.spinnerContainer}>
      <img className={styles.loadingSpinner} src="/favicon.svg" alt="" />
    </div>
  );
};

export default Spinner;
