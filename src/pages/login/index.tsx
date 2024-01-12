import { useMsal } from '@azure/msal-react'
import { useState } from 'react'
import {
    BackgroundContainer,
    ButtonWrapper,
    Header,
    LoginButton,
    LoginContainer,
    TitleHeader,
} from './styles'

export const Login = () => {
    const { instance } = useMsal()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const onSubmit = () => {
        setIsSubmitting(true)
        instance.loginPopup().catch((error) => {
            console.error('Failed to login: ', error)
        })
    }
    return (
        <BackgroundContainer>
            <LoginContainer>
                <Header>
                    <img alt="logo" src={'/WP 1.svg'} width="60" style={{ margin: 'auto' }} />
                    <TitleHeader>Log in to your account</TitleHeader>
                </Header>
                <ButtonWrapper>
                    <LoginButton
                        type="submit"
                        aria-disabled={isSubmitting ? true : false}
                        aria-label={isSubmitting ? 'loading data' : ''}
                        onClick={onSubmit}
                    >
                        {isSubmitting ? <>Logging in..</> : 'Log in'}
                    </LoginButton>
                </ButtonWrapper>
            </LoginContainer>
        </BackgroundContainer>
    )
}
