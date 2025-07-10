import Link from "next/link";
import React from "react";

const Meals = () => {
  return (
    <>
      <h1>Meals</h1>
      <div className="flex flex-col gap-2">
        <p>
          <Link href="/meals/breakfast">Breakfast</Link>
        </p>
        <p>
          <Link href="/meals/lunch">Lunch</Link>
        </p>
        <p>
          <Link href="/meals/dinner">Dinner</Link>
        </p>
      </div>
    </>
  );
};

export default Meals;
