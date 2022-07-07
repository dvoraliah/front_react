import { useState } from "react";

import axios from "axios";
import { DB_PATH } from "../services/env"

export const login = () => {
    var email = "dvoraliah@test.fr"
    var password = "anya"
    var chemin = "login"
    var dataLogin = null
    axios({
        method: "post",
        url: DB_PATH + chemin,
        data: {
            email: email,
            password: password,
        },
        }).then((response) => {
        //Si la response à la requête est acceptée par l'API, l'utilisateur est redirigé vers la page d'accueil.
        // console.warn(state)
        response.status == 201 ? dataLogin = response.data.token : {}
        return (dataLogin)
            // ? saveToken(
            //     response.data.token
            // ) /* navigation.navigate('Home', {
            //         token : response.data.token,
            //     })  */
            // : {};
    });
}
