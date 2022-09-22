import React from 'react'
import { CardStyle, ContainerStyle, ContainerImage, Title, Image, InfoDetailProduct, ContainerButton, ContainerDate } from './BookingDetailStyle';
import Button from '../../../components/button/Button'
import { HiLocationMarker } from 'react-icons/hi'
import { useContext } from 'react';
import { SelectedDatesContext } from '../../../hooks/UseContext';
import { toUserReadableDateString } from '../../../hooks/UseToString';

export default function BookingDetail({ handleSubmit, product, images }) {
  const { selectedDatesContext } = useContext(SelectedDatesContext)

  return (
    <CardStyle >
      <ContainerStyle>
        <div>
          <Title>Detalle de la reserva</Title>
          <ContainerImage>
            <Image src={images? images[8]?.urlImage : ''} />
          </ContainerImage>
        </div>
        <div>
          <InfoDetailProduct >
            <h3>{product?.category?.title}</h3>
            <h2>{product?.title}</h2>
            <p><span><HiLocationMarker /></span>{product?.city?.name + ", " + product?.city?.country}</p>
          </InfoDetailProduct>
          <hr />
          <ContainerDate>
            <h4>Check in</h4>
            <div>{selectedDatesContext ? toUserReadableDateString(selectedDatesContext?.checkin) : null}</div>
          </ContainerDate>
          <hr />
          <ContainerDate>
            <h4>Check out</h4>
            <div>{selectedDatesContext ? toUserReadableDateString(selectedDatesContext?.checkout) : null}</div>
          </ContainerDate>
          <hr />
          <ContainerButton>
            <Button width="100%" type="submit" form="form" onClick={handleSubmit}>Confirmar reserva</Button>
          </ContainerButton>
        </div>
      </ContainerStyle>

    </CardStyle>
  )
}