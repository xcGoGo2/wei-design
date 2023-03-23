import { reponseType } from '@/type'
import api from '../index'

export const addDesign = async (userId: string, content: string): Promise<reponseType> => {
    return await api.Post('design/api/design/addDesign', {
        userId,
        content
    })
}

export const getDesignContentById = async (id: string): Promise<reponseType> => {
    return await api.Get('design/api/design/getDesignContentById', {
        id,
    })
}

export const updateDesignById = async (id: string, content: string): Promise<reponseType> => {
    return await api.Post('design/api/design/updateDesignById', {
        id,
        content
    })
}

export const findDesignList = async (userId: string): Promise<reponseType> => {
    return await api.Get('/design/api/design/findDesignList', {
        userId
    })
}

export const deleteDesign = async (id: string): Promise<reponseType> => {
    return await api.Post('/design/api/design/deleteDesign', {
        id
    })
}

export const setImg = async (id: string, base64Data: string): Promise<reponseType> => {
    return await api.Post('/design/api/design/setImg', {
        id,
        base64Data
    })
}

export const getImg = (id: string): string => {
    return `http://localhost:8888/upload/design/${id}.jpg`;
}




