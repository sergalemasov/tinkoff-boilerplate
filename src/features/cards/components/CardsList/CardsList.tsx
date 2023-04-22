import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CardsList.css";
import { Spin } from "antd";
import { CardItem } from "../CardItem/CardItem";
import { fetchCards } from "../../actions";
import { Dispatch } from "@core/store/store";
import { getCards } from "../../selectors";

export const CardsList: FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const cards = useSelector(getCards);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    dispatch(fetchCards()).finally(() => setLoader(false));
  }, [dispatch]);

  if (isLoading) {
    return (
      <Spin>
        <section className="CardsListLoader" />
      </Spin>
    );
  }

  return (
    <section className="CardsList">
      {cards.map((item: any) => (
        <CardItem
          key={item.id}
          id={item.id}
          balance={item.balance}
          cardNumber={item.number}
          color={item.color}
        />
      ))}
    </section>
  );
};
