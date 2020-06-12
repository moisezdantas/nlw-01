import {Response, Request} from 'express'; 
import knex from '../database/connection';

class PoinstController {

    async index(request:Request, response:Response) {
        const { city , uf, items } = request.query;

        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        console.log(city,uf, items);

         const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map( point => {
            return {
                ...point,
                image_url: `http://192.168.0.5/uploads/${point.image}`
            }
        })

        response.json(serializedPoints)
    }

    async show(request:Request, response:Response) {
        const { id } = request.params;
        console.log(id)

        const point = await knex('points').where('id', id).first();

        if(!point){
            return response.status(400).json({message: 'Not Found'});
        }

        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id' )
        .where('point_items.point_id', id)
        .select('items.title');

        const serializedPoints =  {
            ...point,
            image_url: `http://192.168.0.5/uploads/${point.image}`
        }

        return response.json({point: serializedPoints, items});

    }

    async create (request:Request, response:Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };
    
        const trx = await knex.transaction();
        
        const insertIds = await trx('points').insert(point);
            
        const point_id = insertIds[0];

    
        const pointItems = items.split(',')
        .map((item:string) => Number(item.trim()))
        .map((item_id: number) => {
            return {
                point_id: point_id,
                item_id
            }
        })
    
        await trx('point_items').insert(pointItems);
       

        await trx.commit();

        return response.json({ 
            id: point_id,
            ...point,
        })
       
    }
}

export default PoinstController;