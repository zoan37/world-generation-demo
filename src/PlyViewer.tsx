// @ts-nocheck
import { useState, useEffect } from 'react';
import CanvasComponent from './Canvas';
import './PlyViewer.css';

const PlyViewer = (
  { 
    generatedObjects
  }
) => {

  // Mocking some initial object generation after component mounted
  useEffect(() => {
    console.log('PlyViewer mounted');

    console.log(generatedObjects);
  }, []);

  return (
    <>
      <div className="ply_view">
        <table className="ply_view_table">
          {generatedObjects.slice().reverse().map((object, index) => (
            <tr>
              <td>
                <CanvasComponent key={index} objectLink={object.plyURI} onScreenshotReady={() => null} />
              </td>
              <td>
                {object.prompt}
              </td>
              <td>
                <button className="btn btn-light" type="button">
                  Download
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default PlyViewer;