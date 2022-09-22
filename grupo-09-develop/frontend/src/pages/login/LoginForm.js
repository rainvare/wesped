import React, { useState, useRef, useContext } from 'react'
import { Form, Div, Label } from '../../components/form/StyledForm'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import ErrorMessage from '../../components/form/ErrorMessage'
import { AxiosInstance } from '../../helpers/AxiosHelper'
import jwt_decode from 'jwt-decode'
import LocalStorageHelper from '../../helpers/LocalStorageHelper'
import { UserContext } from '../../hooks/UseContext'
import { SignedInOk } from '../../components/signedInOk/SignedInOk'
import Spinner from '../../components/spinner/Spinner'

const LoginForm = () => {
    const { setLoggedUser } = useContext(UserContext)
    const [isError, setIsError] = useState(false);
    const [loaded, setLoaded] = useState(true);
    const navigate = useNavigate()
    const { state } = useLocation();

    const showErrorMsg = () => {
        setIsError(true)
        setTimeout(() => {
            setIsError(false)
        }, 5000)
    }

    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    const submitLoginHandler = e => {
        e.preventDefault();
        const email = emailInputRef.current.value.trim();
        const password = passwordInputRef.current.value.trim();

        if (password.length < 6) {
            SignedInOk.fire('Usuario o contraseña inválidos', 'Por favor verifique que haya ingresado credenciales correctas', 'error')
            showErrorMsg()
            return
        }

        const userCredentials = {
            email: email,
            password: password
        }

        try {
            setLoaded(false)
            AxiosInstance.post('/auth/signin', userCredentials).then(({ data }) => {
                LocalStorageHelper.setItem('Token', data.token)
                const { id, name, surname, email, authorities } = LocalStorageHelper.getItem('Token') ? jwt_decode(LocalStorageHelper.getItem('Token'))["user_info"] : null;
                setLoggedUser({
                    id: id,
                    name: name,
                    surname: surname,
                    email: email,
                    rol: authorities[0].authority
                })
                SignedInOk.fire({
                    icon: 'success',
                    title: `Sesión iniciada correctamente.`
                })
                navigate(state ? state : '/')

            }).catch(({ response }) => {
                if (response.status === 401) {
                    SignedInOk.fire('Usuario no encontrado', 'Por favor intente nuevamente', 'error')
                    showErrorMsg()
                }
                else if (response.status >= 400 && response.status !== 401) SignedInOk.fire('Algo no salió como se esperaba', 'Por favor intente nuevamente', 'warning')
            }).finally(() => setLoaded(true))
        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <>
            {!loaded
                ?
                <Spinner />
                :
                <Form onSubmit={submitLoginHandler}>
                    <h1>Iniciar Sesión</h1>
                    <Div alignItems="start">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input width="28rem" type="email" id="email" required reference={emailInputRef} visible={isError} />
                        <Label htmlFor="password">Contraseña</Label>
                        <Input width="28rem" type="password" id="password" required reference={passwordInputRef} visible={isError} />
                    </Div>
                    <Div align="center">
                        <ErrorMessage visible={isError}>Por favor vuelva a intentarlo, usuario o contraseña inválidos</ErrorMessage>
                        <Button type="submit" width="12.5rem"><b>Ingresar</b></Button>
                        <span>
                            ¿Aún no tienes cuenta? <Link to={`/registro`}>Registrate</Link>
                        </span>
                    </Div>
                </Form>
            }
        </>
    )
}

export default LoginForm