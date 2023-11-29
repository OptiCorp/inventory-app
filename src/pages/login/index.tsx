
import {
    BackgroundContainer,
    ButtonWrapper,
    Header,
    InfoText,
    LoginContainer,
    TitleHeader,
} from './styles'
import { useMsal } from '@azure/msal-react'
import { useState } from 'react'

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
                    <button
                        type="submit"
                        aria-disabled={isSubmitting ? true : false}
                        aria-label={isSubmitting ? 'loading data' : ''}
                        onClick={onSubmit}
                    >
                        {isSubmitting ? <>loading</> : 'Log in'}
                    </button>
                </ButtonWrapper>
              
            </LoginContainer>
        </BackgroundContainer>
    )
}
