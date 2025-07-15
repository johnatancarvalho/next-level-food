import css from "./page.module.css";

export default function MealsLoadingPage() {
  return (
    <div className={css.loading}>
      <h1>Loading meals...</h1>
      <p>Please wait while we fetch the delicious meals for you.</p>
    </div>
  );
}
