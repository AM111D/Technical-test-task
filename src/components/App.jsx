import { Route, Routes } from 'react-router-dom';
import Card from './Card/Card';
import HomeView from './views/HomeView';
import Container from './Container/Container';
import Navigation from './Navigation/Navigation';

export const App = () => {
  return (
    <Container>
      <Navigation/>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/card" element={<Card />} />
      </Routes>
   </Container>
  );
};
