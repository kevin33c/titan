import { AlertsService } from './alerts.service';

const axios = require('axios');
const config = require('../config/config');
const alert = new AlertsService();

export class RequestsService {
    async createRequest(data) {
        try {
            const res = await axios.post(`${config.domain}/api/requests`, data);
            return res.data;
        } catch (err) {
            alert.error(err);
        }
    }
}