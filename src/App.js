import React,{useEffect, useState} from 'react'
import ApiRequest from './services/ApiRequest'
import MovieRow from './components/MovieRow/MovieRow';
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import './App.css'

const App = () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [headerBlack, setHeaderBlack] = useState(false);

  useEffect(()=>{
    const loadAll = async ()=>{
      //gerando a lista de filmes da Home
      let list = await ApiRequest.getHomeList();
      setMovieList(list);


      //pegando filme em destaque
      let originals = list.filter(i=>i.slug==='originals');
      let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length-1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await ApiRequest.getMovieInfo(chosen.id,'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll()

  },[])

  useEffect(()=>{
    const scrollListener = ()=>{
      if(window.scrollY > 15){
        setHeaderBlack(true);
      }else{
        setHeaderBlack(false);
      }
    }
    window.addEventListener('scroll',scrollListener);
    return()=>{
      window.removeEventListener('scroll',scrollListener)
    }
  },[])



  return (
    <div className='page'>

      <Header isHeaderBlack={headerBlack}/>

      {featuredData && 
      <FeaturedMovie item={featuredData}/>}

      <section className='lists'>
        {movieList.map((item,key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
        <Footer/>
      {/*header
        destaque
        lista

       */}


       {movieList <=0 &&<div className="loading"> <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="loading"></img></div>}
    </div>
  )
}

export default App
