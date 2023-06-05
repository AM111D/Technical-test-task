import { Navigate, Route, Routes } from 'react-router-dom';

import HomeView from './views/HomeView';
import Container from './Container/Container';
import Navigation from './Navigation/Navigation';
import CardContainer from './CardContainer/CardConainer';

export const App = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/tweets" element={<CardContainer />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
};
