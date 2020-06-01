import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

export const Form = styled.form`
    width: 50%;
    margin: 5% auto;
    max-width: 500px;
`

export const FormField = styled(TextField)`
    &&& {
        margin: 5px 0;
        font-size: 1.4vw;
    }
`

export const Title = styled.h1`
    text-align: center;
    margin: 2% auto
`

export const ActionsContainer = styled.div`
    display: grid;
    margin-top: 20px;
    grid-row-gap: 10px;
    @media(min-width: 600px) {
        grid-auto-flow: column;
        grid-template-columns: 50%;
        grid-column-gap: 18px;
    }
`

export const LoginUser = styled(Button)`
    margin: 5px 5px 5px 0px;
    float: left;
`

export const CreateAccount = styled(Link)`
    text-decoration: none;
    background-color: black;
    color: yellow;
    padding: 7px;
    border-radius: 6px;
    margin: unset;
    float: right;
    text-align: center;
`