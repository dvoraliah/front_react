import AsyncStorage from "@react-native-async-storage/async-storage";

/* 
    Fichier qui contient les constantes nécessaire à l'ensemble de l'appli
*/

export const API_phone = "http://172.20.10.3:8000/api/";

export const API = "http://5.39.76.125/dvoraliah/orgabud-website/public/index.php/api/";

export const GET_TOKEN = async() => AsyncStorage.getItem('token')
export const USER_TOKEN = GET_TOKEN();


