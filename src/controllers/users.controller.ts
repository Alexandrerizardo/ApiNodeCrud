import { Request, Response } from "express";
import { userService } from '../services/user.service';

    const insertUser = async (req: Request, res: Response) => {
        try {
            const user = req.body;
            await userService.insertUser(user);
            res.status(201).json({ 
                message: "Usuário inserido com sucesso!" 
            });   
        } catch (err){
            throw(err);        
        }      
    };

    const listUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await userService.getUser();
            res.status(200).json(users);
            if(!users){
                res.status(404).json({
                    message: "Usuário não encontrado" 
                   });
            }
        } catch (err:any){
            res.status(500).json({ error: err.message });
        }
    };

    const getUsersById = async (req: Request, res: Response) => {
        try{
            const id = parseInt(req.params.id);
            const user = await userService.getUserById(id);
            if(user){   
                    return res.status(200).json(user);
            }
            else{
                res.status(404).json({
                     message: "Usuário não encontrado" 
                    });
            } 
        }catch(err){
            throw(err);
        }
    };

    const deleteUser =  async (req: Request, res: Response) => {
        try{
            const id = parseInt(req.params.id);
            if(id){ 
                await userService.deleteUser(id);
                res.status(200).json({ 
                    message: "Usuário deletado com sucesso!"   
                });
            }else{
                res.status(404).json({
                    message: "Usuário não encontrado" 
                   });
            }
        }catch(err: any){
            res.status(500).json({ error: err.message });
        }
    };

    const updateUser = async (req: Request, res: Response) => {
        try{
            const id = parseInt(req.params.id);
            const user = req.body;
            if(id){
                await userService.updateUser(id, user)
                res.status(200).json({message: "Usuário atualizado"});
            }
        }catch(err){
            throw(err);
        }   
    }


    export const userController = {
        insertUser,
        listUsers,
        getUsersById,
        deleteUser,
        updateUser
    }


