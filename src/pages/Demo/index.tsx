import React, { useEffect } from "react";
import styles from "./index.less";
import { getData } from "@/service/demo";

const Demo: React.FC = () => {
  useEffect(() => {
    getData().then(res => {
      console.log(
        "%c 🍫 res: ",
        "font-size:20px;background-color: #6EC1C2;color:#fff;",
        res
      );
    });
    return () => {
      // clearEffect
    };
  }, []);
  return <div className={styles.demo}>Demo</div>;
};

export default Demo;
