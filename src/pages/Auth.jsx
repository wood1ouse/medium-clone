import { useEffect, useState, useContext } from 'react'
import BackendErrorMessages from '../components/BackendErrorMessages'
import useLocalStorage from '../hooks/useLocalStorage'
import useFetch from '../hooks/useFetch'
import { Link, Redirect } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/currentUser'

const Auth = (props) => {
    const isLogin = props.match.path === '/login'
    const pageTitle = isLogin ? 'Sign In' : 'Sign Up'
    const descriptionLink = isLogin ? '/register' : '/login'
    const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
    const apiUrl = isLogin ? '/users/login' : '/users'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')
    const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false)
    const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)
    const [, setToken] = useLocalStorage('token')
    const [currentUserState, dispatch] = useContext(CurrentUserContext)

    console.log('Current User State: ', currentUserState)

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = isLogin
            ? { email, password }
            : { email, password, username }
        doFetch({
            method: 'post',
            data: {
                user,
            },
        })
    }

    useEffect(() => {
        if (!response) {
            return
        }
        setToken(response.user.token)
        setIsSuccessfulSubmit(true)
        dispatch({ type: 'SET_AUTHORIZED', payload: response.user })
    }, [response, setToken, currentUserState, dispatch])

    if (isSuccessfulSubmit) {
        return <Redirect to="/" />
    }

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <div
                            className="text-xs-center"
                            style={{ fontSize: '30px', fontWeight: 'bold' }}
                        >
                            {pageTitle}
                        </div>
                        <p className="text-xs-center">
                            <Link to={descriptionLink}>{descriptionText}</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <BackendErrorMessages
                                    backendErrors={error.errors}
                                />
                            )}
                            <fieldset>
                                {!isLogin && (
                                    <fieldset className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty ng-valid-email"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) =>
                                                setUserName(e.target.value)
                                            }
                                        />
                                    </fieldset>
                                )}
                                <fieldset className="form-group">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty ng-valid-email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty ng-valid-email"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                    />
                                </fieldset>
                                <button
                                    className="btn btn-lg btn-primary pull-xs-right"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {pageTitle}
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
