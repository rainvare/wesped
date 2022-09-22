import React from 'react'
import HeaderProduct from '../../components/headerProduct/HeaderProduct'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AxiosInstance } from '../../helpers/AxiosHelper';
import { BodyStyle, LineStyles, ContainerStyle, ContainerBooking, ContainerForm } from './BookingStyle'
import Policies from '../../components/policies/Policies';
import Section from '../../components/section/Section';
import BookingDetail from './bookingDetail/BookingDetail';
import BookingForm from './bookingForm/BookingForm'
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import LocalStorageHelper from '../../helpers/LocalStorageHelper'
import { useContext } from 'react';
import { SelectedDatesContext } from '../../hooks/UseContext';
import Spinner from '../../components/spinner/Spinner';

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month?.toLocaleString('es-AR', { minimumIntegerDigits: 2 })}-${day?.toLocaleString('es-AR', { minimumIntegerDigits: 2 })}`
}

export default function Booking({ isMobile }) {

  let navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { selectedDatesContext } = useContext(SelectedDatesContext)
  const [loaded, setLoaded] = useState(true)
  // peticion GET
  useEffect(() => {
    try {
      setLoaded(false)
      AxiosInstance.get(`/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        res.data.images = res.data.images.sort((lhs, rhs) => lhs.id - rhs.id)
      })
      .catch(err => console.log(err))
      .finally(() => setLoaded(true))
    } catch (error) {
      console.log(error)
    }
  }, [productId]);


  const [values, setValues] = useState({
    nombre: '',
    apellido: '',
    email: '',
    ciudad: '',
    checkInHour: '',
    errorDate: false,
    errorHour: false,
  })

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = ({ value }) => {
    setValues({ ...values, checkInHour: value, errorHour: false, })

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorDate = false;
    let errorHour = false;
    const token = LocalStorageHelper.getItem('Token');
    const user = jwt_decode(token);

    if (!selectedDatesContext?.checkin || !selectedDatesContext?.checkout)
      errorDate = true;

    if (values.checkInHour === '')
      errorHour = true;

    if (errorHour || errorDate) {
      setValues({ ...values, errorDate: errorDate, errorHour: errorHour })
    } else {
      try {
        setLoaded(false)
        AxiosInstance.post(`/bookings`, {
          hour: `${values.checkInHour}:00`,
          checkin: formatDate(selectedDatesContext?.checkin),
          checkout: formatDate(selectedDatesContext?.checkout),
          product: {
            id: Number(productId)
          },
          user: {
            id: user.user_info.id
          }
        },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          })
          .then(() => {
            navigate('reserva-exitosa');
          }).catch((error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              text: 'Lamentablemente la reserva no ha podido realizarse. Por favor, intente mas tarde'
            })
          }).finally(() => setLoaded(true))
      } catch (error) {
        console.error(error);
      }
    }

  };

  console.log(product);

  return (
    <>
      {!loaded
        ?
        <Spinner />
        :
        <BodyStyle>
          <HeaderProduct product={product} to={"/producto/" + productId} />
          <Section>
            <ContainerStyle>
              <ContainerForm>
                <BookingForm values={values} handleChange={handleChange} handleSelectChange={handleSelectChange} isMobile={isMobile} />
              </ContainerForm>
              <ContainerBooking>
                <BookingDetail product={product} images={product?.images} handleSubmit={handleSubmit} />
              </ContainerBooking>
            </ContainerStyle>
          </Section>
          <LineStyles />
          <Policies product={product} />
        </BodyStyle>
      }
    </>
  )

}

