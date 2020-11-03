import React, {useState, useEffect} from 'react';


import classes from './CommunityPhotos.module.scss';

const CommunityPhotos = (props) => {
    const siteId = props.match.params.siteId;

    const [communityImages, setCommunityImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const masonryOptions = {  
        fitWidth: true,  
        columnWidth: 300,  
        gutter: 5  
      };
    
    const imagesLoadedOptions = { background: '.my-bg-image-el' }


   


    useEffect(() => {

        let refomattedArrayImages = [];

        async function getSite() {

            try {
              const response = await fetch('http://localhost:8080/diveSites/getCommunityPhotos/' + siteId,{
                method: 'GET',
                credentials: 'include',
              });
              const results = await response.json();
              console.log(results);
              setCommunityImages(results.communityImages);
              setIsLoading(false);
  
      
            } catch (error) {
             console.log(error);
             //setIsLoading(true);
            }
          }

        
        
          getSite();

    },[]);

    
 

    return (
        <div>
            Community Photos
            <b> REACT BRICKS PACKAGE TO BE USED HERE FOR IMAGES </b>

            {!isLoading && (
                 <div>
                {communityImages.map(image => (
                   
                        <img src={'http://localhost:8080/' + image}/>
                    
                ))}
                </div>
            )}
        </div>
    );
};

export default CommunityPhotos;