import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import Img from '../../../components/lazyLoadImage/img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigateLink = useNavigate();
    const {data, loading} = useFetch("/movie/upcoming");
    const {url} = useSelector((state)=> state.home);

    useEffect(()=>{
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    },[data])

    const searchQueryHandler = (e) => {
        if(e.key === "Enter" && query.length > 0){
            navigateLink(`/search/${query}`);
        }
    }

    return (
        <div className="heroBanner">
            {!loading && <div className="backdrop-img">
                <Img src={background}/>
            </div>}

            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people
                        to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input 
                            type="text"
                            placeholder="search for movie or tv show"
                            onChange={(e)=>{setQuery(e.target.value)}}
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
};

export default HeroBanner