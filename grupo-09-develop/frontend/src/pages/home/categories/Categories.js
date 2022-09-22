import React from 'react'
//import categories from '../../../data/categories.json'
import CategoryItem from './categoryItem/CategoryItem'
import { CategoryContainerStyle, TitleStyle, CategoryListContainerStyle, CardStyle } from './CategoryStyles'
import { useState, useEffect } from 'react'
// import axios from 'axios'
import { AxiosInstance } from '../../../helpers/AxiosHelper'
import Spinner from '../../../components/spinner/Spinner'

export default function Categories({ setSelectedCategory, setRecommendationsTitle }) {
    const [loaded, setLoaded] = useState(true)
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        try {
            setLoaded(false)
            AxiosInstance.get('/categories')
                .then((res) => {
                    setCategories(res.data);
                })
                .catch(err => console.log(err))
                .finally(() => setLoaded(true))
        } catch (error) {
            console.log(error);
        }
    }, [])


    return (
        <>
            {
                !loaded
                    ?
                    <Spinner />
                    :
                    <CategoryContainerStyle>
                        <TitleStyle>Buscar por tipo de alojamiento</TitleStyle>
                        <CategoryListContainerStyle>
                            {
                                categories.map((item) =>
                                    <CardStyle key={item.id} onClick={() => {
                                        setSelectedCategory(item.id)
                                        setRecommendationsTitle(item.title)
                                    }}>
                                        <CategoryItem {...item} />
                                    </CardStyle>
                                )
                            }
                        </CategoryListContainerStyle>
                    </CategoryContainerStyle>
            }
        </>
    )
}
