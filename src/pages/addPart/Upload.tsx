
import ProgressBar from "../../components/progressBar/ProgressBar.tsx";
import { FormContainer, SubmitButton } from "./styles.ts";
import { Link } from "react-router-dom";

const Upload = () => {
    return (
        <FormContainer>
            <ProgressBar progressLevel={3} />
            <input type='file' />

            <Link to='/add-part/add-form'><SubmitButton>Next</SubmitButton></Link>
        </FormContainer>
    )
}

export default Upload
