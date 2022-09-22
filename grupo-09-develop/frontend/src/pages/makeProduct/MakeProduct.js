import React, { useState } from 'react'
import Section from '../../components/section/Section'
import Body from '../../components/body/Body'
import { BoxHeaderStyle, HeaderStyle, Title, Arrow, LinkStyle, FormBodyStyle, TitleContainer } from './MakeProductStyle'
import { FaChevronLeft } from "react-icons/fa";
import FormMakeProduct from './formMakeProduct/FormMakeProduct';
import { AxiosInstance } from '../../helpers/AxiosHelper';
import LocalStorageHelper from '../../helpers/LocalStorageHelper';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export default function MakeProduct() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState({
    id: '',
  });
  const [categories, setCategories] = useState({
    id: ''
  });

  const [attributes, setAttributes] = useState([]);
  const [values, setValues] = useState({
    name: '',
    address: '',
    description: '',
    latitude: '',
    longitude: '',
    rules: '',
    health: '',
    cancellation: '',
    temporaryImageInput: '',
    urlImages: [],
  })
  //validaciones
  const validationForm = () => {
    let validationErrors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexComments = /^.{1,100}$/;
    let regexURL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    let regexNumbers = /^(-?([0-8]?[0-9](\.\d+)?|90(.[0]+)?)\s?)$/;


    if (!values.name) {
      validationErrors.name = "Este campo es obligatorio"
    } else if (!regexName.test(values.name)) {
      validationErrors.name = "Este campo solo acepta letras"
    }
    if (!values.address) {
      validationErrors.address = "Este campo es obligatorio."
    }
    if (!categories.id) {
      validationErrors.category = "Este campo es obligatorio."
    }
    if (!cities.id) {
      validationErrors.city = "Este campo es obligatorio."
    }
    if (!values.description) {
      validationErrors.description = "Este campo es obligatorio."
    }
    if (!values.latitude) {
      validationErrors.latitude = "Este campo es obligatorio."
    } else if (!regexNumbers.test(values.latitude)) {
      validationErrors.latitude = "Latitud no valida"
    }

    if (!values.longitude) {
      validationErrors.longitude = "Este campo es obligatorio."
    } else if (!regexNumbers.test(values.longitude)) {
      validationErrors.longitude = "Longitud no valida"
    }

    if (attributes.length === 0) {
      validationErrors.attributes = "Este campo es obligatorio."
    }

    if (!values.icon) {
      validationErrors.icon = "Este campo es obligatorio."
    }

    if (!values.rules) {
      validationErrors.rules = "Este campo es obligatorio."
    }
    //  else if (!regexComments.test(values.rules)) {
    //   validationErrors.rules = "superó el máximo de caracteres disponibles"
    // }

    if (!values.health) {
      validationErrors.health = "Este campo es obligatorio."
    } 
    // else if (!regexComments.test(values.health)) {
    //   validationErrors.health = "superó el máximo de caracteres disponibles"
    // }

    if (!values.cancellation) {
      validationErrors.cancellation = "Este campo es obligatorio."
    } 
    // else if (!regexComments.test(values.cancellation)) {
    //   validationErrors.cancellation = "superó el máximo de caracteres disponibles"
    // }

    if (values.urlImages.length === 0) {
      validationErrors.image = "Este campo es obligatorio."
    } else if (!regexURL.test(values.image)) {
      validationErrors.image = "Debe ingresar una url valida"
    }

    return validationErrors;
  }
  //eventos
  const handleInputChange = (e) => {
    setValues({
      ...values, [e.target.name]: e.target.value,
    })
    setErrors({
      ...errors, [e.target.name]: '',
    })
  }

  const handleCityChange = ({ id }) => {
    setCities({ id: id });
    setErrors({
      ...errors, city: '',
    })
  }

  const handleCategoryChange = ({ id }) => {
    setCategories({ id: id, });
    setErrors({
      ...errors, category: '',
    })
  }

  const handleSelectAttribute = (attributes) => {
    setAttributes(attributes.map(item => ({ id: item.id })))
    setErrors({
      ...errors, attributes: [],
    })
  }

  const handleAddUrlImage = (e) => {
    e.preventDefault();
    setValues({ ...values, urlImages: [...values.urlImages, values.temporaryImageInput] })
  }

  const handleDeleteUrlImage = (index) => {
    values.urlImages.splice(index, 1);
    setValues({ ...values, urlImages: values.urlImages })
  }

  //submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ ...errors, ...validationForm(values) })

    const token = LocalStorageHelper.getItem('Token');
    //post de products
    AxiosInstance.post(`/products`, {
      title: values.name,
      description: values.description,
      longitude: parseFloat(values.longitude),
      latitude: parseFloat(values.latitude),
      rating: 2.5,
      address: values.address,
      availability: true,
      category: categories,
      city: cities,
      features: attributes,
      policies: [{ id: 7 }, { id: 10 }, { id: 9 }],
    },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      //post de images con id de products
      .then((res) => {
        values.urlImages.forEach((urlImage, index) => {
          AxiosInstance.post(`/images`, {
            title: '',
            description: '',
            urlImage: urlImage,
            product: {
              id: res.data.id
            }
          },
            {
              headers: {
                'Authorization': `Bearer ${token}`
              },
            })
            .then((res) => {
              //si la ultima imagen es correcta entonces redirigir a producto exitoso
              index === values.urlImages.length - 1 && navigate('producto-exitoso');
            })
            .catch((error) => {
              Swal.fire({
                icon: 'error',
                text: 'Lamentablemente el producto no ha podido crearse. Por favor intente más tarde'
              })
            })
        })
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          text: 'Lamentablemente el producto no ha podido crearse. Por favor intente más tarde'
        })
      })
  }


  return (

    <Body>
      <BoxHeaderStyle>
        <HeaderStyle>
          <Title>
            <h2>Administración de propiedades</h2>
          </Title>
          <Arrow>
            <LinkStyle to={"/"}>
              <FaChevronLeft />
            </LinkStyle>
          </Arrow>
        </HeaderStyle>
      </BoxHeaderStyle>
      <Section>
        <FormBodyStyle>
          <TitleContainer>Crear Propiedad</TitleContainer>
          <FormMakeProduct
            values={values}
            handleInputChange={handleInputChange}
            handleCityChange={handleCityChange}
            handleSubmit={handleSubmit}
            errors={errors}
            handleAddUrlImage={handleAddUrlImage}
            handleDeleteUrlImage={handleDeleteUrlImage}
            handleCategoryChange={handleCategoryChange}
            handleSelectAttribute={handleSelectAttribute}
          />
        </FormBodyStyle>
      </Section>

    </Body>


  )
}
