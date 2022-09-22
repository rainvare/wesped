import Select from 'react-select'
import { AtributesBlockStyle, ContainerStyle, AtributesContainerStyle, DescriptionBlockStyle, DescriptionStyle, FormStyle, InputContainerStyle, InputStyle, LabelStyle, SelectContainerStyle, PolicyContainerStyle, TitleStyle, PolicyBodyStyle, PolicyBlockStyle, PolicyName, PolicyField, ContainerButtonGlobal, ErrorText, ImageBlockStyle, ImageContainerStyle, ButtonStyle, ContainerList, ContainerButton, ContainerText } from './FormMakeProductStyled'
import Button from '../../../components/button/Button'
import { useState, useEffect } from "react";
import { AxiosInstance } from '../../../helpers/AxiosHelper'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'


export default function FormMakeProduct({ values, handleInputChange,handleSelectAttribute, handleSubmit,errors, handleAddUrlImage, handleDeleteUrlImage, handleCategoryChange, handleCityChange }) {

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [features, setFeatures] = useState([]);
 
  // peticion GET
  useEffect(() => {
    AxiosInstance.get('/categories')
      .then((res) => {
        setCategories(res.data);
      })

    AxiosInstance.get('/cities')
      .then((res) => {
        setCities(res.data);
      })

    AxiosInstance.get('/features')
      .then((res) => {
        setFeatures(res.data)
      })
  }, [])


  return (
    <>
      {/* form */}
      <FormStyle name="form">
        {/* bloque inputs */}
        <ContainerStyle>
          <InputContainerStyle>
            <LabelStyle>Nombre de la propiedad</LabelStyle>
            <InputStyle
              name="name"
              type="text"
              placeholder="Nombre del hotel"
              onChange={handleInputChange}
              value={values.name}
              required
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </InputContainerStyle>
          <InputContainerStyle>
            <LabelStyle >Dirección</LabelStyle>
            <InputStyle
              name="address"
              type="text"
              placeholder="Av. Colon 1124"
              onChange={handleInputChange}
              value={values.address}
              required
            />
            {errors.address && <ErrorText>{errors.address}</ErrorText>}
          </InputContainerStyle>
        </ContainerStyle>
        <ContainerStyle>
          <InputContainerStyle>
            <LabelStyle>Categoría</LabelStyle>
            <SelectContainerStyle >
              <Select
                defaultValue={{ label: "Hotel", value: "Hotel" }}
                options={categories.map(item => ({ label: item.title, value: item.title, id: item.id }))}
                // onChange={handleSelectCategory}
                onChange ={handleCategoryChange}
                required
              />
              {errors.category && <ErrorText>{errors.category}</ErrorText>}
            </SelectContainerStyle>
          </InputContainerStyle>
          <InputContainerStyle>
            <LabelStyle>Ciudad</LabelStyle>
            <SelectContainerStyle >
              <Select
                defaultValue={{ label: "Ciudad", value: "Ciudad" }}
                options={cities.map(item => ({ label: item.name + ', ' + item.country, value: item.name + ', ' + item.country, id: item.id }))}
                // onChange={handleSelectCity}
                onChange = {handleCityChange}
                required
              />
              {errors.city && <ErrorText>{errors.city}</ErrorText>}
            </SelectContainerStyle>
          </InputContainerStyle>
        </ContainerStyle>

        {/* bloque descripcion */}
        <DescriptionBlockStyle>
          <LabelStyle>Descripción</LabelStyle>
          <DescriptionStyle
            name="description"
            placeholder="Escribir aqui"
            onChange={handleInputChange}
            value={values.description}
            required
          />
          {errors.description && <ErrorText>{errors.description}</ErrorText>}
        </DescriptionBlockStyle>

        {/* latitud y longitud */}
        <InputContainerStyle>
          <LabelStyle>Latitud</LabelStyle>
          <InputStyle
            name="latitude"
            type="text"
            placeholder="44.6578"
            onChange={handleInputChange}
            value={values.latitude}
            required
          />
          {errors.latitude && <ErrorText>{errors.latitude}</ErrorText>}
        </InputContainerStyle>
        <InputContainerStyle>
          <LabelStyle>Longitud</LabelStyle>
          <InputStyle
            name="longitude"
            type="text"
            placeholder="-34.6578"
            onChange={handleInputChange}
            value={values.longitude}
            required
          />
          {errors.longitude && <ErrorText>{errors.longitude}</ErrorText>}
        </InputContainerStyle>

        {/* atributos */}
        <AtributesContainerStyle>
          <TitleStyle>Agregar atributos</TitleStyle>

          <AtributesBlockStyle>
            <LabelStyle>Seleccionar Atributo</LabelStyle>
            <SelectContainerStyle >
              <Select
                options={features.map(item => ({ label: item.title, value: item.title, id: item.id }))}
                onChange={handleSelectAttribute}
                isMulti
                required
              />
              {errors.attributes && <ErrorText>{errors.attributes}</ErrorText>}
            </SelectContainerStyle>
          </AtributesBlockStyle>
        </AtributesContainerStyle>

        {/* politicas */}
        <PolicyContainerStyle>
          <TitleStyle>Políticas del producto</TitleStyle>
          <PolicyBodyStyle>
            <PolicyBlockStyle>
              <PolicyName>Normas de la casa</PolicyName>
              <LabelStyle >Descripción</LabelStyle>
              <PolicyField
                name="rules"
                type="textarea"
                placeholder="Escribir aqui"
                onChange={handleInputChange}
                value={values.rule}
                required
              />
              {errors.rules && <ErrorText>{errors.rules}</ErrorText>}
            </PolicyBlockStyle>
            <PolicyBlockStyle>
              <PolicyName>Salud y seguridad</PolicyName>
              <LabelStyle >Descripción</LabelStyle>
              <PolicyField
                name="health"
                type="textarea"
                placeholder="Escribir aqui"
                onChange={handleInputChange}
                value={values.health}
                required
              />
              {errors.health && <ErrorText>{errors.health}</ErrorText>}
            </PolicyBlockStyle>
            <PolicyBlockStyle>
              <PolicyName>Politica de cancelación</PolicyName>
              <LabelStyle >Descripción</LabelStyle>
              <PolicyField
                name="cancellation"
                type="textarea"
                placeholder="Escribir aqui"
                onChange={handleInputChange}
                value={values.cancellation}
                required
              />
              {errors.cancellation && <ErrorText>{errors.cancellation}</ErrorText>}
            </PolicyBlockStyle>
          </PolicyBodyStyle>
        </PolicyContainerStyle>

        {/* imagenes */}
        <ImageContainerStyle>
          <TitleStyle>Cargar imagenes</TitleStyle>
          <ImageBlockStyle>
            <InputStyle
              name="temporaryImageInput"
              type="text"
              placeholder="Insertar https://"
              onChange={handleInputChange}
              required
            />
            <ButtonStyle onClick={handleAddUrlImage}>
              <AiOutlinePlus className="icon" />
            </ButtonStyle>
          </ImageBlockStyle>
          {/* lista de url */}
          {values.urlImages.map((item, index)=>(
             <ContainerList key={item}>
              <ContainerText >
                {item}
              </ContainerText>
              <ContainerButton onClick={() => handleDeleteUrlImage(index)}>
                <AiOutlineClose className="icon" />
              </ContainerButton>
           </ContainerList>
          ))}
        </ImageContainerStyle>

        <ContainerButtonGlobal>
          <Button width={'300px'} type="submit" form="form" onClick={handleSubmit}>Crear</Button>
        </ContainerButtonGlobal>
      </FormStyle>
      
    </>
  );
}
