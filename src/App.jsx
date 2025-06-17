import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Router} from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import MainContent from './Pages/MainContent';
import TvSeries from './Pages/TvSeries';
import Anime from './Pages/Anime';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainContent />} />
        <Route path='/tv-series' element={<TvSeries/>}/>
        <Route path='/anime' element={<Anime/>}/>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
