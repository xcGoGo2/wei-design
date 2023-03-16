import { reponseType } from '@/type'
import api from '../index'

export const addDesign = async (content: string): Promise<reponseType> => {
    return await api.Post('design/api/design/addDesign', {
        content,
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


