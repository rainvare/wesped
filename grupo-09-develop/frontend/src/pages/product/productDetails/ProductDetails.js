import {
  BodyStyle,
  ShareStyle,
  DescriptionStyle,
  LineStyles,
  FeaturesStyle,
  TitleStyles
} from './ProductDetailsStyles'
import { BiShareAlt } from "react-icons/bi";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosInstance } from '../../../helpers/AxiosHelper';
import { Icons } from '../../../ui/icons';
import GalleryBlock from './galleryBlock/GalleryBlock';
import GalleryMobile from './galleryMobile/GalleryMobile';
import Section from '../../../components/section/Section';
import HeaderProduct from '../../../components/headerProduct/HeaderProduct';
import UbicationProduct from './ubicationProduct/UbicationProduct';
import Policies from '../../../components/policies/Policies';
import Schedule from '../../../components/schedule/Schedule';
import Map from './map/Map'
import './map/Map.css'
import Body from '../../../components/body/Body';
import Spinner from '../../../components/spinner/Spinner';
import Share from '../../../components/share-social-media/Share';

export default function ProductDetails({ isMobile }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [product, setProduct] = useState(null);
  const [takenDates, setTakenDates] = useState();
  const [loaded, setLoaded] = useState(true)
  const { productId } = useParams();

  useEffect(() => {
    setLoaded(false)
    AxiosInstance.get(`/bookings/product/${productId}`)
      .then(({ data }) => {
        const takenDates = data.map(booking => { return { checkin: booking.checkin, checkout: booking.checkout } })
        setTakenDates(takenDates)
      })
      .then(() => setLoaded(true))
  }, [productId])

  useEffect(() => {
    setLoaded(false)
    AxiosInstance.get(`/products/${productId}`)
      .then((res) => {
        res.data.images = res.data.images.sort((lhs, rhs) => lhs.id - rhs.id)
        setProduct(res.data);
      })
      .then(() => setLoaded(true))
  }, [productId]);

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false);
  }

  const isToggle = () => {
    setShowShare(!showShare);
  }



  return (
    <>
      {!loaded || !product ?
        <Spinner />
        :
        <Body>
          <BodyStyle isOpen={modalIsOpen}>
            <HeaderProduct product={product} to={"/"} />
            <UbicationProduct product={product} />
            <Section>
              <ShareStyle>
                <div style={{ cursor: "pointer" }}><BiShareAlt onClick={isToggle} /></div>
                <Share showShare={showShare} />
              </ShareStyle>
              <GalleryBlock images={product.images} modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} />
              <GalleryMobile images={product.images} />
              <DescriptionStyle>
                <h4>Descripción del lugar</h4>
                <p>{product.description}</p>
              </DescriptionStyle>
              <TitleStyles>¿Que ofrece este lugar?</TitleStyles>
              <LineStyles />
              <FeaturesStyle>
                {product.features.map(item => (
                  <div key={item.id}><span>{Icons[item.icon]}</span><p>{item.title}</p></div>
                ))}
              </FeaturesStyle>
              <TitleStyles>Fechas disponibles</TitleStyles>
              <Schedule inline buttonText="Iniciar reserva" readOnly={true} monthsShown={isMobile ? 1 : 2} excludeDateIntervals={takenDates} />
              <TitleStyles>¿Dónde vas a estar?</TitleStyles>
              <LineStyles />
              <Map product={product} />

              <TitleStyles>Qué tenés que saber</TitleStyles>
              <LineStyles />
              <Policies product={product} />
            </Section>
          </BodyStyle>
        </Body> 
      }
    </>

  )
}
