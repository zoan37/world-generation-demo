import { useEffect, useState } from 'react'
import './GenerateInput.css'

function GenerateInput() {
    // define two react state variables, one for the environment description and one for the object description
    const [envDesc, setEnvDesc] = useState("");
    const [objDesc, setObjDesc] = useState("");

    useEffect(() => {

    }, []);

    async function submitEnvironmentDescription() {
        try {
            // @ts-ignore
            await window.generateNewEnvironment(envDesc);
        } catch (e) {
            console.error(e);
        }
    }

    async function submitObjectDescription() {
        try {
            // @ts-ignore
            await window.generateNewObject(objDesc);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className="generate_input_container">
                <div className="d-flex mb-2">
                    <input type="text" className="form-control generate_input me-1" placeholder="Environment description"
                        value={envDesc}
                        onChange={e => setEnvDesc(e.target.value)}
                        onKeyDown={e => { e.stopPropagation(); }}
                    />
                    <button className="btn btn-light" type="button"
                        onClick={submitEnvironmentDescription}>
                        Generate Environment
                    </button>
                </div>
                <div className="d-flex">
                    <input type="text" className="form-control generate_input me-1" placeholder="Object description"
                        value={objDesc}
                        onChange={e => setObjDesc(e.target.value)}
                        onKeyDown={e => { e.stopPropagation(); }}
                    />
                    <button className="btn btn-light" type="button"
                        onClick={submitObjectDescription}>
                        Generate Object
                    </button>
                </div>
            </div>
        </>
    )
}

export default GenerateInput
