import React from 'react'
import CustomButton from "../CustomButton";


function SocialSignInButtons() {
    const onSignInWithFacebookPress = () => {
      console.warn("Connecté avec Facebook");
    };

    const onSignInWithGooglePress = () => {
      console.warn("Connecté avec Google");
    };

    const onSignInWithApplePress = () => {
      console.warn("Connecté avec Apple");
    };
    return (

      <>
        <CustomButton
          onPress={onSignInWithFacebookPress}
          text={"Se connecter avec Facebook"}
          bgColor="#E7EAF4"
          fgColor="#4765A9"
          type="SOCIALCONNECT"
        />
        <CustomButton
          onPress={onSignInWithGooglePress}
          text={"Se connecter avec Google"}
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
          type="SOCIALCONNECT"
        />
        <CustomButton
          onPress={onSignInWithApplePress}
          text={"Se connecter avec Apple"}
          bgColor="#E3E3E3"
          fgColor="#363636"
          type="SOCIALCONNECT"
        />
      </>
    );
}

export default SocialSignInButtons
