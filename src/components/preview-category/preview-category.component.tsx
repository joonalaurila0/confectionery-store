import * as React from 'react';
import './preview-category.css';
import { useHistory, useRouteMatch } from 'react-router-dom';

export interface IPreviewCategory {
  title: string;
  image: string;
  id: number;
  linkUrl: string;
}

export const PreviewCategory = ({ title, image, linkUrl }: IPreviewCategory) => {
  let history = useHistory();
  let match = useRouteMatch();

  return (
    <div className='preview-category' onClick={() => history.push(`${match.url}${linkUrl}`)}>
      <div className='img' style={{backgroundImage: `url(${image})`}} />
      <div className='content'>
      <h1>{title}</h1>
      </div>
   </div>   
  );
};

