import React from 'react';
import css from './HomeView.module.css';

const HomeView = () => (
  <div className={css.container}>
    <h1 className={css.title}>
      Hi 🤩 I'm glad to welcome you in the new application,
      <br /> go to the page with cards to subscribe to popular users{' '}
      <span role="img" aria-label="Иконка приветствия" className={css.emoji}>
        😎
      </span>
    </h1>
  </div>
);

export default HomeView;
