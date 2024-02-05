import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ScrollToTop from './shared/scrolltotop/scrolltotop';
import Header from './shared/header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/home';
import Aboutus from './pages/about-us/about-us';
import Advertise from './pages/advertise/advertise';
import Promotion from './shared/promotion/promotion';
import Dailynews from './pages/daily-news/daily-news';
import Research from './pages/research/research';
import Latestproject from './shared/latest-project/latest-project';
import Ecosystem from './shared/ecosystem/ecosystem';
import Allresearch from './shared/all-research/all-research';
import News from './pages/news/news';
import SinglePost from './pages/single-post/SinglePost';
import Footer from './shared/footer/Footer';
import Subscribe from './pages/subscribe/subscribe';


function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/aboutus" element={<Aboutus />}></Route>
          <Route path="/advertise" element={<Advertise />}></Route>
          <Route path="/promotion" element={<Promotion />}></Route>
          {/* <Route path="/dailynews" element={<Dailynews />}></Route> */}
          <Route path="/subscribe" element={<Dailynews />}></Route>
          <Route path="/latestproject" element={<Latestproject />}></Route>
          <Route path="/ecosystem" element={<Ecosystem />}></Route>

          <Route path="/research" element={<Research />}></Route>
          <Route path="/research/:type" element={<Research />}></Route>
          <Route path="/research/:type/:subtype" element={<Research />}></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/news/:type" element={<News />}></Route>
          <Route path="/news/:type/:subtype" element={<News />}></Route>

          <Route path="/post/:slug" element={<SinglePost />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
