import {DBEntity} from '../../services/personal-data';

export interface ResponseEntity {
    name: string,
    hash: string,
    userId: string
};

export function mapToEntity(entity: DBEntity): ResponseEntity {
    const {
        name,
        userId,
        hash
    } = entity;

    return {
        name,
        userId,
        hash
    };
}