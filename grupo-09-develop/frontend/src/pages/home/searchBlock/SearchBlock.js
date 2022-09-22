import React, { useContext, useState } from "react";
import {
  ContainerSearchBlock,
  BoxStyle,
  SearchBlockTitle,
  SearchBar,
  ButtonStyle
} from "./SearchBlockStyled";
import DropdownList from "./dropdownList/DropdownList";
import Schedule from "../../../components/schedule/Schedule";
import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import Button from "../../../components/button/Button";
import SearchInput from "../searchBlock/SearchInput"
import { AxiosInstance } from "../../../helpers/AxiosHelper";
import '../searchBlock/SearchBlockStyle.css'
import { SelectedDatesContext } from "../../../hooks/UseContext";
import { toJavaDateString, toUserReadableDateString } from "../../../hooks/UseToString";

const SearchBlock = (props) => {
  const { selectedDatesContext } = useContext(SelectedDatesContext)
  const [selectedCityID, setSelectedCityId] = useState(0);

  const filterProducts = () => {
    let URL;
    let recommendationsTitle;
    
    if (!selectedCityID && !selectedDatesContext) return;
    if (selectedCityID && !selectedDatesContext) URL = `products/city/${selectedCityID}`
    if (!selectedCityID && selectedDatesContext) URL = `products/booking/${toJavaDateString(selectedDatesContext?.checkin)}/${toJavaDateString(selectedDatesContext?.checkout)}`
    if (selectedCityID && selectedDatesContext) URL = `products/booking/${toJavaDateString(selectedDatesContext?.checkin)}/${toJavaDateString(selectedDatesContext?.checkout)}/${selectedCityID}`
    
    try {
      props.setLoaded(false)
      AxiosInstance.get(URL)
        .then(products => {
          props.setProductsToDisplayByCity(products.data)
          if (selectedCityID && !selectedDatesContext) recommendationsTitle = products?.data[0]?.city?.name;
          if (!selectedCityID && selectedDatesContext) recommendationsTitle = `fechas entre ${toUserReadableDateString(selectedDatesContext?.checkin)} - ${toUserReadableDateString(selectedDatesContext?.checkout)}`;
          if (selectedCityID && selectedDatesContext) recommendationsTitle = `${products?.data[0]?.city?.name} y fechas entre ${toUserReadableDateString(selectedDatesContext?.checkin)} - ${toUserReadableDateString(selectedDatesContext?.checkout)}`;
          props.setRecommendationsTitle(recommendationsTitle)
        })
        .catch(err => console.warn(err))
        .finally(() => props.setLoaded(true))
    } catch (error) {
      console.log(error);
    }
  }

  // Metodo para setear "selectedCityID" state capturado en el componente DropdownList
  const getAndSetSelectedCityID = (selectedCityID) => setSelectedCityId(selectedCityID)

  // Al realizar submit del form de buscador, se llama al endpoint de buscar productos por Id de Ciudad
  // y mediante props seteo la lista de productos a mostrar (productsToDisplay)
  const handleSubmit = (e) => {
    e.preventDefault();
    filterProducts();
  }

  return (
    <>
      <ContainerSearchBlock className="container-serch-block">
      <BoxStyle>
        <SearchBlockTitle>
          Busca ofertas en hoteles, casas y mucho más
        </SearchBlockTitle>
        <form onSubmit={handleSubmit}>
          <SearchBar>
            <SearchInput
              input={<DropdownList city={props.city} icon={<FaMapMarkerAlt />} getAndSetSelectedCityID={getAndSetSelectedCityID} />}
              icon={<FaMapMarkerAlt />}
            />
            <SearchInput
              input={<Schedule icon={<FaRegCalendarAlt />} monthsShown={props.isMobile ? 1 : 2} />}
              icon={<FaRegCalendarAlt />}
            />
            <ButtonStyle>
              <Button type="submit" width="100%" theme="secondary">Buscar</Button>
            </ButtonStyle>
          </SearchBar>
        </form>
        </BoxStyle>
      </ContainerSearchBlock>
    </>
  );
}

export default SearchBlock;
