import { useEffect } from 'react'
import './GenerateInput.css'

function GenerateInput() {
    useEffect(() => {

    }, []);

    return (
        <>
            <div className="generate_input_container">
                <div className="d-flex mb-2">
                    <input type="text" className="form-control generate_input me-1" placeholder="Environment description" />
                    <button className="btn btn-light" type="button">Generate Environment</button>
                </div>
                <div className="d-flex">
                    <input type="text" className="form-control generate_input me-1" placeholder="Object description" />
                    <button className="btn btn-light" type="button">Generate Object</button>
                </div>
            </div>
        </>
    )
}

export default GenerateInput
