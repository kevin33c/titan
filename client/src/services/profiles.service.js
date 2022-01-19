import { AlertsService } from './alerts.service';

const axios = require('axios');
const config = require('../config/config');
const alert = new AlertsService();

export class ProfilesService {
    async createProfile(data) {
        try {
            const res = await axios.post(`${config.domain}/api/profiles`, data);
            return res.data;
        } catch (err) {
            alert.error(err);
        }
    }

    async getProfiles(data) {
        try {
            const res = await axios.get(`${config.domain}/api/profiles`);
            return res.data;
        } catch (err) {
            alert.error(err);
        }
    }
}