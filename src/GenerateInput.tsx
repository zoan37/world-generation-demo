import { useEffect, useState } from 'react'
import './GenerateInput.css'
import Cookies from 'js-cookie'

function GenerateInput() {
    const [envDesc, setEnvDesc] = useState("");
    const [objDesc, setObjDesc] = useState("");
    const [isEnvGenerating, setIsEnvGenerating] = useState(false);
    const [isObjGenerating, setIsObjGenerating] = useState(false);
    const [isConnectedToOpenRouter, setIsConnectedToOpenRouter] = useState(false);

    async function submitEnvironmentDescription() {
        setIsEnvGenerating(true);

        try {
            // @ts-ignore
            await window.generateNewEnvironment(envDesc);
        } catch (e) {
            console.error(e);
            alert(e);
        }

        setIsEnvGenerating(false);
    }

    async function submitObjectDescription() {
        setIsObjGenerating(true);

        try {
            // @ts-ignore
            await window.generateNewObject(objDesc);
        } catch (e) {
            console.error(e);
            alert(e);
        }

        setIsObjGenerating(false);
    }

    function handleUploadEnvironmentPly() {
        console.log("click handleUploadEnvironmentPly");

        // @ts-ignore
        window.uploadEnvironmentPly();
    }

    function handleUploadObjectPly() {
        console.log("click handleUploadObjectPly");

        // @ts-ignore
        window.uploadObjectPly();
    }

    function connectToOpenRouter() {
        // Get the base URL without query parameters
        var baseUrl = window.location.href.split('?')[0];
        
        // Encode the base URL
        var encodedBaseUrl = encodeURIComponent(baseUrl);
        
        // Construct the final URL
        var link = 'https://openrouter.ai/auth?callback_url=' + encodedBaseUrl;
        
        // Open the new window
        window.open(link, '_blank');
    }

    function disconnectFromOpenRouter() {
        Cookies.remove('key');
        setIsConnectedToOpenRouter(false);

        // remove ?code=... from url
        // Get the current URL
        const url = new URL(window.location.href);

        // Remove the 'code' parameter from the query string
        url.searchParams.delete('code');

        // Replace the current URL with the new URL
        window.history.replaceState({}, '', url.toString());
    }

    async function processUrl() {
        if (Cookies.get('key')) {
            return;
        }

        // get ?code=... from url
        // Get the current URL
        const url = new URL(window.location.href);

        // Get the value of the 'code' parameter from the query string
        const CODE_FROM_QUERY_PARAM = url.searchParams.get('code');

        if (!CODE_FROM_QUERY_PARAM) {
            return;
        }

        console.log('CODE_FROM_QUERY_PARAM', CODE_FROM_QUERY_PARAM);

        const authResult = await fetch("https://openrouter.ai/api/v1/auth/keys", {
            method: 'POST',
            body: JSON.stringify({
                code: CODE_FROM_QUERY_PARAM
            })
        })

        const authResultJson = await authResult.json();
        console.log(authResultJson);

        const key = authResultJson.key;

        Cookies.set('key', key, { expires: 1 });

        setIsConnectedToOpenRouter(true);
    }

    processUrl();

    useEffect(() => {
        if (Cookies.get('key')) {
            setIsConnectedToOpenRouter(true);
        }
    }, []);

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
                        onClick={submitEnvironmentDescription}
                        disabled={isEnvGenerating}
                    >
                        {
                            !isEnvGenerating ?
                                (
                                    <span>
                                        Generate Environment
                                    </span>
                                ) :
                                (
                                    <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                    </div>
                                )
                        }
                    </button>
                </div>
                <div className="d-flex mb-2">
                    <input type="text" className="form-control generate_input me-1" placeholder="Object description"
                        value={objDesc}
                        onChange={e => setObjDesc(e.target.value)}
                        onKeyDown={e => { e.stopPropagation(); }}
                    />
                    <button className="btn btn-light" type="button"
                        onClick={submitObjectDescription}
                        disabled={isObjGenerating}
                    >
                        {
                            !isObjGenerating ?
                                (
                                    <span>
                                        Generate Object
                                    </span>
                                ) :
                                (
                                    <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                    </div>
                                )
                        }
                    </button>
                </div>
                <hr />
                <div>
                    <button className="btn btn-light me-2" type="button"
                        data-bs-toggle="modal" data-bs-target="#plyViewerModal"
                    >
                        View Generation History
                    </button>

                    <input type="file" id="env_ply_upload_input" accept=".ply" style={{ display: 'none' }} />
                    <button className="btn btn-light me-2" type="button" id="env_ply_upload_button" onClick={handleUploadEnvironmentPly}>
                        Upload Environment .ply
                    </button>

                    <input type="file" id="obj_ply_upload_input" accept=".ply" style={{ display: 'none' }} />
                    <button className="btn btn-light" type="button" id="obj_ply_upload_button" onClick={handleUploadObjectPly}>
                        Upload Object .ply
                    </button>
                </div>
                <hr />
                <div>
                    {
                        !isConnectedToOpenRouter ?
                            (
                                <div>
                                    <button className="btn btn-light me-2" type="button" onClick={connectToOpenRouter}>
                                        Connect to OpenRouter
                                    </button>

                                    or use <a href="https://windowai.io/" target="_blank">window.ai</a>
                                </div>
                            ) :
                            (
                                <div>
                                    Connected to OpenRouter
                                    &nbsp;
                                    <button className="btn btn-light me-2" type="button" onClick={disconnectFromOpenRouter}>
                                        Disconnect
                                    </button>
                                </div>
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default GenerateInput
