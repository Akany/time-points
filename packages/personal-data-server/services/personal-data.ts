import axios, {AxiosError} from 'axios';

import {PERSONAL_DATA_SERVICE} from '../constants';

export interface GetPersonalDataParams {
    serviceName: string,
    userId: string
};

export interface CreatePersonalDataParams {
    serviceName: string,
    userId: string,
    hash: string
};

export interface DBEntity {
    name: string,
    hash: string,
    userId: string,
    _id: string
};

export async function fetchPersonalData(params: GetPersonalDataParams): Promise<DBEntity[]> {
    const requestParams = {
        'service-name': params.serviceName,
        'user-id': params.userId
    };

    const config = {
        params: requestParams
    };
    
    return axios
        .get(`${PERSONAL_DATA_SERVICE}/api/v1/passwords`, config)
        .then(mapResponseData, mapAxiosReason);
}

export async function createPersonalData(params: CreatePersonalDataParams): Promise<DBEntity> {
    const data = {
        'service-name': params.serviceName,
        'user-id': params.userId,
        hash: params.hash
    };

    return axios
        .post(`${PERSONAL_DATA_SERVICE}/api/v1/passwords`, data)
        .then(mapResponseData, mapAxiosReason);
}

function mapAxiosReason(reason: AxiosError) {
    return Promise.reject(reason.response.data);
}

function mapResponseData(response) {
    return response.data;
}