
import ProgressBar from "../../components/progressBar/ProgressBar.tsx";
import { FormContainer, SubmitButton } from "./styles.ts";
import { Link, useNavigate } from "react-router-dom";

const Upload = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/add-part/add-form')
    }

    return (
        <FormContainer>
            <ProgressBar progressLevel={3} />
            <h3>Upload documentation</h3>
            <input type='file' />

            <div style={{ display: "flex", justifyContent: "end" }}>
                <SubmitButton onClick={handleClick}>Next</SubmitButton>
            </div>
        </FormContainer>
    )
}

export default Upload
