// config/fetchInfo.js
import { Platform } from 'react-native';
let variables;
if (Platform.OS === 'android' || Platform.OS === 'ios') {
    variables = {
        protocol: "http",
        domain: "vps-3858808-x.dattaweb.com", 
        port: 8180,
        api: "mobile/wines"
    };
} else if (Platform.OS === 'web') {   
    variables = {
        protocol: "https",
        domain: "vps-3858808-x.dattaweb.com", 
        port: 8444,
        api: "central/wines"
    };
} else {

    variables = {
        protocol: "https",
        domain: "vps-3858808-x.dattaweb.com",
        port: 8444,
        api: "central/wines"
    };
}

let url = `${variables.protocol}://${variables.domain}:${variables.port}/${variables.api}`;

export default url;

/*
const variables = {
    protocol: "http",
    domain: "localhost",
    port: 8180,
    api: "mobile/wines"
};

const url = `${variables.protocol}://${variables.domain}:${variables.port}/${variables.api}`;

export default url;
*/




