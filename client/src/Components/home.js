import React from "react";
import { Card } from "./context";

function Home() {
  return (
    <Card
      bgcolor="secondary"
      txtcolor="white"
      header="This is your home page"
      title="Welcome!"
      text="From Piggy bank"
      body={
        <img src="https://img.icons8.com/external-icongeek26-outline-colour-icongeek26/128/000000/external-bank-currency-icongeek26-outline-colour-icongeek26-10.png" />
      }
    />
  );
}

export default Home;
