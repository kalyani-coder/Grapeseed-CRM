import React from 'react'

const HandleTimeOut = () => {


    const HandleTimeOut = async () => {
        try {
          const handleTime = await ServiceWorkerRegistration.apply();
          ServiceWorker.save(handleTime);
        } catch (error) {
          console.error("Error handling timeout:", error);
          // Handle the error as needed
        }
      };



      const HandleTimeOutSetting = () => {
        useEffect(() => {
          HandleTimeOut();
        }, []); // The second parameter [] ensures that this effect runs only once,
      };


  return (
    <div> 
    </div>
  )
}

export default HandleTimeOut