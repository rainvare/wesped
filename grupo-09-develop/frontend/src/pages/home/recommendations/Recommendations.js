import React from 'react';
import { RecommendationContainerStyle, RecomendationTitle, ListRecommendationsStyle, CardStyle } from './RecommendationsStyles';
import RecommendationsItem from './recommendationsItems/RecommendationsItem';

export default function Recommendations({ products, title }) {


  return (
    <RecommendationContainerStyle>
      <RecomendationTitle>{title ? `Recomendaciones para ${title}` : "Recomendaciones"}</RecomendationTitle>
      <ListRecommendationsStyle>
        {
          products?.map(item =>
            <CardStyle key={item.id} >
              <RecommendationsItem {...item} />
            </CardStyle>
          )
        }
      </ListRecommendationsStyle>
    </RecommendationContainerStyle>
  )
}
