import { AlertsService } from './alerts.service';

const axios = require('axios');
const config = require('../config/config');
const alert = new AlertsService();

export class ContractsService {
    async getContract() {
        try {
            const res = await axios.get(`${config.domain}/api/contracts`);
            return res.data;
        } catch (err) {
            alert.error(err);
        }
    }
}