import React from 'react';
import { Link } from 'react-router-dom';
import articles from './agencyData.json';
import styles from './AgencyLevel.module.sass';

const iconColors=[
  {color:'#ff0000', backgroundColor:'#ff000033'},
  {color:'#00ff00', backgroundColor:'#00ff0033'},
  {color:'#0000ff', backgroundColor:'#0000ff33'}
]

const AgencyLevel = () => {
  return (
    <section>
      <h2>Agency Level Experience</h2>
      {
        articles.map((article, index)=>(
          <article key={index}>
            <div style={iconColors[index]} >
              <i className={`${article.icon} fa-2x`}></i>
            </div>
            <h3>{article.title}</h3>
            <p>{article.description} 
              <Link to={article.link}> Learn More.</Link>
            </p>
          </article>
        ))
      }
    </section>
  );
}

export default AgencyLevel;
