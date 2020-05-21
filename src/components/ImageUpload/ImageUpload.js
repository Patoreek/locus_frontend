import React, {useContext} from 'react';

import { FilePond } from 'react-filepond';
import "filepond/dist/filepond.min.css";

import { SiteContext } from '../../context/DiveSiteContext';


const ImageUpload = () => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);


    return (
        <div>

                <FilePond 
                    allowMultiple={false}
                    name={"divesiteImages"}
                    server={
                        {
                            url: "http://localhost:8080/diveSites/uploadImages/" + selectedSite._id,
                            process:{
                                withCredentials: true
                            }
                        }
                    }
                />  
            
        </div>
    );
};

export default ImageUpload;