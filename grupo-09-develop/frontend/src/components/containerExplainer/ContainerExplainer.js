import React from 'react'
import { IconMarginStyle, IconContainerStyle, IconBoxStyle, ImageIconStyle } from './ContainerExplainerStyle'

export default function ContainerExplainer() {
  return (
    <IconContainerStyle>
      <IconMarginStyle>
      <IconBoxStyle>
        <ImageIconStyle src={require('../../ui/icons/internet.png')} alt="" /><h4>El mejor buscador de alojamiento</h4>
      </IconBoxStyle>
      <IconBoxStyle>
        <ImageIconStyle src={require('../../ui/icons/piggy-bank.png')} alt="" /><h4>Ahorra tiempo y dinero</h4>
      </IconBoxStyle>
      <IconBoxStyle>
        <ImageIconStyle src={require('../../ui/icons/like-4.png')} alt="" /><h4>Seguinos en nuestras redes</h4>
      </IconBoxStyle>
      </IconMarginStyle>
    </IconContainerStyle>
  )
}
