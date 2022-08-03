import AsyncStorage from "@react-native-async-storage/async-storage";

/* 
    Fichier qui contient les constantes nécessaire à l'ensemble de l'appli
*/

export const API_phone = "http://172.20.10.3:8000/api/";

export const API = "http://5.39.76.125/dvoraliah/orgabud-website/public/index.php/api/";
// export const API = "http://orgabud.ranaweera.fr/api/";

export var GET_TOKEN = async() => AsyncStorage.getItem('token')
export var USER_TOKEN = GET_TOKEN();
export const GET_USER_ID = async() => AsyncStorage.getItem('user_id')
export const USER_ID = GET_USER_ID();

