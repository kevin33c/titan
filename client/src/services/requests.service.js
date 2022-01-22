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

    async getRequestByAddress(id) {
        try {
            const res = await axios.get(`${config.domain}/api/requests/${id}`);
            return res.data;
        } catch (err) {
            alert.error(err);
        }
    }

    async acceptRequestById(id) {
        try {
            const res = await axios.put(`${config.domain}/api/requests/accept/${id}`);
            return res.data;
        } catch (err) {
            alert.error(err);
        }
    }
}