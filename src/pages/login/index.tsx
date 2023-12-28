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
import { Button } from '../../components/Button/SubmitButton'
import { COLORS } from '../../style/GlobalStyles'

export const Login = () => {
    const { instance } = useMsal()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const onSubmit = () => {
        setIsSubmitting(true)
        instance.loginPopup()
    }
    return (
        <BackgroundContainer>
            <LoginContainer>
                <Header>
                    <TitleHeader>Sign in to your Account</TitleHeader>
                </Header>
                <ButtonWrapper>
                    <LoginButton
                        type="submit"
                        aria-disabled={isSubmitting ? true : false}
                        aria-label={isSubmitting ? 'loading data' : ''}
                        onClick={onSubmit}
                    >
                        {isSubmitting ? <>loading</> : 'Log in'}
                    </LoginButton>
                </ButtonWrapper>
            </LoginContainer>
        </BackgroundContainer>
    )
}
