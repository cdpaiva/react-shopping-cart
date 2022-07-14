import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: Arial, Helvetica, sans-serif;
    border-bottom: 1px solid #333;
    padding-bottom: 20px;

    div {
        flex: 1;
    }

    .information, .buttons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 5rem;
    }

    img {
        max-width: 80px;
        object-fit: cover;
        margin: 40px;
    }
    
`